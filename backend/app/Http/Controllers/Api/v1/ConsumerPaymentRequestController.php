<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Credit;
use App\Models\Notification;
use App\Models\PaymentRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ConsumerPaymentRequestController extends Controller
{
    /**
     * Get all payment requests for the authenticated consumer.
     */
    public function index()
    {
        $consumerId = Auth::user()->consumerProfile->id ?? null;

        if (!$consumerId) {
            return response()->json(['message' => 'Consumer profile not found.'], 404);
        }

        $requests = PaymentRequest::where('consumer_id', $consumerId)
            ->with('credit:id,product_name')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['requests' => $requests]);
    }

    /**
     * Submit a new payment request.
     */
    public function store(Request $request)
    {
        $consumerId = Auth::user()->consumerProfile->id ?? null;

        if (!$consumerId) {
            return response()->json(['message' => 'Consumer profile not found.'], 404);
        }

        $validator = Validator::make($request->all(), [
            'credit_id' => 'required|exists:credits,id',
            'amount' => 'required|numeric|min:0.01',
            'note' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $credit = Credit::where('id', $request->credit_id)
            ->where('consumer_id', $consumerId)
            ->firstOrFail();

        if ($request->amount > $credit->remaining_amount) {
            return response()->json([
                'message' => 'Amount cannot exceed the remaining balance.'
            ], 422);
        }

        $paymentRequest = PaymentRequest::create([
            'credit_id' => $credit->id,
            'consumer_id' => $consumerId,
            'amount' => $request->amount,
            'note' => $request->note,
            'status' => 'pending',
        ]);

        // Notify the seller
        Notification::create([
            'user_id' => $credit->seller_id,
            'type' => 'payment_request',
            'title' => 'New Payment Request',
            'message' => "Consumer " . Auth::user()->name . " has requested to pay " . number_format($request->amount, 2) . " DH for \"{$credit->product_name}\".",
            'is_read' => false,
        ]);

        return response()->json([
            'message' => 'Payment request submitted successfully.',
            'request' => $paymentRequest
        ], 201);
    }
}
