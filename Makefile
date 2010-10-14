
VER = $(shell cat version.txt)

MAX = jquery.mobile-${VER}.js
MIN = jquery.mobile-${VER}.min.js

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
  js/jquery.mobile.forms.ajaxform.js \
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

all: mobile min

mobile:
	@@head -8 js/jquery.mobile.js > ${MAX}
	@@cat ${FILES} >> ${MAX}

min: mobile
	@@head -8 js/jquery.mobile.js > ${MIN}
	@@java -jar ../jquery/build/google-compiler-20100917.jar --js ${MAX} --warning_level QUIET --js_output_file ${MIN}.tmp
	@@cat ${MIN}.tmp >> ${MIN}
	@@rm -f ${MIN}.tmp
