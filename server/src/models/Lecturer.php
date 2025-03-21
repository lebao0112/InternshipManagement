<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lecturer extends Model
{
    protected $table = 'lecturers';
    protected $fillable = ['user_id', 'first_name', 'last_name', 'email', 'department'];
}
