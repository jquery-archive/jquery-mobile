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

  sort($directories);
  echo json_encode( array('directories' => $directories ));
?>