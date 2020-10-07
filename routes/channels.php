<?php

use Illuminate\Support\Facades\Broadcast;
use App\Board;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

/* Broadcast::channel('App.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});*/
// ['middleware' => ['web', 'auth']
// Broadcast::routes(['middleware' => ['auth.api']]);
// \App\Broadcasting\BoardChannel::class
Broadcast::channel('board.{board_id}', \App\Broadcasting\BoardChannel::class);
