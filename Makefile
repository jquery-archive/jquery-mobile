
VER = $(shell cat version.txt)
SED_VER = sed "s/@VERSION/${VER}/"

DIR = jquery.mobile-${VER}
MAX = ${DIR}.js
MIN = ${DIR}.min.js
CSS = ${DIR}.css
CSSMIN = ${DIR}.min.css

FILES = js/jquery.ui.widget.js \
  js/jquery.mobile.widget.js \
  js/jquery.mobile.support.js \
  js/jquery.mobile.event.js \
  js/jquery.mobile.hashchange.js \
  js/jquery.mobile.page.js \
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
  js/jquery.mobile.js

CSSFILES =  themes/default/jquery.mobile.theme.css \
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

all: mobile min css cssmin

clean:
	@@rm -rf ${DIR}*

css:
	@@head -8 js/jquery.mobile.js | ${SED_VER} > ${CSS}
	@@cat ${CSSFILES} >> ${CSS}

cssmin: css
	@@head -8 js/jquery.mobile.js | ${SED_VER} > ${CSSMIN}
	@@java -jar build/yuicompressor-2.4.2.jar --type css ${CSS} >> ${CSSMIN}

mobile:
	@@head -8 js/jquery.mobile.js | ${SED_VER} > ${MAX}
	@@cat ${FILES} >> ${MAX}

min: mobile
	@@head -8 js/jquery.mobile.js | ${SED_VER} > ${MIN}
	@@java -jar build/google-compiler-20100917.jar --js ${MAX} --warning_level QUIET --js_output_file ${MIN}.tmp
	@@cat ${MIN}.tmp >> ${MIN}
	@@rm -f ${MIN}.tmp

zip: clean min cssmin
	@@mkdir -p ${DIR}
	@@cp ${DIR}*.js ${DIR}/
	@@cp ${DIR}*.css ${DIR}/
	@@cp -R themes/default/images ${DIR}/
	@@zip -r ${DIR}.zip ${DIR}

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

	@@find ${VER} -type f -name '*.html' -exec sed -i "" -e 's|"text/javascript" src="../../../js|"text/javascript" src="js|g' {} \;
	@@find ${VER} -type f -name '*.html' -exec sed -i "" -e 's|"text/javascript" src="../../js|"text/javascript" src="js|g' {} \;
	@@find ${VER} -type f -name '*.html' -exec sed -i "" -e 's|"text/javascript" src="../js|"text/javascript" src="js|g' {} \;

	@@find ${VER} -type f -name '*.html' -exec sed -i "" -e 's|rel="stylesheet"  href="../../../|rel="stylesheet"  href="|g' {} \;
	@@find ${VER} -type f -name '*.html' -exec sed -i "" -e 's|rel="stylesheet"  href="../../|rel="stylesheet"  href="|g' {} \;
	@@find ${VER} -type f -name '*.html' -exec sed -i "" -e 's|rel="stylesheet"  href="../|rel="stylesheet"  href="|g' {} \;

	@@find ${VER} -type f -name '*.html' -exec sed -i "" -e 's|href="themes/default"|href="http://code.jquery.com/mobile/${VER}/${DIR}.min.css"|g' {} \;
	@@find ${VER} -type f -name '*.html' -exec sed -i "" -e 's|<script type="text/javascript" src="js/all|<script src="http://code.jquery.com/jquery-1.4.3.min.js"></script><script type="text/javascript" src="js/all|' {} \;
	@@find ${VER} -type f -name '*.html' -exec sed -i "" -e 's|src="js/all"|src="http://code.jquery.com/mobile/${VER}/${DIR}.min.js"|g' {} \;

	@@scp -r ${VER} jqadmin@jquerymobile.com:/srv/jquerymobile.com/htdocs/demos/
