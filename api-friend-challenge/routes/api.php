<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Welcome api route
Route::get('/', fn() => ['message' => 'success']);

// Auth routes
Route::prefix('auth')->group(function () {
    // Public routes
    Route::post('/login', [AuthController::class, 'login'])->name("auth.login");
    Route::post('/register', [AuthController::class, 'register'])->name("auth.register");
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])->name("auth.forgot-password");

    // Authenticated routes
    Route::middleware("auth:sanctum")->group(function () {
        Route::post('/logout', [AuthController::class, 'logout'])->name("auth.logout");
        Route::post('/refresh', [AuthController::class, 'refresh'])->name("auth.refresh");
        Route::post('/recover', [AuthController::class, 'recover'])->name("auth.recover");
        Route::post('/me', [AuthController::class, 'me'])->name("auth.me");
    });
});

// Dashboard routes
Route::apiResource('/user', UserController::class);
