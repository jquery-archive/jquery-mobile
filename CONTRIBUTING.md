## jQuery Mobile Contributing Guidelines

Welcome! Thanks for your interest in contributing to jQuery Mobile. Most of our information on how to contribute to this and all other jQuery Foundation projects is over at [contribute.jquery.org](http://contribute.jquery.org/). More information about the project and how to get more involved can be found on the "[About](http://jquerymobile.com/about/)" page at the project website. On this page we provide project specific information regarding [reporting bugs](#issues), [suggesting new features](#feature-requests), and [contributing code or content](#pull-requests). Please take a moment to read this before opening a ticket or submitting a pull request. 


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
8. Other relevant information, e.g. using PhoneGap

In the interest of creating more readable issues please include code snippets inside a triple backtick box appropriate for the JavaScript/HTML/CSS snippet you wish to discuss. More information is available at the [introduction page](http://github.github.com/github-flavored-markdown/) for github flavored markdown (see Syntax Highlighting).


### Test page

It is IMPORTANT that you always provide a test page when submitting an issue!

* Why? - This ensures that we are looking at exactly the same thing when testing on our devices and that we know about all markup and code that is in play.

* What? - Keep the test page as simple as possible. Only include markup/code that is required to reproduce the issue.

* How? - Use our [JS Bin template](http://jsbin.com/acIRUBo/1/edit) which uses latest code on branch "master". Do not replace the links to the the framework CSS and JavaScript: always test with latest code!

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
* Follow the [JS](http://contribute.jquery.org/style-guide/js/) and [HTML](http://contribute.jquery.org/style-guide/html/) style guides
* Follow the [commit message guidelines](http://contribute.jquery.org/commits-and-pull-requests/#commit-guidelines)

If you need help or feedback, or want to get more involved in the jQuery Mobile project, don't hesitate to reach out to us. You can find us on [IRC](http://irc.jquery.org/) in #jqueryui-dev (Freenode).


### Rebasing

Often times when working on a feature or bug fix branch it's useful to pull in the latest from the parent branch. If you're doing this _before_ submitting a pull request it's best to use git's rebase to apply your commits onto the latest from the parent branch. For example, working on `new-feature` branch where `upstream` is the remote at `git://github.com/jquery/jquery-mobile.git`:

    git checkout new-feature
    git pull --rebase upstream master
    ## ... here you may have to resolve some conflicts ... ##

You can now push to your own fork and submit the pull request. Keep in mind that it's only a good idea to do this if you _haven't_ already submitted a pull request unless you want to create a new one because your origin remote (your fork) will report a discrepancy. Again, please refer to the [chapter](http://git-scm.com/book/ch3-6.html) in Pro Git on rebasing if you're new to it.

------------------------------------------------------------

*Thank you for contributing to the jQuery Mobile project!*
