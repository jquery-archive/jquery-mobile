## Issues

If you encounter a bug in the framework you can report it on the issue tracker here on Github. Questions about how to use the framework or problems with your custom code can be posted on the [forum](https://forum.jquery.com/jquery-mobile).
The jQuery Mobile [ThemeRoller](https://github.com/jquery/web-jquery-mobile-theme-roller) and [Download Builder](https://github.com/jquery/jquery-mobile-builder) have their own repo where you can report issues.

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

* How? - Use our [JS Bin template](http://jsbin.com/uzaret/edit) which uses latest code on branch "master". Copy the updated url when you are done editing.
  * You will notice if the issue has been fixed already
  * It enables us to edit your code if necessary
  * The test page won't disappear or change while we are looking into the issue
  * We can test again after committing a fix for the issue

## Feature Requests

If you have an idea for a new feature or a suggestion how to improve an existing feature, let us know!

1. Open a [new issue](https://github.com/jquery/jquery-mobile/issues/new) to describe your request
2. Add a link to the issue on the Feature Requests [wiki page](https://github.com/jquery/jquery-mobile/wiki/Feature-Requests)

Please note that we will flag the issue as feature request and then close it. We check requests on regular base and when we decide to implement a feature we set a milestone and re-open the ticket.

## Pull Requests

When submitting a pull request for review there are a few important steps you can take to ensure that it gets reviewed quickly and increase the chances that it will be merged (in order of descending importance):

1. Include tests (see [Testing](https://github.com/jquery/jquery-mobile/blob/master/README.md#testing))
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


------------------------------------------------------------

*Thank you for contributing to the jQuery Mobile project!*
