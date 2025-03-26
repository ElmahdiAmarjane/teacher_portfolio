<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Publication\PublicationController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Users\UsersController;




/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public routes (accessible without authentication)
Route::post('/register', [RegisteredUserController::class, 'store']);
// Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('login');
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);


//Publication Apis
Route::post('/publications/store', [PublicationController::class, 'store']);
Route::put('/publications/update', [PublicationController::class, 'update']); 
Route::delete('/publications/delete', [PublicationController::class, 'delete']);
Route::post('/publications/fetchByType', [PublicationController::class, 'fetchByType']);


//Users Managment
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/users', [UsersController::class, 'fetchAll']); // Fetch all users (Admin only)
    Route::post('/users/{userId}/verify', [UsersController::class, 'verifyUser']); // Verify user (Admin only)

    //USERS MANAGMENTS
    // Route::put('/users/{id}/verify', [UsersController::class, 'verifyUser']); // Verify a user
});

Route::get('/users', [UsersController::class, 'fetchAll']); // Fetch all users
Route::delete('/users/delete', [UsersController::class, 'deleteUserByEmail']);
Route::put('/users/unverify', [UsersController::class, 'unverifyUserByEmail']);
Route::put('/users/verify', [UsersController::class, 'verifyUserByEmail']);

