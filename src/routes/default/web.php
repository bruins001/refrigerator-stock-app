<?php
require_once 'vendor/autoload.php';
require_once 'controllers/default/AuthenticationController.php';
require_once 'controllers/default/HomepageController.php';
require_once 'auth0.php';

use Steampixel\Route; // The router library

define('ROUTE_URL_INDEX', rtrim($_ENV['AUTH0_BASE_URL'], '/'));
define('ROUTE_URL_LOGIN', ROUTE_URL_INDEX . '/login');
define('ROUTE_URL_CALLBACK', ROUTE_URL_INDEX . '/callback'); // The URL the user gets back to after the login on auth0 side and does some validation for security.
define('ROUTE_URL_LOGOUT', ROUTE_URL_INDEX . '/logout');

ROUTE::add('/', fn() => HomepageController::index($auth0));
ROUTE::add('/login', fn() => AuthenticationController::login($auth0, ROUTE_URL_CALLBACK));
ROUTE::add('/callback', fn() => AuthenticationController::callback($auth0, ROUTE_URL_CALLBACK, ROUTE_URL_INDEX));
ROUTE::add('/logout', fn() => AuthenticationController::logout($auth0, ROUTE_URL_INDEX));

ROUTE::run('/'); // You can add a prefix here. For example '/api' the prefix '/api' will be added for the 4 URLs above.
?>