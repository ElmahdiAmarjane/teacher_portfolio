<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;



class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        // Authenticate user
        $request->authenticate();
        $request->session()->regenerate();

        // Get authenticated user
        $user = Auth::user();

        // Redirect based on role and verification status
        if ($user->role === 'admin') {
            return response()->json([
                'message' => 'Login successful',
                // 'redirect' => route('admin.dashboard'),
                'role' => 'admin'
            ], 200);
        }

        if ($user->role === 'user') {
            if ($user->is_verified) {
                return response()->json([
                    'message' => 'Login successful',
                    // 'redirect' => route('student.dashboard'),
                    'role' => 'user'
                ], 200);
            } else {
                return response()->json([
                    'message' => 'Your account is pending verification by the admin. Please wait.',
                    'redirect' => null,
                    'role' => 'user'
                ], 200);
            }
        }

        return response()->json([
            'message' => 'Invalid role or account issue.',
            'redirect' => null,
            'role' => null
        ], 400);

        // print("ee");
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logged out successfully',
            'redirect' => url('/')
        ]);
    }
}
