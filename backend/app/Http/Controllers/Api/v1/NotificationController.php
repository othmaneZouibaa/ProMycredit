<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    /**
     * Display a listing of the user's notifications.
     */
    public function index(Request $request)
    {
        $userId = Auth::id();

        $notifications = Notification::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'notifications' => $notifications
        ]);
    }

    /**
     * Mark a notification as read.
     */
    public function markAsRead(Request $request, $id)
    {
        $userId = Auth::id();

        $notification = Notification::where('id', $id)
            ->where('user_id', $userId)
            ->first();

        if (!$notification) {
            return response()->json([
                'message' => 'Notification not found or unauthorized.'
            ], 404);
        }

        $notification->is_read = true;
        $notification->save();

        return response()->json([
            'message' => 'Notification marked as read successfully.',
            'notification' => $notification
        ]);
    }

    /**
     * Mark all notifications as read.
     */
    public function markAllAsRead(Request $request)
    {
        $userId = Auth::id();

        Notification::where('user_id', $userId)
            ->where('is_read', false)
            ->update(['is_read' => true]);

        return response()->json([
            'message' => 'All notifications marked as read.'
        ]);
    }
}
