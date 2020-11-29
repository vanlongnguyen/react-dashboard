<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
  public function showAllTasks($id)
  {
    $task = Task::where('user_id', $id)
                  ->orderBy('created_at', 'asc')
                  ->get();
      return $task->toJson();
  }
  public function create(Request $request)
  {
    $validatedData = $request->validate([
      'title' => 'required',
      'userId' => 'required'
      ]);

    $task = Task::create([
      'title' => $validatedData['title'],
      'user_id' => $validatedData['userId']
    ]);
    
    return $task->latest('id')->first();
  }
  
  public function markAsCompleted(Task $task)
  {
    $task->is_completed = true;
    $task->update();

    return response()->json('Task updated!');
  }

  public function delete($id)
  {
    Task::where('id', $id)->delete();

    return response()->json('Task deleted!');
  }

  public function updateTask(Request $request)
  {
    $validatedData = $request->validate(['title' => 'required']);
    $task = Task::find($request->id);
    $task->title = $validatedData['title'];
    $task->save();
    return response()->json('Task updated!');
  }
}
