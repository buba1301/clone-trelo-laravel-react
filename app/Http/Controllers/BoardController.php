<?php

namespace App\Http\Controllers;

use App\Events\AddUserOnBoard;
use App\Board;
use App\User;
use App\UserBoard;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class BoardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = JWTAuth::parseToken()->authenticate();

        $boards = $user->ownedBoards;

        return response()->json($boards, 201);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = JWTAuth::parseToken()->authenticate(); // это надо выносить в отдельный файл, разобраться с мидлварами, это в двух контроллерах одновременно

        try {

            if (!$user) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

            return response()->json(['token_expired'], 401);
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

            return response()->json(['token_invalid'], 401);
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

            return response()->json(['token_absent'], $e->getStatusCode());
        }

        $board = $user->ownedBoards()->make();
        $board->name = $request->get('name');
        $board->save();

        $id = $board->id;
        $boardUser = $board->boardsUser()->make();
        $boardUser->user_id = $user->id;
        $boardUser->save();

        return response()->json(compact('board'), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Board  $board
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $board = Board::find($id);

        return response()->json(compact('board'), 201);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Board  $board
     * @return \Illuminate\Http\Response
     */
    public function edit(Board $board)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Board  $board
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Board $board)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Board  $board
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $board = Board::find($id);
        $board->boardsUser()->delete();
        $board->delete();

        return response('Ok', 200);
    }

    /*
      метод join будет выбирать доску по id и оставлять канал открытым для изменений
     */

    public function addUserOnBoard(Request $request)
    {
        $id = $request->get('board_id');
        $email = $request->get('email');

        $messageUserNotFound = [
            'email' => 'User not found',

        ];

        if (!User::where('email', '=', $email)->exists()) {
            return response()->json($messageUserNotFound, 401);
        };

        $user = User::where('email', $email)->get()[0];
        $board = Board::find($id);

        $members = $board->members->toArray();

        $func = function($value) {
            return $value['email'];
        };

        $emails = array_map($func, $members);

        $messageUserWasAdded = [
            'email' => 'User already added. Clear form and try again',
        ];

        if (in_array($email, $emails)) {
            return response()->json($messageUserWasAdded, 401);
        }

        $boardUser = $user->userBoards()->make();
        $boardUser->board_id = $request->get('board_id');
        $boardUser->save();

        broadcast(new AddUserOnBoard($board));

        return response()->json(compact('members'), 201);
    }
}
