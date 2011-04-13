<?php
// This file is for the jQuery team only. This is the post commit hook
exec('git pull --quiet && make NIGHTLY_OUTPUT=latest nightly >> /dev/null 2>&1');
