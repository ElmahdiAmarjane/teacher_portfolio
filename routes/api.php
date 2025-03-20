<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Publication\PublicationController;

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

Route::post('/signup', [AuthController::class, 'signup']);

//Publication Apis
Route::post('/publications/store', [PublicationController::class, 'store']);
Route::put('/publications/update', [PublicationController::class, 'update']); 
Route::delete('/publications/delete', [PublicationController::class, 'delete']);
Route::post('/publications/fetchByType', [PublicationController::class, 'fetchByType']);

