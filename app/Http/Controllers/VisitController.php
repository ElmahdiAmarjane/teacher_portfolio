<?php

namespace App\Http\Controllers;

use App\Models\Visit;
use Illuminate\Http\Request;

class VisitController extends Controller
{
    public function daily()
    {
        $data = Visit::selectRaw('visit_date as date, COUNT(DISTINCT session_id) as count')
            ->groupBy('visit_date')
            ->orderBy('visit_date', 'DESC')
            ->limit(30)
            ->get();
        
        return $this->handleResponse(['daily' => $data]);
    }

    public function weekly()
    {
        $data = Visit::selectRaw('CONCAT(visit_year, "-W", LPAD(visit_week, 2, "0")) as week, COUNT(DISTINCT session_id) as count')
            ->groupBy('visit_year', 'visit_week')
            ->orderBy('visit_year', 'DESC')
            ->orderBy('visit_week', 'DESC')
            ->limit(12)
            ->get();
        
        return $this->handleResponse(['weekly' => $data]);
    }

    public function monthly()
    {
        $data = Visit::selectRaw('CONCAT(visit_year, "-", LPAD(visit_month, 2, "0")) as month, COUNT(DISTINCT session_id) as count')
            ->groupBy('visit_year', 'visit_month')
            ->orderBy('visit_year', 'DESC')
            ->orderBy('visit_month', 'DESC')
            ->limit(12)
            ->get();

        return $this->handleResponse(['monthly' => $data]);
    }

    public function yearly()
    {
        $data = Visit::selectRaw('visit_year as year, COUNT(DISTINCT session_id) as count')
            ->groupBy('visit_year')
            ->orderBy('visit_year', 'DESC')
            ->limit(5)
            ->get();
        
        return $this->handleResponse(['yearly' => $data]);
    }

    /**
     * Handle both Inertia and JSON responses
     */
    protected function handleResponse(array $data)
    {
        if (request()->inertia()) {
            return inertia('Dashboard', $data);
        }

        return response()->json($data);
    }
}