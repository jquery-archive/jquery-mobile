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
find tmp/demos -name "*.html" -exec sed -i$SED_INPLACE_EXT -e 's@js/"@js/jquery.mobile.js"@' {} \;
find tmp/demos -name "*$SED_INPLACE_EXT" -exec rm {} \;
# ... Move and zip up the the whole folder
rm -f $OUTPUT/$NAME.docs.zip
cd tmp/demos
zip -r ../../$OUTPUT/$BASE_NAME.docs.zip ./*
rm -rf $OUTPUT/demos && mv -f tmp/demos $OUTPUT
# Finish by removing the temporary files
rm -rf tmp
# -------------------------------------------------
