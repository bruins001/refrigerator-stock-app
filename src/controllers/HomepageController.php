<?php
require_once 'AuthenticationController.php';

class HomepageController {
    static function index($auth0) {
        $session = AuthenticationController::checkForSession($auth0);

        if ($session === null) {
            // User not logged in.
            echo '<p>You can login <a href="login">here</a>.</p>';
            exit;
        }

        // // User is logged in.
        echo '<pre>' . $session->user['nickname'] . '</pre>';
        echo '<p>You can logout <a href="/logout">here</a>.</p>';
    }
}
?>