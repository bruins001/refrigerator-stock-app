<?php
require_once 'vendor/autoload.php';
require_once 'controllers/default/AuthenticationController.php';
require_once 'controllers/default/HomepageController.php';
require_once 'auth0.php';

use Steampixel\Route; // The router library

define('ROUTE_URL_INDEX', rtrim(getenv('AUTH0_BASE_URL'), '/'));
define('ROUTE_URL_LOGIN', ROUTE_URL_INDEX . '/login');
define('ROUTE_URL_CALLBACK', ROUTE_URL_INDEX . '/callback');
define('ROUTE_URL_LOGOUT', ROUTE_URL_INDEX . '/logout');

ROUTE::add('/', fn() => HomepageController::index($auth0));
ROUTE::add('/login', fn() => AuthenticationController::login($auth0, ROUTE_URL_CALLBACK));
ROUTE::add('/callback', fn() => AuthenticationController::callback($auth0, ROUTE_URL_CALLBACK, ROUTE_URL_INDEX));
ROUTE::add('/logout', fn() => AuthenticationController::logout($auth0, ROUTE_URL_INDEX));

ROUTE::run('/');
?>