<?php
$type = 'text/javascript';
$files = array(
	'../LICENSE-INFO.txt',
	// note that define is only included here as a means
	// to revert to the pre async include, and should not be
	// used in other build methods
	'jquery.mobile.define.js',
	'jquery.mobile.ns.js',
	'../external/jquery-ui/jquery.ui.widget.js',
	'jquery.mobile.widget.js',
	'jquery.mobile.media.js',
	'jquery.mobile.support.touch.js',
	'jquery.mobile.support.orientation.js',
	'jquery.mobile.support.js',
	'jquery.mobile.vmouse.js',
	'events/touch.js',
	'events/throttledresize.js',
	'events/orientationchange.js',
	'../external/jquery/plugins/jquery.hashchange.js',
	'../external/jquery-ui/jquery.ui.core.js',
	'jquery.mobile.defaults.js',
	'jquery.mobile.helpers.js',
	'jquery.mobile.data.js',
	'jquery.mobile.animationComplete.js',
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
	'jquery.mobile.navigation.js',
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
	'jquery.mobile.degradeInputs.js',
	'widgets/dialog.js',
	'widgets/collapsible.js',
	'widgets/addFirstLastClasses.js',
	'widgets/collapsibleSet.js',
	'jquery.mobile.fieldContain.js',
	'jquery.mobile.grid.js',
	'widgets/navbar.js',
	'widgets/listview.js',
	'widgets/listview.autodividers.js',
	'widgets/listview.hidedividers.js',
	'jquery.mobile.nojs.js',
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
	'jquery.mobile.buttonMarkup.js',
	'widgets/controlgroup.js',
	'jquery.mobile.links.js',
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
	'jquery.mobile.zoom.js',
	'jquery.mobile.zoom.iosorientationfix.js',
	'jquery.mobile.init.js'
);

function getGitHeadPath() {
	$gitRoot = "../";
	$gitDir = ".git";
	$path = $gitRoot . $gitDir;

	if ( is_file( $path ) && is_readable( $path ) ) {
		$contents = file_get_contents( $path );
		if ( $contents ) {
			$contents = explode( " ", $contents );
			if ( count( $contents ) > 1 ) {
				$contents = explode( "\n", $contents[ 1 ] );
				if ( $contents && count( $contents ) > 0 ) {
					$path = $gitRoot . $contents[ 0 ];
				}
			}
		}
	}

	return $path . "/logs/HEAD";
}

function getCommitId() {
	$gitHeadPath = getGitHeadPath();

	if ( $gitHeadPath ) {
		$logs = ( is_readable( $gitHeadPath ) ? file_get_contents( $gitHeadPath ) : false );
		if ( $logs ) {
			$logs = explode( "\n", $logs );
			$n_logs = count( $logs );
			if ( $n_logs > 1 ) {
				$log = explode( " ", $logs[ $n_logs - 2 ] );
				if ( count( $log ) > 1 ) {
					return $log[ 1 ];
				}
			}
		}
	}

	return false;
}

$comment = getCommitId();
if ( !$comment ) {
	unset( $comment );
} else {
	$comment = "/* git commitid " . $comment . " */\n";
}

require_once('../combine.php');
