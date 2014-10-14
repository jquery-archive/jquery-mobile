# Contributing to jQuery Mobile

Welcome! Thanks for your interest in contributing to jQuery Mobile. You're **almost** in the right place. More information on how to contribute to this and all other jQuery Foundation projects is over at [contribute.jquery.org](http://contribute.jquery.org). You'll definitely want to take a look at the articles on contributing [code](http://contribute.jquery.org/code).

You may also want to take a look at our [commit & pull request guide](http://contribute.jquery.org/commits-and-pull-requests/) and [style guides](http://contribute.jquery.org/style-guide/) for instructions on how to maintain your fork and submit your code. Before we can merge any pull request, we'll also need you to sign our [contributor license agreement](http://contribute.jquery.org/cla).

You can find us on [IRC](http://irc.jquery.org), specifically in #jqueryui-dev should you have any questions. If you've never contributed to open source before, we've put together [a short guide with tips, tricks, and ideas on getting started](http://contribute.jquery.org/open-source/).


## Getting Involved

More information about the project, the jQuery Mobile team, our weekly meetings, and how to get more involved can be found on the "[About](http://jquerymobile.com/about/)" page on the project website. On this page we provide project specific information regarding [reporting bugs](#issues), [suggesting new features](#feature-requests), and [contributing code or content](#pull-requests). Please take a moment to read this before opening a ticket or submitting a pull request. 


## Issues

If you encounter a bug in the framework you can report it on the issue tracker here on Github. Questions about how to use the framework or problems with your custom code can be posted on the [forum](https://forum.jquery.com/jquery-mobile).
The jQuery Mobile [API Documentation](https://github.com/jquery/api.jquerymobile.com), [ThemeRoller](https://github.com/jquery/themeroller.jquerymobile.com) and [Download Builder](https://github.com/jquery/jquerymobile.com) have their own repo where you can report issues.

Before opening a new issue please check if the same or a similar issue already has been reported. Tip: Besides the search tool of the issue tracker you can filter issues by label.

When [submitting an issue](https://github.com/jquery/jquery-mobile/issues/new) include the following:

1. Issue description
2. Test page (see below)
3. Steps to reproduce
4. Expected outcome
5. Actual outcome
6. Platforms/browsers (including version) and devices tested
7. jQuery Mobile and jQuery core version used
8. Other relevant information, e.g. using Apache Cordova

In the interest of creating readable issues please include code snippets inside a triple backtick box appropriate for the JavaScript, CSS, or HTML snippet you wish to discuss. More information is available on the [introduction page](http://github.github.com/github-flavored-markdown/) for GitHub Flavored Markdown (see Syntax Highlighting).


### Test page

It is IMPORTANT that you always provide a test page when submitting an issue!

* Why? - This ensures that we are looking at exactly the same thing when testing on our devices and that we know about all markup and code that is in play.

* What? - Keep the test page as simple as possible. Only include markup/code that is required to reproduce the issue.

* How? - Use our [JS Bin template](http://jsbin.com/huvoraba/1/edit) which uses latest code on branch "master". Do not replace the links to the the framework CSS and JavaScript: always test with latest code!

  * You will notice if the issue has been fixed already
  * It enables us to edit your code if necessary
  * The test page won't disappear or change while we are looking into the issue
  * We can test again after committing a fix for the issue

JS Bin instructions: When you start editing the JS Bin, the url will update and contain a new version number. As long as you keep the JS Bin open in your browser this url won't change. Copy the url in your issue report when you are done editing. If your test case requires multiple "single" jQuery Mobile pages, open the JS Bin on multiple tabs on your browser and each of them will get an unique url. Link to this url without "/edit" at the end on your other page(s).


## Feature Requests

If you have an idea for a new feature or a suggestion how to improve an existing feature, let us know!

1. Open a [new issue](https://github.com/jquery/jquery-mobile/issues/new) to describe your request
2. Add a link to the issue on the Feature Requests [wiki page](https://github.com/jquery/jquery-mobile/wiki/Feature-Requests)

Please note that we will flag the issue as feature request and then close it. We check requests on regular base and when we decide to implement a feature we set a milestone and re-open the ticket.


## Pull Requests

When submitting a pull request for review there are a few important steps you have to take to ensure that it gets reviewed quickly and increase the chances that it will be merged:

* If you are new to contributing code or content to jQuery projects, read the information at [contribute.jquery.org](http://contribute.jquery.org/) first
* Make sure you have signed the [CLA](http://contribute.jquery.org/CLA/)
* Before opening a pull request for a bug fix or new feature, make sure there is a ticket for it (don't include a bug report in a pull request)
* Limit the scope to one issue/feature
* Add and run unit tests
* Follow the [style guides](http://contribute.jquery.org/style-guide/)
* Follow the [commit message guidelines](http://contribute.jquery.org/commits-and-pull-requests/#commit-guidelines)

If you need help or feedback, or want to get more involved in the jQuery Mobile project, don't hesitate to reach out to us. You can find us on [IRC](http://irc.jquery.org/) in #jqueryui-dev (Freenode).


### Tips For Bug Patching


#### Environment: localhost with PHP, Node.js, and Grunt

jQuery Mobile uses Node.js and Grunt to automate the building and validation of source code.

The Demos depend on PHP running locally, so make sure you have the following installed:

* A web server with PHP support (any will do, such as [XAMPP](http://www.apachefriends.org/en/xampp.html) or [MAMP](http://www.mamp.info/en/index.html))
* [Node.js](http://nodejs.org/) (includes NPM, necessary for the next step)
* [Grunt](http://gruntjs.com/) (install with: `npm install -g grunt-cli`)


#### Build a Local Copy of jQuery Mobile

Create a fork of the jQuery Mobile repo on GitHub at http://github.com/jquery/jquery-mobile.

Change directory to your web root directory, whatever that might be:

```bash
$ cd /path/to/your/www/root/
```

Clone your jQuery Mobile fork to work locally.

*Note: be sure to replace `[USERNAME]` with your GitHub username.*

```bash
$ git clone git@github.com:[USERNAME]/jquery-mobile.git
```

Change to the newly created directory.

```bash
$ cd jquery-mobile
```

Add the official jQuery repository as a remote. We recommend naming it "upstream".

```bash
$ git remote add upstream git://github.com/jquery/jquery-mobile.git
```

Get in the habit of pulling in the "upstream" master to stay up to date as jQuery Mobile receives new commits.

```bash
$ git pull upstream master
```

Install the dependencies.

```bash
npm install
```

To lint the JavaScript and CSS, as well as build the Demos, run grunt:

```bash
$ grunt
```


#### Testing

You can run all the test suites by running the following command:

```bash
$ grunt test
```

You can choose to run only a subset of the tests by adding the `--suites` option like:

```bash
$ grunt test --suites=button,checkboxradio
```

will only run the tests under `tests/unit/button/` and `tests/unit/checkboxradio/`.

You can also specify which versions of jQuery you want to test jQuery Mobile with by using the `--jqueries` option:

```bash
$ grunt test --jqueries=1.11.1,git
```


#### Rebasing

Often times when working on a feature or bug fix branch it's useful to pull in the latest from the parent branch. If you're doing this _before_ submitting a pull request it's best to use git's rebase to apply your commits onto the latest from the parent branch. For example, working on `new-feature` branch where `upstream` is the remote at `git://github.com/jquery/jquery-mobile.git`:

    git checkout new-feature
    git pull --rebase upstream master
    ## ... here you may have to resolve some conflicts ... ##

You can now push to your own fork and submit the pull request. Keep in mind that it's only a good idea to do this if you _haven't_ already submitted a pull request unless you want to create a new one because your origin remote (your fork) will report a discrepancy. Again, please refer to the [chapter](http://git-scm.com/book/ch3-6.html) in Pro Git on rebasing if you're new to it.

------------------------------------------------------------

*Thank you for contributing to the jQuery Mobile project!*
