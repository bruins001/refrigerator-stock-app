<?php
require_once 'AuthenticationController.php';

class HomepageController {
    static function index($auth0) {
        $session = AuthenticationController::checkForSession($auth0);
        
        require 'templates/homepage.php';
    }
}
?>