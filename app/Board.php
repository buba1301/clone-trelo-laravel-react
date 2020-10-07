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
}
