<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use App\Models\Tool;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::select('id', 'title', 'description', 'github', 'link', 'date')
            ->latest()
            ->with(['tools:id,name'])
            ->paginate(10)
            ->through(function ($project) {
                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'github' => $project->github,
                    'link' => $project->link,
                    'date' => $project->date,
                    'tools' => $project->tools->map(fn($tool) => [
                        'id' => $tool->id,
                        'name' => $tool->name
                    ])
                ];
            });

        return inertia('Admin/Project', ['projects' => $projects]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $tools = Tool::all();
        return inertia('Admin/Project/Create', ['tools' => $tools]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProjectRequest $request)
    {
        $request->validated();

        try {
            DB::beginTransaction();
            $project = Project::create([
                'title' => $request->title,
                'description' => $request->description,
                'github' => $request->github,
                'link' => $request->link,
                'date' => $request->date,
                'details' => $request->details,
            ]);

            $project->tools()->sync($request->tools);

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $extension = $image->getClientOriginalExtension();
                    $fileName = time() . '_' . Str::uuid() . '.' . $extension;
                    $path = $image->storeAs('projects', $fileName, 'public');
                    $project->projectImages()->create([
                        'path' => $path
                    ]);
                }
            }

            DB::commit();

            return redirect()->route('project.index');
        } catch (Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Erro ao criar projeto',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $project = Project::with('tools', 'projectImages')->findOrFail($id);
        $tools = Tool::all();
        return inertia('Admin/Project/Edit', ['project' => $project, 'tools' => $tools]);
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(ProjectRequest $request, string $id)
    {
        $request->validated();
        $project = Project::findOrFail($id);
        //dd($request);
        try {
            DB::beginTransaction();

            $project->update([
                'title' => $request->title,
                'description' => $request->description,
                'github' => $request->github,
                'link' => $request->link,
                'date' => $request->date,
                'details' => $request->details,
            ]);

            $project->tools()->sync($request->tools);

            if ($request->has('images_to_remove')) {
                foreach ($request->images_to_remove as $imageId) {
                    $image = $project->projectImages()->find($imageId);
                    if ($image) {
                        Storage::disk('public')->delete($image->path);
                        $image->delete();
                    }
                }
            }

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $extension = $image->getClientOriginalExtension();
                    $fileName = time() . '_' . Str::uuid() . '.' . $extension;
                    $path = $image->storeAs('projects', $fileName, 'public');

                    $project->projectImages()->create([
                        'path' => $path
                    ]);
                }
            }

            DB::commit();

            return redirect()->route('project.index');
        } catch (Exception $e) {
            DB::rollBack();

            return redirect()
                ->back()
                ->withInput()
                ->withErrors(['error' => 'Erro ao atualizar projeto: ' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $project = Project::findOrFail($id);

        try {
            foreach ($project->projectImages as $image) {
                Storage::disk('public')->delete($image->path);
            }

            $project->delete();
            return redirect()->route('project.index');

        } catch (Exception $e) {
            Log::error('Erro ao deletar projeto: ' . $e->getMessage());
            return back()->withErrors('Não foi possível excluir o projeto.');

        }
    }
    
}
