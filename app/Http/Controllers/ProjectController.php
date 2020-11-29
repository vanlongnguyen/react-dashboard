<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;


class ProjectController extends Controller
{
    public function index() {
        $projects = Project::orderBy('created_at', 'desc')->get();
        return $projects->toJson();
    }

    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);

        $project = Project::create([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
        ]);

        return response()->json('Project created!');
    }
    public function showAllTasks()
    {
        $task = Task::orderBy('created_at', 'desc')->get();
        // $project = Project::with(['tasks' => function ($query) {
        //     $query->orderBy('id', 'asc');
        // }])->find($id);
   
        return $task->toJson();
    }

    public function markAsCompleted(Project $project)
    {
        $project->is_completed = true;
        $project->update();

        return response()->json('Project updated!');
    }
}
