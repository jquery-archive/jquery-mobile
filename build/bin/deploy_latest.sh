source build/bin/config.sh

# Push the latest git version to the CDN. This is done on a post commit hook
scp -qr $OUTPUT/* jqadmin@code.origin.jquery.com:/var/www/html/code.jquery.com/mobile/latest/