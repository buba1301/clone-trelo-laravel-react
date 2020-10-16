<?php

namespace App\Http\Controllers;

use App\Events\AddUserOnBoard;
use App\Board;
use App\User;
use App\UserBoard;
use Illuminate\Http\Request;

class BoardUserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \App\Board  $board
     * @return \Illuminate\Http\Response
     */
    public function index(Board $board)
    {
        //
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
        $email = $request->get('email');
        $id = $board->id;

        $messageUserNotFound = [
            'email' => 'User not found',

        ];

        if (!User::where('email', '=', $email)->exists()) {
            return response()->json($messageUserNotFound, 401);
        };

        $user = User::where('email', $email)->get()[0];
        // $board = Board::find($id);

        $membersArray = $board->members->toArray();

        $func = function ($value) {
            return $value['email'];
        };

        $emails = array_map($func, $membersArray);

        $messageUserWasAdded = [
            'email' => 'User already added. Clear form and try again',
        ];

        if (in_array($email, $emails)) {
            return response()->json($messageUserWasAdded, 401);
        }

        $boardUser = $user->userBoards()->make();
        $boardUser->board_id = $id;
        $boardUser->save();

        $board = Board::find($id);

        $members = $board->members;

        broadcast(new AddUserOnBoard($board));

        return response()->json(compact('members', 'boardUser'), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Board  $board
     * @param  \App\UserBoard  $userBoard
     * @return \Illuminate\Http\Response
     */
    public function show(Board $board, UserBoard $userBoard)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Board  $board
     * @param  \App\UserBoard  $userBoard
     * @return \Illuminate\Http\Response
     */
    public function edit(Board $board, UserBoard $userBoard)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Board  $board
     * @param  \App\UserBoard  $userBoard
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Board $board, UserBoard $userBoard)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Board  $board
     * @param  \App\UserBoard  $userBoard
     * @return \Illuminate\Http\Response
     */
    public function destroy(Board $board, UserBoard $userBoard)
    {
        //
    }
}
