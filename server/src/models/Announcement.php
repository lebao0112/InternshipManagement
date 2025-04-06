<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
    {
    protected $table = 'announcements';
    protected $fillable = ['an_id', 'course_id', 'lecturer_id', 'title', 'message', 'created_at', 'updated_at'];

}
