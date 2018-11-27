<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Listview - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<style id="custom-icon">
        .ui-icon.ui-icon-custom {
			background-image: url("../_assets/img/glyphish-icons/21-skull.png");
			background-position: 3px 3px;
			background-size: 70%;
		}
    </style>
</head>
<body>
<div data-role="page" class="jqm-demos" data-quicklinks="true">

	<div data-role="toolbar" data-type="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquerymobile-logo.png" alt="jQuery Mobile"></a></h2>
		<a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
		<a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
		<div class="jqm-banner"><h3>Version <span class="jqm-version"></span> Demos</h3></div>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

		<h1>Listview</h1>

		<a href="http://api.jquerymobile.com/listview/" class="jqm-api-docs-link ui-nodisc-icon ui-alt-icon" title="Visit the API Documentation" target="_blank">API Documentation <span class="ui-icon ui-icon-action"></span></a>

		<p>A listview is coded as a simple unordered list (ul) or ordered list (ol) with a <code> data-role="listview"</code> attribute and has a wide range of features.
			</p>

		<h2>Read-only, unordered</h2>
		<p>A listview is a simple unordered list containing linked list items with a <code> data-role="listview"</code> attribute.</p>
			<div data-demo-html="true">
				<ul data-role="listview">
					<li>Acura</li>
					<li>Audi</li>
					<li>BMW</li>
					<li>Cadillac</li>
					<li>Ferrari</li>
				</ul>
			</div><!--/demo-html -->

		<h2>Read-only, ordered</h2>
		<p>Lists can also be created from ordered lists (<code>ol</code>) which is useful when presenting items that are in a sequence such as search results or a movie queue.</p>
			<div data-demo-html="true">
				<ol data-role="listview">
					<li>Acura</li>
					<li>Audi</li>
					<li>BMW</li>
					<li>Cadillac</li>
					<li>Ferrari</li>
				</ol>
			</div><!--/demo-html -->

		<h2>Linked</h2>
		<p>List items with links are styled as button.</p>
			<div data-demo-html="true">
				<ul data-role="listview">
					<li><a href="#">Acura</a></li>
					<li><a href="#">Audi</a></li>
					<li><a href="#">BMW</a></li>
					<li><a href="#">Cadillac</a></li>
					<li><a href="#">Ferrari</a></li>
				</ul>
			</div><!--/demo-html -->

		<h2>Inset</h2>
		<p>Adding the <code> data-inset="true"</code> attribute to the list (ul or ol), applies the inset appearance which is useful for mixing a listview with other content on a page.</p>
			<div data-demo-html="true">
				<ul data-role="listview" data-inset="true">
					<li><a href="#">Acura</a></li>
					<li><a href="#">Audi</a></li>
					<li><a href="#">BMW</a></li>
					<li><a href="#">Cadillac</a></li>
					<li><a href="#">Ferrari</a></li>
				</ul>
			</div><!--/demo-html -->

		<h2>Filter</h2>
		<p>The listview can be used in conjunction with the <a href="../filterable/" data-ajax="false">filterable</a> widget.</p>
			<div data-demo-html="true">
				<form class="ui-filterable">
					<input id="filterable-input" data-type="search" placeholder="Search fruits...">
				</form>
				<ul data-role="listview" data-filter="true" data-inset="true" data-input="#filterable-input">
					<li><a href="#">Apple</a></li>
					<li><a href="#">Banana</a></li>
					<li><a href="#">Cherry</a></li>
					<li><a href="#">Cranberry</a></li>
					<li><a href="#">Grape</a></li>
					<li><a href="#">Orange</a></li>
				</ul>
			</div><!--/demo-html -->

		<h2>Filter reveal</h2>
		<p>The filter reveal feature of the <a href="../filterable/" data-ajax="false">Filterable widget</a> makes it easy to build a simple autocomplete with local data. When the Filterable widget is instantiated on a list that has the <code>data-filter-reveal="true"</code> attribute, it will auto-hide all the list items when the search field is blank. If you need to search against a long list of values, we provide a way to create a filter with a <a href="../listview-autocomplete-remote/" data-ajax="false">remote data source</a>.</p>
			<div data-demo-html="true">

				<form class="ui-filterable">
					<input id="autocomplete-input" data-type="search" placeholder="Search fruits...">
				</form>
				<ul data-role="listview" data-filter="true" data-filter-reveal="true" data-input="#autocomplete-input" data-inset="true">
					<li><a href="#">Apple</a></li>
					<li><a href="#">Banana</a></li>
					<li><a href="#">Cherry</a></li>
					<li><a href="#">Cranberry</a></li>
					<li><a href="#">Grape</a></li>
					<li><a href="#">Orange</a></li>
				</ul>
			</div><!--/demo-html -->

		<h2>List dividers</h2>
		<p>List items can be turned into dividers to organize and group the list items. This is done by adding the <code> data-role="list-divider"</code> to any list item. These items are styled with the bar swatch "b" by default (blue in the default theme) but you can specify a theme for dividers by adding the <code>data-divider-theme</code> attribute to the list element (<code>ul</code> or <code>ol</code>) and specifying a theme swatch letter. You can override the divider-theme for a specific divider by adding the <code>data-theme</code> attribute to the list item.</p>

			<div data-demo-html="true">
				<ul data-role="listview" data-inset="true" data-divider-theme="a">
					<li data-role="list-divider">Mail</li>
					<li><a href="#">Inbox</a></li>
					<li><a href="#">Outbox</a></li>
					<li data-role="list-divider">Contacts</li>
					<li><a href="#">Friends</a></li>
					<li><a href="#">Work</a></li>
				</ul>
			</div><!--/demo-html -->

		<h2>Autodividers</h2>
		<p>A listview can be configured to automatically generate dividers for its items by adding a <code>data-autodividers="true"</code> attribute to any listview. By default, the text used to create dividers is the uppercased first letter of the item's text. Alternatively you can specify divider text by setting the <code>autodividersSelector</code> option on the listview programmatically. This feature is designed to work seamlessly with the filter.</p>
			<div data-demo-html="true">
				<ul data-role="listview" data-autodividers="true" data-filter="true" data-inset="true">
					<li><a href="index.php">Adam Kinkaid</a></li>
					<li><a href="index.php">Alex Wickerham</a></li>
					<li><a href="index.php">Avery Johnson</a></li>
					<li><a href="index.php">Bob Cabot</a></li>
					<li><a href="index.php">Caleb Booth</a></li>
					<li><a href="index.php">Christopher Adams</a></li>
					<li><a href="index.php">Culver James</a></li>
				</ul>
			</div><!--/demo-html -->

		<h2>Count bubbles</h2>
		<p>To add a count indicator to the right of the list item, wrap the number in an element with a class of <code>ui-listview-item-count-bubble</code>. The theme for <strong>count bubbles</strong> is inherited from the parent list item.</p>

			<div data-demo-html="true">
				<ul data-role="listview" data-inset="true">
					<li><a href="#">Inbox <span class="ui-listview-item-count-bubble">12</span></a></li>
					<li><a href="#">Outbox <span class="ui-listview-item-count-bubble">0</span></a></li>
					<li><a href="#">Drafts <span class="ui-listview-item-count-bubble">4</span></a></li>
					<li><a href="#">Sent <span class="ui-listview-item-count-bubble">32811</span></a></li>
					<li><a href="#">Trash <span class="ui-listview-item-count-bubble">62</span></a></li>
				</ul>
			</div><!--/demo-html -->

		<h2>Icons: Standard</h2>

		<p>The default icon for each list item containing a link is <code>caret-r</code>. To override this, set the <code>data-icon</code> attribute on the desired list item to the <a href="../icons/">name of a standard icon</a>. To prevent icons from appearing altogether, set the <code> data-icon</code> attribute to &quot;false&quot;. With a bit of custom styling it's also possible to use third party icons.</p>

			<div data-demo-html="true" data-demo-css="#custom-icon">
                <ul data-role="listview" data-inset="true">
                    <li data-icon="custom" id="skull"><a href="#">custom-icon</a></li>
                    <li data-icon="delete"><a href="#">data-icon="delete"</a></li>
                    <li data-icon="gear"><a href="#">data-icon="gear"</a></li>
                    <li data-icon="info"><a href="#">data-icon="info"</a></li>
                    <li data-icon="false"><a href="#">data-icon="false"</a></li>
                </ul>
			</div><!--/demo-html -->

		<h2>Icons: 16x16</h2>
		<p>To use standard 16x16 pixel icons in list items, add the class of <code>ui-listview-item-icon</code> to the image element and insert 16x16 icons as <code>img</code> tags inside the list items.</p>
			<div data-demo-html="true">
				<ul data-role="listview" data-inset="true">
					<li><a href="#"><img src="../_assets/img/gf.png" alt="France" class="ui-listview-item-icon ui-corner-none">France</a></li>
					<li><a href="#"><img src="../_assets/img/de.png" alt="Germany" class="ui-listview-item-icon">Germany</a></li>
					<li><a href="#"><img src="../_assets/img/gb.png" alt="Great Britain" class="ui-listview-item-icon">Great Britain</a></li>
					<li><a href="#"><img src="../_assets/img/fi.png" alt="Finland" class="ui-listview-item-icon">Finland</a></li>
					<li><a href="#"><img src="../_assets/img/us.png" alt="United States" class="ui-listview-item-icon ui-corner-none">United States</a></li>
				</ul>
			</div><!--/demo-html -->

		<h2>Thumbnails</h2>
		<p>To add thumbnails to the left of a list item, simply add an image inside a list item as the first child element. The framework will scale the image to 80 pixels square.</p>
			<div data-demo-html="true">
				<ul data-role="listview" data-inset="true">
					<li><a href="#">
						<img src="../_assets/img/album-bb.jpg">
					<h2>Broken Bells</h2>
					<p>Broken Bells</p></a>
					</li>
					<li><a href="#">
						<img src="../_assets/img/album-hc.jpg">
					<h2>Warning</h2>
					<p>Hot Chip</p></a>
					</li>
					<li><a href="#">
						<img src="../_assets/img/album-p.jpg">
					<h2>Wolfgang Amadeus Phoenix</h2>
					<p>Phoenix</p></a>
					</li>
				</ul>
			</div><!--/demo-html -->

		<h2>Split buttons</h2>
		<p>To make a split list item, simply add a second link inside the <code>li</code>. To adjust the split button icon, add the <code>data-split-icon</code> attribute to the listview . Add the <code>data-icon</code> attribute to individual list items for more control. The theme swatch color of the split button defaults to "b" (blue in the default theme) but can be set by specifying a swatch letter with the <code>data-split-theme</code> attribute at the listview level or for individual splits with the <code>data-theme</code> attribute at the link level.</p>
			<div data-demo-html="true">
				<ul data-role="listview" data-split-icon="gear" data-split-theme="a" data-inset="true">
					<li><a href="#">
						<img src="../_assets/img/album-bb.jpg">
					<h2>Broken Bells</h2>
					<p>Broken Bells</p></a>
						<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
					</li>
					<li><a href="#">
						<img src="../_assets/img/album-hc.jpg">
					<h2>Warning</h2>
					<p>Hot Chip</p></a>
						<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
					</li>
					<li><a href="#">
						<img src="../_assets/img/album-p.jpg">
					<h2>Wolfgang Amadeus Phoenix</h2>
					<p>Phoenix</p></a>
						<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
					</li>
				</ul>

				<div data-role="popup" id="purchase" data-theme="a" data-overlay-theme="b" class="ui-content" style="max-width:340px; padding-bottom:2em;">
					<h3>Purchase Album?</h3>
				<p>Your download will begin immediately on your mobile device when you purchase.</p>
					<a href="index.php" data-rel="back" class="ui-shadow ui-button ui-corner-all ui-button-b ui-button-inline ui-mini">Buy: $10.99 <span class="ui-icon ui-icon-check"></span></a>
					<a href="index.php" data-rel="back" class="ui-shadow ui-button ui-corner-all ui-button-inline ui-mini">Cancel</a>
				</div>
			</div><!--/demo-html -->

		<h2>Formatted content</h2>

		<p>To add text hierarchy, use headings to increase font emphasis and use paragraphs to reduce emphasis. Supplemental information can be added to the right of each list item by wrapping content in an element with a class of <code>ui-listview-item-aside</code></p>

			<div data-demo-html="true">
				<ul data-role="listview" data-inset="true">
					<li data-role="list-divider">Friday, October 8, 2010 <span class="ui-listview-item-count-bubble">2</span></li>
					<li><a href="index.php">
					<h2>Stephen Weber</h2>
					<p><strong>You've been invited to a meeting at Filament Group in Boston, MA</strong></p>
					<p>Hey Stephen, if you're available at 10am tomorrow, we've got a meeting with the jQuery team.</p>
						<p class="ui-listview-item-aside"><strong>6:24</strong>PM</p>
					</a></li>
					<li><a href="index.php">
					<h2>jQuery Team</h2>
					<p><strong>Boston Conference Planning</strong></p>
					<p>In preparation for the upcoming conference in Boston, we need to start gathering a list of sponsors and speakers.</p>
						<p class="ui-listview-item-aside"><strong>9:18</strong>AM</p>
					</a></li>
					<li data-role="list-divider">Thursday, October 7, 2010 <span class="ui-listview-item-count-bubble">1</span></li>
					<li><a href="index.php">
					<h2>Avery Walker</h2>
					<p><strong>Re: Dinner Tonight</strong></p>
					<p>Sure, let's plan on meeting at Highland Kitchen at 8:00 tonight. Can't wait!</p>
						<p class="ui-listview-item-aside"><strong>4:48</strong>PM</p>
					</a></li>
				</ul>
			</div><!--/demo-html -->

		<h2>Theme</h2>

		<p>The list item color scheme can be changed to any button color theme swatch by adding the <code> data-theme</code> attribute to the listview or to individual list items. The theme for <strong>list dividers</strong> can be set by adding the <code>data-divider-theme</code> to the list. The theme for <strong>count bubbles</strong> is inherited from the parent list item.</p>

			<div data-demo-html="true">

				<ul data-role="listview" data-inset="true" data-theme="b" data-divider-theme="a">
					<li data-role="list-divider">Divider</li>
					<li data-theme="a"><a href="index.php">Inbox <span class="ui-listview-item-count-bubble">12</span></a></li>
					<li><a href="index.php">Outbox <span class="ui-listview-item-count-bubble">0</span></a></li>
					<li><a href="index.php">Sent <span class="ui-listview-item-count-bubble">328</span></a></li>
				</ul>
			</div><!--/demo-html -->

		<p>To specify the swatch for the split button, add the <code>data-split-theme</code> to the list and specify a swatch letter. This attribute can also be added to individual split inside list items by adding a <code> data-theme</code> attribute to specific links  (see second list item). The icon for the split button can be set at the list level by adding the <code>data-split-icon</code>.</p>

			<div data-demo-html="true">
				<ul data-role="listview" data-split-icon="plus" data-theme="a" data-split-theme="b" data-inset="true">
					<li>
						<a href="#"><h2>Broken Bells</h2></a>
						<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
					</li>
					<li>
						<a href="#"><h2>Phoenix</h2></a>
						<a href="#purchase" data-theme="a" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
					</li>
				</ul>
			</div><!--/demo-html -->

		<p>The white icon sprite is used by default in the theme. Adding the <code>ui-alt-icon</code> class to the list switches to the black sprite and gets rid of the dark disc.</p>
			<div data-demo-html="true">
				<ul data-role="listview" data-inset="true" class="ui-alt-icon">
					<li><a href="#">Acura</a></li>
					<li><a href="#">Audi</a></li>
					<li><a href="#">BMW</a></li>
					<li><a href="#">Cadillac</a></li>
					<li><a href="#">Ferrari</a></li>
				</ul>
			</div><!--/demo-html -->

		<h2>Forms</h2>

		<p>Any form element can be placed inside a listview for a grouped presentation.</p>

			<div data-demo-html="true">
				<form>
					<ul data-role="listview" data-inset="true">
                        <li class="ui-field-contain">
                            <label for="name2">Text Input:</label>
                            <input type="text" name="name2" id="name2" value="" data-clear-button="true">
                        </li>
                        <li class="ui-field-contain">
                            <label for="textarea2">Textarea:</label>
                        <textarea cols="40" rows="8" name="textarea2" id="textarea2"></textarea>
                        </li>
                        <li class="ui-field-contain">
                            <label for="flip2">Flip switch:</label>
                            <select name="flip2" id="flip2" data-role="slider">
                                <option value="off">Off</option>
                                <option value="on">On</option>
                            </select>
                        </li>
                        <li class="ui-field-contain">
                            <label for="slider2">Slider:</label>
                            <input type="range" name="slider2" id="slider2" value="0" min="0" max="100" data-highlight="true">
                        </li>

                        <li class="ui-field-contain">
                            <label for="select-choice-1" class="select">Choose shipping method:</label>
                            <select name="select-choice-1" id="select-choice-1">
                                <option value="standard">Standard: 7 day</option>
                                <option value="rush">Rush: 3 days</option>
                                <option value="express">Express: next day</option>
                                <option value="overnight">Overnight</option>
                            </select>
                        </li>
                        <li class="ui-body ui-body-b">
                            <fieldset class="ui-grid-a">
                                    <div class="ui-block-a"><button type="submit" class="ui-button ui-corner-all ui-button-a">Cancel</button></div>
                                    <div class="ui-block-b"><button type="submit" class="ui-button ui-corner-all ui-button-a">Submit</button></div>
                            </fieldset>
                        </li>
					</ul>
				</form>
			</div><!--/demo-html -->

		<h2>Collapsible listview</h2>

		<p>This is an example of a listview wrapped in a container with <code>data-role="collapsible"</code>.</p>

			<div data-demo-html="true">
				<div data-role="collapsible" data-theme="b" data-content-theme="b">
				<h2>Choose a car model...</h2>
					<ul data-role="listview" data-filter="true">
						<li><a href="index.php">Acura</a></li>
						<li><a href="index.php">Audi</a></li>
						<li><a href="index.php">BMW</a></li>
						<li><a href="index.php">Cadillac</a></li>
						<li><a href="index.php">Chrysler</a></li>
						<li><a href="index.php">Dodge</a></li>
						<li><a href="index.php">Ferrari</a></li>
						<li><a href="index.php">Ford</a></li>
						<li><a href="index.php">GMC</a></li>
						<li><a href="index.php">Honda</a></li>
					</ul>
				</div>
			</div><!--/demo-html -->

		<h2>Grouped collapsible with listviews</h2>

		<p>You can also use listviews inside a <a href="../collapsibleset/">collapsible set</a> (accordion) to visually group the list and ensure that only a single item can be open at once.</p>

			<div data-demo-html="true">
				<div data-role="collapsibleset" data-theme="a" data-content-theme="b">
					<div data-role="collapsible">
					<h2>Filtered list</h2>
						<ul data-role="listview" data-filter="true" data-filter-theme="a" data-divider-theme="b">
							<li><a href="index.php">Adam Kinkaid</a></li>
							<li><a href="index.php">Alex Wickerham</a></li>
							<li><a href="index.php">Avery Johnson</a></li>
							<li><a href="index.php">Bob Cabot</a></li>
							<li><a href="index.php">Caleb Booth</a></li>
						</ul>
					</div>
					<div data-role="collapsible">
					<h2>Formatted text</h2>
						<ul data-role="listview" data-theme="a" data-divider-theme="b">
							<li data-role="list-divider">Friday, October 8, 2010 <span class="ui-listview-item-count-bubble">2</span></li>
							<li><a href="index.php">
								<h3>Stephen Weber</h3>
							<p><strong>You've been invited to a meeting at Filament Group in Boston, MA</strong></p>
							<p>Hey Stephen, if you're available at 10am tomorrow, we've got a meeting with the jQuery team.</p>
								<p class="ui-listview-item-aside"><strong>6:24</strong>PM</p>
							</a></li>
							<li><a href="index.php">
								<h3>jQuery Team</h3>
							<p><strong>Boston Conference Planning</strong></p>
							<p>In preparation for the upcoming conference in Boston, we need to start gathering a list of sponsors and speakers.</p>
								<p class="ui-listview-item-aside"><strong>9:18</strong>AM</p>
							</a></li>
						</ul>
					</div>
					<div data-role="collapsible">
					<h2>Thumbnails and split button</h2>
						<ul data-role="listview" data-split-icon="gear" data-split-theme="a">
							<li><a href="index.php">
								<img src="../_assets/img/album-bb.jpg">
								<h3>Broken Bells</h3>
							<p>Broken Bells</p>
								</a><a href="index.php" data-rel="dialog" data-transition="slideup">Purchase album
							</a></li>
							<li><a href="index.php">
								<img src="../_assets/img/album-hc.jpg">
								<h3>Warning</h3>
							<p>Hot Chip</p>
							</a><a href="index.php" data-rel="dialog" data-transition="slideup">Purchase album
							</a></li>
							<li><a href="index.php">
								<img src="../_assets/img/album-p.jpg">
								<h3>Wolfgang Amadeus Phoenix</h3>
							<p>Phoenix</p>
								</a><a href="index.php" data-rel="dialog" data-transition="slideup">Purchase album
							</a></li>
						</ul>
					</div>
				</div>
			</div><!--/demo-html -->

		<h2>Full width collapsible listview</h2>

		<p>Setting <code>data-inset="false"</code> on a collapsible or a collapsible set makes the collapsible full width (non-inset), like a full width listview.</p>

			<div data-demo-html="true">
				<div data-role="collapsibleset" data-theme="a" data-inset="false">
					<div data-role="collapsible">
					<h2>Mailbox</h2>
						<ul data-role="listview">
							<li><a href="index.php">Inbox <span class="ui-listview-item-count-bubble">12</span></a></li>
							<li><a href="index.php">Outbox <span class="ui-listview-item-count-bubble">0</span></a></li>
							<li><a href="index.php">Drafts <span class="ui-listview-item-count-bubble">4</span></a></li>
							<li><a href="index.php">Sent <span class="ui-listview-item-count-bubble">328</span></a></li>
							<li><a href="index.php">Trash <span class="ui-listview-item-count-bubble">62</span></a></li>
						</ul>
					</div>
					<div data-role="collapsible">
					<h2>Calendar</h2>
						<ul data-role="listview" data-theme="a" data-divider-theme="b">
							<li data-role="list-divider">Friday, October 8, 2010 <span class="ui-listview-item-count-bubble">2</span></li>
							<li><a href="index.php">
									<h3>Stephen Weber</h3>
								<p><strong>You've been invited to a meeting at Filament Group in Boston, MA</strong></p>
								<p>Hey Stephen, if you're available at 10am tomorrow, we've got a meeting with the jQuery team.</p>
									<p class="ui-listview-item-aside"><strong>6:24</strong>PM</p>
							</a></li>
							<li><a href="index.php">
								<h3>jQuery Team</h3>
							<p><strong>Boston Conference Planning</strong></p>
							<p>In preparation for the upcoming conference in Boston, we need to start gathering a list of sponsors and speakers.</p>
								<p class="ui-listview-item-aside"><strong>9:18</strong>AM</p>
							</a></li>
							<li data-role="list-divider">Thursday, October 7, 2010 <span class="ui-listview-item-count-bubble">1</span></li>
							<li><a href="index.php">
								<h3>Avery Walker</h3>
							<p><strong>Re: Dinner Tonight</strong></p>
							<p>Sure, let's plan on meeting at Highland Kitchen at 8:00 tonight. Can't wait! </p>
								<p class="ui-listview-item-aside"><strong>4:48</strong>PM</p>
							</a></li>
							<li data-role="list-divider">Wednesday, October 6, 2010 <span class="ui-listview-item-count-bubble">3</span></li>
							<li><a href="index.php">
								<h3>Amazon.com</h3>
							<p><strong>4-for-3 Books for Kids</strong></p>
							<p>As someone who has purchased children's books from our 4-for-3 Store, you may be interested in these featured books.</p>
								<p class="ui-listview-item-aside"><strong>12:47</strong>PM</p>
							</a></li>
						</ul>
					</div>
					<div data-role="collapsible">
					<h2>Contacts</h2>
						<ul data-role="listview" data-autodividers="true" data-theme="a" data-divider-theme="b">
							<li><a href="index.php">Adam Kinkaid</a></li>
							<li><a href="index.php">Alex Wickerham</a></li>
							<li><a href="index.php">Avery Johnson</a></li>
							<li><a href="index.php">Bob Cabot</a></li>
							<li><a href="index.php">Caleb Booth</a></li>
							<li><a href="index.php">Christopher Adams</a></li>
							<li><a href="index.php">Culver James</a></li>
						</ul>
					</div>
				</div>
			</div><!--/demo-html -->

	</div><!-- /content -->

	<?php include( '../jqm-navmenu.php' ); ?>

	<div data-role="toolbar" data-type="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<h6>jQuery Mobile Version <span class="jqm-version"></span> Demos</h6>
		<ul>
			<li><a href="http://jquerymobile.com/" title="Visit the jQuery Mobile web site">jquerymobile.com</a></li>
			<li><a href="https://github.com/jquery/jquery-mobile" title="Visit the jQuery Mobile GitHub repository">GitHub repository</a></li>
		</ul>
		<p>Copyright jQuery Foundation</p>
	</div><!-- /footer -->

</div><!-- /page -->

<?php include( '../jqm-search.php' ); ?>

</body>
</html>
