<?php

namespace App\Services;

use Illuminate\Database\Capsule\Manager as Capsule;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use App\Helpers\JwtHelper;

class AuthService
{
    public function register($data)
    {
        // Validate required fields
        if (empty($data['username']) || empty($data['password']) || empty($data['role'])) {
            return ["error" => "Missing required fields", "status" => 400];
        }

        // Check if user already exists
        $userExists = Capsule::table('users')->where('username', $data['username'])->exists();
        if ($userExists) {
            return ["error" => "Username already taken", "status" => 409];
        }

        // Hash password
        $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

        // Insert user into database
        $userId = Capsule::table('users')->insertGetId([
            'username' => $data['username'],
            'password' => $hashedPassword,
            'role' => $data['role'],
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]);

        return ["message" => "User registered successfully", "user_id" => $userId, "status" => 201];
    }

    public function login($data)
    {
        // Validate required fields
        if (empty($data['username']) || empty($data['password'])) {
            return ["error" => "Missing username or password", "status" => 400];
        }

        // Retrieve user from database
        $user = Capsule::table('users')->where('username', $data['username'])->first();
        if (!$user || !password_verify($data['password'], $user->password)) {
            return ["error" => "Invalid username or password", "status" => 401];
        }

        $role = $user->role;

        // Generate JWT token
        $token = JwtHelper::generateToken($user->user_id, $user->role);

        return ["message" => "Login successful", "token" => $token,"role" => $role, "is_first_login" => $user->is_first_login == 1, "status" => 200];
    }

    public function getUserDetails($user)
    {
        // Fetch user details based on the authenticated token
        $userDetails = Capsule::table('users')->where('user_id', $user['sub'])->first();

        if (!$userDetails) {
            return ["error" => "User not found", "status" => 404];
        }

        return [
            "user_id" => $userDetails->user_id,
            "username" => $userDetails->username,
            "role" => $userDetails->role,
            "created_at" => $userDetails->created_at,
            "status" => 200
        ];
    }

    public function changePassword($userId, $newPassword)
    {
        $user = Capsule::table('users')->where('user_id', $userId)->first();

        if (!$user) {
            return ['error' => 'User not found', 'status' => 404];
        }

        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

        Capsule::table('users')->where('user_id', $userId)->update([
            'password' => $hashedPassword,
            'is_first_login' => 0,
            'updated_at' => date('Y-m-d H:i:s')
        ]);

        return ['message' => 'Password changed successfully', 'status' => 200];
    }
}
