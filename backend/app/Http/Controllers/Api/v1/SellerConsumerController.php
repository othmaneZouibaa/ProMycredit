<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Consumer;
use App\Models\User;
use App\Models\Payment;
use App\Models\Credit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class SellerConsumerController extends Controller
{
    /**
     * Display a listing of the seller's consumers.
     */
    public function index(Request $request)
    {
        $sellerId = Auth::id();
        $query = Consumer::where('seller_id', $sellerId);

        // Optional Search filter (name, phone, or cin)
        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('cin', 'like', "%{$search}%");
            });
        }

        // Fetch consumers with their credits (all, not just accepted)
        $consumers = $query->with(['credits' => function($q) {
            $q->orderBy('created_at', 'desc');
        }])->get()->map(function ($consumer) {
            $credits = $consumer->credits;
            
            $totalCreditsCount = $credits->count();
            $activeCredits = $credits->whereNotIn('status', ['rejected']);
            $totalDebt = $activeCredits->sum('remaining_amount');
            $totalPaid = $activeCredits->sum('paid_amount');
            $unpaidCreditsCount = $activeCredits->whereNotIn('status', ['paid'])->count();

            return [
                'id' => $consumer->id,
                'user_id' => $consumer->user_id,
                'name' => $consumer->name,
                'phone' => $consumer->phone,
                'cin' => $consumer->cin,
                'address' => $consumer->address,
                'trust_score' => $consumer->trust_score,
                'created_at' => $consumer->created_at,
                'stats' => [
                    'total_credits_count' => $totalCreditsCount,
                    'unpaid_credits_count' => $unpaidCreditsCount,
                    'total_debt' => floatval($totalDebt),
                    'total_paid' => floatval($totalPaid),
                ],
                'credits' => $credits // Send all credits for display if needed
            ];
        });

        return response()->json([
            'consumers' => $consumers
        ]);
    }

    /**
     * Store a newly created consumer in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:50',
            'cin' => 'nullable|string|max:50',
            'address' => 'nullable|string|max:500',
            'trust_score' => 'nullable|integer|min:0|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $sellerId = Auth::id();

        // Check if there is already a consumer with this phone under the same seller
        if ($request->phone) {
            $existing = Consumer::where('seller_id', $sellerId)
                ->where('phone', $request->phone)
                ->first();
            if ($existing) {
                // Instead of error, return the existing consumer so the frontend can add a credit to them
                return response()->json([
                    'message' => 'Using existing consumer profile.',
                    'consumer' => $existing
                ], 200);
            }
        }

        // Try to find a Consumer User in the system with this phone number to auto-link
        $linkedUserId = null;
        if ($request->phone) {
            // Standardize phone match: strip spaces, etc.
            $cleanPhone = preg_replace('/[^0-9]/', '', $request->phone);
            $userMatch = User::where('role', 'consumer')->get()->first(function ($u) use ($cleanPhone) {
                if (!$u->phone) return false;
                return preg_replace('/[^0-9]/', '', $u->phone) === $cleanPhone;
            });
            if ($userMatch) {
                $linkedUserId = $userMatch->id;
            }
        }

        $consumer = Consumer::create([
            'seller_id' => $sellerId,
            'user_id' => $linkedUserId,
            'name' => $request->name,
            'phone' => $request->phone,
            'cin' => $request->cin,
            'address' => $request->address,
            'trust_score' => $request->trust_score ?? 50,
        ]);

        return response()->json([
            'message' => 'Consumer created successfully',
            'consumer' => $consumer
        ], 201);
    }

    /**
     * Display the specified consumer.
     */
    public function show($id)
    {
        $sellerId = Auth::id();
        $consumer = Consumer::where('id', $id)
            ->where('seller_id', $sellerId)
            ->with(['credits' => function($q) {
                $q->orderBy('created_at', 'desc');
            }])
            ->firstOrFail();

        // Get all payments through the consumer's credits, since Payment has credit_id
        $payments = Payment::whereHas('credit', function($q) use ($id) {
            $q->where('consumer_id', $id);
        })->orderBy('created_at', 'desc')->get();

        return response()->json([
            'consumer' => $consumer,
            'credits' => $consumer->credits,
            'payments' => $payments
        ]);
    }

    /**
     * Update the specified consumer in storage.
     */
    public function update(Request $request, $id)
    {
        $sellerId = Auth::id();
        $consumer = Consumer::where('id', $id)
            ->where('seller_id', $sellerId)
            ->firstOrFail();

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'phone' => 'nullable|string|max:50',
            'cin' => 'nullable|string|max:50',
            'address' => 'nullable|string|max:500',
            'trust_score' => 'nullable|integer|min:0|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $consumer->update($request->all());

        return response()->json([
            'message' => 'Consumer updated successfully',
            'consumer' => $consumer
        ]);
    }

    /**
     * Remove the specified consumer from storage.
     */
    public function destroy($id)
    {
        $sellerId = Auth::id();
        $consumer = Consumer::where('id', $id)
            ->where('seller_id', $sellerId)
            ->firstOrFail();

        $consumer->delete();

        return response()->json([
            'message' => 'Consumer deleted successfully'
        ]);
    }
}
