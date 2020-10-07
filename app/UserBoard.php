<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class UserBoard extends Model
{
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function board()
    {
        return $this->belongsTo('App\Board');
    }
}
