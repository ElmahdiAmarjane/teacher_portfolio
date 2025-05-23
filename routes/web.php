<?php
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FormationController;
use App\Http\Controllers\Publication\PublicationController;
use App\Http\Controllers\Users\UsersController;
use Illuminate\Http\Request; 
use App\Http\Controllers\VisitController;
use App\Models\Blog;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BlogController;

// Public routes
Route::get('/', function () {
    return Inertia::render('student/Home', [
        'layout' => 'student',
    ]);
});

// Route::get('/Dashboard', function () {
//     return Inertia::render('admin2/Dashboard');
// });


Route::get('/projects', function () {
    return Inertia::render('student/Projects', [
        'layout' => 'student', // Pass the layout name as a prop
    ]);
});
Route::get('/contact', function () {
    return Inertia::render('student/Contact', [
        'layout' => 'student', // Pass the layout name as a prop
    ]);
});


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
            : redirect()->route('dashboard');
    }

    return Inertia::render('auth/Login', [
        'layout' => 'minimal',
    ]);
})->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.post');

Route::post('/logout', [AuthController::class, 'logout'])->name('logout');


//----------------------------------------------




Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/admin/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');

    // If you prefer controller-based API routes in web.php
    // Route::prefix('admin')->group(function () {
    //     Route::get('/visits/daily', [VisitController::class, 'daily']);
    //     Route::get('/visits/weekly', [VisitController::class, 'weekly']);
    //     Route::get('/visits/monthly', [VisitController::class, 'monthly']);
    //     Route::get('/visits/yearly', [VisitController::class, 'yearly']);
    // });
});

 Route::post('/admin/blogs', [BlogController::class, 'store'])->name('admin.blogs.store');
// routes/web.php
use App\Models\Formation;

Route::get('/formation', function () {
    return Inertia::render('student/Projects');
})->name('formation');

Route::get('/formations', function () {
    return Inertia::render('student/Projects', [
        //'formations' => Formation::all() ,
        'layout' => 'student', // Pass the layout name as a prop
    ]);
});

//////////////////:
use App\Http\Controllers\ContactController;

Route::post('/contact', [ContactController::class, 'send']);


//////////////////

//Route::get('/formations', [FormationController::class, 'index']);


// Route::get('/formation/detail', function () {
//     return Inertia::render('admin_2/formations/FormationDetails');
// })->name('formationDetails');

Route::get('/formations/{id}', [FormationController::class, 'show']);


// Authenticated routes
Route::middleware('auth')->group(function () {

    Route::prefix('admin')->group(function () {
        //CHARTS
      
       
        //DASHBOARD
        Route::get('/dashboard', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');
        
        //PUBLICATIONS
        Route::get('/publication', function () {
            return Inertia::render('Publication',[
                'layout'=>'admin'
            ]);
        })->name('publication'); 
        Route::get('/publication/fetch-all', [PublicationController::class, 'index'])->name('publication.index');

        
        Route::prefix('publications')->group(function () {
            // New publication form
            Route::get('/new', function () {
                return Inertia::render('admin_2/publications/NewPublications',
                 [
                    'layout'=>'admin'
                 ]
            );
            })->name('newpublication');
        
            // Update publication form - single route with optional ID
            Route::get('/update', function (Request $request) {
                return Inertia::render('admin_2/publications/UpdatePublications', [
                    'id' => $request->query('id'),
                    'layout'=>'admin'
                ]);
            })->name('updatePublications');
        
            // Remove the duplicate route you had:
            // Route::get('publication/update', ...) 
        });
        Route::post('/publications', [PublicationController::class, 'store'])->name('publications.store');
        Route::get('/publications', [PublicationController::class, 'index'])->name('publications.index');
///////////::


Route::get('/formation', function () {
            return Inertia::render('Formation',
              ['layout'=>'admin']
        );
        })->name('formation');
        
        Route::get('/detail', function (Request $request) {
            return Inertia::render('admin_2/formations/FormationDetails', [
                'id_formation' => $request->query('id_formation'),
                'layout'=>'admin'

            ]);
        })->name('formationDetails');

 Route::get('/formations', [FormationController::class, 'index'])->name('formations.index');

Route::post('/formations', [FormationController::class, 'store'])->name('formations.store');




////////////////

        //USERS
        Route::get('/users', fn() => Inertia::render('Users'))->name('users');
        Route::get('/users/fetch', [UsersController::class, 'fetchAll'])->name('users.fetchAll');
        Route::post('/users/delete', [UsersController::class, 'deleteUserByEmail'])->name('users.delete');
        Route::delete('/users', [UsersController::class, 'deleteUserByEmail']);
        Route::post('/users/verify', [UsersController::class, 'verifyUserByEmail'])->name('users.verify');

        // Unverify a user
        Route::post('/users/unverify', [UsersController::class, 'unverifyUserByEmail'])->name('users.unverify');
                
        //BLOG
        // Route::get('/blog', function () {
        //     return Inertia::render('Blog');
        // })->name('blog'); 

        //  Route::get('/blogAdmin', [BlogController::class, 'index'])->name('admin.blog');

     Route::get('/blog', function () {
        $blogs = Blog::latest()->get(); // Récupération des blogs
        return Inertia::render('Blog', [
            'layout' => 'admin',
            'blogs' => $blogs, // On les envoie ici
        ]);
    })->name('blog');
    });

  

        // Add this delete route
    Route::delete('/blog/{blog}', function (Blog $blog) {
        $blog->delete();
        return redirect()->route('blog')->with('success', 'Blog deleted successfully');
    })->name('admin.blog.destroy');

    // Show edit form (GET)
    Route::get('/blog/{blog}/edit', function (Blog $blog) {
    return Inertia::render('Blogs/BlogEdit', [
        'layout' => 'admin',
        'blog' => $blog,
    ]);
    })->name('admin.blog.edit');

    // Handle update (PUT)
    Route::put('/blog/{blog}', [BlogController::class, 'update'])->name('admin.blog.update');















    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});





// 👇 JSON API route
Route::get('/api/formations', [FormationController::class, 'index'])->name('api.formations.index');

// 👇 Inertia page route
Route::get('/formations', function () {
    return Inertia::render('student/Projects', [
        'layout' => 'student',
    ]);
})->name('formations.index');



// 404 Page
Route::fallback(function () {
    return Inertia::render('NotFound', [
        'layout' => 'minimal',
    ]);
});