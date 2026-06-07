<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Consumer;
use App\Models\User;
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
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('cin', 'like', "%{$search}%");
            });
        }

        // Fetch consumers with their credits stats (only accepted/unpaid/partial/paid)
        $consumers = $query->with(['credits' => function($q) {
            $q->whereNotIn('status', ['pending', 'rejected']);
        }])->get()->map(function ($consumer) {
            $credits = $consumer->credits;
            
            $totalCreditsCount = $credits->count();
            $unpaidCreditsCount = $credits->whereNotIn('status', ['paid'])->count();
            $totalDebt = $credits->sum('remaining_amount');
            $totalPaid = $credits->sum('paid_amount');

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
                ]
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
}
