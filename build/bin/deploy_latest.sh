source build/bin/config.sh

# Push the latest git version to the CDN. This is done on a post commit hook
cp -r $OUTPUT/* /var/www/html/code.jquery.com/mobile/latest/
