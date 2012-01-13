# The files to include when compiling the CSS files
CSSFILES = css/structure/jquery.mobile.core.css \
	css/structure/jquery.mobile.transitions.css \
	css/structure/jquery.mobile.grids.css \
	css/structure/jquery.mobile.headerfooter.css \
	css/structure/jquery.mobile.navbar.css \
	css/structure/jquery.mobile.button.css \
	css/structure/jquery.mobile.collapsible.css \
	css/structure/jquery.mobile.controlgroup.css \
	css/structure/jquery.mobile.dialog.css \
	css/structure/jquery.mobile.forms.checkboxradio.css \
	css/structure/jquery.mobile.forms.fieldcontain.css \
	css/structure/jquery.mobile.forms.select.css \
	css/structure/jquery.mobile.forms.textinput.css \
	css/structure/jquery.mobile.listview.css \
	css/structure/jquery.mobile.forms.slider.css
CSSTHEMEFILES = css/themes/${THEME}/jquery.mobile.theme.css




# Helper Variables
# The command to replace the @VERSION in the files with the actual version
VER = sed "s/v@VERSION/$$(git log -1 --format=format:"Git Build: SHA1: %H <> Date: %cd")/"
VER_MIN = "/*! jQuery Mobile v$$(git log -1 --format=format:"Git Build: SHA1: %H <> Date: %cd") jquerymobile.com | jquery.org/license */"
VER_OFFICIAL = $(shell cat version.txt)
deploy: VER = sed "s/v@VERSION/${VER_OFFICIAL}/"
deploy: VER_MIN = "/*! jQuery Mobile v${VER_OFFICIAL} jquerymobile.com | jquery.org/license */"

# The output folder for the finished files
OUTPUT = compiled

# The name of the files
NAME = jquery.mobile
STRUCTURE = jquery.mobile.structure
deploy: NAME = jquery.mobile-${VER_OFFICIAL}
deploy: STRUCTURE = jquery.mobile.structure-${VER_OFFICIAL}

# The CSS theme being used
THEME = default





# Build Targets

# When no build target is specified, all gets ran
all: init css js zip notify


# Build and minify the CSS files
css: init
	# Build the CSS file with the theme included
	@@java -XX:ReservedCodeCacheSize=64m \
		-classpath build/js.jar:build/google-compiler-20111003.jar org.mozilla.javascript.tools.shell.Main \
		external/r.js/dist/r.js \
		-o cssIn=css/themes/default/jquery.mobile.css \
		out=${OUTPUT}/${NAME}.compiled.css
	@@cat LICENSE-INFO.txt | ${VER} > ${OUTPUT}/${NAME}.css
	@@cat ${OUTPUT}/${NAME}.compiled.css >> ${OUTPUT}/${NAME}.css
	@@echo ${VER_MIN} > ${OUTPUT}/${NAME}.min.css
	@@java -XX:ReservedCodeCacheSize=64m \
		-jar build/yuicompressor-2.4.6.jar \
		--type css ${OUTPUT}/${NAME}.compiled.css >> ${OUTPUT}/${NAME}.min.css
	@@rm ${OUTPUT}/${NAME}.compiled.css
	# Build the CSS Structure-only file
	@@cat LICENSE-INFO.txt | ${VER} > ${OUTPUT}/${STRUCTURE}.css
	@@cat ${CSSFILES} >> ${OUTPUT}/${STRUCTURE}.css
	# ..... and then minify it
	@@echo ${VER_MIN} > ${OUTPUT}/${STRUCTURE}.min.css
	@@java -XX:ReservedCodeCacheSize=64m \
		-jar build/yuicompressor-2.4.6.jar \
		--type css ${OUTPUT}/${STRUCTURE}.css >> ${OUTPUT}/${STRUCTURE}.min.css
	# ..... and then copy in the images
	@@cp -R css/themes/${THEME}/images ${OUTPUT}/
	# Css portion is complete.
	# -------------------------------------------------


docs: init
	# Create the Demos/Docs/Tests/Tools
	# ... Build the docs bundle
	@@java -XX:ReservedCodeCacheSize=64m \
		-classpath build/js.jar:build/google-compiler-20111003.jar org.mozilla.javascript.tools.shell.Main \
		external/r.js/dist/r.js \
	 	-o build/docs.build.js \
		dir=../tmp/${NAME}
	# ... Prepend versioned license
	@@cat LICENSE-INFO.txt | ${VER} > tmp/${NAME}/LICENSE-INFO.txt
	@@cat tmp/${NAME}/LICENSE-INFO.txt | cat - tmp/${NAME}/js/jquery.mobile.docs.js > tmp/${NAME}/js/jquery.mobile.docs.js.tmp
	@@mv tmp/${NAME}/js/jquery.mobile.docs.js.tmp tmp/${NAME}/js/jquery.mobile.docs.js
	@@cat tmp/${NAME}/LICENSE-INFO.txt | cat - tmp/${NAME}/css/themes/default/${NAME}.css > tmp/${NAME}/css/themes/default/${NAME}.css.tmp
	@@mv tmp/${NAME}/css/themes/default/${NAME}.css.tmp tmp/${NAME}/css/themes/default/${NAME}.css
	# ... Move and zip up the the whole folder
	@@cd tmp; zip -rq ../${OUTPUT}/${NAME}.docs.zip ${NAME}
	@@mv tmp/${NAME} ${OUTPUT}/demos
	# Finish by removing the temporary files
	@@rm -rf tmp
	# -------------------------------------------------


