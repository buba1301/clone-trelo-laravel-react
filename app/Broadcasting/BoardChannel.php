<?php

namespace App\Broadcasting;

use App\User;
use App\Board;

class BoardChannel
{
    /**
     * Create a new channel instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Authenticate the user's access to the channel.
     *
     * @param  \App\User  $user
     * @return array|bool
     */
    public function join(User $user, int $board_id)
    {
        $board = Board::find($board_id);
        $members = $board->members;
        $lists = $board->lists;
        $tasks = $board->tasks;
        return [$board, $members, $lists, $tasks];
    }
}
