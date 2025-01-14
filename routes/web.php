<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ToolController;
use App\Models\Project;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $projects = Project::select('id', 'title', 'description', 'github', 'link', 'date')->with('tools')->get();
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'projects' => $projects
    ]);
})->name('welcome');

Route::get('/projeto/{id}', function ($id) {
    $project = Project::with('tools', 'projectImages')->findOrFail($id);
    return Inertia::render('ProjectDetail', ['project' => $project]);
})->name('project-detail');

Route::middleware(['auth', 'verified'])->group(function () {
    /*JEITO MAIS EXTENSO - VOU PELO EXTENSO SÓ PRA NÃO PERDER O COSTUME E PELA PERSONALIZAÇÃO MAIOR*/
    Route::get('/projetos', [ProjectController::class, 'index'])->name('project.index');
    Route::get('/projetos/criar', [ProjectController::class, 'create'])->name('project.create');
    Route::post('/projetos', [ProjectController::class, 'store'])->name('project.store');
    Route::get('/projetos/{project}/editar', [ProjectController::class, 'edit'])->name('project.edit');
    Route::patch('/projetos/{project}', [ProjectController::class, 'update'])->name('project.update');
    Route::delete('/projetos/{project}', [ProjectController::class, 'destroy'])->name('project.destroy');

    Route::get('/ferramentas', [ToolController::class, 'index'])->name('tool.index');
    Route::get('/ferramentas/criar', [ToolController::class, 'create'])->name('tool.create');
    Route::post('/ferramentas', [ToolController::class, 'store'])->name('tool.store');
    Route::get('/ferramentas/{tool}/editar', [ToolController::class, 'edit'])->name('tool.edit');
    Route::patch('/ferramentas/{tool}', [ToolController::class, 'update'])->name('tool.update');
    Route::delete('/ferramentas/{tool}', [ToolController::class, 'destroy'])->name('tool.destroy');
    /* JEITO MAIS OTIMIZADO
    Route::resource('projetos', ProjectController::class)->except(['show']);
    Route::resource('ferramentas', ToolController::class)->except(['show']); */
});

Route::middleware('auth')->group(function () {
    Route::get('/perfil', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/perfil', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/perfil', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
