<?php
$type = 'text/javascript';
$files = array(
	'../LICENSE-INFO.txt',
	// note that define is only included here as a means
	// to revert to the pre async include, and should not be
	// used in other build methods
	'jquery.mobile.define.js',
	'jquery.ui.widget.js',
	'jquery.mobile.widget.js',
	'jquery.mobile.media.js',
	'jquery.mobile.support.touch.js',
	'jquery.mobile.support.orientation.js',
	'jquery.mobile.support.js',
	'jquery.mobile.vmouse.js',
	'events/touch.js',
	'events/throttledresize.js',
	'events/orientationchange.js',
	'jquery.hashchange.js',
	'widgets/page.js',
	'jquery.mobile.core.js',
	'widgets/loader.js',
	'jquery.mobile.navigation.js',
	'jquery.mobile.navigation.pushstate.js',
	'jquery.mobile.transition.js',
	'transitions/pop.js',
	'transitions/slide.js',
	'transitions/slidedown.js',
	'transitions/slideup.js',
	'transitions/flip.js',
	'transitions/flow.js',
	'transitions/turn.js',
	'jquery.mobile.degradeInputs.js',
	'widgets/dialog.js',
	'widgets/page.sections.js',
	'widgets/collapsible.js',
	'widgets/addFirstLastClasses.js',
	'widgets/collapsibleSet.js',
	'jquery.mobile.fieldContain.js',
	'jquery.mobile.grid.js',
	'widgets/navbar.js',
	'widgets/listview.js',
	'widgets/listview.filter.js',
	'widgets/listview.autodividers.js',
	'jquery.mobile.nojs.js',
	'widgets/forms/reset.js',
	'widgets/forms/checkboxradio.js',
	'widgets/forms/button.js',
	'widgets/forms/slider.js',
	'widgets/forms/textinput.js',
	'widgets/forms/select.custom.js',
	'widgets/forms/select.js',
	'jquery.mobile.buttonMarkup.js',
	'widgets/controlgroup.js',
	'jquery.mobile.links.js',
	'widgets/fixedToolbar.js',
	'widgets/fixedToolbar.workarounds.js',
	'widgets/popup.js',
	'widgets/table.js',
	'widgets/table.columntoggle.js',
	'widgets/table.reflow.js',
	'jquery.mobile.zoom.js',
	'jquery.mobile.zoom.iosorientationfix.js',
	'jquery.mobile.init.js'
);

function getCommitId() {
	$gitHeadPath = "../.git/logs/HEAD";
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

	return false;
}

$comment = getCommitId();
if ( !$comment ) {
	unset( $comment );
} else {
	$comment = "/* git commitid " . $comment . " */\n";
}

require_once('../combine.php');
