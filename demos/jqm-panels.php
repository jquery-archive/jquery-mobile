    <div data-role="panel" class="jqm-navmenu-panel" data-position="left" data-display="reveal" data-theme="a">
        <ul data-role="listview" data-icon="false" data-global-nav="demos" class="jqm-list">
            <li data-role="list-divider">Menu</li>
			<li><a href="./">Home</a></li>
			<?php include( 'jqm-contents.php' ); ?>
        </ul>
	</div><!-- /panel -->
	
	<!-- TODO: This should become an external panel so we can add input to markup (unique ID) -->
    <div data-role="panel" class="jqm-search-panel" data-position="right" data-display="overlay" data-theme="a">
		<div class="jqm-search">
			<ul class="jqm-list" data-filter-placeholder="Search demos..." data-filter="true" data-filter-reveal="true">
				<?php include( 'jqm-contents.php' ); ?>
			</ul>
		</div>
	</div><!-- /panel -->
