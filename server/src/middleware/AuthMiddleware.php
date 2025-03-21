<?php

namespace App\Middleware;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use App\Helpers\JwtHelper;

class AuthMiddleware
{
    private $allowedRoles;

    public function __construct(array $allowedRoles)
    {
        $this->allowedRoles = $allowedRoles;
    }

    public function __invoke(Request $request, RequestHandler $handler): Response
    {
        $authHeader = $request->getHeaderLine('Authorization');

        if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            $response = new \Slim\Psr7\Response();
            $response->getBody()->write(json_encode(['error' => 'Unauthorized']));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }

        $token = $matches[1];
        $decoded = JwtHelper::verifyToken($token);

        if (!$decoded) {
            $response = new \Slim\Psr7\Response();
            $response->getBody()->write(json_encode(['error' => 'Invalid token']));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }

        // Kiểm tra vai trò (role)
        if (!in_array($decoded['role'], $this->allowedRoles)) {
            $response = new \Slim\Psr7\Response();
            $response->getBody()->write(json_encode(['error' => 'Forbidden: You do not have permission']));
            return $response->withStatus(403)->withHeader('Content-Type', 'application/json');
        }

        // Chuyển tiếp request với thông tin người dùng
        $request = $request->withAttribute('user', $decoded);
        return $handler->handle($request);
    }
}
