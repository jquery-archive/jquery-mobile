source build/bin/config.sh

# Push the latest git version to the CDN. This is done on a post commit hook
cp -r $OUTPUT/* /var/www/html/code.jquery.com/mobile/latest/

for file in `ls $OUTPUT/jquery.mobile*`; do
  filename=`echo $file | sed "s/$OUTPUT\///"`
  curl "http://code.origin.jquery.com/mobile/latest/$filename?reload"
done