<?php

namespace App\Services;

use App\Models\Announcement;
use Illuminate\Database\Capsule\Manager as Capsule;


class AnnouncementService
{
    public function createAnnouncement($data, $user)
    {

        $lecturer = Capsule::table('lecturers')->where('user_id', $user['sub'])->first();
        if (!$lecturer) {
            return [
                'status' => 403,
                'message' => 'Lecturer not found'
            ];
        }
        // Validate required fields
        if (!isset($data['course_id']) || 
            !isset($data['title']) || !isset($data['message'])) {
            return [
                'status' => 400,
                'message' => 'Missing required fields'
            ];
        }

        try {
            $announcement = Announcement::create([
                'course_id' => $data['course_id'],
                'lecturer_id' => $lecturer->lecturer_id,
                'title' => $data['title'],
                'message' => $data['message'],
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ]);

            return [
                'status' => 201,
                'message' => 'Announcement created successfully',
                'data' => $announcement
            ];
        } catch (\Exception $e) {
            return [
                'status' => 500,
                'message' => 'Failed to create announcement',
                'error' => $e->getMessage()
            ];
        }
    }

    public function getAnnouncementsByCourse($course_id)
    {
        try {
            $announcements = Announcement::where('course_id', $course_id)->get();
            return [
                'status' => 200,
                'data' => $announcements
            ];
        } catch (\Exception $e) {
            return [
                'status' => 500,
                'message' => 'Failed to fetch announcements',
                'error' => $e->getMessage()
            ];
        }
    }

    public function deleteAnnouncement($id, $user)
    {
        // Ensure only lecturers can delete
        if ($user['role'] !== 'lecturer') {
            return false;
        }

        // Find course
        $announcement = Capsule::table('announcements')->where('an_id', $id)->first();
        if (!$announcement) {
            return false;
        }

        // Delete course
        Capsule::table('announcements')->where('an_id', $id)->delete();

        return true;
    }
}
