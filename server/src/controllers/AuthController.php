<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Services\AuthService;

class AuthController
{
    private $authService;

    public function __construct()
    {
        $this->authService = new AuthService();
    }

    public function register(Request $request, Response $response)
    {
        $data = $request->getParsedBody();

        // ✅ Call AuthService to handle registration logic
        $result = $this->authService->register($data);

        $response->getBody()->write(json_encode($result));
        return $response->withStatus($result['status'])->withHeader('Content-Type', 'application/json');
    }

    public function login(Request $request, Response $response)
    {
        $data = $request->getParsedBody();

        // ✅ Call AuthService to handle login logic
        $result = $this->authService->login($data);

        $response->getBody()->write(json_encode($result));
        return $response->withStatus($result['status'])->withHeader('Content-Type', 'application/json');
    }

    public function getMe(Request $request, Response $response)
    {
        $user = $request->getAttribute('user');

        // ✅ Call AuthService to get user details
        $result = $this->authService->getUserDetails($user);

        $response->getBody()->write(json_encode($result));
        return $response->withStatus($result['status'])->withHeader('Content-Type', 'application/json');
    }
}
