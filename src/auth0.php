<?php
// Initiate the Auth0 class
$auth0 = new \Auth0\SDK\Auth0([
    'domain' => getenv('AUTH0_DOMAIN'),
    'clientId' => getenv('AUTH0_CLIENT_ID'),
    'clientSecret' => getenv('AUTH0_CLIENT_SECRET'),
    'cookieSecret' => getenv('AUTH0_COOKIE_SECRET')
]);
?>