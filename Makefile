# The files to include when compiling the JS files
JSFILES = 	  js/jquery.ui.widget.js \
			  js/jquery.mobile.widget.js \
			  js/jquery.mobile.media.js \
			  js/jquery.mobile.support.js \
			  js/jquery.mobile.vmouse.js \
			  js/jquery.mobile.event.js \
			  js/jquery.mobile.hashchange.js \
			  js/jquery.mobile.page.js \
			  js/jquery.mobile.core.js \
			  js/jquery.mobile.navigation.js \
			  js/jquery.mobile.navigation.pushstate.js \
			  js/jquery.mobile.transition.js \
			  js/jquery.mobile.degradeInputs.js \
			  js/jquery.mobile.dialog.js \
			  js/jquery.mobile.page.sections.js \
			  js/jquery.mobile.collapsible.js \
			  js/jquery.mobile.fieldContain.js \
			  js/jquery.mobile.grid.js \
			  js/jquery.mobile.navbar.js \
			  js/jquery.mobile.listview.js \
			  js/jquery.mobile.listview.filter.js \
			  js/jquery.mobile.nojs.js \
			  js/jquery.mobile.forms.checkboxradio.js \
			  js/jquery.mobile.forms.button.js \
			  js/jquery.mobile.forms.slider.js \
			  js/jquery.mobile.forms.textinput.js \
			  js/jquery.mobile.forms.select.custom.js \
			  js/jquery.mobile.forms.select.js \
			  js/jquery.mobile.buttonMarkup.js \
			  js/jquery.mobile.controlGroup.js \
			  js/jquery.mobile.links.js \
			  js/jquery.mobile.fixHeaderFooter.js \
			  js/jquery.mobile.fixHeaderFooter.native.js \
			  js/jquery.mobile.init.js

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
VER_MIN = "/*! jQuery Mobile v${VER_OFFICIAL} jquerymobile.com | jquery.org/license */"
VER_OFFICIAL = $(shell cat version.txt)

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
	@@cat js/jquery.mobile.intro.js | ${VER} > ${OUTPUT}/${NAME}.css
	@@cat ${CSSTHEMEFILES} ${CSSFILES} >> ${OUTPUT}/${NAME}.css
	# ..... and then minify it
	@@echo ${VER_MIN} > ${OUTPUT}/${NAME}.min.css
	@@java -jar build/yuicompressor-2.4.6.jar --type css ${OUTPUT}/${NAME}.css >> ${OUTPUT}/${NAME}.min.css
	# Build the CSS Structure-only file
	@@cat js/jquery.mobile.intro.js | ${VER} > ${OUTPUT}/${STRUCTURE}.css
	@@cat ${CSSFILES} >> ${OUTPUT}/${STRUCTURE}.css
	# ..... and then minify it
	@@echo ${VER_MIN} > ${OUTPUT}/${STRUCTURE}.min.css
	@@java -jar build/yuicompressor-2.4.6.jar --type css ${OUTPUT}/${STRUCTURE}.css >> ${OUTPUT}/${STRUCTURE}.min.css
	# ..... and then copy in the images
	@@cp -R css/themes/${THEME}/images ${OUTPUT}/
	# Css portion is complete.
	# -------------------------------------------------


docs: init css js
	# Create the Demos/Docs/Tests/Tools
	@@mkdir -p tmp/${NAME}
	@@cp -r index.html docs experiments external js/jquery.js tests tmp/${NAME}/
	@@cp ${OUTPUT}/${NAME}.min.css ${OUTPUT}/${NAME}.min.js tmp/${NAME}/
	# ... Update the JavaScript and CSS paths
	@@find tmp/${NAME} -type f \
		\( -name '*.html' -o -name '*.php' \) \
		-exec perl -pi -e \
		's|js/"|${NAME}.min.js"|g;s|css/themes/default/|${NAME}.min.css|g;s|js/jquery.js"|jquery.js"|g' {} \;
	# ... Move and zip up the the whole folder
	@@zip -rq ${OUTPUT}/${NAME}.docs.zip tmp/${NAME}
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
	@@cat js/jquery.mobile.intro.js | ${VER} > ${OUTPUT}/${NAME}.js
	@@cat ${JSFILES} >> ${OUTPUT}/${NAME}.js
	# ..... and then minify it
	@@echo ${VER_MIN} > ${OUTPUT}/${NAME}.min.js
	@@java -jar build/google-compiler-20111003.jar --js ${OUTPUT}/${NAME}.js --warning_level QUIET >> ${OUTPUT}/${NAME}.min.js
	# -------------------------------------------------


# Output a message saying the process is complete
notify: init
	@@echo "The files have been built and are in: " $$(pwd)/${OUTPUT}
	# -------------------------------------------------


# Zip up the jQm files without docs
zip: init css js
	# Packaging up the files into a zip archive
	@@mkdir tmp
	@@cp -r ${OUTPUT} tmp/${NAME} 
	@@zip -rq ${OUTPUT}/${NAME}.zip tmp/${NAME}/
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
latest: init js css zip
	# Time to put these on the CDN
	@@scp -qr ${OUTPUT}/* jqadmin@code.origin.jquery.com:/var/www/html/code.jquery.com/mobile/latest/
	# Do some cleanup to wrap it up
	@@rm -rf ${OUTPUT}
	# -------------------------------------------------

# Build the nightly backups. This is done on a server cronjob
nightlies: init js css zip docs 
	# Time to put these on the CDN
	@@mkdir -p tmp/nightlies
	@@mv ${OUTPUT} tmp/nightlies/$$(date "+%Y%m%d")
	@@scp -qr tmp/nightlies/* jqadmin@code.origin.jquery.com:/var/www/html/code.jquery.com/mobile/nightlies/
	# Do some cleanup to wrap it up
	@@rm -rf tmp
	# -------------------------------------------------


# Deploy a finished release. This is manually done.
deploy: init js css docs zip
	# Deploying all the files to the CDN
	@@mkdir tmp
	@@cp -r ${OUTPUT} tmp/${VER_OFFICIAL}
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


