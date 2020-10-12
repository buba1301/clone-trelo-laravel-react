<?php

namespace App\Http\Controllers;

use App\BoardList;
// use App\Http\Controllers;
use App\ListTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class ListTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \App\BoardList  $list
     * @return \Illuminate\Http\Response
     */
    public function index(BoardList $list)
    {
        $tasks = $list->tasks;
        return response()->json(compact('tasks', 201));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\BoardList  $boardList
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, BoardList $list)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $task = $list->tasks()->make();
        $task->name = $request->get('name');
        $task->save();

        $tasks = $list->tasks;

        return response()->json(compact('tasks', 201));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\BoardList  $boardList
     * @param  \App\ListTask  $listTask
     * @return \Illuminate\Http\Response
     */
    public function show(BoardList $boardList, ListTask $listTask)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\BoardList  $boardList
     * @param  \App\ListTask  $listTask
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BoardList $list, ListTask $task)
    {
        $task->name = $request->get('name');
        $task->save();

        $tasks = $list->tasks;

        return response()->json(compact('tasks', 201));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\BoardList  $boardList
     * @param  \App\ListTask  $listTask
     * @return \Illuminate\Http\Response
     */
    public function destroy(BoardList $list, ListTask $task)
    {
        $task->delete();

        $tasks = $list->tasks;

        return response()->json(compact('tasks', 201));
    }
}
