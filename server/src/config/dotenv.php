<?php
require_once __DIR__ . '/../../vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
$dotenv->load();

// var_dump(getenv('DB_DATABASE'));
// var_dump($_ENV['DB_DATABASE'] ?? 'Không tìm thấy');