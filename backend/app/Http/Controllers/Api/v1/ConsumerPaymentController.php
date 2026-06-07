<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConsumerPaymentController extends Controller
{
    /**
     * Get payment history for the authenticated consumer.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $consumer = $user->consumerProfile;

        if (!$consumer) {
            return response()->json([
                'message' => 'No active consumer profile is linked to this account.',
                'payments' => []
            ]);
        }

        $payments = Payment::whereHas('credit', function ($q) use ($consumer) {
                $q->where('consumer_id', $consumer->id);
            })
            ->with(['credit:id,product_name,seller_id', 'credit.seller:id,name'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($payment) {
                return [
                    'id' => $payment->id,
                    'amount' => floatval($payment->amount),
                    'payment_date' => $payment->payment_date,
                    'payment_method' => $payment->payment_method,
                    'note' => $payment->note,
                    'confirmation_id' => $payment->confirmation_id,
                    'product_name' => $payment->credit ? $payment->credit->product_name : 'Unknown',
                    'seller_name' => ($payment->credit && $payment->credit->seller) ? $payment->credit->seller->name : 'Unknown Shop',
                    'created_at' => $payment->created_at,
                ];
            });

        return response()->json([
            'payments' => $payments
        ]);
    }
}
