<?php

use App\Http\Controllers\Api\v1\AuthController;
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

        /*
        |----------------------------------------------------------------------
        | Seller Routes
        |----------------------------------------------------------------------
        */
        Route::middleware('role:seller')->prefix('seller')->group(function () {
            // Consumers
            // Route::get('/consumers', [SellerConsumerController::class, 'index']);
            // Route::post('/consumers', [SellerConsumerController::class, 'store']);
            
            // Credits
            // Route::post('/credits', [SellerCreditController::class, 'store']);
            
            // Payments
            // Route::post('/payments', [SellerPaymentController::class, 'store']);
            
            // Stats
            // Route::get('/dashboard-stats', [SellerDashboardController::class, 'stats']);
        });

        /*
        |----------------------------------------------------------------------
        | Consumer Routes
        |----------------------------------------------------------------------
        */
        Route::middleware('role:consumer')->prefix('consumer')->group(function () {
            // My Credits
            // Route::get('/credits', [ConsumerCreditController::class, 'index']);
            
            // My History
            // Route::get('/payments', [ConsumerPaymentController::class, 'index']);
            
            // Dashboard
            // Route::get('/dashboard-stats', [ConsumerDashboardController::class, 'stats']);
        });

    });
});
