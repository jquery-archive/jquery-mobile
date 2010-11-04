require 'fileutils'

GOOGLE_JS_COMPRESSOR = File.join('build', 'google-compiler-20109917.jar')
YUI_JS_COMPRESSOR = File.join('build', 'yuicompressor-2.4.2.jar')

def compress_js(scripts, compressor)
  min_js = ''
  if (compressor.downcase == "google")
    cmd = %Q/java -jar "#{GOOGLE_JS_COMPRESSOR}" --charset utf8/
  else
    cmd = %Q/java -jar "#{YUI_JS_COMPRESSOR}" --type js --charset utf8/
  end
  IO.popen(cmd, 'r+') { |f| f.print(scripts); f.close_write; min_js = f.read }
  min_js
end

def compress_css(scripts)
  min_css = ''
  cmd = %Q/java -jar "#{YUI_JS_COMPRESSOR}" --type js/
  IO.popen(cmd, 'r+') { |f| f.print(scripts); f.close_write; min_css = f.read }
  min_css
end

def concat_files(files)
  out = ''
  files.each do |file| 
    out += file
  end
  out
end

def all_files(pattern) 
  FileList[pattern].collect {|filename| File.read(filename)}.join "\n\n"
end

all_scripts = [
  'jquery.js',
  'jquery.ui.widget.js',
  'jquery.mobile.widget.js',
  'jquery.mobile.support.js',
  'jquery.mobile.event.js',
  'jquery.mobile.hashchange.js',
  'jquery.mobile.page.js',
  'jquery.mobile.fixHeaderFooter.js',
  'jquery.mobile.forms.checkboxradio.js',
  'jquery.mobile.forms.textinput.js',
  'jquery.mobile.forms.select.js',
  'jquery.mobile.buttonMarkup.js',
  'jquery.mobile.forms.button.js',
  'jquery.mobile.forms.slider.js',
  'jquery.mobile.collapsible.js',
  'jquery.mobile.controlGroup.js',
  'jquery.mobile.fieldContain.js',
  'jquery.mobile.listview.js',
  'jquery.mobile.listview.filter.js',
  'jquery.mobile.dialog.js',
  'jquery.mobile.navbar.js',
  'jquery.mobile.grid.js',
  'jquery.mobile.js'#,
  #'jquery.mobile.themeswitcher.js'
].collect {|filename| File.read(File.join('js', filename))}.join "\n\n"

all_stylesheets = [
  'default/jquery.mobile.theme.css',
  'default/jquery.mobile.core.css',
  'default/jquery.mobile.transitions.css',
  'default/jquery.mobile.grids.css',
  'default/jquery.mobile.headerfooter.css',
  'default/jquery.mobile.navbar.css',
  'default/jquery.mobile.button.css',
  'default/jquery.mobile.collapsible.css',
  'default/jquery.mobile.controlgroup.css',
  'default/jquery.mobile.dialog.css',
  'default/jquery.mobile.forms.checkboxradio.css',
  'default/jquery.mobile.forms.fieldcontain.css',
  'default/jquery.mobile.forms.select.css',
  'default/jquery.mobile.forms.textinput.css',
  'default/jquery.mobile.listview.css',
  'default/jquery.mobile.forms.slider.css'
].collect {|filename| File.read(File.join('themes', filename))}.join "\n\n"

task :default do
	#JavaScripts
	open('js/all.js', 'w') do |f|
		f.print concat_files(all_scripts)
	end

	open('js/all.min.js', 'w') do |f|
		f.print compress_js(all_scripts, "yui")
	end

	#Stylesheets
	open('themes/default/default.css', 'w') do |f|
		f.print concat_files(all_stylesheets)
	end

	#open('themes/default.min.css', 'w') do |f|
	#  f.print compress_css(all_stylesheets)
	#end
end