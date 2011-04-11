# The system generated date in YYYYMMDD format
DATE = $(shell date "+%Y%m%d")

# The version according to the source file
# To use for the nightly build, pass in VER=nightly-$(date "+%Y%m%d") to the make file
VER = $(shell cat version.txt)

# The command to replace the @VERSION in the files with the actual version
SED_VER = sed "s/@VERSION/${VER}/"

DIR = jquery.mobile-${VER}
OUTPUT = dist
MAX = ${DIR}.js
MIN = ${DIR}.min.js
CSS = ${DIR}.css
CSSMIN = ${DIR}.min.css

FILES = 	  js/jquery.ui.widget.js \
			  js/jquery.mobile.widget.js \
			  js/jquery.mobile.media.js \
			  js/jquery.mobile.support.js \
			  js/jquery.mobile.vmouse.js \
			  js/jquery.mobile.event.js \
			  js/jquery.mobile.hashchange.js \
			  js/jquery.mobile.page.js \
			  js/jquery.mobile.core.js \
			  js/jquery.mobile.navigation.js \
			  js/jquery.mobile.fixHeaderFooter.js \
			  js/jquery.mobile.forms.checkboxradio.js \
			  js/jquery.mobile.forms.textinput.js \
			  js/jquery.mobile.forms.select.js \
			  js/jquery.mobile.buttonMarkup.js \
			  js/jquery.mobile.forms.button.js \
			  js/jquery.mobile.forms.slider.js \
			  js/jquery.mobile.collapsible.js \
			  js/jquery.mobile.controlGroup.js \
			  js/jquery.mobile.fieldContain.js \
			  js/jquery.mobile.listview.js \
			  js/jquery.mobile.listview.filter.js \
			  js/jquery.mobile.dialog.js \
			  js/jquery.mobile.navbar.js \
			  js/jquery.mobile.grid.js \
			  js/jquery.mobile.init.js

CSSFILES =    themes/default/jquery.mobile.theme.css \
			  themes/default/jquery.mobile.core.css \
			  themes/default/jquery.mobile.transitions.css \
			  themes/default/jquery.mobile.grids.css \
			  themes/default/jquery.mobile.headerfooter.css \
			  themes/default/jquery.mobile.navbar.css \
			  themes/default/jquery.mobile.button.css \
			  themes/default/jquery.mobile.collapsible.css \
			  themes/default/jquery.mobile.controlgroup.css \
			  themes/default/jquery.mobile.dialog.css \
			  themes/default/jquery.mobile.forms.checkboxradio.css \
			  themes/default/jquery.mobile.forms.fieldcontain.css \
			  themes/default/jquery.mobile.forms.select.css \
			  themes/default/jquery.mobile.forms.textinput.css \
			  themes/default/jquery.mobile.listview.css \
			  themes/default/jquery.mobile.forms.slider.css

all: init mobile min css cssmin 

css: init
	@@head -8 js/jquery.mobile.core.js | ${SED_VER} > ${OUTPUT}/${CSS}
	@@cat ${CSSFILES} >> ${OUTPUT}/${CSS}

cssmin: init css
	@@head -8 js/jquery.mobile.core.js | ${SED_VER} > ${OUTPUT}/${CSSMIN}
	@@java -jar build/yuicompressor-2.4.4.jar --type css ${OUTPUT}/${CSS} >> ${OUTPUT}/${CSSMIN}

mobile: init
	@@head -8 js/jquery.mobile.core.js | ${SED_VER} > ${OUTPUT}/${MAX}
	@@cat ${FILES} >> ${OUTPUT}/${MAX}

min: init mobile
	@@head -8 js/jquery.mobile.core.js | ${SED_VER} > ${OUTPUT}/${MIN}
	@@java -jar build/google-compiler-20100917.jar --js ${OUTPUT}/${MAX} --warning_level QUIET --js_output_file ${MIN}.tmp
	@@cat ${MIN}.tmp >> ${OUTPUT}/${MIN}
	@@rm -f ${MIN}.tmp

init:
	@@mkdir ${OUTPUT}

pull: 
	# Pull in the latest commits
	@@git pull upstream master

zip: init mobile min css cssmin
	# Zip up the files into an easily downloadable pacakge
	@@rm -rf ${DIR}
	@@mkdir -p ${DIR}
	@@cp ${OUTPUT}/${DIR}*.js ${DIR}/
	@@cp ${OUTPUT}/${DIR}*.css ${DIR}/
	@@cp -R themes/default/images ${DIR}/
	@@zip -r ${OUTPUT}/${DIR}.zip ${DIR}
	@@rm -fr ${DIR}


