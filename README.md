Early stage development for the jQuery Mobile UI Framework.
Code is subject to change dramatically!

Usage
=====
For now, I've set things up with a little combinator script to concat all the css and js files into one request and gzip. (js/all and css/all)
You'll need to point your local apache & php webserver at this root directory in order to preview things. 

If you don't currently have a webserver running locally, a quick way to get up and running is to download and install Mamp for Mac OSX. Once installed, just open Mamp, click preferences, go to the Apache tab, and select your local jQuery Mobile folder as the root. Then you can open a browser to http://localhost:8888 to preview the code.

Whenever this configuration becomes inconvenient, we can remove it, obviously it's not meant to stay!

- when adding a js or css file, add it to the manifest in its directory and it'll be included in the request
- As far as JS files go, jQuery.mobile.js is the starting point.