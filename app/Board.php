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
}
