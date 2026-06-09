<?php

use App\Http\Controllers\Api\v1\AuthController;
use App\Http\Controllers\Api\v1\SellerConsumerController;
use App\Http\Controllers\Api\v1\SellerCreditController;
use App\Http\Controllers\Api\v1\SellerPaymentController;
use App\Http\Controllers\Api\v1\SellerDashboardController;
use App\Http\Controllers\Api\v1\ConsumerCreditController;
use App\Http\Controllers\Api\v1\ConsumerPaymentController;
use App\Http\Controllers\Api\v1\ConsumerDashboardController;
use App\Http\Controllers\Api\v1\NotificationController;
use App\Http\Controllers\Api\v1\SellerPaymentRequestController;
use App\Http\Controllers\Api\v1\ConsumerPaymentRequestController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes - Version 1
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {
    
    // Public Routes
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    // Protected Routes
    Route::middleware('auth:sanctum')->group(function () {
        
        // Auth Management
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);

        // Notifications (Common)
        Route::get('/notifications', [NotificationController::class, 'index']);
        Route::patch('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
        Route::post('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);

        /*
        |----------------------------------------------------------------------
        | Seller Routes
        |----------------------------------------------------------------------
        |*/
        Route::middleware('role:seller')->prefix('seller')->group(function () {
            // Consumers
            Route::get('/consumers', [SellerConsumerController::class, 'index']);
            Route::post('/consumers', [SellerConsumerController::class, 'store']);
            Route::get('/consumers/{id}', [SellerConsumerController::class, 'show']);
            Route::put('/consumers/{id}', [SellerConsumerController::class, 'update']);
            Route::delete('/consumers/{id}', [SellerConsumerController::class, 'destroy']);
            
            // Credits
            Route::post('/credits', [SellerCreditController::class, 'store']);
            Route::get('/credits/{id}', [SellerCreditController::class, 'show']);
            Route::put('/credits/{id}', [SellerCreditController::class, 'update']);
            Route::delete('/credits/{id}', [SellerCreditController::class, 'destroy']);
            Route::get('/pending-credits', [SellerCreditController::class, 'pendingCredits']);
            
            // Payments
            Route::post('/payments', [SellerPaymentController::class, 'store']);
            Route::get('/payment-requests', [SellerPaymentRequestController::class, 'index']);
            Route::post('/payment-requests/{id}/approve', [SellerPaymentRequestController::class, 'approve']);
            Route::post('/payment-requests/{id}/reject', [SellerPaymentRequestController::class, 'reject']);
            
            // Stats
            Route::get('/dashboard-stats', [SellerDashboardController::class, 'stats']);
        });

        /*
        |----------------------------------------------------------------------
        | Consumer Routes
        |----------------------------------------------------------------------
        |*/
        Route::middleware('role:consumer')->prefix('consumer')->group(function () {
            // My Credits
            Route::get('/credits', [ConsumerCreditController::class, 'index']);
            Route::get('/pending-credits', [ConsumerCreditController::class, 'pendingCredits']);
            Route::post('/credits/{id}/accept', [ConsumerCreditController::class, 'accept']);
            Route::post('/credits/{id}/reject', [ConsumerCreditController::class, 'reject']);
            
            // My History
            Route::get('/payments', [ConsumerPaymentController::class, 'index']);
            Route::get('/payment-requests', [ConsumerPaymentRequestController::class, 'index']);
            Route::post('/payment-requests', [ConsumerPaymentRequestController::class, 'store']);
            
            // Dashboard
            Route::get('/dashboard-stats', [ConsumerDashboardController::class, 'stats']);
        });

    });
});

