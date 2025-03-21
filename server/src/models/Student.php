<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $table = 'students';
    protected $fillable = ['user_id', 'student_code', 'first_name', 'last_name', 'phone', 'email', 'major', 'dob', 'class_code'];
}
