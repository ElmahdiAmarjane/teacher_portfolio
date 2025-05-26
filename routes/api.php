<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FormationController;
use App\Http\Controllers\Publication\PublicationController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Users\UsersController;
use App\Http\Controllers\VisitController;

// Public routes
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

// Publication APIs
// Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/publications/store', [PublicationController::class, 'store']);
    Route::get('/publications/index', [PublicationController::class, 'index']);
    Route::delete('/publications/delete', [PublicationController::class, 'destroy']);
    Route::post('/publications/fetchById', [PublicationController::class, 'fetchById']);
    Route::post('/publications/update', [PublicationController::class, 'update']);
    Route::get('/publications/getTotalPublications', [PublicationController::class, 'getTotalPublications']);
    Route::get('/publications/getThisWeekPublications', [PublicationController::class, 'getThisWeekPublications']);
    Route::get('/publications/getPublicationPublished', [PublicationController::class, 'getPublicationPublished']);
    Route::get('/publications/getRecentPublications', [PublicationController::class, 'getRecentPublications']);
    Route::post('/publications/getPublicationsByFormation', [PublicationController::class, 'getPublicationsByFormation']);

// });

// Users Management (Admin only)
// Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/users', [UsersController::class, 'fetchAll']);
    Route::post('/users/{userId}/verify', [UsersController::class, 'verifyUser']);
    Route::post('/users/delete', [UsersController::class, 'deleteUserByEmail']);
    Route::post('/users/unverify', [UsersController::class, 'unverifyUserByEmail']);
    Route::post('/users/verify', [UsersController::class, 'verifyUserByEmail']);
    Route::get('/users/getTotalUsers', [UsersController::class, 'getTotalUsers']);
    Route::get('/users/getRecentUsers', [UsersController::class, 'getRecentUsers']);
// });

//FOURMATIONS
// FORMATIONS
Route::post('/addFormation', [FormationController::class, 'store']);
Route::get('/fetchFormation', [FormationController::class, 'index']);
Route::get('/formations/getTotalFormation', [FormationController::class, 'getTotalFormation']);

// ✅ Separate update and delete routes
Route::post('/formations/delete', [FormationController::class, 'destroyById']);
Route::post('/formations/update', [FormationController::class, 'update']);



Route::middleware(['auth:sanctum'])->group(function () {
    // Daily visits
    Route::get('/visits/daily', function (Request $request) {
        $data = Visit::selectRaw('visit_date as date, COUNT(DISTINCT session_id) as count')
            ->groupBy('visit_date')
            ->orderBy('visit_date', 'DESC')
            ->limit(30)
            ->get();
        
        return response()->json(['daily' => $data]);
    });

    // Weekly visits
    Route::get('/visits/weekly', function (Request $request) {
        $data = Visit::selectRaw('CONCAT(visit_year, "-W", LPAD(visit_week, 2, "0")) as week, COUNT(DISTINCT session_id) as count')
            ->groupBy('visit_year', 'visit_week')
            ->orderBy('visit_year', 'DESC')
            ->orderBy('visit_week', 'DESC')
            ->limit(12)
            ->get();
        
        return response()->json(['weekly' => $data]);
    });

    // Monthly visits
    Route::get('/visits/monthly', function (Request $request) {
        $data = Visit::selectRaw('CONCAT(visit_year, "-", LPAD(visit_month, 2, "0")) as month, COUNT(DISTINCT session_id) as count')
            ->groupBy('visit_year', 'visit_month')
            ->orderBy('visit_year', 'DESC')
            ->orderBy('visit_month', 'DESC')
            ->limit(12)
            ->get();
        
        return response()->json(['monthly' => $data]);
    });

    // Yearly visits
    Route::get('/visits/yearly', function (Request $request) {
        $data = Visit::selectRaw('visit_year as year, COUNT(DISTINCT session_id) as count')
            ->groupBy('visit_year')
            ->orderBy('visit_year', 'DESC')
            ->limit(5)
            ->get();
        
        return response()->json(['yearly' => $data]);
    });
});