<?php
	$seconds_to_cache = 3600000;
	$ts = gmdate("D, d M Y H:i:s", time() + $seconds_to_cache) . " GMT";
	header("Expires: $ts");
	header("Pragma: cache");
	header("Cache-Control: max-age=$seconds_to_cache");
	echo file_get_contents( "http://api.jquerymobile.com/resources/api.xml" );
?>
