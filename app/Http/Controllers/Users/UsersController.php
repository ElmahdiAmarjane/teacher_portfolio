<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function fetchAll()
    {
        // Fetch all users, excluding sensitive data like password
        $users = User::select('id', 'name', 'email', 'role', 'is_verified', 'created_at', 'updated_at')->get();

        return response()->json($users);
    }

    // Delete user by email from the request body
    public function deleteUserByEmail(Request $request)
    {
        $email = $request->input('email'); // Get email from request body
        
        // Find user by email
        $user = User::where('email', $email)->first();

        if ($user) {
            $user->delete(); // Delete user
            return response()->json(['message' => 'User deleted successfully']);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }
    //Verifed
    public function verifyUserByEmail(Request $request)
    {
        $email = $request->input('email'); // Get email from request body

        // Find user by email
        $user = User::where('email', $email)->first();

        if ($user) {
            $user->is_verified = 1; // Unverify user
            $user->save();
            return response()->json(['message' => 'User verfied successfully']);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    //Un_Verifed
    public function unverifyUserByEmail(Request $request)
    {
        $email = $request->input('email'); // Get email from request body

        // Find user by email
        $user = User::where('email', $email)->first();

        if ($user) {
            $user->is_verified = 0; // Unverify user
            $user->save();
            return response()->json(['message' => 'User unverfied successfully']);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }
}
