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
     * Display the specified credit.
     */
    public function show($id)
    {
        $sellerId = Auth::id();
        $credit = Credit::where('id', $id)
            ->where('seller_id', $sellerId)
            ->with(['consumer:id,name,phone,cin,address', 'payments'])
            ->firstOrFail();

        return response()->json([
            'credit' => $credit
        ]);
    }

    /**
     * Update the specified credit in storage.
     */
    public function update(Request $request, $id)
    {
        $sellerId = Auth::id();
        $credit = Credit::where('id', $id)
            ->where('seller_id', $sellerId)
            ->firstOrFail();

        // Only allow editing if not fully paid or if it's still pending
        if ($credit->status === 'paid') {
            return response()->json([
                'message' => 'Cannot edit a fully paid credit.'
            ], 422);
        }

        $validator = Validator::make($request->all(), [
            'product_name' => 'sometimes|required|string|max:255',
            'total_amount' => 'sometimes|required|numeric|min:0.01',
            'due_date' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->has('total_amount')) {
            // Recalculate remaining amount if total is changed
            $newTotal = $request->total_amount;
            if ($newTotal < $credit->paid_amount) {
                return response()->json([
                    'message' => 'New total amount cannot be less than the amount already paid.'
                ], 422);
            }
            $credit->total_amount = $newTotal;
            $credit->remaining_amount = $newTotal - $credit->paid_amount;
            
            // Update status based on remaining amount if it's already accepted
            if ($credit->status !== 'pending' && $credit->status !== 'rejected') {
                if ($credit->remaining_amount == 0) {
                    $credit->status = 'paid';
                } elseif ($credit->paid_amount > 0) {
                    $credit->status = 'partial';
                } else {
                    $credit->status = 'accepted';
                }
            }
        }

        if ($request->has('product_name')) {
            $credit->product_name = $request->product_name;
        }

        if ($request->has('due_date')) {
            $credit->due_date = $request->due_date;
        }

        $credit->save();

        return response()->json([
            'message' => 'Credit updated successfully',
            'credit' => $credit
        ]);
    }

    /**
     * Remove the specified credit from storage.
     */
    public function destroy($id)
    {
        $sellerId = Auth::id();
        $credit = Credit::where('id', $id)
            ->where('seller_id', $sellerId)
            ->firstOrFail();

        // Optional: Prevent deleting if there are payments attached
        if ($credit->payments()->count() > 0) {
            return response()->json([
                'message' => 'Cannot delete credit with existing payments. Delete payments first.'
            ], 422);
        }

        $credit->delete();

        return response()->json([
            'message' => 'Credit deleted successfully'
        ]);
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
