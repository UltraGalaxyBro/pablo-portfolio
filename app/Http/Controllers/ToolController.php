<?php

namespace App\Http\Controllers;

use App\Models\Tool;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ToolController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tools = Tool::withCount('projects')->latest()->paginate(10);
        return inertia('Admin/Tool', ['tools' => $tools]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Admin/Tool/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|unique:tools,name'
        ], [
            'name.required' => 'Preencha um nome para a ferramenta que está criando.',
            'name.unique' => 'Já existe uma ferramenta com este nome.'
        ]);
        //dd($request);
        Tool::create($fields);
        return redirect()->route('tool.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $tool = Tool::findOrFail($id);
        return inertia('Admin/Tool/Edit', ['tool' => $tool]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $fields = $request->validate([
            'name' => [
                'required',
                Rule::unique('tools')->ignore($id)
            ]
        ], [
            'name.required' => 'Preencha um nome para a ferramenta que está editando.',
            'name.unique' => 'Já existe uma ferramenta com este nome.'
        ]);

        $tool = Tool::findOrFail($id);
        $tool->update($fields);

        return redirect()->route('tool.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tool = Tool::findOrFail($id);
        $tool->delete();

        return redirect()->back();
    }
}
