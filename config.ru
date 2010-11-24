require "rubygems"
require 'sinatra'

set :public, File.dirname(__FILE__)

get '/' do
  open('index.html').read
end

get '/js' do
  redirect '/js/'
end

get '/js/' do
  content_type 'text/javascript'
	[
	'jquery.js',
	'jquery.ui.widget.js',
	'jquery.mobile.widget.js',
	'jquery.mobile.media.js',
	'jquery.mobile.support.js',
	'jquery.mobile.event.js',
	'jquery.mobile.hashchange.js',
	'jquery.mobile.core.js',
	'jquery.mobile.page.js',
	'jquery.ui.position.js',
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
	'jquery.mobile.grid.js'
	].reduce("") {|r, f| r << "\n\n" + open("js/#{f}").read }
end

get '/themes/default' do
  redirect '/themes/default/'
end

get '/themes/default/' do
  content_type "text/css"
  [
	'jquery.mobile.theme.css',
	'jquery.mobile.core.css',
	'jquery.mobile.transitions.css',
	'jquery.mobile.grids.css',
	'jquery.mobile.headerfooter.css',
	'jquery.mobile.navbar.css',
	'jquery.mobile.button.css',
	'jquery.mobile.collapsible.css',
	'jquery.mobile.controlgroup.css',
	'jquery.mobile.dialog.css',
	'jquery.mobile.forms.checkboxradio.css',
	'jquery.mobile.forms.fieldcontain.css',
	'jquery.mobile.forms.select.css',
	'jquery.mobile.forms.textinput.css',
	'jquery.mobile.listview.css',
	'jquery.mobile.forms.slider.css'
	].reduce("") {|r, f| r << "\n\n" + open("themes/default/#{f}").read }
end

run Sinatra::Application