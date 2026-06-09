<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Credit;
use App\Models\Notification;
use App\Models\Payment;
use App\Models\PaymentRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SellerPaymentRequestController extends Controller
{
    /**
     * Get all pending payment requests for the authenticated seller.
     */
    public function index()
    {
        $sellerId = Auth::id();

        $requests = PaymentRequest::whereHas('credit', function ($query) use ($sellerId) {
            $query->where('seller_id', $sellerId);
        })
        ->with(['credit:id,product_name', 'consumer:id,name'])
        ->orderBy('created_at', 'desc')
        ->get();

        return response()->json(['requests' => $requests]);
    }

    /**
     * Approve a payment request.
     */
    public function approve($id)
    {
        $sellerId = Auth::id();

        $paymentRequest = PaymentRequest::where('id', $id)
            ->where('status', 'pending')
            ->whereHas('credit', function ($query) use ($sellerId) {
                $query->where('seller_id', $sellerId);
            })
            ->firstOrFail();

        DB::transaction(function () use ($paymentRequest) {
            $paymentRequest->update(['status' => 'approved']);

            $credit = $paymentRequest->credit;
            
            // Create payment record
            Payment::create([
                'credit_id' => $credit->id,
                'amount' => $paymentRequest->amount,
                'payment_date' => now(),
                'payment_method' => 'cash', // Default
                'note' => $paymentRequest->note,
            ]);

            // Update credit
            $newPaidAmount = $credit->paid_amount + $paymentRequest->amount;
            $newRemainingAmount = $credit->total_amount - $newPaidAmount;
            
            $status = 'partial';
            if ($newRemainingAmount <= 0) {
                $status = 'paid';
                $newRemainingAmount = 0;
            }

            $credit->update([
                'paid_amount' => $newPaidAmount,
                'remaining_amount' => $newRemainingAmount,
                'status' => $status,
            ]);

            // Notify consumer
            if ($credit->consumer->user_id) {
                Notification::create([
                    'user_id' => $credit->consumer->user_id,
                    'type' => 'payment_approved',
                    'title' => 'Payment Approved',
                    'message' => "Your payment of " . number_format($paymentRequest->amount, 2) . " DH for \"{$credit->product_name}\" has been approved.",
                    'is_read' => false,
                ]);
            }
        });

        return response()->json(['message' => 'Payment request approved successfully.']);
    }

    /**
     * Reject a payment request.
     */
    public function reject($id)
    {
        $sellerId = Auth::id();

        $paymentRequest = PaymentRequest::where('id', $id)
            ->where('status', 'pending')
            ->whereHas('credit', function ($query) use ($sellerId) {
                $query->where('seller_id', $sellerId);
            })
            ->firstOrFail();

        $paymentRequest->update(['status' => 'rejected']);

        // Notify consumer
        $credit = $paymentRequest->credit;
        if ($credit->consumer->user_id) {
            Notification::create([
                'user_id' => $credit->consumer->user_id,
                'type' => 'payment_rejected',
                'title' => 'Payment Rejected',
                'message' => "Your payment request of " . number_format($paymentRequest->amount, 2) . " DH for \"{$credit->product_name}\" was rejected by the seller.",
                'is_read' => false,
            ]);
        }

        return response()->json(['message' => 'Payment request rejected successfully.']);
    }
}
