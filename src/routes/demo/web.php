<?php
require_once 'vendor/autoload.php';
require_once 'controllers/demo/HomepageController.php';

use Steampixel\Route;

define('BASE_URL', getenv('AUTH0_BASE_URL'), '/');
define('ROUTE_URL_INDEX', BASE_URL);

ROUTE::add('/', fn() => HomepageController::index(), 'get');

ROUTE::run('/');
?>