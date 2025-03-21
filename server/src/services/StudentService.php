<?php

namespace App\Services;

use Illuminate\Database\Capsule\Manager as Capsule;
use PhpOffice\PhpSpreadsheet\IOFactory;

class StudentService
{
    public function importStudents($file, $data)
    {
        // ✅ Ensure upload directory exists
        $uploadDir = __DIR__ . '/../../uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        // ✅ Move file to uploads directory
        $filePath = $uploadDir . basename($file->getClientFilename());
        $file->moveTo($filePath);

        try {
            // ✅ Start Database Transaction
            Capsule::beginTransaction();

            // Read Excel file
            $spreadsheet = IOFactory::load($filePath);
            $sheet = $spreadsheet->getActiveSheet();
            $rows = $sheet->toArray();

            // Skip the header row
            array_shift($rows);
            $insertCount = 0;

            foreach ($rows as $row) {
                // ✅ Validate required fields
                if (empty($row[0]) || empty($row[1]) || empty($row[2])) {
                    continue;
                }

                $studentCode = trim($row[0]);
                $firstName = trim($row[1]);
                $lastName = trim($row[2]);
                $phone = trim($row[3] ?? '');
                $email = trim($row[4] ?? '');
                $major = trim($row[5] ?? '');
                $dob = !empty($row[6]) ? date('Y-m-d', strtotime($row[6])) : null;
                $classCode = trim($row[7] ?? '');

                // ✅ Check if the student already exists
                $student = Capsule::table('students')->where('student_code', $studentCode)->first();

                if ($student) {
                    try {
                        Capsule::table('internship_details')->insert([
                            'student_id' => $student->student_id,
                            'course_id' => $data['course_id'],
                            'created_at' => date('Y-m-d H:i:s'),
                            'updated_at' => date('Y-m-d H:i:s')
                        ]);
                    } catch (\Exception $e) {
                        error_log("Error adding existing student to internship: " . $e->getMessage());
                    }
                    continue;
                }

                // ✅ Create user account (username = student_code, password = hashed student_code)
                $hashedPassword = password_hash($studentCode, PASSWORD_DEFAULT);
                $userId = Capsule::table('users')->insertGetId([
                    'username' => $studentCode,
                    'password' => $hashedPassword,
                    'role' => 'student',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s')
                ]);

                // ✅ Insert student record
                $studentId = Capsule::table('students')->insertGetId([
                    'user_id' => $userId,
                    'student_code' => $studentCode,
                    'first_name'   => $firstName,
                    'last_name'    => $lastName,
                    'phone'        => $phone,
                    'email'        => $email,
                    'major'        => $major,
                    'dob'          => $dob,
                    'class_code'   => $classCode,
                    'created_at'   => date('Y-m-d H:i:s'),
                    'updated_at'   => date('Y-m-d H:i:s')
                ]);

                // ✅ Insert into internship_details
                Capsule::table('internship_details')->insert([
                    'student_id' => $studentId,
                    'course_id' => $data['course_id'],
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s')
                ]);

                $insertCount++;
            }

            // ✅ Commit Transaction
            Capsule::commit();

            // ✅ Delete file after processing
            unlink($filePath);

            return ["message" => "$insertCount students added successfully", "status" => 201];
        } catch (\Exception $e) {
            // ✅ Rollback transaction on failure
            Capsule::rollback();

            error_log("Error importing students: " . $e->getMessage());

            return ["error" => "Failed to import students", "details" => $e->getMessage(), "status" => 500];
        }
    }
}
