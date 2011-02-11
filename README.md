jQuery Mobile Framework
=====
http://jquerymobile.com


Demos and documentation
===================================
http://jquerymobile.com/test/


How to build your own jQuery Mobile CSS and JS files
===================================

Clone this repo and build the js and css files (you'll need Git and Make installed):

    git clone git://github.com/jquery/jquery-mobile.git
    cd jquery-mobile
    make

Two complete versions, one minified, one not, of jQuery Mobile js and css files will be created.


Submitting bugs
===================================

If you think you've found a bug, please visit the Issue tracker (https://github.com/jquery/jquery-mobile/issues) and create an issue explaining the problem and expected result. Be sure to include any relevant information for reproducing the issue, such as the browser/device (with version #), and the version of the jQuery Mobile code you're running. It also helps a lot to make sure that the bug still exists on jquerymobile.com/test/, as it's possible we may have fixed it already! 


Submitting patches
===================================

To contribute code and bug fixes to jQuery Mobile: fork this project on Github, make changes to the code in your fork, and then send a 
"pull request" to notify the team of updates that are ready to be reviewed for inclusion.


Running the jQuery Mobile demos & docs locally
===================================

To preview locally, you'll need to clone a local copy of this repository and point your Apache & PHP webserver at its root directory (a webserver is required, as PHP and .htaccess are used for combining development files).

If you don't currently have a webserver running locally, there are a few options. If you're on a Mac, you can try dropping jQuery Mobile into your sites folder and turning on Web Sharing via System Prefs. From there, you'll find a URL where you can browse folders in your sites directory from a browser.

Another quick way to get up and running is to download and install MAMP for Mac OSX. Once installed, just open MAMP, click preferences, go to the Apache tab, and select your local jQuery Mobile folder as the root. Then you can open a browser to http://localhost:8888 to preview the code.

Another alternative is XAMPP, which is also available for Windows, though you need to actually modify Apache's httpd.conf to point to your checkout: http://www.apachefriends.org/en/xampp.html
You need the Rewrite (mod_rewrite.so), Expire (mod_expires.so) and Header (mod_headers.so) modules loaded.




