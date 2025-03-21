<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Services\StudentService;

class StudentController
{
    private $studentService;

    public function __construct()
    {
        $this->studentService = new StudentService();
    }

    public function importStudents(Request $request, Response $response)
    {
        $uploadedFiles = $request->getUploadedFiles();
        $data = $request->getParsedBody();
        // ✅ Validate if file is uploaded
        if (!isset($uploadedFiles['file']) || $uploadedFiles['file']->getError() !== UPLOAD_ERR_OK) {
            $response->getBody()->write(json_encode(["error" => "No file uploaded or upload failed"]));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        // ✅ Call StudentService to handle import logic
        $result = $this->studentService->importStudents($uploadedFiles['file'], $data);

        // ✅ Return response with correct status
        $response->getBody()->write(json_encode($result));
        return $response->withStatus($result['status'])->withHeader('Content-Type', 'application/json');
    }
}
