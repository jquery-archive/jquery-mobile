# jQuery Mobile [![Build Status](https://travis-ci.org/jquery/jquery-mobile.png?branch=master)](https://travis-ci.org/jquery/jquery-mobile)

This is the main repository for the jQuery Mobile project. From the [official website](http://jquerymobile.com):

> A unified, HTML5-based user interface system for all popular mobile device platforms, built on the rock-solid jQuery and jQuery UI foundation. Its lightweight code is built with progressive enhancement, and has a flexible, easily themeable design.

jQuery Mobile 1.3 (1.3.0) works with versions of jQuery core from 1.7.0 to 1.9.0. You can find more information about how the library works, and what it is capable of, by reading the [documentation](http://jquerymobile.com/demos/).

## Contributing

You can contribute to the project by reporting issues, suggesting new features, or submitting pull requests.
Please read our [Contributing Guidelines](https://github.com/jquery/jquery-mobile/blob/master/CONTRIBUTING.md) before submitting.


## Build/Customization

Currently the library is shipped on the jQuery CDN/download as a single monolithic JavaScript file that depends on jQuery Core (not included) and a similarly bundled CSS file. For users we support the following build targets:

* `js` - resolve dependencies, build, concat, and minify the JavaScript used for jQuery Mobile
* `css` - resolve dependencies, build, concat, and minify all the css, just the structure css, and just the theme css
* `demos` - build the js and css, and make the docs ready for static consumption
* `zip` - package all the JavaScript and all the css into a zip archive
* `dist` (default target) - all of the above
* `lint` - Validates JavaScript files using [JSHint](http://jshint.com/)

### Download Builder

The easiest way to obtain a custom build is to use the [download builder](http://jquerymobile.com/download-builder/). With it, you can select the parts of the library you need and both the CSS and JavaScript dependencies will be resolved for you as a packaged/minified whole.

### Requirements

* [Node.js](http://nodejs.org/) ~0.8.22
* [Grunt](http://gruntjs.com/) >=0.4.0 

### Commands

With node and grunt installed you can run the default target by simply issuing the following from the project root:

    npm install
    grunt

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

4. The output will be available in the `$PROJECT_ROOT/dist`

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

You can run the all the test suites by running:

    grunt test

You can choose to run only a subset of the tests by adding the `--suites` option like:
    
    grunt test --suites=button,slider
    
will only run the tests under `tests/unit/button/` and `tests/unit/slider/`. 

You can also specify which versions of jQuery you want to test jQuery Mobile with by using the `--jqueries` option:

    grunt test --jqueries=1.8.2,git

### Rebasing

Often times when working on a feature or bug fix branch it's useful to pull in the latest from the parent branch. If you're doing this _before_ submitting a pull request it's best to use git's rebase to apply your commits onto the latest from the parent branch. For example, working on `new-feature` branch where `upstream` is the remote at `git://github.com/jquery/jquery-mobile.git`:

    git checkout new-feature
    git fetch upstream
    git rebase upstream/master
    ## ... here you may have to resolve some conflicts ... ##

You can now push to your own fork and submit the pull request. Keep in mind that it's only a good idea to do this if you _haven't_ already submitted a pull request unless you want to create a new one because your origin remote (your fork) will report a discrepancy. Again, please refer to the [chapter](http://git-scm.com/book/ch3-6.html) in Pro Git on rebasing if you're new to it.
