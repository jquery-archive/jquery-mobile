## Issues

When submitting an issue please include the following:

1. Issue description
2. Test page using our [jsbin template](http://jsbin.com/owipah/edit) which uses latest code
3. Steps to reproduce
4. Expected outcome
5. Actual outcome
6. jQuery Mobile and jQuery core version used
7. Devices/platforms/browsers tested
8. Other relevant information, e.g. using PhoneGap

Before opening a new ticket check if the same or a similar issue already has been reported. Tip: Besides the search tool of the issue tracker you can filter issues by label.

Also, in the interest of creating more readable issues please include code snippets inside a triple backtick box appropriate for the JavaScript/HTML/CSS snippet you wish to discuss. More information is available at the [introduction page](http://github.github.com/github-flavored-markdown/) for github flavored markdown (see Syntax Highlighting).

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
