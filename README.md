# jQuery Mobile

This is the main repository for the jQuery Mobile project. From the [official website](http://jquerymobile.com):

> A unified, HTML5-based user interface system for all popular mobile device platforms, built on the rock-solid jQuery and jQuery UI foundation. Its lightweight code is built with progressive enhancement, and has a flexible, easily themeable design.

You can find more information about how the library works, and what it is capable of, by reading the [documentation](http://jquerymobile.com/demos/).

## Issues

When [submitting issues on github](https://github.com/jquery/jquery-mobile/issues/new) please include the following:

1. Issue description
2. Sample page using our [jsbin template (TODO get link)](http://jsbin.com/awoluv/edit#html)
3. Steps to reproduce
4. Expected outcome
5. Actual outcome
6. Browers tested

Also, in the interest of creating more readable issues please include code snippets inside a triple backtick box appropriate for the JavaScript/HTML/CSS snippet you wish to discuss. More information is available at the [introduction page](http://github.github.com/github-flavored-markdown/) for github flavored markdown (see, Syntax Highlighting).

## Pull Requests

When submitting a pull request for review there are few important steps you can take to ensure that it gets reviewed quickly and increase the chances that it will be merged (in order of descending importance):

1. Include tests (see [Development](#development))
2. Follow the [jQuery Core style guide](http://docs.jquery.com/JQuery_Core_Style_Guidelines)
3. Limit the scope to one Issue/Feature
4. Small focused commits, ideally less than 10 to 20 lines
5. Avoid merge commits (see Pro Git's chapter on [Rebasing](http://git-scm.com/book/ch3-6.html))

Taken together, the above reduces the effort that's required of the contributor reviewing your pull request.

## Build/Customization

Currently the library is shipped on the jQuery CDN/download as a single monolithic JavaScript file that depends on jQuery Core (not included) and a similarly bundled CSS file. For users we support the following build targets:

1. `js` - resolve dependencies, build, concat, and minify the JavaScript used for jQuery Mobile
2. `css` - resolve dependencies, build, concat, and minify all the css, just the structure css, and just the theme css
3. `docs` - build the js and css, and make the docs ready for static consumption
4. `zip` - package the documentation in zip format for distribution

### Requirements

The build requires [node.js](http://nodejs.org/) and its packaged npm package manager. For other build targets like `docs` and `zip` it also requires at least a Bash shell with the addition of Make providing a layer of user friendliness if necessary.

For more information on installing node please see its [documentation](http://nodejs.org/#download). For Bash and Make please refer to the appropriate documentation for your opperating system.

### Commands

With node installed you can run the `js` and `css` targets by simply issuing the following from the project root:

    npm install
    node node_modules/.gin/grunt js # or css

Note that if you have the appropriate version of [grunt](https://github.com/cowboy/grunt), our build tool, installed globally you can substitute `grunt` whereever you see `node node_modules/.gin/grunt`. For the remainder of the build documentation we will prefer the more concise `grunt`.

If you want to use the `docs` and `zip` targets you will need bash and they can be run with the following

   grunt docs # or `grunt zip`

Alternatively if you have `make` installed on your system

   make docs # or `make zip`

### JavaScript

As of version 1.1 the library uses dependency management in the JavaScript build by providing [AMD modules](https://github.com/amdjs/amdjs-api/wiki/AMD) which can be added or removed from the core mobile meta module `js/jquery.mobile.js`.

For example, if a user wished to exclude the form widgets to reduce the wire weight of their jQuery Mobile include they would first remove them from the meta module:

```diff
diff --git a/js/jquery.mobile.js b/js/jquery.mobile.js
index 6200fe6..3a4625c 100644
--- a/js/jquery.mobile.js
+++ b/js/jquery.mobile.js
@@ -19,12 +19,6 @@ define([
        './jquery.mobile.listview.filter',
        './jquery.mobile.listview.autodividers',
        './jquery.mobile.nojs',
-       './jquery.mobile.forms.checkboxradio',
-       './jquery.mobile.forms.button',
-       './jquery.mobile.forms.slider',
-       './jquery.mobile.forms.textinput',
-       './jquery.mobile.forms.select.custom',
-       './jquery.mobile.forms.select',
        './jquery.mobile.buttonMarkup',
        './jquery.mobile.controlGroup',
        './jquery.mobile.links',
```

And then run the build (for platform variations see [Posix](#posix) or [Windows](#windows))

    grunt js

### CSS

To build using a custom theme simply specify the name with an environment variable.

    THEME=valencia grunt css

This assumes the theme css files are available in the `css/theme/$THEME/` directory relative to the project root.

### Posix

### Windows

The additonal dependency on node.js in the interest of providing users on non posix platforms with the ability to compile at least the CSS and JavaScript.

## Development

### Server

### Testing



=======================
[Official Site: http://jquerymobile.com](http://jquerymobile.com)

[Demos and Documentation](http://jquerymobile.com/test/)

How to build your own jQuery Mobile CSS and JS files
====================================================
Clone this repo and build the js and css files (you'll need Git and Make installed):

    git clone git://github.com/jquery/jquery-mobile.git
    cd jquery-mobile
    make

A full version and a minified version of the jQuery Mobile JavaScript and CSS files will be created
in a folder named "compiled". There is also now a Structure only css file so you can add your own theme on top of it.

Alternatively if you have node.js installed you can run

    npm install
    node node_modules/.bin/grunt <js|css>

to build either the js or css. This is usefull especially if you're on Windows without support for the make tool and bash.

How to build a self-contained version of the Docs/Demos
=======================================================
Once you have your own cloned repo on your computer:

    make docs

The docs will be built and available in the compiled/demos folder. You can move this folder to your web server or
other location. It has no dependencies on anything other than a basic HTML web server.



Submitting bugs
===============
If you think you've found a bug, please report it by following these instructions:

1. Visit the [Issue tracker: https://github.com/jquery/jquery-mobile/issues](https://github.com/jquery/jquery-mobile/issues)
2. Create an issue explaining the problem and expected result
    - Be sure to include any relevant information for reproducing the issue
    - Include information such as:
        * Browser/device (with version #)
        * The version of the jQuery Mobile code you're running
        * If you are running from a git version, include the date and/or hash number
    - Make sure that the bug still exists at http://jquerymobile.com/test/ as it may be fixed already
    - You can use the CDN hosted JS and CSS files to test in your own code by using:
        * [JS](http://code.jquery.com/mobile/latest/jquery.mobile.min.js)
        * [CSS](http://code.jquery.com/mobile/latest/jquery.mobile.min.css)
    - Include a link to some code of the bug in action. You can use either of these services to host your code
        * [jsbin](http://jsbin.com)
        * [jsfiddle](http://jsfiddle.net)
3. Submit the issue.

Recommended: [JS Bin issue template with instructions](http://jsbin.com/awoluv/edit)

Issues concerning the jQuery Mobile Theme Roller can be submitted at the [Theme Roller repo: https://github.com/jquery/web-jquery-mobile-theme-roller](https://github.com/jquery/web-jquery-mobile-theme-roller)

Submitting patches
==================
To contribute code and bug fixes to jQuery Mobile: fork this project on Github, make changes to the code in your fork,
and then send a "pull request" to notify the team of updates that are ready to be reviewed for inclusion.

Detailed instructions can be found at [jQuery Mobile Patching](https://gist.github.com/1294035)

Running the jQuery Mobile demos & docs locally
==============================================
To preview locally, you'll need to clone a local copy of this repository and point your Apache & PHP webserver at its
root directory (a webserver is required, as PHP and .htaccess are used for combining development files).

If you don't currently have a webserver running locally, there are a few options.

If you're on a Mac, you can try dropping jQuery Mobile into your sites folder and turning on Web Sharing via System
Prefs. From there, you'll find a URL where you can browse folders in your sites directory from a browser.

Another quick way to get up and running is to download and install MAMP for Mac OSX. Once installed, just open MAMP,
click preferences, go to the Apache tab, and select your local jQuery Mobile folder as the root. Then you can open a
browser to http://localhost:8888 to preview the code.

Another alternative is XAMPP (Mac, Windows). You need to actually modify Apache's httpd.conf to point to your checkout:
[Instructions](http://www.apachefriends.org/en/xampp.html)

You need the following Apache modules loaded:

* Rewrite (mod\_rewrite.so)
* Expire (mod\_expires.so)
* Header (mod\_headers.so)

Alternatively, with the addition of async loading, you can use the python simple http server from the project root:

    $ python -m SimpleHTTPServer 8000

And in your browser visit [localhost:8000](http://localhost:8000/tests/unit/core/). NOTE: The docs will not load as they are dependent on the "/js/" includes which require php. For other development work such as unit tests and custom test pages using

    <script data-main="js/jquery.mobile.docs" src="external/requirejs/require.js"></script>

will allow you to load modules asynchronously without php. Please note that the example above assumes it's inclusion in a page at the root of the directory in which the simple http server was run.

AMD Support in Development
==========================

Please bear in mind that async loading is not supported for production and is primarily used for the project's build process. As a result developers should expect an initial flash of unstyled content, which will not occur when the library is compiled.

If you find dependency bugs when using the async loading support for development please log them in the github issue tracker.

Building With A Custom Theme
============================
To use a custom theme in your own build, you'll need Make installed. You can find the themes in the CSS/Themes folder.
To create a new theme:

1. Copy the `Default` folder from CSS/Themes to a new folder in the same location. The name of the folder will be the
theme's name. For testing locally, make sure the index.php file is copied as well.
2. Edit the `jquery.mobile.theme.css` file so it contains your custom fonts and colors.
3. Once you are done editing your files and saving them, open a terminal.
4. Navigate to the jQuery-Mobile folder's root.
5. Run the following command to build jQuery-Mobile (THEME is the name of the folder for your theme from step 1.):

    make THEME=YourThemeName

6. The compiled files will be located in the "compiled" folder in the root of jQuery-Mobile.
