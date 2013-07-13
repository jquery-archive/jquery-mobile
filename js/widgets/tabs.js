//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: jQuery UI Tabs widget now for mobile!
//>>label: Tabs
//>>group: Widgets
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../jquery.mobile.widget", "../jquery.ui.core","./jquery.ui.tabs", "../jquery.mobile.registry" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

	$.ui.tabs.initSelector = ":jqmData(role='tabs'), :jqmData(content='tabs')";

	$.mobile._enhancer.add( "ui.tabs" );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
