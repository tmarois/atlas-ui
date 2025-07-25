<?php

$helperPaths = glob(__DIR__ . '/**/*.php');

foreach ($helperPaths as $file) {
    if ($file === __FILE__) {
        continue; // skip loading helpers.php itself
    }
    require_once $file;
}
