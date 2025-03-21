<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InternshipCourse extends Model
{
    protected $table = 'internship_courses';
    protected $fillable = ['course_code', 'course_name', 'description', 'lecturer_id'];
}