# Create the output directory. This is in a separate step so its not dependant on other targets
init:
	# -------------------------------------------------
	# Building jQuery Mobile in the "${OUTPUT}" folder
	@@rm -rf ${OUTPUT}
	@@rm -rf tmp
	@@mkdir -p ${OUTPUT}
	# -------------------------------------------------


# Build and minify the JS files
js: init
	# Build the JavaScript file
	@@java -XX:ReservedCodeCacheSize=64m \
		-classpath build/js.jar:build/google-compiler-20111003.jar org.mozilla.javascript.tools.shell.Main \
		external/r.js/dist/r.js \
	 	-o baseUrl="js" \
		include=jquery.mobile exclude=jquery,order \
		out=${OUTPUT}/${NAME}.compiled.js \
		pragmasOnSave.jqmBuildExclude=true \
		wrap.start=build/wrap.start \
		wrap.end=build/wrap.end \
		findNestedDependencies=true \
		skipModuleInsertion=true \
		optimize=none
	@@cat LICENSE-INFO.txt | ${VER} > ${OUTPUT}/${NAME}.js
	@@cat ${OUTPUT}/${NAME}.compiled.js >> ${OUTPUT}/${NAME}.js
	@@rm ${OUTPUT}/${NAME}.compiled.js
	# ..... and then minify it
	@@echo ${VER_MIN} > ${OUTPUT}/${NAME}.min.js
	@@java -XX:ReservedCodeCacheSize=64m \
		-jar build/google-compiler-20111003.jar \
		--js ${OUTPUT}/${NAME}.js \
		--js_output_file ${OUTPUT}/${NAME}.compiled.js
	@@cat ${OUTPUT}/${NAME}.compiled.js >> ${OUTPUT}/${NAME}.min.js
	@@rm ${OUTPUT}/${NAME}.compiled.js
	# -------------------------------------------------


# Output a message saying the process is complete
notify: init
	@@echo "The files have been built and are in: " $$(pwd)/${OUTPUT}
	# -------------------------------------------------


# Zip up the jQm files without docs
zip: init css js 
	# Packaging up the files into a zip archive
	@@mkdir tmp
	@@cp -R ${OUTPUT} tmp/${NAME} 
	# ... And remove the Zipped docs so they aren't included twice (for deploy scripts)
	@@rm -rf tmp/${NAME}/${NAME}.docs.zip 
	@@cd tmp; zip -rq ../${OUTPUT}/${NAME}.zip ${NAME}
	@@rm -rf tmp
	# -------------------------------------------------
	



# -------------------------------------------------
# -------------------------------------------------
# -------------------------------------------------
#
# For jQuery Team Use Only
#
# -------------------------------------------------

# Push the latest git version to the CDN. This is done on a post commit hook
latest: init css docs js zip
	# Time to put these on the CDN
	@@scp -qr ${OUTPUT}/* jqadmin@code.origin.jquery.com:/var/www/html/code.jquery.com/mobile/latest/
	# Do some cleanup to wrap it up
	@@rm -rf ${OUTPUT}
	# -------------------------------------------------

# Build the nightly backups. This is done on a server cronjob
nightlies: init css js docs zip 
	# Time to put these on the CDN
	@@mkdir -p tmp/nightlies
	@@mv ${OUTPUT} tmp/nightlies/$$(date "+%Y%m%d")
	@@scp -qr tmp/nightlies/* jqadmin@code.origin.jquery.com:/var/www/html/code.jquery.com/mobile/nightlies/
	# Do some cleanup to wrap it up
	@@rm -rf tmp
	# -------------------------------------------------


# Deploy a finished release. This is manually done.
deploy: init css js docs zip
	# Deploying all the files to the CDN
	@@mkdir tmp
	@@cp -R ${OUTPUT} tmp/${VER_OFFICIAL}
	@@scp -qr tmp/* jqadmin@code.origin.jquery.com:/var/www/html/code.jquery.com/mobile/
	@@rm -rf tmp/${VER_OFFICIAL}
	@@mv ${OUTPUT}/demos tmp/${VER_OFFICIAL}
	# Create the Demos/Docs/Tests/Tools for jQueryMobile.com
	# ... By first replacing the paths
	@@find tmp/${VER_OFFICIAL} -type f \
		\( -name '*.html' -o -name '*.php' \) \
		-exec perl -pi -e \
		's|src="(.*)${NAME}.min.js"|src="//code.jquery.com/mobile/${VER_OFFICIAL}/${NAME}.min.js"|g;s|href="(.*)${NAME}.min.css"|href="//code.jquery.com/mobile/${VER_OFFICIAL}/${NAME}.min.css"|g;s|src="(.*)jquery.js"|src="//code.jquery.com/jquery-1.6.4.js"|g' {} \;
	# ... So they can be copied to jquerymobile.com
	@@scp -qr tmp/* jqadmin@jquerymobile.com:/srv/jquerymobile.com/htdocs/demos/	
	# Do some cleanup to wrap it up
	@@rm -rf tmp
	@@rm -rf ${OUTPUT}
	# -------------------------------------------------


