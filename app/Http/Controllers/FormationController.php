<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FormationController extends Controller
{
    /**
     * Display a listing of the formations.
     */
    public function index()
    {
        $formations = Formation::all();
        // return response()->json($formations);
        return Inertia::render('NewPublications', [
            'formations' => $formations,  // Pass formations data to React component
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('public/formations');
            $validated['image'] = str_replace('public/', 'storage/', $path);
        }

        $formation = Formation::create($validated);

        // return response()->json([
        //     'message' => 'Formation created successfully',
        //     'formation' => $formation
        // ], 201);

        return redirect()->back()->with('success', 'Formation created successfully');

    }


    public function show(Formation $formation)
    {
        return response()->json($formation);
    }

    /**
     * Update the specified formation in storage.
     */
    public function update(Request $request, Formation $formation)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
            'date_creation' => 'sometimes|date',
        ]);

        // Handle file upload if new image is provided
        if ($request->hasFile('image')) {
            // Delete old image
            if ($formation->image) {
                $oldImagePath = str_replace('storage/', 'public/', $formation->image);
                Storage::delete($oldImagePath);
            }

            // Store new image
            $path = $request->file('image')->store('public/formations');
            $validated['image'] = str_replace('public/', 'storage/', $path);
        }

        $formation->update($validated);

        return response()->json([
            'message' => 'Formation updated successfully',
            'formation' => $formation
        ]);
    }

    /**
     * Remove the specified formation from storage.
     */
    public function destroy(Formation $formation)
    {
        // Delete associated image
        if ($formation->image) {
            $imagePath = str_replace('storage/', 'public/', $formation->image);
            Storage::delete($imagePath);
        }

        $formation->delete();

        return response()->json([
            'message' => 'Formation deleted successfully'
        ]);
    }

    /**
     * Get formations for select dropdown
     */
    public function getFormationsForSelect()
    {
        $formations = Formation::select('id', 'title')->get();
        return response()->json($formations);
    }
}