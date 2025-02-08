<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Welcome api route
Route::get('/', fn() => ['message' => 'success']);

// Dashboard routes
Route::apiResource('/user', UserController::class);
