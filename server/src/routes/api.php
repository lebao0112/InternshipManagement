<?php

use Slim\Factory\AppFactory;
use App\Controllers\UserController;
use App\Controllers\AuthController;
use App\Controllers\HelloController;
use App\Controllers\InternshipCourseController;
use App\Controllers\InternshipDetailController;
use App\Controllers\AnnouncementController;
use App\Middleware\AuthMiddleware;
use App\Controllers\StudentController;
use Psr\Http\Message\ResponseInterface;

use App\Controllers;

require_once __DIR__ . '/../config/database.php';



$app = AppFactory::create();
$app->addBodyParsingMiddleware();
$app->post('/login', [AuthController::class, 'login']);
$app->post('/register', [AuthController::class, 'register']);
$app->get('/api/me', [AuthController::class, 'getMe'])->add(new AuthMiddleware(['student', 'lecturer']));

$app->group('/student', function ($group) {
    // $group->get('/courses', [StudentController::class, 'getCourses']);
    // $group->get('/internships', [StudentController::class, 'getInternships']);
})->add(new AuthMiddleware(['student']));  // Chỉ sinh viên mới được truy cập

// API Chỉ dành cho Lecturer
$app->group('/lecturer', function ($group) {
    $group->get('/internships/{internship_detail_id}', [InternshipDetailController::class, 'getById']);
    $group->put('/internships/{internship_detail_id}/status', [InternshipDetailController::class, 'updateStatus']);
    $group->put('/internships/{internship_detail_id}/feedback', [InternshipDetailController::class, 'updateFeedback']);
})->add(new AuthMiddleware(['lecturer']));

$courseController = new InternshipCourseController();
$app->group('/courses', function ($group) use ($courseController) {
    $group->get('', [$courseController, 'getAll']);       
    $group->get('/{id}', [$courseController, 'getById']); 
    $group->post('', [$courseController, 'create']);      
    $group->put('/{id}', [$courseController, 'update']);  
    $group->delete('/{id}', [$courseController, 'delete']); 
})->add(new AuthMiddleware(['lecturer']));

$internshipController = new InternshipDetailController();
$app->group('/internships', function ($group) use ($internshipController) {
    $group->get('', [$internshipController, 'getAll']);
    $group->get('/{course_id}/students', [$internshipController, 'getStudentsByCourseId']);
    $group->get('/{id}', [$internshipController, 'getById']);
    $group->post('', [$internshipController, 'create']);
    $group->put('/{id}', [$internshipController, 'update']);
    $group->delete('/{id}', [$internshipController, 'delete']);
})->add(new AuthMiddleware(['lecturer']));


$studentController = new StudentController();
$app->group('/student', function ($group) use ($studentController) {
    $group->get('/internship-detail', [$studentController, 'getOwnInternship']);
    $group->put('/internship-detail', [$studentController, 'updateOwnInternship']);
    $group->post('/upload-cv', [$studentController, 'uploadCV']);
})->add(new AuthMiddleware(['student']));

$announcementController = new AnnouncementController();
$app->group('/announcements', function ($group) use ($announcementController) {
    $group->post('/create-announcement', [$announcementController, 'createAnnouncement']);
    $group->delete('/delete-announcement/{id}', [$announcementController, 'deleteAnnouncement']);
})->add(new AuthMiddleware(['lecturer']));

$app->group('/announcements', function ($group) use ($announcementController) {
    $group->get('/get-announcement/{course_id}', [$announcementController, 'getByCourse']);
})->add(new AuthMiddleware(['student', 'lecturer']));


$app->post('/students/import', [StudentController::class, 'importStudents'])->add(new AuthMiddleware(['lecturer']));
$app->put('/change-password', [AuthController::class, 'changePassword'])
    ->add(new AuthMiddleware(['student', 'lecturer']));

$app->options('/{routes:.+}', function ($request, ResponseInterface $response) {
    return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
});


// Middleware CORS
$app->add(function ($request, $handler) {
    $response = $handler->handle($request);

    if (!$response instanceof ResponseInterface) {
        $response = new \Slim\Psr7\Response();

    }

    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH')
        ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
});
$app->addBodyParsingMiddleware();

$app->run();
