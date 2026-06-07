<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Credit;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConsumerDashboardController extends Controller
{
    /**
     * Get stats and summary data for the consumer dashboard.
     */
    public function stats(Request $request)
    {
        $user = Auth::user();
        $cleanPhone = preg_replace('/[^0-9]/', '', $user->phone);
        
        // Robust linking: Get all profiles matching User ID, Phone, or CIN
        $consumerIds = \App\Models\Consumer::where('user_id', $user->id)
            ->orWhere(function($query) use ($cleanPhone, $user) {
                if ($cleanPhone) {
                    $query->where('phone', 'LIKE', "%{$cleanPhone}%");
                }
                if ($user->cin) {
                    $query->orWhere('cin', $user->cin);
                }
            })
            ->pluck('id');

        if ($consumerIds->isEmpty()) {
            return response()->json([
                'message' => 'No active consumer profile is linked to this account.',
                'stats' => [
                    'total_remaining_debt' => 0.00,
                    'total_paid_amount' => 0.00,
                    'pending_credits_count' => 0,
                    'trust_score' => 50,
                    'debt_progress_percentage' => 100,
                    'next_due_date' => null,
                    'trust_analysis' => [
                        'status' => 'Stable',
                        'tips' => ["Complete your profile to start tracking your trust score."],
                        'factors' => []
                    ]
                ],
                'recent_credits' => [],
            ]);
        }

        // Fetch all credits for totals from all linked profiles (excluding pending/rejected)
        $credits = Credit::whereIn('consumer_id', $consumerIds)
            ->whereNotIn('status', ['pending', 'rejected'])
            ->get();
        
        $totalPaid = $credits->sum('paid_amount');
        $totalRemaining = $credits->sum('remaining_amount');
        $totalOverall = $totalPaid + $totalRemaining;

        // Count pending credits
        $pendingCount = Credit::whereIn('consumer_id', $consumerIds)
            ->where('status', 'pending')
            ->count();

        // Average trust score from all profiles
        $avgTrustScore = \App\Models\Consumer::whereIn('id', $consumerIds)->avg('trust_score') ?? 50;

        // Debt progress percentage
        $progress = 100;
        if ($totalOverall > 0) {
            $progress = round(($totalPaid / $totalOverall) * 100);
        }

        // Get the closest upcoming due date
        $nextDueDateRaw = Credit::whereIn('consumer_id', $consumerIds)
            ->whereIn('status', ['accepted', 'partial', 'unpaid'])
            ->whereNotNull('due_date')
            ->where('due_date', '>=', now()->toDateString())
            ->orderBy('due_date', 'asc')
            ->value('due_date');

        $nextDueDate = $nextDueDateRaw
            ? \Illuminate\Support\Carbon::parse($nextDueDateRaw)->toDateString()
            : null;

        // Recent Credits (last 3, including pending)
        $recentCredits = Credit::whereIn('consumer_id', $consumerIds)
            ->with(['seller:id,name'])
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get()
            ->map(function ($credit) {
                return [
                    'id' => $credit->id,
                    'product_name' => $credit->product_name,
                    'total_amount' => floatval($credit->total_amount),
                    'remaining_amount' => floatval($credit->remaining_amount),
                    'status' => $credit->status,
                    'due_date' => $credit->due_date?->toDateString(),
                    'seller_name' => $credit->seller ? $credit->seller->name : 'Unknown Shop',
                ];
            });

        // Analysis of Trust Score
        $trustAnalysis = [
            'status' => $avgTrustScore > 80 ? 'Excellent' : ($avgTrustScore > 60 ? 'Good' : 'Needs Improvement'),
            'tips' => [],
            'factors' => [
                ['label' => 'Payment On-Time', 'value' => 85, 'impact' => 'high'],
                ['label' => 'Credit Utilization', 'value' => 45, 'impact' => 'medium'],
            ]
        ];

        if ($avgTrustScore < 90) {
            $firstCredit = $recentCredits->first();
            $productName = $firstCredit ? (is_array($firstCredit) ? $firstCredit['product_name'] : $firstCredit->product_name) : 'your credit';
            $trustAnalysis['tips'][] = "Pay your upcoming credit for \"{$productName}\" before the due date to boost your score.";
            $trustAnalysis['tips'][] = "Keep your total debt below 5,000 DH to maintain a 'Good' status.";
        } else {
            $trustAnalysis['tips'][] = "You have an excellent trust score! This makes you a preferred customer for sellers.";
        }

        return response()->json([
            'stats' => [
                'total_remaining_debt' => floatval($totalRemaining),
                'total_paid_amount' => floatval($totalPaid),
                'pending_credits_count' => $pendingCount,
                'trust_score' => intval($avgTrustScore),
                'debt_progress_percentage' => floatval($progress),
                'next_due_date' => $nextDueDate,
                'trust_analysis' => $trustAnalysis,
            ],
            'recent_credits' => $recentCredits,
        ]);
    }
}
