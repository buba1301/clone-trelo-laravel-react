<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BoardList extends Model
{
    protected $fillable = [
        'name',
    ];

    public function creator()
    {
        return $this->belongsTo('App\Board');
    }

    public function tasks()
    {
        return $this->hasMany('App\ListTask', 'list_id');
    }

}
