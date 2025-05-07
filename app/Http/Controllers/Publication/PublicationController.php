<?php

namespace App\Http\Controllers\Publication;

use App\Http\Controllers\Controller;
use App\Models\Publication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PublicationController extends Controller
{
    // Fetch all publications
    public function index()
    {
        $publications = Publication::all(); // or with pagination if needed
        return Inertia::render('Publication', [
            'publications' => $publications,
        ]);
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

        // return response()->json($publication, 201);
        return redirect()->back()->with('success', 'Publication created successfully');
    }

    // Show one
    public function show($id)
    {
        return Publication::findOrFail($id);
    }

    // Update publication
    public function update(Request $request, $id)
    {
        $publication = Publication::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string',
            'type' => 'sometimes|required|in:course,td,tp',
            'formation_id' => 'sometimes|required|exists:formations,id',
            'context' => 'nullable|string',
            'status' => 'sometimes|required|in:draft,published',
            'file' => 'nullable|file|mimes:pdf|max:20480',
        ]);

        if ($request->hasFile('file')) {
            // delete old file if exists
            if ($publication->file) {
                Storage::delete($publication->file);
            }
            $validated['file'] = $request->file('file')->store('publications');
        }

        $publication->update($validated);

        return response()->json($publication);
    }

    // Delete publication
    public function destroy($id)
    {
        $publication = Publication::findOrFail($id);

        if ($publication->file) {
            Storage::delete($publication->file);
        }

        $publication->delete();

        return response()->json(['message' => 'Publication deleted']);
    }
}
