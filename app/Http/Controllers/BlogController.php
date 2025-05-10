<?php
namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class BlogController extends Controller
{
    
public function index()
{
    $blogs = Blog::latest()->get(); // Or ->paginate(4) for pagination
    
    return Inertia::render('Admin/Blog', [
        'blogs' => $blogs,
    ]);
}
    // Afficher le formulaire de création
    public function create()
    {
        return Inertia::render('Blogs/Create');
    }
    
    // Stocker le nouveau blog
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);
    
        // Nettoyage du HTML si nécessaire (avec Purifier par exemple)
      //  $validated['content'] = Purifier::clean($validated['content']);
    
        Blog::create($validated);
    
        return redirect()->back()->with('success', 'Blog published successfully!');
    }
    
    // Supprimer un Blog (ID dans la requête)
    public function delete(Request $request)
    {
        // Validation des données
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:blogs,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Trouver et supprimer le blog
        $blog = Blog::find($request->id);
        $blog->delete();

        return response()->json(['message' => 'Blog deleted successfully']);
    }

    // Récupérer tous les blogs
    public function fetchAll()
    {
        $blogs = Blog::all(); // Récupérer tous les blogs
        return response()->json(['message' => 'Blogs fetched successfully', 'blogs' => $blogs]);
    }

    // Récupérer un blog spécifique par ID
    public function fetchById(Request $request)
    {
        // Validation de l'ID
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:blogs,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Trouver le blog
        $blog = Blog::find($request->id);
        return response()->json(['message' => 'Blog fetched successfully', 'blog' => $blog]);
    }

    public function update(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $blog->update($validated);

        return redirect()->route('admin.blog')->with('success', 'Blog updated successfully');
    }
}