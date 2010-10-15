
VER = $(shell cat version.txt)

MAX = jquery.mobile-${VER}.js
MIN = jquery.mobile-${VER}.min.js
CSS = jquery.mobile-${VER}.css
CSSMIN = jquery.mobile-${VER}.min.css

FILES = js/jquery.ui.widget.js \
  js/jquery.mobile.widget.js \
  js/jquery.mobile.support.js \
  js/jquery.mobile.event.js \
  js/jquery.mobile.hashchange.js \
  js/jquery.mobile.page.js \
  js/jquery.mobile.clickable.js \
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

css:
	@@head -8 js/jquery.mobile.js > ${CSS}
	@@cat ${CSSFILES} >> ${CSS}

cssmin:
	@@head -8 js/jquery.mobile.js > ${CSSMIN}
	@@java -jar build/yuicompressor-2.4.2.jar --type css ${CSS} >> ${CSSMIN}

mobile:
	@@head -8 js/jquery.mobile.js > ${MAX}
	@@cat ${FILES} >> ${MAX}

min: mobile
	@@head -8 js/jquery.mobile.js > ${MIN}
	@@java -jar ../jquery/build/google-compiler-20100917.jar --js ${MAX} --warning_level QUIET --js_output_file ${MIN}.tmp
	@@cat ${MIN}.tmp >> ${MIN}
	@@rm -f ${MIN}.tmp
