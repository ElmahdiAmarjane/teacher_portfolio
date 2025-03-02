<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Home');
// });


// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });


   // Student Pages (With Header & Footer)
   Route::get('/', function () {
    return Inertia::render('student/Home', [
        'layout' => 'student', // Pass the layout name as a prop
    ]);
});

Route::get('/signup', function () {
    return Inertia::render('Signup');
});

// Route::get('/home', function () {
//     return Inertia::render('Home');
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/auth.php';

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
 
    
    // Admin Pages (With Sidebar)
    Route::prefix('admin')->group(function () {
        Route::get('/', function () {
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

});


// ADD ROUTES 

// Minimal Pages (No Sidebar, No Header/Footer)
// Route::get('/login', function () {
//     return Inertia::render('auth/Login', [
//         'layout' => 'minimal', // Pass the layout name as a prop
//     ]);
// });

// 404 Page (Minimal Layout)
Route::fallback(function () {
    return Inertia::render('NotFound', [
        'layout' => 'minimal', // Pass the layout name as a prop
    ]);
});



