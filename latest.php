<?php
$file = fopen('gitstatus.log','wb');
fwrite($file, 'NewCommit');
close($file);
