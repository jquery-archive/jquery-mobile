# Helper Variables
# The command to replace the @VERSION in the files with the actual version
HEAD_SHA = $(shell git log -1 --format=format:"%H")
VER = sed "s/v@VERSION/$$(git log -1 --format=format:"Git Build: SHA1: %H <> Date: %cd")/"
VER_MIN = "/*! jQuery Mobile v$$(git log -1 --format=format:"Git Build: SHA1: %H <> Date: %cd") jquerymobile.com | jquery.org/license */"
VER_OFFICIAL = $(shell cat version.txt)
SED_VER_REPLACE = 's/__version__/"${VER_OFFICIAL}"/g'
SED_VER_API = sed ${SED_VER_REPLACE}
SED_INPLACE_EXT = "whyunowork"
deploy: VER = sed "s/v@VERSION/${VER_OFFICIAL} ${HEAD_SHA}/"
deploy: VER_MIN = "/*! jQuery Mobile v${VER_OFFICIAL} ${HEAD_SHA} jquerymobile.com | jquery.org/license */"

# The output folder for the finished files
OUTPUT = compiled

# The name of the files
NAME = jquery.mobile
BASE_NAME = jquery.mobile
THEME_FILENAME = jquery.mobile.theme
STRUCTURE = jquery.mobile.structure
deploy: NAME = jquery.mobile-${VER_OFFICIAL}
deploy: THEME_FILENAME = jquery.mobile.theme-${VER_OFFICIAL}
deploy: STRUCTURE = jquery.mobile.structure-${VER_OFFICIAL}

# The CSS theme being used
THEME = default

# If node is available then use node to run r.js
# otherwise use good old rhino/java
NODE = /usr/local/bin/node
HAS_NODE = $(shell if test -x ${NODE} ;then echo true; fi)

ifeq ($(HAS_NODE), true)
	RUN_JS = @@${NODE}
else
	RUN_JS = @@java -XX:ReservedCodeCacheSize=64m -classpath build/js.jar:build/google-compiler-20111003.jar org.mozilla.javascript.tools.shell.Main
endif

# Build Targets

# When no build target is specified, all gets ran
all: css js zip notify

clean:
	# -------------------------------------------------
	# Cleaning build output
	@@rm -rf ${OUTPUT}
	@@rm -rf tmp

# Create the output directory.
init:
	@@mkdir -p ${OUTPUT}

# Build and minify the CSS files
css: init
	# Build the CSS file with the theme included
	${RUN_JS} \
		external/r.js/dist/r.js \
		-o cssIn=css/themes/default/jquery.mobile.css \
		optimizeCss=standard.keepComments.keepLines \
		out=${OUTPUT}/${NAME}.compiled.css
	@@cat LICENSE-INFO.txt | ${VER} > ${OUTPUT}/${NAME}.css
	@@cat ${OUTPUT}/${NAME}.compiled.css >> ${OUTPUT}/${NAME}.css
	@@echo ${VER_MIN} > ${OUTPUT}/${NAME}.min.css
	@@java -XX:ReservedCodeCacheSize=64m \
		-jar build/yuicompressor-2.4.6.jar \
		--type css ${OUTPUT}/${NAME}.compiled.css >> ${OUTPUT}/${NAME}.min.css
	@@rm ${OUTPUT}/${NAME}.compiled.css
	# Build the CSS Structure-only file
	${RUN_JS} \
		external/r.js/dist/r.js \
		-o cssIn=css/structure/jquery.mobile.structure.css \
		out=${OUTPUT}/${STRUCTURE}.compiled.css
	@@cat LICENSE-INFO.txt | ${VER} > ${OUTPUT}/${STRUCTURE}.css
	@@cat ${OUTPUT}/${STRUCTURE}.compiled.css >> ${OUTPUT}/${STRUCTURE}.css
	# ..... and then minify it
	@@echo ${VER_MIN} > ${OUTPUT}/${STRUCTURE}.min.css
	@@java -XX:ReservedCodeCacheSize=64m \
		-jar build/yuicompressor-2.4.6.jar \
		--type css ${OUTPUT}/${STRUCTURE}.compiled.css >> ${OUTPUT}/${STRUCTURE}.min.css
	@@rm ${OUTPUT}/${STRUCTURE}.compiled.css
	# Build the theme only file
	@@cat LICENSE-INFO.txt | ${VER} > ${OUTPUT}/${THEME_FILENAME}.css
	@@cat css/themes/default/jquery.mobile.theme.css >> ${OUTPUT}/${THEME_FILENAME}.css
	# ..... and then minify it
	@@echo ${VER_MIN} > ${OUTPUT}/${THEME_FILENAME}.min.css
	@@java -XX:ReservedCodeCacheSize=64m \
		-jar build/yuicompressor-2.4.6.jar \
		--type css ${OUTPUT}/${THEME_FILENAME}.css >> ${OUTPUT}/${THEME_FILENAME}.min.css
	# Copy in the images
	@@cp -R css/themes/${THEME}/images ${OUTPUT}/
	# Css portion is complete.
	# -------------------------------------------------


