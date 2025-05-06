<?php
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FormationController;
use App\Http\Controllers\Publication\PublicationController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', function () {
    return Inertia::render('student/Home', [
        'layout' => 'student',
    ]);
});

// Route::get('/Dashboard', function () {
//     return Inertia::render('admin2/Dashboard');
// });




// --------------------------------------------------------------















// ----------------------------------------------

//SIGNUP & login

Route::get('/signup', function () {
    return Inertia::render('auth/Signup');
});
Route::post('/signup', [AuthController::class, 'signup']);


Route::get('/login', function () {
    if (Auth::check()) {
        return auth()->user()->role === 'admin' 
            ? redirect()->route('dashboard')
            : redirect()->route('student.dashboard');
    }

    return Inertia::render('auth/Login', [
        'layout' => 'minimal',
    ]);
})->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.post');

Route::post('/logout', [AuthController::class, 'logout'])->name('logout');


//----------------------------------------------


Route::post('/formations', [FormationController::class, 'store'])->name('formations.store');
Route::get('/formations', [FormationController::class, 'index'])->name('formations.index');

Route::post('/publications', [PublicationController::class, 'store'])->name('formations.store');


// Authenticated routes
Route::middleware('auth')->group(function () {

    Route::prefix('admin')->group(function () {
        
        //DASHBOARD
        Route::get('/dashboard', function () {
            return Inertia::render('admin_2/Dashboard');
        })->name('dashboard');
        
        //PUBLICATIONS
        Route::get('/publication', function () {
            return Inertia::render('Publication');
        })->name('publication'); 
        Route::get('publication/new', function () {
            return Inertia::render('admin_2/publications/NewPublications');
        })->name('newpublication');
        Route::get('publication/update', function () {
            return Inertia::render('admin_2/publications/UpdatePublications');
        })->name('updatePublications');

        //FOURMATIONS


        //USERS
        Route::get('/users', function () {
            return Inertia::render('Users');
        })->name('users'); 
        
        //BLOG
        Route::get('/blog', function () {
            return Inertia::render('Blog');
        })->name('blog'); 
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