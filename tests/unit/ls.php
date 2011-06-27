<?php
  header("Content-Type: application/json");

  $response = array( 'directories' => array());

  if ($handle = opendir(getcwd())) {
    while (false !== ($file = readdir($handle))) {
      if (is_dir($file) && $file[0] !== "." ) {
        array_push($response['directories'], $file);
      }
    }

    closedir($handle);
  }

	echo json_encode($response)
?>