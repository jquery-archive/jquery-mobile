# Helper Variables
# The command to replace the @VERSION in the files with the actual version
VER = sed "s/v@VERSION/$$(git log -1 --format=format:"Git Build: SHA1: %H <> Date: %cd")/"
VER_MIN = "/*! jQuery Mobile v$$(git log -1 --format=format:"Git Build: SHA1: %H <> Date: %cd") jquerymobile.com | jquery.org/license */"
VER_OFFICIAL = $(shell cat version.txt)
SED_VER_API = sed 's/__version__/"${VER_OFFICIAL}"/g'
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
	# ..... and then copy in the images
	@@cp -R css/themes/${THEME}/images ${OUTPUT}/
	# Css portion is complete.
	# -------------------------------------------------


docs: init
	# Create the Demos/Docs/Tests/Tools
	# ... Build the docs bundle
	${RUN_JS} \
		external/r.js/dist/r.js \
	 	-o build/docs.build.js \
		dir=../tmp/demos
	# ... Prepend versioned license to jquery.mobile.js
	@@cat LICENSE-INFO.txt  | ${VER} > tmp/demos/LICENSE-INFO.txt
	@@cat tmp/demos/LICENSE-INFO.txt | cat - tmp/demos/js/jquery.mobile.js > tmp/demos/js/jquery.mobile.js.tmp
	@@cat tmp/demos/js/jquery.mobile.js.tmp | ${SED_VER_API} > tmp/demos/js/jquery.mobile.js
	# ... Prepend versioned license to jquery.mobile.docs.js
	@@cat tmp/demos/LICENSE-INFO.txt | cat - tmp/demos/js/jquery.mobile.docs.js > tmp/demos/js/jquery.mobile.docs.js.tmp
	@@cat tmp/demos/js/jquery.mobile.docs.js.tmp | ${SED_VER_API} > tmp/demos/js/jquery.mobile.docs.js
	# ... Prepend versioned license to jquery.mobile.css
	@@cat tmp/demos/LICENSE-INFO.txt | cat - tmp/demos/css/themes/default/${NAME}.css > tmp/demos/css/themes/default/${NAME}.css.tmp
	@@mv tmp/demos/css/themes/default/${NAME}.css.tmp tmp/demos/css/themes/default/${NAME}.css
	# ... replace "js/" with "js/jquery.mobile.docs.js"
	@@find tmp/demos -name "*.html" -exec sed -i 's@js/"@js/jquery.mobile.docs.js"@' {} \;
	# ... Move and zip up the the whole folder
	@@rm -f ${OUTPUT}/${NAME}.docs.zip
	@@cd tmp/demos && rm -f *.php && rm -f Makefile
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
		include=jquery.mobile \
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
# NOTE the clean (which removes previous build output) has been removed to prevent a gap in service
build_latest: css docs js zip

deploy_latest:
	# Time to put these on the CDN
	@@scp -qr ${OUTPUT}/* jqadmin@code.origin.jquery.com:/var/www/html/code.jquery.com/mobile/latest/
	# -------------------------------------------------

# Push the latest git version to the CDN. This is done on a post commit hook
# TODO target name preserved to avoid issues during refactor, latest -> deploy_latest
latest: build_latest deploy_latest

# Build the nightly backups. This is done on a server cronjob
nightlies: css js docs zip
	# Time to put these on the CDN
	@@mkdir -p tmp/nightlies
	@@mv ${OUTPUT} tmp/nightlies/$$(date "+%Y%m%d")
	@@scp -qr tmp/nightlies/* jqadmin@code.origin.jquery.com:/var/www/html/code.jquery.com/mobile/nightlies/
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
	# TODO update jQuery Version replacement on deploy
	@@find tmp/${VER_OFFICIAL} -type f \
		\( -name '*.html' -o -name '*.php' \) \
		-exec perl -pi -e \
		's|src="(.*)${NAME}.min.js"|src="//code.jquery.com/mobile/${VER_OFFICIAL}/${NAME}.min.js"|g;s|href="(.*)${NAME}.min.css"|href="//code.jquery.com/mobile/${VER_OFFICIAL}/${NAME}.min.css"|g;s|src="(.*)jquery.js"|src="//code.jquery.com/jquery-1.7.1.min.js"|g' {} \;
	# ... So they can be copied to jquerymobile.com
	@@scp -qr tmp/* jqadmin@jquerymobile.com:/srv/jquerymobile.com/htdocs/demos/
	# Do some cleanup to wrap it up
	@@rm -rf tmp
	@@rm -rf ${OUTPUT}
	# -------------------------------------------------


