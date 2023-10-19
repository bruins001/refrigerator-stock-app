<?php

?>
<header>
    <?php
        if (!isset($_SESSION['user']) || $_SESSION['user'] === null) {
            // User not logged in.
            echo '<p>You can login <a href="login">here</a>.</p>';
        } else {
            // User is logged in.
            echo '<pre>' . $_SESSION['user']->user['nickname'] . '</pre>';
            echo '<p>You can logout <a href="/logout">here</a>.</p>';
        }
    ?>
</header>