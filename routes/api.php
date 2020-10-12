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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/registrations', 'UserController@register')
  ->name('user.register');

Route::post('/login', 'UserController@authenticate');

Route::group(['middleware' => ['jwt.verify']], function () {
    Route::get('/user', 'UserController@getAuthenticatedUser');
    Route::apiResource('/lists.tasks', 'ListTaskController');
    Route::resource('/boards.lists', 'BoardListController');
    Route::resource('/boards', 'BoardController');

    Route::post('/addUserOnBoard', 'BoardController@addUserOnBoard');
});
