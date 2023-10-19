<?php
require_once 'AuthenticationController.php';

class HomepageController {
    static function index($auth0) {
        AuthenticationController::checkForSession($auth0);

        require 'templates/homepage.php';
    }
}
?>