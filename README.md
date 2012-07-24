# jQuery Mobile

This is the main repository for the jQuery Mobile project. From the [official website](http://jquerymobile.com):

> A unified, HTML5-based user interface system for all popular mobile device platforms, built on the rock-solid jQuery and jQuery UI foundation. Its lightweight code is built with progressive enhancement, and has a flexible, easily themeable design.

You can find more information about how the library works, and what it is capable of, by reading the [documentation](http://jquerymobile.com/demos/).

## Issues

When [submitting issues on github](https://github.com/jquery/jquery-mobile/issues/new) please include the following:

1. Issue description
2. Sample page using our [jsbin template](http://jsbin.com/orucec/edit#html) which uses latest code
3. Steps to reproduce
4. Expected outcome
5. Actual outcome
6. jQuery Mobile version
7. Browsers/platforms tested

Also, in the interest of creating more readable issues please include code snippets inside a triple backtick box appropriate for the JavaScript/HTML/CSS snippet you wish to discuss. More information is available at the [introduction page](http://github.github.com/github-flavored-markdown/) for github flavored markdown (see Syntax Highlighting).

Before opening a new ticket check if the same or a similar issue already has been reported. Tip: Besides the search tool of the issue tracker you can filter issues by label.

The jQuery Mobile [ThemeRoller](https://github.com/jquery/web-jquery-mobile-theme-roller) and [Download Builder](https://github.com/jquery/jquery-mobile-builder) have their own repo where you can report issues.

## Pull Requests

When submitting a pull request for review there are a few important steps you can take to ensure that it gets reviewed quickly and increase the chances that it will be merged (in order of descending importance):

1. Include tests (see [Testing](#testing))
2. Follow the [jQuery Core style guide](http://docs.jquery.com/JQuery_Core_Style_Guidelines)
3. Limit the scope to one Issue/Feature
4. Small focused commits, ideally less than 10 to 20 lines
5. Avoid merge commits (see Pro Git's [chapter on rebasing](http://git-scm.com/book/ch3-6.html), section [Rebasing](#rebasing) below)
6. Add the appropriate commit message (see below)

Taken together, the above reduces the effort that's required of the contributor reviewing your pull request.

### Commit messages

Commit messages should include four components:
* The WHERE - a single word that categorizes and provides context for the commit and its message, followed by a colon (:). This is typically the name of the plugin being worked on, but sometimes might be something like Build: or Docs:
* The WHAT - a sufficient summary of the fix or change made (example: modified the foo to no longer bar), followed by a period (.)
* The WHY #Num - the ticket number with a #sign so Trac creates a hyperlink (example: #1234), followed by a hyphen/dash (-)
* The WHY Name - the name of the ticket. Notice this is different than summary of the fix. This is a short description of the issue (example: dialog: IE6 crashed when foo is set to bar)

Combined into one, here's a full example:

        "Dialog: modified the foo to no longer bar. Fixed #1234 - dialog: IE6 crashed when foo is set to bar"
        \WHERE/:\------------- WHAT -------------/.\  WHY #Num /-\---------------- WHY Name ----------------/


## Build/Customization

Currently the library is shipped on the jQuery CDN/download as a single monolithic JavaScript file that depends on jQuery Core (not included) and a similarly bundled CSS file. For users we support the following build targets:

* `js` - resolve dependencies, build, concat, and minify the JavaScript used for jQuery Mobile
* `css` - resolve dependencies, build, concat, and minify all the css, just the structure css, and just the theme css
* `docs` - build the js and css, and make the docs ready for static consumption
* `zip` - package all the JavaScript and all the css into a zip archive

### Requirements

The `js` and `css` build targets require [node.js](http://nodejs.org/) and its packaged NPM package manager. For the other build targets, `docs` and `zip`, bash is also required. For more information on installing node please see its [documentation](http://nodejs.org/#download). As for bash it's generally installed as the default shell in many POSIX compliant environments (OSX, Linux, BSD, etc).

### Commands

With node installed you can run the `js` and `css` targets by simply issuing the following from the project root:

    npm install
    node node_modules/.bin/grunt js # or css

Note that if you have the appropriate version of [grunt](https://github.com/cowboy/grunt), our build tool, installed globally you can substitute `grunt` wherever you see `node node_modules/.bin/grunt`. For the remainder of the build documentation we will prefer the more concise `grunt`.

If you want to use the `docs` and `zip` targets you will need bash and they can be run with the following

   `grunt docs #` or `grunt zip`

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

And then run the build:

    grunt js

### CSS

To create a new theme:

1. Copy the `default` folder from CSS/Themes to a new folder named after your new theme (eg, `my-theme`).
2. Add customizations to the `jquery.mobile.theme.css` file.
3. From the project root run the following `grunt` command:

        THEME=my-theme grunt css

4. The output will be available in the `$PROJECT_ROOT/compiled`

Again this assumes the theme css files are available in the `css/themes/$THEME/` directory relative to the project root, `css/themes/my-theme/` in the example.

## Development

The root of the repository is also the root of the documentation and, along with the test suite, acts as the test bed for bug fixes and features. You'll need to set up a server and get the test suite running before you can contribute patches.

### Server

Most of the documentation and testing pages rely on PHP 5+, and as a result Apache and PHP are required for development. You can install them using one of the following methods:

* one-click - [MAMP](http://www.mamp.info/en/downloads/index.html) for OSX, [XAMP](http://www.apachefriends.org/en/xampp.html) for OSX/Windows
* existing web server - eg, `~/Sites` directory on OSX.
* virtual machine - If [Vagrant](http://vagrantup.com) is installed you can add [this remote/branch](https://github.com/johnbender/jquery-mobile/tree/vagrant) and `vagrant up`

In addition to vanilla Apache the following modules are required:

* Rewrite (mod\_rewrite.so)
* Expire (mod\_expires.so)
* Header (mod\_headers.so)

Once you have your web server setup you can point it at the project directory.

### Testing

Automated testing forms the backbone of the jQuery Mobile project's QA activities. As a contributor or patch submitter you will be expected to run the test suite for the code your patches affect. Our continuous integration server will address the remainder of the test suite.

There are two primary ways to run the test suite. Both of them require a server configured in the previously prescribed manner. The location of which will hereafter be referred to as `$WEB_SERVER` and should include the protocol. First, you can run the tests individually by directing your browser to the different test pages associated with the area in which you are working. For example, to run the tests for `js/jquery.mobile.forms.slider.js` visit `$WEB_SERVER/tests/unit/slider/`. To find out which test pages are available you can list them with:

    grunt config:test:pages

_NOTE_ See the [build requirements](#requirements) for node/grunt install information.

Second you can run the tests using the [PhantomJS](http://phantomjs.org/) headless Webkit browser which must be [installed](http://code.google.com/p/phantomjs/wiki/Installation). Once `phantomjs` is in your `PATH` the following will execute the whole test suite:

    JUNIT_OUTPUT=build/test-results/ ROOT_DOMAIN=$WEB_SERVER grunt test

You can confine the headless run to a single test page or set of test pages using the `TEST_PATH` environment variable. For example:

    TEST_PATH=slider JUNIT_OUTPUT=build/test-results/ ROOT_DOMAIN=$WEB_SERVER grunt test

will only run the tests where the path contains the string `slider`, eg `tests/unit/slider/`. *NOTE* that the phantom tests currently require that the web server be running to access and run the tests properly because of the PHP dependency that many of them share. Additionally the test suite is run against many versions of jQuery using the `JQUERY` environment variable. For example if you wanted to run the test suite against both of the currently supported versions 1.6.4, and 1.7.1 the command would take the following form:

    JQUERY=1.6.4,1.7.1 JUNIT_OUTPUT=build/test-results/ ROOT_DOMAIN=$WEB_SERVER grunt test

### Rebasing

Often times when working on a feature or bug fix branch it's useful to pull in the latest from the parent branch. If you're doing this _before_ submitting a pull request it's best to use git's rebase to apply your commits onto the latest from the parent branch. For example, working on `new-feature` branch where `upstream` is the remote at `git://github.com/jquery/jquery-mobile.git`:

    git checkout new-feature
    git fetch upstream
    git rebase upstream/master
    ## ... here you may have to resolve some conflicts ... ##

You can now push to your own fork and submit the pull request. Keep in mind that it's only a good idea to do this if you _haven't_ already submitted a pull request unless you want to create a new one because your origin remote (your fork) will report a discrepancy. Again, please refer to the [chapter](http://git-scm.com/book/ch3-6.html) in Pro Git on rebasing if you're new to it.
