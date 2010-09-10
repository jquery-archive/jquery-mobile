Early stage development for the jQuery Mobile UI Framework.
Code is subject to change dramatically!

Usage
=====
For now, I've set things up with a little combinator script to concat all the css and js files into one request and gzip. (js/all and css/all)
You'll need to point your local apache & php webserver at this root directory in order to preview things. 
Whenever this configuration becomes inconvenient, we can remove it, obviously it's not meant to stay!

- when adding a js or css file, add it to the manifest in its directory and it'll be included in the request
- As far as JS files go, jQuery.mobile.js is the starting point.


To-do
=====
- rename all ui-body and ui-body-a/b/c classes to ui-box* (body could be confused with the element)
- for some reason, the tabs are hiding on click now. they should stay visible
- figure out tabs integration… particularly is tabs just a footer with links or a full in-page plugin? Currently it's the latter, but not good for page-to-page nav.
- rename plugin method names to correspond with filenames
- figure out how tree ties into state changes (should we make it bookmarkable?)
- get selectmenu using ui-page model with transitions. (no url tracking though)
- $(':focus').blur(); may not work everywhere