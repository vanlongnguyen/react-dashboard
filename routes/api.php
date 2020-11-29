<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', 'App\Http\Controllers\AuthController@auth');
Route::get('tasks/{id}', 'App\Http\Controllers\TaskController@showAllTasks');
Route::post('tasks/create', 'App\Http\Controllers\TaskController@create');
Route::put('tasks/{task}', 'App\Http\Controllers\TaskController@markAsCompleted');
Route::put('tasks/update/{task}', 'App\Http\Controllers\TaskController@updateTask');
Route::delete('tasks/delete/{task}', 'App\Http\Controllers\TaskController@delete');
