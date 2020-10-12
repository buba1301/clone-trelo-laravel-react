<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ListTask extends Model
{
    protected $fillable = [
        'name',
    ];

    public function creator()
    {
        return $this->belongsTo('App\BoardList');
    }
}
