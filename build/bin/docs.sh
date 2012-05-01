source build/bin/config.sh

mkdir -p tmp/demos/js
mkdir -p tmp/demos/css/themes/$THEME
# ... Copy script files
cp compiled/*.js tmp/demos/js
cp js/jquery.js tmp/demos/js
# ... Copy html files
cp index.html tmp/demos
cp -r docs tmp/demos
# ... Copy css and images
cp compiled/*.css tmp/demos/css/themes/$THEME
cp -r compiled/images tmp/demos/css/themes/$THEME
# ... replace "js/" with "js/jquery.mobile.js"
# NOTE the deletion here is required by gnu/bsd sed differences
find tmp/demos \( -name '*.html' -o -name '*.php' \) -exec sed -i${SED_INPLACE_EXT} -e "s@js/\"@js/$NAME.js\"@" {} \;
find tmp/demos -name "*$SED_INPLACE_EXT" -exec rm {} \;
# make sure the docs reference the right css file names (for deploy)
find tmp/demos \( -name '*.html' -o -name '*.php' \) -exec sed -i${SED_INPLACE_EXT} -e "s@$BASE_NAME.css\"@$NAME.css\"@" {} \;
find tmp/demos -name "*$SED_INPLACE_EXT" -exec rm {} \;

# clear out old zip files
clear_zip_files $OUTPUT

# ... Move and zip up the the whole folder
cd tmp/demos && mkdir -p $OUTPUT && zip -qr $OUTPUT/$BASE_NAME.docs.zip ./* && cd -
rm -rf $OUTPUT/demos && mv -f tmp/demos $OUTPUT
# Finish by removing the temporary files
rm -rf tmp
