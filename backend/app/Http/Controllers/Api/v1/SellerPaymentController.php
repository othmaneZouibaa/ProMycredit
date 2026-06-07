<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Credit;
use App\Models\Payment;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class SellerPaymentController extends Controller
{
    /**
     * Store a newly created payment.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'credit_id' => 'required|exists:credits,id',
            'amount' => 'required|numeric|min:0.01',
            'payment_date' => 'nullable|date',
            'payment_method' => 'nullable|string|max:50',
            'note' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $sellerId = Auth::id();

        // Retrieve credit and ensure it belongs to this seller
        $credit = Credit::where('id', $request->credit_id)
            ->where('seller_id', $sellerId)
            ->first();

        if (!$credit) {
            return response()->json([
                'message' => 'Unauthorized or credit not found.'
            ], 403);
        }

        if ($credit->status === 'paid' || $credit->remaining_amount <= 0) {
            return response()->json([
                'message' => 'This credit is already fully paid.'
            ], 422);
        }

        // Check if the payment amount exceeds the remaining balance
        if ($request->amount > $credit->remaining_amount) {
            return response()->json([
                'message' => 'Payment amount exceeds the remaining debt of ' . number_format($credit->remaining_amount, 2) . ' DH.'
            ], 422);
        }

        // Perform updates inside a transaction or sequentially
        $amount = $request->amount;
        $credit->paid_amount += $amount;
        $credit->remaining_amount -= $amount;

        if ($credit->remaining_amount == 0) {
            $credit->status = 'paid';
        } else {
            $credit->status = 'partial';
        }
        $credit->save();

        // Create the Payment
        $confirmationId = 'PAY-' . strtoupper(Str::random(8));
        $payment = Payment::create([
            'credit_id' => $credit->id,
            'amount' => $amount,
            'payment_date' => $request->payment_date ?? now()->toDateString(),
            'payment_method' => $request->payment_method ?? 'Cash',
            'note' => $request->note,
            'confirmation_id' => $confirmationId
        ]);

        // Adjust the Consumer's trust score
        $consumer = $credit->consumer;
        if ($consumer) {
            if ($credit->status === 'paid') {
                $consumer->trust_score = min(100, $consumer->trust_score + 5);
            } else {
                $consumer->trust_score = min(100, $consumer->trust_score + 1);
            }
            $consumer->save();
        }

        // Notify consumer if linked
        if ($consumer && $consumer->user_id) {
            Notification::create([
                'user_id' => $consumer->user_id,
                'type' => 'payment_registered',
                'title' => 'Payment Registered',
                'message' => "A payment of " . number_format($amount, 2) . " DH has been registered for your credit: \"{$credit->product_name}\". Remaining: " . number_format($credit->remaining_amount, 2) . " DH.",
                'is_read' => false,
            ]);
        }

        return response()->json([
            'message' => 'Payment registered successfully',
            'payment' => $payment,
            'credit' => $credit
        ], 201);
    }
}
