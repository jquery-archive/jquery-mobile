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
  
  open('js/includes.txt').each_line.reduce("") do |result, f| 
    result << "\n\n" + open("js/#{f.strip}").read 
  end
end

get '/themes/default' do
  redirect '/themes/default/'
end

get '/themes/default/' do
  content_type "text/css"
  
  open('themes/default/includes.txt').each_line.reduce("") do |result, f| 
    result << "\n\n" + open("themes/default/#{f.strip}").read
  end
end

run Sinatra::Application