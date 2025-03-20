<?php
namespace App\Http\Controllers\Publication;

use App\Models\Publication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class PublicationController extends Controller
{
    // Add Publication
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'files' => 'nullable|array',
            'files.*' => 'file|mimes:jpg,jpeg,png,pdf,docx|max:2048',
            'type' => 'required|in:TD,TP,COUR,ANNONCES'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $filesPath = [];
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $path = $file->store('publications', 'public');
                $filesPath[] = $path;
            }
        }

        $publication = Publication::create([
            'title' => $request->title,
            'description' => $request->description,
            'files' => json_encode($filesPath), // Store files as JSON
            'type' => $request->type,
        ]);

        return response()->json(['message' => 'Publication created successfully', 'publication' => $publication], 201);
    }

    // Update Publication (ID from request)
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:publications,id',
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'type' => 'sometimes|in:TD,TP,COUR,ANNONCES'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $publication = Publication::find($request->id);
        $publication->update($request->only(['title', 'description', 'publie_at', 'type']));

        return response()->json(['message' => 'Publication updated successfully', 'publication' => $publication]);
    }

    // Delete Publication (ID from request)
    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:publications,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $publication = Publication::find($request->id);

        // Delete associated files
        if ($publication->files) {
            foreach (json_decode($publication->files, true) as $file) {
                $filePath = public_path('uploads/' . $file);
                if (file_exists($filePath)) {
                    unlink($filePath);
                }
            }
        }

        $publication->delete();

        return response()->json(['message' => 'Publication deleted successfully']);
    }

    // Fetch Publications by Type or All
    public function fetchByType(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'type' => 'required|in:TD,TP,COUR,ANNONCES,All', // Include 'All' as a valid option
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $type = $request->type;
        
        // If the type is 'All', fetch all publications
        if ($type === 'All') {
            $publications = Publication::all();
        } else {
            // Fetch publications where type matches the requested type
            $publications = Publication::where('type', $type)->get();
        }

        return response()->json([
            'message' => 'Publications fetched successfully',
            'publications' => $publications
        ]);
    }

}