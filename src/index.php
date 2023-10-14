<?php
require_once 'vendor/autoload.php'; // The autoloader makes the SDK classes accessible.

// Loading enviorement variables.
(Dotenv\Dotenv::createImmutable( __DIR__))->load();

require_once 'route.php';
?>