<?php

namespace App\Services;

use Illuminate\Database\Capsule\Manager as Capsule;

class InternshipCourseService
{
    public function getAllCourses()
    {
        return Capsule::table('internship_courses')->get();
    }

    public function getCourseById($id)
    {
        return Capsule::table('internship_courses')->where('course_id', $id)->first();
    }

    public function createCourse($data, $user)
    {
        // Ensure only lecturers can create courses
        if ($user['role'] !== 'lecturer') {
            return ['error' => 'Forbidden', 'status' => 403];
        }

        // Get lecturer_id based on user_id
        $lecturer = Capsule::table('lecturers')->where('user_id', $user['sub'])->first();
        if (!$lecturer) {
            return ['error' => 'Lecturer not found', 'status' => 403];
        }

        // Insert new course
        $courseId = Capsule::table('internship_courses')->insertGetId([
            'course_code' => $this->generateRandomCode(),
            'course_name' => $data['course_name'],
            'description' => $data['description'],
            'lecturer_id' => $lecturer->lecturer_id,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

        return ['message' => 'Course created successfully', 'course_id' => $courseId, 'status' => 201];
    }

    public function updateCourse($id, $data, $user)
    {
        // Ensure only lecturers can update
        if ($user['role'] !== 'lecturer') {
            return ['error' => 'Forbidden', 'status' => 403];
        }

        // Find course
        $course = Capsule::table('internship_courses')->where('course_id', $id)->first();
        if (!$course) {
            return ['error' => 'Course not found', 'status' => 404];
        }

        // Update course
        Capsule::table('internship_courses')->where('course_id', $id)->update([
            'course_code' => $data['course_code'],
            'course_name' => $data['course_name'],
            'description' => $data['description'],
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

        return ['message' => 'Course updated successfully', 'status' => 200];
    }

    public function deleteCourse($id, $user)
    {
        // Ensure only lecturers can delete
        if ($user['role'] !== 'lecturer') {
            return ['error' => 'Forbidden', 'status' => 403];
        }

        // Find course
        $course = Capsule::table('internship_courses')->where('course_id', $id)->first();
        if (!$course) {
            return ['error' => 'Course not found', 'status' => 404];
        }

        // Delete course
        Capsule::table('internship_courses')->where('course_id', $id)->delete();

        return ['message' => 'Course deleted successfully', 'status' => 200];
    }

    private function generateRandomCode()
    {
        $timestampPart = strtoupper(base_convert(time(), 10, 36));

        $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $randomPart = '';

        while (strlen($randomPart) + strlen($timestampPart) < 20) {
            $randomPart .= $characters[rand(0, strlen($characters) - 1)];
        }

        return substr($timestampPart . $randomPart, 0, 20);
    }
}
