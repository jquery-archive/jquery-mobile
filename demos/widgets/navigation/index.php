<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Navigation - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../favicon.ico">
  <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../../js/jquery.js"></script>
	<script src="../../_assets/js/"></script>
	<script src="../../../js/"></script>
  <script type="text/javascript" src="demo.js"></script>
</head>
<body>
<div data-role="page" class="jqm-demos" data-quicklinks="true">

    <div data-role="header" class="jqm-header">
		<h1 class="jqm-logo"><a href="../../"><img src="../../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
        <a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
        <a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
        <?php include( '../../search.php' ); ?>
    </div><!-- /header -->

    <div data-role="content" class="jqm-content">

		<h1>AJAX Navigation</h1>

		<p class="jqm-intro">The <code>$.mobile.navigate</code> method and the <code>navigate</code> event form the foundation of jQuery Mobile's navigation infrastructure. As such, they can function outside the confines of jQuery Mobile as a clean and intuitive navigation/history API.
		</p>

		<h2 id="nav-intro">Introduction</h2>

		<p>jQuery Mobile includes a navigation system to load pages into the DOM via AJAX, enhance the new content, then display <a href="../pages/">pages</a> with a rich set of animated <a href="../transitions/"  data-ajax="false">transitions</a>. The navigation system uses progressive enhancement to automatically 'hijack' standard <a href="../links/">links</a> and form submissions and route them as an AJAX request.</p>

		<p>One of jQuery Mobile's core features is the ability to load and view content from disparate pages into the initial document with support for standard navigation methods like anchors and the back button. To accomplish this the library has progressive support for <code>hashchange</code> and <code>popstate</code> coupled with internal history tracking which can be used à la carte.</p>

    <p>An example use case would be something like Twitter's web client. The first step is to hijack link clicks on the page and use the URL that represents that UI state to track history with <code>$.mobile.navigate</code>. It's at this point that any additional information about the UI necessary for operation on return using the back button would be stored (see, <code>foo</code> property of the object argument to the navigate method).</p>

    <pre>
      <code>
// Define a click binding for all anchors in the page
$( "a" ).on( "click", function( event ){

  // Prevent the usual navigation behavior
  event.preventDefault();

  // Alter the url according to the anchor's href attribute, and
  // store the data-foo attribute information with the url
  $.mobile.navigate( this.attr( "href" ), {
    foo: this.attr("data-foo")
  });

  // Hypothetical content alteration based on the url. E.g, make
  // an AJAX request for JSON data and render a template into the page.
  alterContent( this.attr("href") );
});</code></pre>

    <p>Next, a <code>navigate</code> event binding helps in responding to backward and forward navigation via the browsers history API. Here the <code>alterContent</code> function can address the direction in which the browser is navigating as well as any additional information stored on the data object when <code>$.mobile.navigate</code> was invoked to store the corresponding history entry.</p>

    <pre><code>
// Respond to back/forward navigation
$( window ).on( "navigate", function( event, data ){
  if( data.state.foo ){
    // Make use of the arbitrary data stored
  }

  if( data.state.direction == "back" ) {
    // Make use of the directional information
  }

  // reset the content based on the url
  alterContent( data.state.url );
});</code></pre>

		<h2 id="nav-event-example">Event Example  <a href="http://api.jquerymobile.com/navigate/" data-ajax="false" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-r" data-iconpos="right" class="jqm-api-link">API</a></h2>

		<p>jQuery Mobile provides the <code>navigate</code> event as a wrapper for both <code>hashchange</code> and <code>popstate</code>. That is, where a binding to both events would be required to support browsers with and without <code>popstate</code> only one binding to <code>navigate</code> is necessary. In this example, altering the hash will trigger <code>popstate</code> or <code>hashchange</code> event depending on the browser, but only a single <code>navigate</code> binding is necessary. Make sure to use the back button after alterting the hash to see that the event is fired in both cases.</p>

<p><em>Note: when viewing the console output, some browsers (eg, Chrome) fire a popstate on the initial page load</em></p>

    <pre><code>
// Bind to the navigate event
$( window ).on( "navigate", function() {
  console.log( "navigated!" );
});

// Bind to the click of the example link
$( "#event-example" ).click(function( event ) {
  event.preventDefault();
  location.hash = "foo";
});
</code></pre>

    <a href="#" id="event-example" data-role="button">Event Example</a>

		<h2 id="nav-method-example">Method Example  <a href="http://api.jquerymobile.com/jQuery.mobile.navigate/" data-ajax="false" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-r" data-iconpos="right" class="jqm-api-link">API</a></h2>

    <p>jQuery Mobile provides the <code>$.mobile.navigate</code> method as a means to track history and receive additional information along with <code>navigate</code> events. In this example, when the method example link is clicked, the url will be changed twice. The first time will it will store additional aribitrary information along with the URL and hash stored by the method. The second time it will simply change the url and store the URL and hash. When the browser moves backward through history the <code>navigate</code> event is triggered as in the event example above <em>but</em> along with it comes information about the direction of history traversal, the url, the hash, and the arbitrary data stored with the first call to the navigate method.</p>

    <p><em>Note: The arbitrary state properties must be chosen carefully to avoid  the url, hash, and direction properties. This is a shortcoming that will be addressed in future releases.</em></p>

    <pre>
      <code>
// Bind to the click of the example link
$( "#method-example" ).click(function( event ) {
  // Append #bar
  $.mobile.navigate( "#bar", {
    info: "info about the #bar hash"
  });

  // Replace #bar with #baz
  $.mobile.navigate( "#baz" );

  // Log the results of the navigate event
  $( window ).on( "navigate", function( event, data ){
    console.log( data.state.info );
    console.log( data.state.direction );
    console.log( data.state.url );
    console.log( data.state.hash );
  });

  // Go back to pop the state for #bar and log it
  window.history.back();
});
</code>
    </pre>

    <a href="#" id="method-example" data-role="button">Method Example</a>
	</div><!-- /content -->

	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../../global-nav.php' ); ?>

</div><!-- /page -->
</body>
</html>
