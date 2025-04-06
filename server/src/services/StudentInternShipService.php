<?php

namespace App\Services;

use Illuminate\Database\Capsule\Manager as Capsule;

class StudentInternshipService
{
    public function getInternshipByUserId($userId)
    {
        $student = Capsule::table('students')->where('user_id', $userId)->first();
        if (!$student) {
            return ['error' => 'Student not found', 'status' => 404];
        }

        $internship = Capsule::table('internship_details')
            ->join('internship_courses', 'internship_details.course_id', '=', 'internship_courses.course_id')
            ->join('lecturers', 'internship_courses.lecturer_id', '=', 'lecturers.lecturer_id')
            ->select(
                'internship_details.*',
                Capsule::raw("CONCAT(lecturers.first_name, ' ', lecturers.last_name) AS lecturer_name")
            )
            ->where('internship_details.student_id', $student->student_id)
            ->first();

        if (!$internship) {
            return ['error' => 'Internship not found', 'status' => 404];
        }

        return ['data' => $internship, 'status' => 200];
    }

    public function updateInternshipByUserId($userId, $data)
    {
        $student = Capsule::table('students')->where('user_id', $userId)->first();
        if (!$student) {
            return ['error' => 'Student not found', 'status' => 404];
        }

        Capsule::table('internship_details')->where('student_id', $student->student_id)->update([
            'company_name' => $data['company_name'],
            'company_address' => $data['company_address'],
            'industry' => $data['industry'],
            'supervisor_name' => $data['supervisor_name'],
            'supervisor_phone' => $data['supervisor_phone'],
            'supervisor_email' => $data['supervisor_email'],
            'job_position' => $data['job_position'],
            'job_description' => $data['job_description'],
            'updated_at' => date('Y-m-d H:i:s')
        ]);

        return ['message' => 'Internship info updated', 'status' => 200];
    }


    public function uploadStudentCV($userId, $cvFile)
    {
        // Tìm student theo user_id
        $student = Capsule::table('students')->where('user_id', $userId)->first();
        if (!$student) {
            return ['error' => 'Student not found', 'status' => 404];
        }

        if (!$cvFile || $cvFile->getError() !== UPLOAD_ERR_OK) {
            return ['error' => 'Invalid CV file', 'status' => 400];
        }

        // Lấy cv_file cũ (nếu có)
        $internship = Capsule::table('internship_details')->where('student_id', $student->student_id)->first();
        $oldCvPath = $internship?->cv_file;

        // Tạo thư mục nếu chưa có
        $uploadDir = __DIR__ . '/../../public/uploads/cv/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        // Tạo tên file mới
        $filename = 'cv_' . $student->student_id . '_' . time() . '.pdf';
        $filepath = $uploadDir . $filename;
        $relativePath = 'uploads/cv/' . $filename;

        // ✅ Xóa CV cũ nếu tồn tại
        if ($oldCvPath) {
            $oldAbsolutePath = __DIR__ . '/../../public/' . $oldCvPath;
            if (file_exists($oldAbsolutePath)) {
                unlink($oldAbsolutePath);
            }
        }

        // Lưu file mới
        $cvFile->moveTo($filepath);

        // Cập nhật DB
        Capsule::table('internship_details')
            ->where('student_id', $student->student_id)
            ->update([
                'cv_file' => $relativePath,
                'updated_at' => date('Y-m-d H:i:s')
            ]);

        return ['message' => 'CV uploaded successfully', 'file' => $relativePath, 'status' => 200];
    }
}
