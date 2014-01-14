
<!DOCTYPE html>
<html>
  <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>jQuery Mobile - Backbone.js and Require.js Apps</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>

</head>
<body>
<div data-role="page" class="jqm-demos" data-quicklinks="true">

    <div data-role="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p><span class="jqm-version"></span> Demos</p>
        <a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left">Menu</a>
        <a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right">Search</a>
    </div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

      <h1>jQuery Mobile, Backbone.js and Require.js</h1>
      <p>jQuery Mobile provides an <strong>HTML5-based user interface for all popular mobile device platforms</strong>, but it does not influence how you organize and structure your app's JavaScript.  Many jQuery Mobile users turn to a variety of other popular third-party libraries, including MV* frameworks and dependency management tools, to help structure their code.
      </p>

	  <h2>Backbone and Require.js</h2>
      <p><strong>Backbone.js</strong> and <strong>Require.js</strong> are two of the most popular third-party libraries that are used with jQuery Mobile to provide a rich JavaScript tech stack for developers.
      </p>
      <p><strong>Backbone.js</strong> is a great client-side MV* JavaScript framework that provides structure to JavaScript applications by providing View, Model, Collection, Router, and Event class objects.
      </p>
      <p><strong>Require.js</strong> serves a few different purposes than Backbone.js. Require.js is an AMD (Asynchronous Module Definition) script loader that asynchronously loads your JavaScript to improve page load performance, while also helping with script dependency managagement and allowing you to organize your JavaScript into self contained modules (files).
      </p>
      <p>Although there is a high amount of developer interest with using jQuery Mobile, Backbone.js, and Require.js together, there is a high barrier of entry.  Many users are confused about how to use the Backbone.js Router class object with the jQuery Mobile routing system.</p>

	   <a href="backbone-require.html" rel="external" class="ui-btn ui-btn-inline ui-corner-all ui-shadow ui-btn-icon-right ui-icon-carat-r">View example page</a>

      <h2>jQuery Mobile configuration</h2>

      <p>The technique used in this <a href="backbone-require.html" rel="external">example page</a> is by no means the only technique available, but it is one of the most elegant.  The Backbone.js router is used exclusively to handle all hashchange events, and the jQuery Mobile <code>$.mobile.changePage()</code> method is used to programmatically change the page.</p>

      <p>Below are two internal jQuery Mobile properties that are turned off to allow this to happen:</p>

      <ul>
        <li><code>$.mobile.linkBindingEnabled</code>
          <ul>
            <li>jQuery Mobile will automatically bind the clicks on anchor tags in your document. Setting this option to false will prevent all anchor click handling including the addition of active button state and alternate link blurring. This should only be used when attempting to delegate the click management to another library or custom code.</li>
            </ul>
        </li>
        <li><code>$.mobile.hashListeningEnabled</code>
          <ul>
            <li>jQuery Mobile will automatically listen and handle changes to the location.hash. Disabling this will prevent jQuery Mobile from handling hash changes, which allows you to handle them yourself or use simple deep-links within a document that scroll to a particular id.</li>
            </ul>
        </li>
      </ul>
      </p>

	  <h2>Example page code</h2>
      <p>To illustrate how the above internal jQuery Mobile properties are turned off, let's examine our example page code.</p>

      <p>Inside of the <em>head</em> section of our <strong>index.html</strong> page, we first include the Require.js JavaScript library and set the <strong>data-main</strong> attribute of our script tag to the JavaScript file that we want Require.js to include on the page first (this file will contain all of our Require.js configurations).  In this example, we are telling Require.js to look inside of the js folder and then load <strong>mobile.js</strong>.
      </p>

      <code>
        &lt;head&gt;
          &lt;script src=&quot;js/libs/require.js&quot; data-main=&quot;js/mobile&quot;&gt;&lt;/script&gt;
        &lt;/head&gt;
      </code>
      <p>If we look inside of <strong>mobile.js</strong>, we will find that the <code>$.mobile.linkBindingEnabled</code> and <code>$.mobile.hashListeningEnabled</code> jQuery Mobile attributes are set to false.
      </p>
      <pre>
      <code>
      // Sets the require.js configuration for your application.
      require.config( {

        // 3rd party script alias names
        paths: {

            // Core Libraries
            "jquery": "../../../js/jquery",
            "jquerymobile": "libs/jquerymobile",
            "underscore": "libs/lodash",
            "backbone": "libs/backbone"

        },

        // Sets the configuration for your third party scripts that are not AMD compatible
        shim: {

            "backbone": {
                  "deps": [ "underscore", "jquery" ],
                  "exports": "Backbone"  //attaches "Backbone" to the window object
            }

        } // end Shim Configuration

      } );

      // Includes File Dependencies
      require([ "jquery","backbone","routers/mobileRouter","jquerymobile" ], function( $, Backbone, Mobile ) {

        // Prevents all anchor click handling
        $.mobile.linkBindingEnabled = false;

        // Disabling this will prevent jQuery Mobile from handling hash changes
        $.mobile.hashListeningEnabled = false;

        // Instantiates a new Backbone.js Mobile Router
        this.router = new Mobile();

      } );
</code>
</pre>
<p>Next, inside of the Backbone.js Router class object, we can respond to haschange events and manually call the jQuery Mobile <code>changePage()</code> method.  Below is a small snippet of <strong>mobileRouter.js</strong>.</p>
<pre>
<code>
        // Backbone.js Routes
        routes: {

            // When there is no hash bang on the url, the home method is called
            "": "home",

            // When #category? is on the url, the category method is called
            "category?:type": "category"

        },

        // Home method
        home: function() {

            // Programatically changes to the categories page
            $.mobile.changePage( "#categories" , { reverse: false, changeHash: false } );

        }
</code>
</pre>

		<p>The <a href="backbone-require.html" rel="external">example page</a> illustrates how to render a jQuery Mobile ListView that is populated with dynamic JSON data asynchronously. Feel free to take a deeper look into the source code to see how Require.js and Backbone.js are used.</p>

    </div><!-- /content -->

    <?php include( '../jqm-navmenu.php' ); ?>

    <div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
        <p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
        <p>Copyright 2014 The jQuery Foundation</p>
    </div><!-- /footer -->

<?php include( '../jqm-search.php' ); ?>

</div><!-- /page -->

</body>
</html>
