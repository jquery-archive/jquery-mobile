<?php

$file = fopen('gitstatus.log', 'r+b');
if ( fread($file) === 'NewCommit' )
{
	ftruncate($file);
	exec('git pull --quiet && make NIGHTLY_OUTPUT=latest nightly >> /dev/null 2>&1');
}

