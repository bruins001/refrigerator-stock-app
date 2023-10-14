<?php

?>
<header>
    <?php
        if (!isset($session) || $session === null) {
            // User not logged in.
            echo '<p>You can login <a href="login">here</a>.</p>';
        } else {
            // User is logged in.
            echo '<pre>' . $session->user['nickname'] . '</pre>';
            echo '<p>You can logout <a href="/logout">here</a>.</p>';
        }
    ?>
</header>