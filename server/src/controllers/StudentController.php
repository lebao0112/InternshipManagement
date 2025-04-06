<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Services\StudentService;
use App\Services\StudentInternshipService;
class StudentController
{
    private $studentService;
    private $internshipService;
    public function __construct()
    {
        $this->studentService = new StudentService();
        $this->internshipService = new StudentInternshipService();
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

    public function getOwnInternship(Request $request, Response $response)
    {
        $user = $request->getAttribute('user');
        $result = $this->internshipService->getInternshipByUserId($user['sub']);

        if (isset($result['error'])) {
            $response->getBody()->write(json_encode(['error' => $result['error']]));
            return $response->withStatus($result['status'])->withHeader('Content-Type', 'application/json');
        }

        $response->getBody()->write(json_encode($result['data']));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    }

    public function updateOwnInternship(Request $request, Response $response)
    {
        $user = $request->getAttribute('user');
        $data = $request->getParsedBody();

        $result = $this->internshipService->updateInternshipByUserId($user['sub'], $data);

        if (isset($result['error'])) {
            $response->getBody()->write(json_encode(['error' => $result['error']]));
            return $response->withStatus($result['status'])->withHeader('Content-Type', 'application/json');
        }

        $response->getBody()->write(json_encode(['message' => $result['message']]));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    }

    

    public function uploadCV(Request $request, Response $response)
    {
        $user = $request->getAttribute('user');
        $cvFile = $request->getUploadedFiles()['cv'] ?? null;

        $service = new StudentInternshipService();
        $result = $service->uploadStudentCV($user['sub'], $cvFile);

        $response->getBody()->write(json_encode($result));

        return $response->withStatus($result['status'])->withHeader('Content-Type', 'application/json');
    }
}
