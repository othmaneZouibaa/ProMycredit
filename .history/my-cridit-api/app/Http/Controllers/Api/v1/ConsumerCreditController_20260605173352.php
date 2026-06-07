<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Credit;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConsumerCreditController extends Controller
{
    /**
     * Get list of credits for the authenticated consumer.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        // Get all consumer profile IDs linked to this user's phone or CIN
        $cleanPhone = preg_replace('/[^0-9]/', '', $user->phone);
        $consumerIds = Consumer::where('user_id', $user->id)
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
                'credits' => []
            ]);
        }

        $credits = Credit::whereIn('consumer_id', $consumerIds)
            ->whereIn('status', ['accepted', 'partial', 'paid', 'unpaid'])
            ->with(['seller:id,name,phone'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($credit) {
                return [
                    'id' => $credit->id,
                    'product_name' => $credit->product_name,
                    'total_amount' => floatval($credit->total_amount),
                    'paid_amount' => floatval($credit->paid_amount),
                    'remaining_amount' => floatval($credit->remaining_amount),
                    'status' => $credit->status,
                    'due_date' => $credit->due_date,
                    'seller' => [
                        'name' => $credit->seller ? $credit->seller->name : 'Unknown Shop',
                        'phone' => $credit->seller ? $credit->seller->phone : '',
                    ],
                    'created_at' => $credit->created_at,
                ];
            });

        return response()->json([
            'credits' => $credits
        ]);
    }

    /**
     * Get pending credit requests for the authenticated consumer.
     */
    public function pendingCredits()
    {
        $user = Auth::user();
        $cleanPhone = preg_replace('/[^0-9]/', '', $user->phone);
        
        $consumerIds = Consumer::where('user_id', $user->id)
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
            return response()->json(['credits' => []]);
        }

        $credits = Credit::whereIn('consumer_id', $consumerIds)
            ->where('status', 'pending')
            ->with(['seller:id,name,phone'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'credits' => $credits
        ]);
    }

    /**
     * Accept a pending credit request.
     */
    public function accept($id)
    {
        $user = Auth::user();
        $consumer = $user->consumerProfile;

        $credit = Credit::where('id', $id)
            ->where('consumer_id', $consumer->id)
            ->where('status', 'pending')
            ->firstOrFail();

        $credit->status = 'accepted';
        $credit->save();

        // Notify seller
        Notification::create([
            'user_id' => $credit->seller_id,
            'type' => 'credit_accepted',
            'title' => 'Credit Request Accepted',
            'message' => "Consumer {$user->name} has accepted the credit request for \"{$credit->product_name}\".",
            'is_read' => false,
        ]);

        return response()->json([
            'message' => 'Credit request accepted successfully',
            'credit' => $credit
        ]);
    }

    /**
     * Reject a pending credit request.
     */
    public function reject($id)
    {
        $user = Auth::user();
        $consumer = $user->consumerProfile;

        $credit = Credit::where('id', $id)
            ->where('consumer_id', $consumer->id)
            ->where('status', 'pending')
            ->firstOrFail();

        $credit->status = 'rejected';
        $credit->save();

        // Notify seller
        Notification::create([
            'user_id' => $credit->seller_id,
            'type' => 'credit_rejected',
            'title' => 'Credit Request Rejected',
            'message' => "Consumer {$user->name} has rejected the credit request for \"{$credit->product_name}\".",
            'is_read' => false,
        ]);

        return response()->json([
            'message' => 'Credit request rejected successfully',
            'credit' => $credit
        ]);
    }
}
