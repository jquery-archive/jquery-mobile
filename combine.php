<?php
// Get the filetype and array of files
if ( ! isset($type) || ! isset($files) )
{
	echo '$type and $files must be specified!';
	exit;
}

$contents = '';

if ( isset( $comment ) ) {
	$contents .= $comment;
}

// Loop through the files adding them to a string
foreach ( $files as $file ) {
	$contents .= file_get_contents($file). "\n\n";
}

// Set the content type, filesize and an expiration so its not cached
header('Content-Type: ' . $type);
header('Content-Length: ' . strlen($contents));
header('Expires: Fri, 01 Jan 2010 05:00:00 GMT');

// Deliver the file
echo $contents;
