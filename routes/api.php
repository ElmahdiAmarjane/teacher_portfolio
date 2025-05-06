<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FormationController;
use App\Http\Controllers\Publication\PublicationController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Users\UsersController;

// Public routes
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

// Publication APIs
// Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/publications/store', [PublicationController::class, 'store']);
    Route::get('/publications/index', [PublicationController::class, 'index']);

    Route::put('/publications/update', [PublicationController::class, 'update']); 
    Route::delete('/publications/delete', [PublicationController::class, 'delete']);
    Route::post('/publications/fetchByType', [PublicationController::class, 'fetchByType']);
// });

// Users Management (Admin only)
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/users', [UsersController::class, 'fetchAll']);
    Route::post('/users/{userId}/verify', [UsersController::class, 'verifyUser']);
    Route::delete('/users/delete', [UsersController::class, 'deleteUserByEmail']);
    Route::put('/users/unverify', [UsersController::class, 'unverifyUserByEmail']);
    Route::put('/users/verify', [UsersController::class, 'verifyUserByEmail']);
});

//FOURMATIONS
Route::post('/addFormation', [FormationController::class, 'store']);
Route::get('/fetchFormation', [FormationController::class, 'index']);
