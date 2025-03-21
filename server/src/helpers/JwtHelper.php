<?php

namespace App\Helpers;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JwtHelper
{
    private static $secretKey;

    public static function init()
    {
        self::$secretKey = $_ENV['JWT_SECRET'];
    }

    public static function generateToken($userId, $role)
    {
        $issuedAt = time();
        $expirationTime = $issuedAt + $_ENV['JWT_EXPIRY'];

        $payload = [
            'iat' => $issuedAt,
            'exp' => $expirationTime,
            'sub' => $userId,
            'role' => $role
        ];

        return JWT::encode($payload, self::$secretKey, 'HS256');
    }

    public static function verifyToken($token)
    {
        try {
            $decoded = JWT::decode($token, new Key(self::$secretKey, 'HS256'));
            return (array) $decoded;
        } catch (\Exception $e) {
            return null;
        }
    }
}

JwtHelper::init();