# Used by the jQuery team to make the nightly builds
nightly: pull zip
	# Create a log that lists the current vrsion according to the code and the git information for the last commit
	@@echo "Git Release Version: " >> ${OUTPUT}/log.txt
	@@cat version.txt >> ${OUTPUT}/log.txt
	@@echo "Git Information for this build:" >> ${OUTPUT}/log.txt
	@@git log -1 --format=format:"SHA1: %H %nDate: %cd %nTitle: %s" >> ${OUTPUT}/log.txt
	
	# Create the folder to hold the files for the demos
	@@mkdir -p ${VER}

	# Copy in the base stuff for the demos
	@@cp -r index.html themes experiments docs ${VER}/

	# First change all the paths from super deep to the same level for JS files
	@@find ${VER} -type f -name '*.html' -exec sed -i 's|src="../../../js|src="js|g' {} \;
	@@find ${VER} -type f -name '*.html' -exec sed -i 's|src="../../js|src="js|g' {} \;
	@@find ${VER} -type f -name '*.html' -exec sed -i 's|src="../js|src="js|g' {} \;

	# Then change all the paths from super deep to the same level for CSS files
	@@find ${VER} -type f -name '*.html' -exec sed -i 's|media="only all"||g' {} \;
	@@find ${VER} -type f -name '*.html' -exec sed -i 's|rel="stylesheet"  href="../../../|rel="stylesheet"  href="|g' {} \;
	@@find ${VER} -type f -name '*.html' -exec sed -i 's|rel="stylesheet"  href="../../|rel="stylesheet"  href="|g' {} \;
	@@find ${VER} -type f -name '*.html' -exec sed -i 's|rel="stylesheet"  href="../|rel="stylesheet"  href="|g' {} \;

	# Change the empty paths to the location of this nightly file
	@@find ${VER} -type f -name '*.html' -exec sed -i 's|href="themes/default/"|href="http://jquerymobile.com/nightlies/${DATE}/${DIR}.min.css"|g' {} \;
	@@find ${VER} -type f -name '*.html' -exec sed -i 's|src="js/jquery.js"|src="http://code.jquery.com/jquery-1.5.min.js"|' {} \;
	@@find ${VER} -type f -name '*.html' -exec sed -i 's|src="js/"|src="http://jquerymobile.com/nightlies/${DATE}/${DIR}.min.js"|g' {} \;	

	# Move the demos into the output folder
	@@mv ${VER} ${OUTPUT}/demos

	# Move the output folder to the nightlies folder
	@@mv ${OUTPUT} ../htdocs/nightlies/${DATE}


# Used by the jQuery team to deploy a build to the CDN
deploy: zip
	# Deploy to CDN
	@@mv ${DIR} ${VER}
	@@cp ${DIR}.zip ${VER}/
	@@scp -r ${VER} jqadmin@code.origin.jquery.com:/var/www/html/code.jquery.com/mobile/
	@@mv ${VER} ${DIR}

	# Deploy Demos
	@@mkdir -p ${VER}
	@@cp -r index.html themes experiments docs ${VER}/

	@@find ${VER} -type f -name '*.html' -exec sed -i "" -e 's|src="../../../js|src="js|g' {} \;
	@@find ${VER} -type f -name '*.html' -exec sed -i "" -e 's|src="../../js|src="js|g' {} \;
	@@find ${VER} -type f -name '*.html' -exec sed -i "" -e 's|src="../js|src="js|g' {} \;

	@@find ${VER} -type f -name '*.html' -exec sed -i "" -e 's|media="only all"||g' {} \;
	@@find ${VER} -type f -name '*.html' -exec sed -i "" -e 's|rel="stylesheet"  href="../../../|rel="stylesheet"  href="|g' {} \;
	@@find ${VER} -type f -name '*.html' -exec sed -i "" -e 's|rel="stylesheet"  href="../../|rel="stylesheet"  href="|g' {} \;
	@@find ${VER} -type f -name '*.html' -exec sed -i "" -e 's|rel="stylesheet"  href="../|rel="stylesheet"  href="|g' {} \;

	@@find ${VER} -type f -name '*.html' -exec sed -i "" -e 's|href="themes/default/"|href="http://code.jquery.com/mobile/${VER}/${DIR}.min.css"|g' {} \;
	@@find ${VER} -type f -name '*.html' -exec sed -i "" -e 's|src="js/jquery.js"|src="http://code.jquery.com/jquery-1.5.min.js"|' {} \;
	@@find ${VER} -type f -name '*.html' -exec sed -i "" -e 's|src="js/"|src="http://code.jquery.com/mobile/${VER}/${DIR}.min.js"|g' {} \;

	@@scp -r ${VER} jqadmin@jquerymobile.com:/srv/jquerymobile.com/htdocs/demos/
