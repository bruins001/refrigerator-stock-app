<?php

use Dotenv\Exception\InvalidPathException;

require_once 'vendor/autoload.php'; // The autoloader makes the SDK classes accessible.

// If Dotenv class can't find the auth0 env variables the website will go to demonstration mode.
try {
    (Dotenv\Dotenv::createImmutable( __DIR__))->load(); // Loading enviorement variables.
} catch (InvalidPathException $e) {
    require_once 'routes/demo/web.php';
    exit;
}

require_once 'routes/default/web.php'; // The non demo routes.
?>