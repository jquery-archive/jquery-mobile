<?php
        $st = array("foo" => "bar", "bak" => "baz");

$site_log_prefix = "[jquerymobile] ";
$post_commit_prefix = "[post commit hook] ";

// no luck finding a status logging mechanism, error's it is for now
error_log($site_log_prefix . $post_commit_prefix . str_replace("\n", "", print_r($st, true)));
?>