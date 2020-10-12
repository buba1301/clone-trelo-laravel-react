<?php

namespace App\Http\Controllers;

use App\Board;
use App\BoardList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class BoardListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \App\Board  $board
     * @return \Illuminate\Http\Response
     */
    public function index(Board $board)
    {
      $lists = $board->lists;

      return response()->json(compact('lists', 201));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param  \App\Board  $board
     * @return \Illuminate\Http\Response
     */
    public function create(Board $board)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Board  $board
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Board $board)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $list = $board->lists()->make();
        $list->name = $request->get('name');
        $list->save();

        $lists = $board->lists;

        /* $allIds = $board->lists->pluck('id');

        $func = function($acc, $list) {
            $acc[$list['id']] = $list;
            return $acc;
        };

        $byId = array_reduce($lists, $func, []);

        $orderedLists = [
            'byId' => $byId,
            'allIds' => $allIds,
        ]; */

        return response()->json(compact('lists', 201));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Board  $board
     * @param  \App\BoardList  $boardList
     * @return \Illuminate\Http\Response
     */
    public function show(Board $board, BoardList $boardList)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Board  $board
     * @param  \App\BoardList  $boardList
     * @return \Illuminate\Http\Response
     */
    public function edit(Board $board, BoardList $boardList)
    {
        // return response()->json(compact('boardList', 201));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Board  $board
     * @param  \App\BoardList  $boardList
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Board $board, BoardList $list)
    {
        $list->name = $request->get('name');
        $list->save();

        $lists = $board->lists;
        return response()->json(compact('lists', 201));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Board  $board
     * @param  \App\BoardList  $boardList
     * @return \Illuminate\Http\Response
     */
    public function destroy(Board $board, BoardList $list)
    {
        $list->tasks()->delete();
        $list->delete();
        $lists = $board->lists; // связь с остальными пользователями, как удалить у них.
        return response()->json(compact('lists', 201));
    }
}
