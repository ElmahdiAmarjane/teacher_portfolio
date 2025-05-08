<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class TrackVisits
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        // Skip tracking for:
        // 1. Admin routes
        // 2. API routes
        // 3. Non-GET requests
        if (str_starts_with($request->path(), 'admin') || 
            str_starts_with($request->path(), 'api') ||
            !$request->isMethod('get')) {
            return $next($request);
        }

        try {
            $now = Carbon::now();
            $sessionId = $request->session()->getId();

            // Use firstOrCreate to prevent race conditions
            Visit::firstOrCreate(
                [
                    'session_id' => $sessionId,
                    'visit_date' => $now->toDateString()
                ],
                [
                    'ip_address' => $request->ip(),
                    'visit_week' => $now->weekOfYear,
                    'visit_month' => $now->month,
                    'visit_year' => $now->year,
                ]
            );
        } catch (\Exception $e) {
            // Log error but don't interrupt the request
            \Log::error('Visit tracking failed: ' . $e->getMessage());
        }

        return $next($request);
    }
}
