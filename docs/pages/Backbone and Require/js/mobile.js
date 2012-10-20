// Sets the require.js configuration for your application.
require.config({
  
  // 3rd party script alias names (Easier to type "jquery" than "libs/jquery-1.7.2.min")
  paths: {

      // Core Libraries
      "jquery": "libs/jquery",
      "jquerymobile": "libs/jquerymobile",
      "underscore": "libs/lodash",
      "backbone": "libs/backbone"

  },

  // Sets the configuration for your third party scripts that are not AMD compatible
  shim: {

      "backbone": {
          "deps": ["underscore", "jquery"],
          "exports": "Backbone"  //attaches "Backbone" to the window object
      }

  } // end Shim Configuration
  
});

// Include Desktop Specific JavaScript files here (or inside of your Desktop router)
require(["jquery","backbone","routers/mobileRouter","jquerymobile"], function($, Backbone, Mobile) {

    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;

    // Instantiates a new Mobile Router
    this.router = new Mobile();

});