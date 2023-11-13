<?php

// Does stuff for homepage
class HomepageController {
    // Creates HTML page and loads CSS and JS with it.
    static function index() {
        require 'templates/demo/homepage.php';
    }
}
?>