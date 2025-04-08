<?php

namespace App\Services;

use Illuminate\Database\Capsule\Manager as Capsule;

class InternshipDetailService
{
    public function getAllInternships()
    {
        return Capsule::table('internship_details')->get();
    }

    public function getInternshipById($id)
    {
        return Capsule::table('internship_details')->where('internship_detail_id', $id)->join('students','students.student_id','=','internship_details.student_id')->first();
    }
    public function getStudentsByCourseId($courseId)
    {
        return Capsule::table('internship_details as a')
            ->join('students as b', 'a.student_id', '=', 'b.student_id')
            ->where('a.course_id', $courseId)
            ->select('a.internship_detail_id','b.student_id','b.student_code' ,'b.last_name', 'b.first_name', 'b.email', 'a.status')
            ->get();
    }
//  $userDetails = Capsule::table('users')
//             ->where('users.user_id', $user['sub'])
//             ->when($user['role'] === 'student', function ($query) {
//                 return $query->join('students', 'students.user_id', '=', 'users.user_id');
//             }, function ($query) {
//                 return $query->join('lecturers', 'lecturers.user_id', '=', 'users.user_id');
//             })
//             ->first();
    public function getInternshipByStudentId($studentId)
    {
        return Capsule::table('internship_details')
            ->join('students', 'students.student_id', '=', 'internship_details.student_id')
            ->where('internship_details.student_id', $studentId)
            ->select([
                'internship_details.*',
                'students.first_name',
                'students.last_name',
                'students.student_code',
                Capsule::raw("CONCAT(students.first_name, ' ', students.last_name) AS student_name")
            ])
            ->first();
    }

    public function updateStatus($internshipDetailId, $status)
    {
        if (!in_array($status, ['approved', 'rejected', 'pending'])) {
            return ['error' => 'Invalid status', 'status' => 400];
        }

        $updated = Capsule::table('internship_details')
            ->where('internship_detail_id', $internshipDetailId)
            ->update([
                'status' => $status,
                'updated_at' => date('Y-m-d H:i:s'),
            ]);

        if ($updated === 0) {
            return ['error' => 'No changes or student not found', 'status' => 400];
        }

        return ['message' => 'Status updated', 'status' => 200];
    }

    public function updateFeedback($internshipDetailId, $feedback)
    {
        $updated = Capsule::table('internship_details')
            ->where('internship_detail_id', $internshipDetailId)
            ->update([
                'feedback' => $feedback,
                'updated_at' => date('Y-m-d H:i:s'),
            ]);

        if ($updated === 0) {
            return ['error' => 'No changes or student not found', 'status' => 400];
        }

        return ['message' => 'Feedback updated', 'status' => 200];
    }

    public function createInternship($data, $user)
    {
        // Only lecturers can create internships
        if ($user['role'] !== 'lecturer') {
            return ["error" => "Forbidden", "status" => 403];
        }

        // Insert new internship record
        $internshipId = Capsule::table('internship_details')->insertGetId([
            'student_id' => $data['student_id'],
            'course_id' => $data['course_id'],
            'company_name' => $data['company_name'],
            'company_address' => $data['company_address'],
            'industry' => $data['industry'],
            'supervisor_name' => $data['supervisor_name'],
            'supervisor_phone' => $data['supervisor_phone'],
            'supervisor_email' => $data['supervisor_email'],
            'start_date' => $data['start_date'],
            'end_date' => $data['end_date'],
            'job_position' => $data['job_position'],
            'job_description' => $data['job_description'],
            'status' => $data['status'] ?? 'pending',
            'feedback' => $data['feedback'] ?? null,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]);

        return ["message" => "Internship created successfully", "internship_id" => $internshipId, "status" => 201];
    }

    public function updateInternship($id, $data, $user)
    {
        // Only lecturers can update
        if ($user['role'] !== 'lecturer') {
            return ["error" => "Forbidden", "status" => 403];
        }

        // Check if internship exists
        $internship = Capsule::table('internship_details')->where('id', $id)->first();
        if (!$internship) {
            return ["error" => "Internship not found", "status" => 404];
        }

        // Update internship details
        Capsule::table('internship_details')->where('id', $id)->update([
            'student_id' => $data['student_id'],
            'course_id' => $data['course_id'],
            'company_name' => $data['company_name'],
            'company_address' => $data['company_address'],
            'industry' => $data['industry'],
            'supervisor_name' => $data['supervisor_name'],
            'supervisor_phone' => $data['supervisor_phone'],
            'supervisor_email' => $data['supervisor_email'],
            'start_date' => $data['start_date'],
            'end_date' => $data['end_date'],
            'job_position' => $data['job_position'],
            'job_description' => $data['job_description'],
            'status' => $data['status'],
            'feedback' => $data['feedback'],
            'updated_at' => date('Y-m-d H:i:s')
        ]);

        return ["message" => "Internship updated successfully", "status" => 200];
    }

    public function deleteInternship($id, $user)
    {
        // Only lecturers can delete
        if ($user['role'] !== 'lecturer') {
            return ["error" => "Forbidden", "status" => 403];
        }

        // Check if internship exists
        $internship = Capsule::table('internship_details')->where('id', $id)->first();
        if (!$internship) {
            return ["error" => "Internship not found", "status" => 404];
        }

        // Delete internship record
        Capsule::table('internship_details')->where('id', $id)->delete();

        return ["message" => "Internship deleted successfully", "status" => 200];
    }
}
