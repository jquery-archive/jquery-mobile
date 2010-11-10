Early stage development for the jQuery Mobile UI Framework.
Code is subject to change dramatically!

Usage
=====

Early documentation: https://github.com/jquery/jquery-mobile/wiki/_pages

For now, I've set things up with a little combinator script to concat all the css and js files into one request and gzip. (js/ and themes/default)
You'll need to point your local apache & php webserver at this root directory in order to preview things. 

If you don't currently have a webserver running locally, a quick way to get up and running is to download and install Mamp for Mac OSX. Once installed, just open Mamp, click preferences, go to the Apache tab, and select your local jQuery Mobile folder as the root. Then you can open a browser to http://localhost:8888 to preview the code.
An alternative is XAMPP, which is also available for Windows, though you need to actually modify Apache's httpd.conf to point to your checkout: http://www.apachefriends.org/en/xampp.html
You need the Rewrite (mod_rewrite.so), Expire (mod_expires.so) and Header (mod_headers.so) modules loaded.

Whenever this configuration becomes inconvenient, we can remove it, obviously it's not meant to stay!

- when adding a js or css file, add it to the manifest in its directory and it'll be included in the request
- As far as JS files go, jQuery.mobile.js is the starting point.