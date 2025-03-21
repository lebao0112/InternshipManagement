<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InternshipDetail extends Model
{
    protected $table = 'internship_details';
    protected $fillable = ['student_id', 'course_id', 'company_name', 'company_address', 'industry', 'supervisor_name', 'supervisor_phone', 'supervisor_email', 'start_date', 'end_date', 'job_position', 'job_description', 'status', 'feedback'];
}
