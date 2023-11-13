<?php
require_once 'AuthenticationController.php';

// Does stuff for homepage
class HomepageController {
    /**
     * Checks for user session and loads the homepage template.
     * @param Auth0 $auth0 The auth0 object created in auth0.php.
     */
    static function index($auth0) {
        AuthenticationController::checkForSession($auth0);

        require 'templates/default/homepage.php';
    }
}
?>