<?php
  header("Content-Type: application/json");

  $directories = array();

  if ($handle = opendir(getcwd())) {
    while (false !== ($file = readdir($handle))) {
      if (is_dir($file) && $file[0] !== "." ) {
        array_push($directories, $file);
      }
    }

    closedir($handle);
  }

  $test_pages = array_merge($directories, glob("**/*-tests.html"));
  sort($test_pages);

  echo '{ "testPages":["' . implode( '","', $test_pages ) . '"]}';
?>