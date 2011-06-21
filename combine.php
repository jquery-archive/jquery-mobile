<?php

if ( ! isset($type) || ! isset($elements) )
{
	echo '$type and $elements must be specified!';
	exit;
}

$contents = '';

foreach ( $elements as $file ) {
	$contents .= file_get_contents($file). "\n\n";
}

header('Content-Type: ' . $type);
header('Content-Length: ' . strlen($contents));
echo $contents;