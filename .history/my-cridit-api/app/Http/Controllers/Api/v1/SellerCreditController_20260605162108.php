<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Consumer;
use App\Models\Credit;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class SellerCreditController extends Controller
{
    /**
     * Store a newly created credit.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'consumer_id' => 'required|exists:consumers,id',
            'product_name' => 'required|string|max:255',
            'total_amount' => 'required|numeric|min:0.01',
            'due_date' => 'nullable|date|after_or_equal:today',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $sellerId = Auth::id();

        // Ensure the consumer belongs to the authenticated seller
        $consumer = Consumer::where('id', $request->consumer_id)
            ->where('seller_id', $sellerId)
            ->first();

        if (!$consumer) {
            return response()->json([
                'message' => 'Unauthorized or consumer not found.'
            ], 403);
        }

        $credit = Credit::create([
            'consumer_id' => $consumer->id,
            'seller_id' => $sellerId,
            'product_name' => $request->product_name,
            'total_amount' => $request->total_amount,
            'paid_amount' => 0.00,
            'remaining_amount' => $request->total_amount,
            'status' => 'pending',
            'due_date' => $request->due_date,
        ]);

        // Send a notification to the consumer user if they have an active user account
        if ($consumer->user_id) {
            Notification::create([
                'user_id' => $consumer->user_id,
                'type' => 'credit_request',
                'title' => 'New Credit Request',
                'message' => "Seller " . Auth::user()->name . " has requested to add a credit of " . number_format($request->total_amount, 2) . " DH for \"{$request->product_name}\". Please accept or reject this request.",
                'is_read' => false,
            ]);
        }

        return response()->json([
            'message' => 'Credit request created and pending confirmation',
            'credit' => $credit
        ], 201);
    }

    /**
     * Get pending credits for the seller.
     */
    public function pendingCredits()
    {
        $sellerId = Auth::id();
        $credits = Credit::where('seller_id', $sellerId)
            ->where('status', 'pending')
            ->with('consumer:id,name,phone')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'credits' => $credits
        ]);
    }
}
