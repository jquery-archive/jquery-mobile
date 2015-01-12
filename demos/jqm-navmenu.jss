	    <div data-role="panel" class="jqm-navmenu-panel" data-position="left" data-display="overlay" data-theme="a">
	    	<ul class="jqm-list ui-alt-icon ui-nodisc-icon">
				<?
				var parts = request.url.path.split( "/" );
				include( ( parts[ parts.length - 2 ] === "demos" ? "" : "../" ) + 'jqm-contents.jss' ); ?>
		     </ul>
		</div><!-- /panel -->
