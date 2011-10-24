<?php
$filename = 'gitstatus.log';
$file = fopen($filename, 'r+b');
if ( fread($file, filesize($filename)) === 'NewCommit' )
{
        ftruncate($file, 0);
        exec('git pull --quiet && make NIGHTLY_OUTPUT=latest nightly >> /dev/null 2>&1');
		exec('./refreshCDN >> /dev/null 2>&1');
}

