<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Services\InternshipDetailService;

class InternshipDetailController
{
    private $internshipService;

    public function __construct()
    {
        $this->internshipService = new InternshipDetailService();
    }

    public function getAll(Request $request, Response $response)
    {
        $internships = $this->internshipService->getAllInternships();
        $response->getBody()->write(json_encode($internships));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function getById(Request $request, Response $response, $args)
    {
        $internship = $this->internshipService->getInternshipById($args['id']);

        if (!$internship) {
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json')
                ->getBody()->write(json_encode(["error" => "Internship not found"]));
        }

        $response->getBody()->write(json_encode($internship));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function getStudentsByCourseId(Request $request, Response $response, $args)
    {
        $courseId = $args['course_id']; // Lấy course_id từ URL
        $students = $this->internshipService->getStudentsByCourseId($courseId);

        if (!$students) {
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json')
                ->getBody()->write(json_encode(["error" => "No students found for this course"]));
        }

        $response->getBody()->write(json_encode($students));
        return $response->withHeader('Content-Type', 'application/json');
    }


    public function create(Request $request, Response $response)
    {
        $user = $request->getAttribute('user');
        $data = $request->getParsedBody();

        $result = $this->internshipService->createInternship($data, $user);

        $response->getBody()->write(json_encode($result));
        return $response->withStatus($result['status'])->withHeader('Content-Type', 'application/json');
    }

    public function update(Request $request, Response $response, $args)
    {
        $user = $request->getAttribute('user');
        $data = $request->getParsedBody();

        $result = $this->internshipService->updateInternship($args['id'], $data, $user);

        $response->getBody()->write(json_encode($result));
        return $response->withStatus($result['status'])->withHeader('Content-Type', 'application/json');
    }

    public function delete(Request $request, Response $response, $args)
    {
        $user = $request->getAttribute('user');

        $result = $this->internshipService->deleteInternship($args['id'], $user);

        $response->getBody()->write(json_encode($result));
        return $response->withStatus($result['status'])->withHeader('Content-Type', 'application/json');
    }
}
