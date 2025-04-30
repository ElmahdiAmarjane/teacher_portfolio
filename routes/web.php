<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// Public routes
Route::get('/', function () {
    return Inertia::render('student/Home', [
        'layout' => 'student',
    ]);
});

Route::get('/signup', function () {
    return Inertia::render('Signup');
});

Route::get('/login', function () {
    if (Auth::check()) {
        return auth()->user()->role === 'admin' 
            ? redirect()->route('admin.dashboard')
            : redirect()->route('student.dashboard');
    }

    return Inertia::render('auth/Login', [
        'layout' => 'minimal',
    ]);
})->name('login');




Route::post('/login', [AuthController::class, 'login'])->name('login.post');

// Authenticated routes
Route::middleware('auth')->group(function () {
    // Student routes
    Route::prefix('student')->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('student/Dashboard', [
                'layout' => 'student',
            ]);
        })->name('student.dashboard');
    });

    // Admin routes
    Route::prefix('admin')->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('admin/Dashboard', [
                'layout' => 'admin',
            ]);
        })->name('admin.dashboard');

        Route::get('/pubs', function () {
            return Inertia::render('admin/Pubs', [
                'layout' => 'admin',
            ]);
        })->name('admin.pubs');

        Route::get('/users', function () {
            return Inertia::render('admin/Users', [
                'layout' => 'admin',
            ]);
        })->name('admin.users');

        Route::get('/blog', function () {
            return Inertia::render('admin/Blog', [
                'layout' => 'admin',
            ]);
        })->name('admin.blog');
    });

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// 404 Page
Route::fallback(function () {
    return Inertia::render('NotFound', [
        'layout' => 'minimal',
    ]);
});