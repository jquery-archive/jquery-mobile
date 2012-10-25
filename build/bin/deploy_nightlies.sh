source build/bin/config.sh

scp -qr $OUTPUT jqadmin@code.origin.jquery.com:/var/www/html/code.jquery.com/mobile/nightlies/$(date "+%Y%m%d")