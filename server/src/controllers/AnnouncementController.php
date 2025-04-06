<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Services\AnnouncementService;

class AnnouncementController
{
    protected $announcementService;

    public function __construct()
    {
        $this->announcementService = new AnnouncementService();
    }

    public function createAnnouncement(Request $request, Response $response)
    {
        $user = $request->getAttribute('user');
        $data = $request->getParsedBody();
        $announcement = $this->announcementService->createAnnouncement($data, $user);
        $response->getBody()->write(json_encode($announcement));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function getByCourse(Request $request, Response $response, array $args)
    {
        $course_id = $args['course_id'];
        $announcements = $this->announcementService->getAnnouncementsByCourse($course_id);
        $response->getBody()->write(json_encode($announcements));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function deleteAnnouncement(Request $request, Response $response, array $args)
    {
        $user = $request->getAttribute('user');
        $announcementId = $args['id'];
        if ($this->announcementService->deleteAnnouncement($announcementId, $user)) {
            $response->getBody()->write(json_encode(['message' => 'Announcement deleted successfully']));   
            return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
        } else {
            $response->getBody()->write(json_encode(['message' => 'Announcement not found']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }
    }
}