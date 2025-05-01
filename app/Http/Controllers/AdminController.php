<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\User;
use App\Models\Post; // Assuming you have a Post model for publications

class AdminController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('admin2/Dashboard');
    }
    
    public function users()
    {
        $users = User::all();
        return Inertia::render('Admin/Users', ['users' => $users]);
    }
    
    public function publications()
    {
        $posts = Post::all();
        return Inertia::render('Admin/Publications', ['publications' => $posts]);
    }
    
    public function reports()
    {
        // Add your reports logic here
        return Inertia::render('Admin/Reports');
    }
}