<?php

namespace App\Http\Controllers\Publication;

use App\Http\Controllers\Controller;
use App\Models\Publication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class PublicationController extends Controller
{
    // Fetch all publications
    public function index()
    {
        return Publication::all();
    }

    // Store new publication
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'type' => 'required|in:course,td,tp',
            'formation_id' => 'required|exists:formations,id',
            'context' => 'nullable|string',
            'status' => 'required|in:draft,published',
            'file' => 'nullable|file|mimes:pdf|max:20480',
        ]);

        if ($request->hasFile('file')) {
            $validated['file'] = $request->file('file')->store('publications');
        }

        $publication = Publication::create($validated);

        return redirect()->route('newpublication')
        ->with('success', 'Publication created successfully!');
    }

    // Show one
    public function fetchById(Request $request)
{
    $request->validate([
        'id' => 'required|integer|exists:publications,id'
    ]);

    $publication = Publication::find($request->id);

    return response()->json([
        'success' => true,
        'publication' => $publication
    ]);
}

    // Update publication
    public function update(Request $request)
{
    $request->validate([
        'id' => 'required|exists:publications,id',
        'title' => 'required|string',
        'type' => 'required|in:course,td,tp',
        'formation_id' => 'required|exists:formations,id',
        'context' => 'nullable|string',
        'status' => 'required|in:draft,published',
        'file' => 'nullable|file|mimes:pdf|max:20480',
    ]);

    $publication = Publication::findOrFail($request->id);

    $data = $request->except('file', 'id');
    
    if ($request->hasFile('file')) {
        if ($publication->file) {
            Storage::delete($publication->file);
        }
        $data['file'] = $request->file('file')->store('publications');
    }

    $publication->update($data);

    return response()->json([
        'success' => true,
        'message' => 'Publication updated successfully',
        'publication' => $publication
    ]);
}

    // Delete publication
    public function destroy(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:publications,id'
        ]);
    
        $publication = Publication::findOrFail($request->id);
    
        if ($publication->file) {
            Storage::delete($publication->file);
        }
    
        $publication->delete();
    
        return response()->json([
            'success' => true,
            'message' => 'Publication deleted successfully'
        ]);
    }


    public function getTotalPublications()
    {
        $total = Publication::count();
        
        return response()->json([
            'success' => true,
            'total_publications' => $total
        ]);
    }

    public function getThisWeekPublications()
    {
        $startOfWeek = Carbon::now()->startOfWeek();
        $endOfWeek = Carbon::now()->endOfWeek();

        $count = Publication::whereBetween('created_at', [$startOfWeek, $endOfWeek])
            ->count();
            
        return response()->json([
            'success' => true,
            'this_week_publications' => $count
        ]);
    }

    public function getPublicationPublished()
{
    $startOfWeek = Carbon::now()->startOfWeek();
    $endOfWeek = Carbon::now()->endOfWeek();

    $total = Publication::where('status', 'published')->count();

    $thisWeek = Publication::where('status', 'published')
        ->whereBetween('created_at', [$startOfWeek, $endOfWeek])
        ->count();

    return response()->json([
        'success' => true,
        'published_publications' => $total,
    ]);
}


// Add this method to your PublicationController
public function getRecentPublications()
{
    $publications = Publication::latest()
        ->take(5)
        ->get(['id', 'title', 'type', 'status', 'created_at']);

    return response()->json([
        'success' => true,
        'publications' => $publications->map(function ($pub) {
            return [
                'title' => $pub->title,
                'type' => $pub->type,
                'status' => $pub->status,
                'date' => $pub->created_at->format('F j, Y') // Format as "May 15, 2023"
            ];
        })
    ]);
}
}
