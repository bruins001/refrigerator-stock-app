<?php

use Auth0\SDK\Auth0;

// Does the authentication for the users.
class AuthenticationController {
    /**
     * Sends user to auth0 login page.
     * @param Auth0 $auth0 The auth0 object created in auth0.php.
     * @param string $ROUTE_URL_CALLBACK The Route callback url.
     */
    static function login($auth0, $ROUTE_URL_CALLBACK) {
        // Reset user session
        $auth0->clear();

        // Redirect user to Auth0 Universal login page.
        header('Location: ' . $auth0->login($ROUTE_URL_CALLBACK));
        exit;
    }

    /**
     * Sends user to auth0 logout.
     * @param Auth0 $auth0 The auth0 object created in auth0.php.
     * @param string $ROUTE_URL_INDEX The Route callback url.
     */
    static function logout($auth0, $ROUTE_URL_INDEX) {
        header('Location: ' . $auth0->logout($ROUTE_URL_INDEX));
        exit;
    }

    /**
     * Validation when user is sent back fron auth0 login.
     * @param Auth0 $auth0 The auth0 object created in auth0.php.
     * @param string $ROUTE_URL_INDEX The Route callback url.
     */
    static function callback($auth0, $ROUTE_URL_CALLBACK, $ROUTE_URL_INDEX) {
        // SDK completes authentication flow.
        try {
            $auth0->exchange($ROUTE_URL_CALLBACK);
            session_start();
            $_SESSION["user"] = $auth0->getCredentials();
        } catch (Exception $e) {
            echo "Authentication failed: " . $e;
            exit;
        }

        // Redirect user to index page.
        header('Location: ' . $ROUTE_URL_INDEX);
        exit;
    }

    /**
     * Checks for user session and tries to correct it if necessary.
     * @param Auth0 $auth0 The auth0 object created in auth0.php.
     * @param string $ROUTE_URL_INDEX The Route callback url.
     */
    static function checkForSession($auth0) {
        $session = null;
        if (!isset($_SESSION["user"]) && $auth0->getCredentials()) {
            $_SESSION["user"] = $auth0->getCredentials();
        } else if (isset($_SESSION["user"])) {
            $session = $_SESSION["user"];
        }

        return $session;
    }
}
?>