<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Consumer;
use App\Models\Credit;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SellerDashboardController extends Controller
{
    /**
     * Get stats and overview details for the seller dashboard.
     */
    public function stats(Request $request)
    {
        $sellerId = Auth::id();

        // Count consumers
        $totalConsumers = Consumer::where('seller_id', $sellerId)->count();

        // Aggregate credit figures (excluding pending/rejected)
        $credits = Credit::where('seller_id', $sellerId)
            ->whereNotIn('status', ['pending', 'rejected'])
            ->get();
        $totalIssued = $credits->sum('total_amount');
        $totalPaid = $credits->sum('paid_amount');
        $totalUnpaid = $credits->sum('remaining_amount');

        // Active debtors count (consumers with remaining debt > 0, excluding pending/rejected)
        $activeDebtorsCount = Consumer::where('seller_id', $sellerId)
            ->whereHas('credits', function ($q) {
                $q->whereNotIn('status', ['pending', 'rejected'])
                  ->where('remaining_amount', '>', 0);
            })
            ->count();

        // Recent Credits (last 5)
        $recentCredits = Credit::where('seller_id', $sellerId)
            ->with(['consumer:id,name'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($credit) {
                return [
                    'id' => $credit->id,
                    'consumer_name' => $credit->consumer ? $credit->consumer->name : 'Unknown',
                    'product_name' => $credit->product_name,
                    'total_amount' => floatval($credit->total_amount),
                    'remaining_amount' => floatval($credit->remaining_amount),
                    'status' => $credit->status,
                    'created_at' => $credit->created_at,
                ];
            });

        // Recent Payments (last 5)
        $recentPayments = Payment::whereHas('credit', function ($q) use ($sellerId) {
                $q->where('seller_id', $sellerId);
            })
            ->with(['credit.consumer:id,name'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($payment) {
                return [
                    'id' => $payment->id,
                    'consumer_name' => ($payment->credit && $payment->credit->consumer) ? $payment->credit->consumer->name : 'Unknown',
                    'product_name' => $payment->credit ? $payment->credit->product_name : 'Unknown',
                    'amount' => floatval($payment->amount),
                    'payment_date' => $payment->payment_date,
                    'payment_method' => $payment->payment_method,
                    'confirmation_id' => $payment->confirmation_id,
                ];
            });

        return response()->json([
            'stats' => [
                'total_consumers' => $totalConsumers,
                'active_debtors' => $activeDebtorsCount,
                'total_issued_amount' => floatval($totalIssued),
                'total_collected_amount' => floatval($totalPaid),
                'total_unpaid_amount' => floatval($totalUnpaid),
            ],
            'recent_credits' => $recentCredits,
            'recent_payments' => $recentPayments,
        ]);
    }
}
