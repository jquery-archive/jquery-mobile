<?php

if (!isset($type) || !isset($elements))
{
	echo "\$type and \$elements must be specified!";
	exit;
}

$contents = '';
reset($elements);
while (list(,$element) = each($elements)) {
	$contents .= "\n\n" . file_get_contents($element);
}

header("Content-Type: " . $type);
header("Content-Length: " . strlen($contents));
echo $contents;
?>