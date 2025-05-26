<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    // Fetch all users (excluding sensitive data)
    public function fetchAll()
    {
        $users = User::select('id', 'name', 'email', 'role', 'is_verified', 'created_at', 'updated_at')->get();
        return response()->json($users);
    }

    // Delete user by email
    public function deleteUserByEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if ($user) {
            $user->delete();
            return response()->json(['message' => 'User deleted successfully']);
        }

        return response()->json(['message' => 'User not found'], 404);
    }

    // Verify user by email
    public function verifyUserByEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if ($user) {
            $user->is_verified = 1;
            $user->save();
            return response()->json(['message' => 'User verified successfully']);
        }

        return response()->json(['message' => 'User not found'], 404);
    }

    // Unverify user by email
    public function unverifyUserByEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if ($user) {
            $user->is_verified = 0;
            $user->save();
            return response()->json(['message' => 'User unverified successfully']);
        }

        return response()->json(['message' => 'User not found'], 404);
    }

    public function getTotalUsers()
    {
        $total = User::count();
        
        return response()->json([
            'success' => true,
            'total_users' => $total
        ]);
    }

    public function getRecentUsers()
    {
        $users = User::latest()
            ->take(10)
            ->get(['id', 'name', 'email', 'created_at']);
    
        return response()->json([
            'success' => true,
            'users' => $users->map(function ($user) {
                return [
                    'name' => $user->name,
                    'email' => $user->email,
                    'date' => $user->created_at->format('F j, Y') // e.g., "May 15, 2023"
                ];
            })
        ]);
    }
    
}
