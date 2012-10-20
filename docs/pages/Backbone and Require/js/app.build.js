//This file is run in nodejs to do the build: node app.build.js

//Load the requirejs optimizer
var requirejs = require('./r.js');

//Set up basic config, include config that is
//common to all the requirejs.optimize() calls.
var baseConfig = {
  
  // Tells Require.js to look at desktop.js for all shim and path configurations
  mainConfigFile: "mobile.js",

  wrap: true,
    
  //All the built layers will use almond.
  name: "almond",

  // Removes third-party license comments
  preserveLicenseComments: false,

  // Uses uglify.js for minification
  optimize: "uglify"
 
 };

//Create an array of build configs, the baseConfig will
//be mixed into both the mobile and desktop builds below.

var configs = [
    {
        include: ["mobile"],
        out: "mobile.min.js"
    }
];


// Function used to mix in baseConfig to a new config target
function mix(target) {
    for (var prop in baseConfig) {
        if (baseConfig.hasOwnProperty(prop)) {
            target[prop] = baseConfig[prop];
        }
    }
    return target;
}

//Create a runner that will run a separate build for each item
//in the configs array. Thanks to @jwhitley for this cleverness
var runner = configs.reduceRight(function(prev, currentConfig) {
  return function (buildReportText) {
    requirejs.optimize(mix(currentConfig), prev);
  };
}, function(buildReportText) {
    console.log(buildReportText);
});

//Run the builds
runner();