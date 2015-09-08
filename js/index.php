<?php
$type = 'text/javascript';
$files = array(
	'../LICENSE-INFO.txt',
	'ns.js',
	'../external/jquery-ui/widget.js',
	'widget.js',
	'widgets/widget.backcompat.js',
	'widgets/widget.theme.js',
	'media.js',
	'support/touch.js',
	'support/orientation.js',
	'support.js',
	'vmouse.js',
	'events/touch.js',
	'events/scroll.js',
	'events/throttledresize.js',
	'events/orientationchange.js',
	'../external/jquery-ui/core.js',
	'../external/jquery-ui/version.js',
	'../external/jquery-ui/form.js',
	'../external/jquery-ui/form-reset-mixin.js',
	'defaults.js',
	'helpers.js',
	'data.js',
	'animationComplete.js',
	'widgets/enhancer.js',
	'degradeInputs.js',
	'widgets/enhancer.backcompat.js',
	'widgets/enhancer.widgetCrawler.js',
	'widgets/page.js',
	'widgets/page.dialog.js',
	'widgets/page.dialog.backcompat.js',
	'widgets/loader.js',
	'widgets/loader.backcompat.js',
	
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
	'../external/jquery-ui/accordion.js',
	'widgets/accordion.js',
	'widgets/collapsible.js',
	'widgets/addFirstLastClasses.js',
	'widgets/collapsibleSet.js',
	'grid.js',
	'widgets/navbar.js',
	'widgets/navbar.backcompat.js',
	'widgets/navbar.morebutton.js',
	'widgets/listview.js',
	'widgets/listview.backcompat.js',
	'widgets/listview.autodividers.js',
	'widgets/listview.hidedividers.js',
	'nojs.js',
	'widgets/forms/reset.js',
	'../external/jquery-ui/button.js',
	'widgets/forms/button.js',
	'widgets/forms/button.backcompat.js',
	'../external/jquery-ui/checkboxradio.js',
	'widgets/forms/checkboxradio.js',
	'widgets/forms/checkboxradio.backcompat.js',
	'widgets/forms/flipswitch.js',
	'widgets/forms/flipswitch.backcompat.js',
	'widgets/forms/slider.js',
	'widgets/forms/slider.backcompat.js',
	'widgets/forms/slider.tooltip.js',
	'widgets/forms/rangeslider.js',
	'widgets/forms/rangeslider.backcompat.js',
	'widgets/forms/textinput.js',
	'widgets/forms/textinput.backcompat.js',
	'widgets/forms/clearButton.js',
	'widgets/forms/autogrow.js',
	'widgets/forms/select.js',
	'widgets/forms/select.backcompat.js',
	'widgets/forms/select.custom.js',
	'widgets/forms/select.custom.backcompat.js',
	'widgets/filterable.js',
	'../external/jquery-ui/controlgroup.js',
	'widgets/controlgroup.js',
	'widgets/controlgroup.backcompat.js',
	'widgets/toolbar.js',
	'widgets/fixedToolbar.js',
	'widgets/fixedToolbar.tapToggle.js',
	'widgets/fixedToolbar.backcompat.js',
	'widgets/panel.js',
	'widgets/popup.js',
	'widgets/popup.backcompat.js',
	'widgets/popup.arrow.js',
	'widgets/popup.arrow.backcompat.js',
	'widgets/table.js',
	'widgets/table.columntoggle.js',
	'widgets/table.columntoggle.popup.js',
	'widgets/table.reflow.js',
	'../external/jquery-ui/tabs.js',
	'widgets/tabs.ajax.js',
	'zoom.js',
	'zoom/iosorientationfix.js',
	'init.js'
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
