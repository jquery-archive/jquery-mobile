<?
var type = 'text/javascript',
	fs = require( "fs" ),
	files = [
		'../LICENSE-INFO.txt',
		// note that define is only included here as a means
		// to revert to the pre async include, and should not be
		// used in other build methods
		'jquery.mobile.define.js',
		'ns.js',
		'../external/jquery-ui/jquery.ui.widget.js',
		'widget.js',
		'media.js',
		'support/touch.js',
		'support/orientation.js',
		'support.js',
		'vmouse.js',
		'events/touch.js',
		'events/throttledresize.js',
		'events/orientationchange.js',
		'../external/jquery-ui/jquery.ui.core.js',
		'defaults.js',
		'helpers.js',
		'data.js',
		'animationComplete.js',
		'widgets/page.js',
		'widgets/page.dialog.js',
		'widgets/loader.js',
		'events/navigate.js',
		'navigation/path.js',
		'navigation/base.js',
		'navigation/history.js',
		'navigation/navigator.js',
		'navigation/method.js',
		'widgets/pagecontainer.js',
		'navigation.js',
		'transitions/transition.js',
		'transitions/serial.js',
		'transitions/concurrent.js',
		'transitions/handlers.js',
		'transitions/visuals/pop.js',
		'transitions/visuals/slide.js',
		'transitions/visuals/slidefade.js',
		'transitions/visuals/slidedown.js',
		'transitions/visuals/slideup.js',
		'transitions/visuals/flip.js',
		'transitions/visuals/flow.js',
		'transitions/visuals/turn.js',
		'degradeInputs.js',
		'widgets/dialog.js',
		'widgets/collapsible.js',
		'widgets/addFirstLastClasses.js',
		'widgets/collapsibleSet.js',
		'fieldContain.js',
		'grid.js',
		'widgets/navbar.js',
		'widgets/listview.js',
		'widgets/listview.autodividers.js',
		'widgets/listview.hidedividers.js',
		'nojs.js',
		'widgets/forms/reset.js',
		'widgets/forms/checkboxradio.js',
		'widgets/forms/button.js',
		'widgets/forms/flipswitch.js',
		'widgets/forms/slider.js',
		'widgets/forms/slider.tooltip.js',
		'widgets/forms/rangeslider.js',
		'widgets/forms/textinput.js',
		'widgets/forms/clearButton.js',
		'widgets/forms/autogrow.js',
		'widgets/forms/select.js',
		'widgets/forms/select.custom.js',
		'widgets/filterable.js',
		'widgets/filterable.backcompat.js',
		'buttonMarkup.js',
		'widgets/controlgroup.js',
		'links.js',
		'widgets/toolbar.js',
		'widgets/fixedToolbar.js',
		'widgets/fixedToolbar.workarounds.js',
		'widgets/panel.js',
		'widgets/popup.js',
		'widgets/popup.arrow.js',
		'widgets/table.js',
		'widgets/table.columntoggle.js',
		'widgets/table.reflow.js',
		'../external/jquery-ui/jquery.ui.tabs.js',
		'widgets/tabs.js',
		'zoom.js',
		'zoom/iosorientationfix.js',
		'init.js'
	];

function getGitHeadPath() {
	var gitRoot = "../",
		gitDir = ".git";
		path = gitRoot + gitDir;

	if ( fs.existsSync( path ) ) {
		var contents = fs.readFileSync( path );
		if ( contents ) {
			contents = contents.split( " " );
			if ( contents.length > 1 ) {
				contents = contents[ 1 ].split ( "\n" );
				if ( contents && contents.length > 0 ) {
					path = gitRoot + contents[ 0 ];
				}
			}
		}
	}

	return path + "/logs/HEAD";
}

function getCommitId() {
	var gitHeadPath = getGitHeadPath();

	if ( gitHeadPath ) {
		var logs = ( fs.exists( gitHeadPath ) ? fs.readFileSync( gitHeadPath ) : false );
		if ( logs ) {
			logs = logs.split( "\n" );
			n_logs = logs.length;
			if ( n_logs > 1 ) {
				log = logs[ n_logs - 2 ].split( " " );
				if ( log.length > 1 ) {
					return log[ 1 ];
				}
			}
		}
	}

	return false;
}

process.comment = getCommitId();
if ( !process.comment ) {
	delete process.comment;
} else {
	process.comment = "/* git commitid " + process.comment + " */\n";
}

include( '../combine.jss' );

?>
