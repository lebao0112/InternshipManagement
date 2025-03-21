<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Services\InternshipCourseService;

class InternshipCourseController
{
    private $courseService;

    public function __construct()
    {
        $this->courseService = new InternshipCourseService();
    }

    public function getAll(Request $request, Response $response)
    {
        $courses = $this->courseService->getAllCourses();
        $response->getBody()->write(json_encode($courses));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function getById(Request $request, Response $response, $args)
    {
        $course = $this->courseService->getCourseById($args['id']);

        if (!$course) {
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json')
                ->getBody()->write(json_encode(["error" => "Course not found"]));
        }

        $response->getBody()->write(json_encode($course));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function create(Request $request, Response $response)
    {
        $user = $request->getAttribute('user');
        $data = $request->getParsedBody();

        $result = $this->courseService->createCourse($data, $user);

        $response->getBody()->write(json_encode($result));
        return $response->withStatus($result['status'])->withHeader('Content-Type', 'application/json');
    }

    public function update(Request $request, Response $response, $args)
    {
        $user = $request->getAttribute('user');
        $data = $request->getParsedBody();

        $result = $this->courseService->updateCourse($args['id'], $data, $user);

        $response->getBody()->write(json_encode($result));
        return $response->withStatus($result['status'])->withHeader('Content-Type', 'application/json');
    }

    public function delete(Request $request, Response $response, $args)
    {
        $user = $request->getAttribute('user');

        $result = $this->courseService->deleteCourse($args['id'], $user);

        $response->getBody()->write(json_encode($result));
        return $response->withStatus($result['status'])->withHeader('Content-Type', 'application/json');
    }
}
