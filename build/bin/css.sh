source build/bin/config.sh

# Build the CSS file with the theme included
$RUN_JS \
	external/r.js/dist/r.js \
	-o cssIn=css/themes/default/jquery.mobile.css \
	optimizeCss=standard.keepComments.keepLines \
	out=$OUTPUT/$NAME.compiled.css
cat LICENSE-INFO.txt | ver > $OUTPUT/$NAME.css
cat $OUTPUT/$NAME.compiled.css >> $OUTPUT/$NAME.css
echo $VER_MIN > $OUTPUT/$NAME.min.css
java -XX:ReservedCodeCacheSize=64m -jar build/yuicompressor-2.4.6.jar --type css $OUTPUT/$NAME.compiled.css >> $OUTPUT/$NAME.min.css
rm $OUTPUT/$NAME.compiled.css
# Build the CSS Structure-only file
$RUN_JS external/r.js/dist/r.js \
	-o cssIn=css/structure/jquery.mobile.structure.css \
  out=$OUTPUT/$STRUCTURE.compiled.css
cat LICENSE-INFO.txt | ver > $OUTPUT/$STRUCTURE.css
cat $OUTPUT/$STRUCTURE.compiled.css >> $OUTPUT/$STRUCTURE.css
# ..... and then minify it
echo $VER_MIN > $OUTPUT/$STRUCTURE.min.css
java -XX:ReservedCodeCacheSize=64m \
	-jar build/yuicompressor-2.4.6.jar \
	--type css $OUTPUT/$STRUCTURE.compiled.css >> $OUTPUT/$STRUCTURE.min.css
rm $OUTPUT/$STRUCTURE.compiled.css
# Build the theme only file
cat LICENSE-INFO.txt | ver > $OUTPUT/$THEME_FILENAME.css
cat css/themes/default/jquery.mobile.theme.css >> $OUTPUT/$THEME_FILENAME.css
# ..... and then minify it
echo $VER_MIN > $OUTPUT/$THEME_FILENAME.min.css
java -XX:ReservedCodeCacheSize=64m \
	-jar build/yuicompressor-2.4.6.jar \
	--type css $OUTPUT/$THEME_FILENAME.css >> $OUTPUT/$THEME_FILENAME.min.css
# Copy in the images
cp -R css/themes/$THEME/images $OUTPUT/
