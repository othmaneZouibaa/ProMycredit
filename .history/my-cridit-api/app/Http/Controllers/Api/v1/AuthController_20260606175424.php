<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Consumer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Register a new user.
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:seller,consumer',
            'phone' => 'nullable|string',
            'cin' => 'nullable|string',
            'address' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'phone' => $request->phone,
            'cin' => $request->cin,
            'address' => $request->address,
        ]);

        // Automatic Profile Linking for Consumers
        if ($user->role === 'consumer') {
            $cleanPhone = preg_replace('/[^0-9]/', '', $user->phone);
            $cleanCin = strtoupper(trim($user->cin));

            $query = Consumer::whereNull('user_id');

            if ($cleanPhone && $cleanCin) {
                $query->where(function($q) use ($cleanPhone, $cleanCin) {
                    $q->where('phone', 'LIKE', "%{$cleanPhone}%")
                      ->orWhere('cin', $cleanCin);
                });
            } elseif ($cleanPhone) {
                $query->where('phone', 'LIKE', "%{$cleanPhone}%");
            } elseif ($cleanCin) {
                $query->where('cin', $cleanCin);
            }

            // Link ALL matching existing profiles to the new user account
            $query->update(['user_id' => $user->id]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    /**
     * Login user and create token.
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
            'role' => 'nullable|in:seller,consumer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid login credentials'
            ], 401);
        }

        if ($request->filled('role') && $user->role !== $request->role) {
            return response()->json([
                'message' => 'Invalid login credentials for the selected account type.',
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    /**
     * Logout user (Revoke token).
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    /**
     * Get authenticated user.
     */
    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}
