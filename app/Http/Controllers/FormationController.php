<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class FormationController extends Controller
{
    /**
     * Display a listing of the formations.
     */
    // public function index()
    // {
    //     try {
    //         $formations = Formation::all();
    //         return response()->json([
    //             'success' => true,
    //             'data' => $formations
    //         ]);
    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Failed to fetch formations',
    //             'error' => $e->getMessage()
    //         ], 500);
    //     }
    // }

    public function index()
{
    $formations = Formation::all();

    return Inertia::render('Formations', [
        'formations' => $formations
    ]);
}

    /**
     * Store a newly created formation in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $validated = $validator->validated();
            
            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('public/formations');
                $validated['image'] = Storage::url($path); // Utilise Storage::url pour générer l'URL correcte
            }

            $formation = Formation::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Formation created successfully',
                'data' => $formation
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create formation',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified formation.
     */
    // public function show(Formation $formation)
    // {
    //     try {
    //         return response()->json([
    //             'success' => true,
    //             'data' => $formation
    //         ]);
    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Failed to fetch formation',
    //             'error' => $e->getMessage()
    //         ], 500);
    //     }
    // }
    // public function show($id)
    // {
    //     $formation = Formation::findOrFail($id);
    //     return Inertia::render('student/FormationDetail', [
    //         'formation' => $formation,
    //         'layout' => 'student', // Pass the layout name as a prop
    //     ]);
    // }
    public function show($id)
{
    $formation = Formation::findOrFail($id);
    
    // Charger les publications associées avec une relation
    $formation->load(['publications' => function($query) {
        $query->orderBy('type')->orderBy('created_at');
    }]);
    
    // Alternative: Récupérer les publications séparément
    // $publications = Publication::where('formation_id', $id)
    //     ->orderBy('type')
    //     ->orderBy('created_at')
    //     ->get();
    
    return Inertia::render('student/FormationDetail', [
        'formation' => $formation,
        // 'publications' => $publications, // Si vous utilisez l'alternative
        'layout' => 'student',
    ]);
}
    
    /**
     * Update the specified formation in storage.
     */
    public function update(Request $request, Formation $formation)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'date_creation' => 'sometimes|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $validated = $validator->validated();

            // Handle file upload if new image is provided
            if ($request->hasFile('image')) {
                // Delete old image
                if ($formation->image) {
                    $oldImagePath = str_replace(Storage::url(''), '', $formation->image);
                    Storage::delete($oldImagePath);
                }

                // Store new image
                $path = $request->file('image')->store('public/formations');
                $validated['image'] = Storage::url($path);
            }

            $formation->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Formation updated successfully',
                'data' => $formation
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update formation',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified formation from storage.
     */
    public function destroyById(Request $request)
{
    $request->validate([
        'id' => 'required|integer|exists:formations,id'
    ]);

    try {
        $formation = Formation::findOrFail($request->id);

        // Delete associated image
        if ($formation->image) {
            $imagePath = str_replace(Storage::url(''), '', $formation->image);
            Storage::delete($imagePath);
        }

        $formation->delete();

        return response()->json([
            'success' => true,
            'message' => 'Formation deleted successfully'
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to delete formation',
            'error' => $e->getMessage()
        ], 500);
    }
}


    /**
     * Get formations for select dropdown
     */
    public function getFormationsForSelect()
    {
        try {
            $formations = Formation::select('id', 'title')->get();
            return response()->json([
                'success' => true,
                'data' => $formations
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch formations for select',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getTotalFormation()
    {
        $total = Formation::count();
        
        return response()->json([
            'success' => true,
            'total_formations' => $total
        ]);
    }
}