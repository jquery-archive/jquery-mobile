<?php
$type = 'text/javascript';
$files = array(
	'../LICENSE-INFO.txt',
	'ns.js',
	'../external/jquery-ui/version.js',
	'../external/jquery-ui/data.js',
	'../external/jquery-ui/disable-selection.js',
	'../external/jquery-ui/focusable.js',
	'../external/jquery-ui/form.js',
	'../external/jquery-ui/ie.js',
	'../external/jquery-ui/keycode.js',
	'../external/jquery-ui/escape-selector.js',
	'../external/jquery-ui/labels.js',
	'../external/jquery-ui/jquery-1-7.js',
	'../external/jquery-ui/plugin.js',
	'../external/jquery-ui/safe-active-element.js',
	'../external/jquery-ui/safe-blur.js',
	'../external/jquery-ui/scroll-parent.js',
	'../external/jquery-ui/tabbable.js',
	'../external/jquery-ui/unique-id.js',
	'helpers.js',
	'defaults.js',
	'data.js',
	'core.js',
	'../external/jquery-ui/widget.js',
	'widget.js',
	'widgets/widget.theme.js',
	'widgets/loader.js',
	'widgets/loader.backcompat.js',
	'media.js',
	'support/touch.js',
	'support/orientation.js',
	'support.js',
	'events/navigate.js',
	'navigation/path.js',
	'navigation/history.js',
	'navigation/navigator.js',
	'navigation/method.js',
	'animationComplete.js',
	'events/scroll.js',
	'navigation/base.js',
	'widgets/enhancer.js',
	'widgets/enhancer.widgetCrawler.js',
	'widgets/enhancer.backcompat.js',
	'widgets/page.js',
	'widgets/pagecontainer.js',
	'navigation.js',
	'transitions/transition.js',
	'transitions/serial.js',
	'transitions/concurrent.js',
	'transitions/handlers.js',
	'transitions/visuals/flip.js',
	'transitions/visuals/flow.js',
	'transitions/visuals/pop.js',
	'transitions/visuals/slide.js',
	'transitions/visuals/slidedown.js',
	'transitions/visuals/slidefade.js',
	'transitions/visuals/slideup.js',
	'transitions/visuals/turn.js',
	'transitions/visuals.js',
	'degradeInputs.js',
	'widgets/page.dialog.js',
	'widgets/widget.backcompat.js',
	'widgets/page.dialog.backcompat.js',
	'widgets/collapsible.js',
	'widgets/addFirstLastClasses.js',
	'widgets/collapsibleSet.js',
	'grid.js',
	'../external/jquery-ui/widgets/controlgroup.js',
	'../external/jquery-ui/form-reset-mixin.js',
	'../external/jquery-ui/widgets/checkboxradio.js',
	'../external/jquery-ui/widgets/button.js',
	'widgets/forms/button.js',
	'widgets/navbar.js',
	'widgets/navbar.backcompat.js',
	'widgets/popup.js',
	'widgets/listview.js',
	'widgets/navbar.morebutton.js',
	'widgets/listview.backcompat.js',
	'widgets/listview.autodividers.js',
	'../external/jquery-ui/widgets/accordion.js',
	'widgets/forms/checkboxradio.js',
	'widgets/forms/checkboxradio.backcompat.js',
	'zoom.js',
	'widgets/forms/textinput.js',
	'vmouse.js',
	'widgets/forms/reset.js',
	'widgets/forms/slider.js',
	'widgets/forms/slider.backcompat.js',
	'widgets/forms/slider.tooltip.js',
	'widgets/forms/flipswitch.js',
	'widgets/forms/flipswitch.backcompat.js',
	'widgets/forms/rangeslider.js',
	'widgets/forms/rangeslider.backcompat.js',
	'widgets/forms/textinput.backcompat.js',
	'widgets/forms/clearButton.js',
	'widgets/forms/autogrow.js',
	'widgets/forms/select.js',
	'widgets/forms/select.backcompat.js',
	'widgets/toolbar.js',
	'widgets/forms/select.custom.js',
	'widgets/forms/select.custom.backcompat.js',
	'widgets/fixedToolbar.js',
	'widgets/fixedToolbar.backcompat.js',
	'widgets/popup.backcompat.js',
	'widgets/popup.arrow.js',
	'widgets/popup.arrow.backcompat.js',
	'widgets/panel.js',
	'widgets/table.js',
	'widgets/table.columntoggle.js',
	'widgets/controlgroup.js',
	'widgets/controlgroup.selectmenu.js',
	'widgets/controlgroup.backcompat.js',
	'widgets/table.columntoggle.popup.js',
	'widgets/table.reflow.js',
	'widgets/filterable.js',
	'../external/jquery-ui/widgets/tabs.js',
	'widgets/tabs.ajax.js',
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
