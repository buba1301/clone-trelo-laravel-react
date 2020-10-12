<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    protected $fillable = [
        'name',
    ];

    public function creator()
    {
        return $this->belongsTo('App\User');
    }

    public function boardsUser()
    {
        return $this->hasMany('App\UserBoard');
    }

    public function members()
    {
        return $this->belongsToMany('App\User', 'user_boards');
    }

    public function lists()
    {
        return $this->hasMany('App\BoardList', 'board_id');
    }

    public function tasks()
    {
        return $this->hasManyThrough('App\ListTask', 'App\BoardList', 'board_id', 'list_id');
    }
}