docs: init js css
	# Create the Demos/Docs/Tests/Tools
	# ... Create staging directories
	@@mkdir -p tmp/demos/js
	@@mkdir -p tmp/demos/css/themes/${THEME}
	# ... Copy script files
	@@cp compiled/*.js tmp/demos/js
	@@cp js/jquery.js tmp/demos/js
	# ... Copy html files
	@@cp index.html tmp/demos
	@@cp -r docs tmp/demos
	# ... Copy css and images
	@@cp compiled/*.css tmp/demos/css/themes/${THEME}
	@@cp -r compiled/images tmp/demos/css/themes/${THEME}
	# ... replace "js/" with "js/jquery.mobile.js"
	@@ # NOTE the deletion here is required by gnu/bsd sed differences
	@@find tmp/demos \( -name '*.html' -o -name '*.php' \) -exec sed -i${SED_INPLACE_EXT} -e 's@js/"@js/${NAME}.js"@' {} \;
	@@find tmp/demos -name "*${SED_INPLACE_EXT}" -exec rm {} \;
	@@ # make sure the docs reference the right css file names (for deploy)
	@@find tmp/demos \( -name '*.html' -o -name '*.php' \) -exec sed -i${SED_INPLACE_EXT} -e 's@${BASE_NAME}.css"@${NAME}.css"@' {} \;
	@@find tmp/demos -name "*${SED_INPLACE_EXT}" -exec rm {} \;
	# ... Move and zip up the the whole folder
	@@rm -f ${OUTPUT}/${BASE_NAME}.docs.zip
	@@cd tmp/demos && zip -rq ../../${OUTPUT}/${NAME}.docs.zip *
	@@rm -rf ${OUTPUT}/demos && mv -f tmp/demos ${OUTPUT}
	# Finish by removing the temporary files
	@@rm -rf tmp
	# -------------------------------------------------

# Build and minify the JS files
js: init
	# Build the JavaScript file
	${RUN_JS} \
		external/r.js/dist/r.js \
	 	-o baseUrl="js" \
		name=jquery.mobile \
		exclude=jquery,../external/requirejs/order,../external/requirejs/depend,../external/requirejs/text,../external/requirejs/text!../version.txt \
		out=${OUTPUT}/${NAME}.compiled.js \
		pragmasOnSave.jqmBuildExclude=true \
		wrap.startFile=build/wrap.start \
		wrap.endFile=build/wrap.end \
		findNestedDependencies=true \
		skipModuleInsertion=true \
		optimize=none
	@@cat LICENSE-INFO.txt | ${VER} > ${OUTPUT}/${NAME}.js
	@@cat ${OUTPUT}/${NAME}.compiled.js | ${SED_VER_API} >> ${OUTPUT}/${NAME}.js
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
	@@rm -rf tmp/${NAME}/*.zip
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
# NOTE the clean (which removes previous build output) has been removed to prevent a gap in service
build_latest: css docs js zip
	# ... Copy over the lib js, avoid the compiled stuff, to get the defines for tests/unit/*
	@@ # TODO centralize list of built files
	@@find js -name "*.js" -not -name "*.docs.js" -not -name "*.mobile.js"  | xargs -L1 -I FILENAME cp FILENAME ${OUTPUT}/demos/js/

# Push the latest git version to the CDN. This is done on a post commit hook
deploy_latest:
	# Time to put these on the CDN
	@@scp -qr ${OUTPUT}/* jqadmin@code.origin.jquery.com:/var/www/html/code.jquery.com/mobile/latest/
	# -------------------------------------------------

# TODO target name preserved to avoid issues during refactor, latest -> deploy_latest
latest: build_latest deploy_latest

# Push the nightly backups. This is done on a server cronjob
deploy_nightlies:
	# Time to put these on the CDN
	@@scp -qr ${OUTPUT} jqadmin@code.origin.jquery.com:/var/www/html/code.jquery.com/mobile/nightlies/$$(date "+%Y%m%d")
	# -------------------------------------------------

# Deploy a finished release. This is manually done.
deploy: clean init css js docs zip
	# Deploying all the files to the CDN
	@@mkdir tmp
	@@cp -R ${OUTPUT} tmp/${VER_OFFICIAL}
	@@scp -qr tmp/* jqadmin@code.origin.jquery.com:/var/www/html/code.jquery.com/mobile/
	@@rm -rf tmp/${VER_OFFICIAL}
	@@mv ${OUTPUT}/demos tmp/${VER_OFFICIAL}
	# Create the Demos/Docs/Tests/Tools for jQueryMobile.com
	# ... By first replacing the paths
	@@ # TODO update jQuery Version replacement on deploy
	@@find tmp/${VER_OFFICIAL} -type f \
		\( -name '*.html' -o -name '*.php' \) \
		-exec perl -pi -e \
		's|src="(.*)${BASE_NAME}.js"|src="//code.jquery.com/mobile/${VER_OFFICIAL}/${NAME}.min.js"|g;s|href="(.*)${BASE_NAME}.css"|href="//code.jquery.com/mobile/${VER_OFFICIAL}/${NAME}.min.css"|g;s|src="(.*)jquery.js"|src="//code.jquery.com/jquery-1.7.1.min.js"|g' {} \;
	# ... So they can be copied to jquerymobile.com
	@@scp -qr tmp/* jqadmin@jquerymobile.com:/srv/jquerymobile.com/htdocs/demos/
	# Do some cleanup to wrap it up
	@@rm -rf tmp
	@@rm -rf ${OUTPUT}
	# -------------------------------------------------


