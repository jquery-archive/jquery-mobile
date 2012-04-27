source build/bin/config.sh

# Build the JavaScript file
$RUN_JS \
		external/r.js/dist/r.js \
	 	-o baseUrl="js" \
		name=jquery.mobile \
		exclude=jquery,../external/requirejs/order,../external/requirejs/depend,../external/requirejs/text,../external/requirejs/text!../version.txt \
		out=$OUTPUT/$NAME.compiled.js \
		pragmasOnSave.jqmBuildExclude=true \
		wrap.startFile=build/wrap.start \
		wrap.endFile=build/wrap.end \
		findNestedDependencies=true \
		skipModuleInsertion=true \
		optimize=none
cat LICENSE-INFO.txt | ver > $OUTPUT/$NAME.js
cat $OUTPUT/$NAME.compiled.js | sed_ver_api >> $OUTPUT/$NAME.js
rm $OUTPUT/$NAME.compiled.js
echo $VER_MIN > $OUTPUT/$NAME.min.js
java -XX:ReservedCodeCacheSize=64m \
	-jar build/google-compiler-20111003.jar \
	--js $OUTPUT/$NAME.js \
	--js_output_file $OUTPUT/$NAME.compiled.js
cat $OUTPUT/$NAME.compiled.js >> $OUTPUT/$NAME.min.js
rm $OUTPUT/$NAME.compiled.js

