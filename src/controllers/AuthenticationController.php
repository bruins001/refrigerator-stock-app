<?php
class AuthenticationController {
    static function login($auth0, $ROUTE_URL_CALLBACK) {
        // Reset user session
        $auth0->clear();

        // Redirect user to Auth0 Universal login page.
        header('Location: ' . $auth0->login($ROUTE_URL_CALLBACK));
        exit;
    }

    static function logout($auth0, $ROUTE_URL_INDEX) {
        header('Location: ' . $auth0->logout($ROUTE_URL_INDEX));
        exit;
    }

    static function callback($auth0, $ROUTE_URL_CALLBACK, $ROUTE_URL_INDEX) {
        // SDK completes authentication flow.
        try {
            $auth0->exchange($ROUTE_URL_CALLBACK);
        } catch (Exception $e) {
            echo "Authentication failed: " . $e;
            exit;
        }

        // Redirect user to index page.
        header('Location: ' . $ROUTE_URL_INDEX);
        exit;
    }

    static function checkForSession($auth0) {
        $session = $auth0->getCredentials();
        return $session;
    }
};
?>