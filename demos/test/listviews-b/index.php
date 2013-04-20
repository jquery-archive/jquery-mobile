<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Listview test - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="shortcut icon" href="../../favicon.ico">
	<script src="../../../js/jquery.js"></script>
	<script src="../../../js/"></script>
	<style id="custom-icon">
        .ui-icon-custom {
			background-image: url("../../_assets/img/glyphish-icons/21-skull.png");
			background-position: 3px 3px;
			background-size: 70%;
		}
    </style>
</head>
<body>
<div data-role="page" data-theme="b">

	<div data-role="header">
		<h1>Listview test</h1>
		<a href="../../" data-rel="back" data-icon="back" data-iconpos="notext">Back</a>
	</div><!-- /header -->

	<div data-role="content">

		
			<ul data-role="listview">
				<li>Acura</li>
				<li>Audi</li>
				<li>BMW</li>
				<li>Cadillac</li>
				<li>Ferrari</li>
			</ul>
		

		
			<ol data-role="listview" data-inset="true">
				<li>Acura</li>
				<li>Audi</li>
				<li>BMW</li>
				<li>Cadillac</li>
				<li>Ferrari</li>
			</ol>
		

		
			<ul data-role="listview">
				<li><a href="#">Acura</a></li>
				<li><a href="#">Audi</a></li>
				<li><a href="#">BMW</a></li>
				<li><a href="#">Cadillac</a></li>
				<li><a href="#">Ferrari</a></li>
			</ul>
		
		
		
			<ol data-role="listview">
				<li><a href="#">Acura</a></li>
				<li><a href="#">Audi</a></li>
				<li><a href="#">BMW</a></li>
				<li><a href="#">Cadillac</a></li>
				<li><a href="#">Ferrari</a></li>
			</ol>
		

		
			<ul data-role="listview" data-inset="true">
				<li><a href="#">Acura</a></li>
				<li><a href="#">Audi</a></li>
				<li><a href="#">BMW</a></li>
				<li><a href="#">Cadillac</a></li>
				<li><a href="#">Ferrari</a></li>
			</ul>
		

		
			<ul data-role="listview" data-filter="true" data-filter-placeholder="Search fruits..." data-inset="true">
				<li><a href="#">Apple</a></li>
				<li><a href="#">Banana</a></li>
				<li><a href="#">Cherry</a></li>
				<li><a href="#">Cranberry</a></li>
				<li><a href="#">Grape</a></li>
				<li><a href="#">Orange</a></li>
			</ul>
		

		
			<ul data-role="listview" data-filter="true" data-filter-placeholder="Search fruits...">
				<li><a href="#">Apple</a></li>
				<li><a href="#">Banana</a></li>
				<li><a href="#">Cherry</a></li>
				<li><a href="#">Cranberry</a></li>
				<li><a href="#">Grape</a></li>
				<li><a href="#">Orange</a></li>
			</ul>
		

		
			<ul data-role="listview" data-inset="true" data-divider-theme="a">
				<li data-role="list-divider">Mail</li>
				<li><a href="#">Inbox</a></li>
				<li><a href="#">Outbox</a></li>
				<li data-role="list-divider">Contacts</li>
				<li><a href="#">Friends</a></li>
				<li><a href="#">Work</a></li>
			</ul>
		

		
			<ul data-role="listview" data-divider-theme="a">
				<li data-role="list-divider">Mail</li>
				<li><a href="#">Inbox</a></li>
				<li><a href="#">Outbox</a></li>
				<li data-role="list-divider">Contacts</li>
				<li><a href="#">Friends</a></li>
				<li><a href="#">Work</a></li>
			</ul>
		

		
			<ul data-role="listview" data-count-theme="a" data-inset="true">
				<li><a href="#">Inbox <span class="ui-li-count">12</span></a></li>
				<li><a href="#">Outbox <span class="ui-li-count">0</span></a></li>
				<li><a href="#">Drafts <span class="ui-li-count">4</span></a></li>
				<li><a href="#">Sent <span class="ui-li-count">328</span></a></li>
				<li><a href="#">Trash <span class="ui-li-count">62</span></a></li>
			</ul>
		

			<ul data-role="listview" data-inset="true" data-theme="a">
				<li data-icon="custom" id="skull"><a href="#">custom-icon</a></li>
				<li data-icon="delete"><a href="#">data-icon="delete"</a></li>
				<li data-icon="gear"><a href="#">data-icon="gear"</a></li>
				<li data-icon="info"><a href="#">data-icon="info"</a></li>
				<li data-icon="false"><a href="#">data-icon="false"</a></li>
			</ul>
		

		
			<ul data-role="listview" data-inset="true">
				<li><a href="#"><img src="../../_assets/img/gf.png" alt="France" class="ui-li-icon ui-corner-none">France</a></li>
				<li><a href="#"><img src="../../_assets/img/de.png" alt="Germany" class="ui-li-icon">Germany</a></li>
				<li><a href="#"><img src="../../_assets/img/gb.png" alt="Great Britain" class="ui-li-icon">Great Britain</a></li>
				<li><a href="#"><img src="../../_assets/img/fi.png" alt="Finland" class="ui-li-icon">Finland</a></li>
				<li><a href="#"><img src="../../_assets/img/us.png" alt="United States" class="ui-li-icon ui-corner-none">United States</a></li>
			</ul>
		

		
			<ul data-role="listview" data-inset="true">
				<li><a href="#">
					<img src="../../_assets/img/album-bb.jpg" />
					<h2>Broken Bells</h2>
					<p>Broken Bells</p></a>
				</li>
				<li><a href="#">
					<img src="../../_assets/img/album-hc.jpg" />
					<h2>Warning</h2>
					<p>Hot Chip</p></a>
				</li>
				<li><a href="#">
					<img src="../../_assets/img/album-p.jpg" />
					<h2>Wolfgang Amadeus Phoenix</h2>
					<p>Phoenix</p></a>
				</li>
			</ul>
		

		
			<ul data-role="listview" data-split-icon="gear" data-split-theme="a" data-inset="true">
				<li><a href="#">
					<img src="../../_assets/img/album-bb.jpg" />
					<h2>Broken Bells</h2>
					<p>Broken Bells</p></a>
					<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
				</li>
				<li><a href="#">
					<img src="../../_assets/img/album-hc.jpg" />
					<h2>Warning</h2>
					<p>Hot Chip</p></a>
					<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
				</li>
				<li><a href="#">
					<img src="../../_assets/img/album-p.jpg" />
					<h2>Wolfgang Amadeus Phoenix</h2>
					<p>Phoenix</p></a>
					<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
				</li>
			</ul>
			
			<ul data-role="listview" data-split-icon="gear" data-split-theme="a">
				<li><a href="#">
					<img src="../../_assets/img/album-bb.jpg" />
					<h2>Broken Bells</h2>
					<p>Broken Bells</p></a>
					<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
				</li>
				<li><a href="#">
					<img src="../../_assets/img/album-hc.jpg" />
					<h2>Warning</h2>
					<p>Hot Chip</p></a>
					<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
				</li>
				<li><a href="#">
					<img src="../../_assets/img/album-p.jpg" />
					<h2>Wolfgang Amadeus Phoenix</h2>
					<p>Phoenix</p></a>
					<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
				</li>
			</ul>

			<div data-role="popup" id="purchase" data-theme="a" data-overlay-theme="a" class="ui-content" style="max-width:340px; padding-bottom:2em;">
				<h3>Purchase Album?</h3>
				<p>Your download will begin immediately on your mobile device when you purchase.</p>
				<a href="index.html" data-role="button" data-rel="back" data-theme="a" data-icon="check" data-inline="true" data-mini="true">Buy: $10.99</a>
				<a href="index.html" data-role="button" data-rel="back" data-inline="true" data-mini="true">Cancel</a>
			</div>
		

		
			<ul data-role="listview" data-inset="true">
				<li data-role="list-divider">Friday, October 8, 2010 <span class="ui-li-count">2</span></li>
				<li><a href="index.html">
					<h2>Stephen Weber</h2>
					<p><strong>You've been invited to a meeting at Filament Group in Boston, MA</strong></p>
					<p>Hey Stephen, if you're available at 10am tomorrow, we've got a meeting with the jQuery team.</p>
					<p class="ui-li-aside"><strong>6:24</strong>PM</p>
				</a></li>
				<li><a href="index.html">
					<h2>jQuery Team</h2>
					<p><strong>Boston Conference Planning</strong></p>
					<p>In preparation for the upcoming conference in Boston, we need to start gathering a list of sponsors and speakers.</p>
					<p class="ui-li-aside"><strong>9:18</strong>AM</p>
				</a></li>
				<li data-role="list-divider">Thursday, October 7, 2010 <span class="ui-li-count">1</span></li>
				<li><a href="index.html">
					<h2>Avery Walker</h2>
					<p><strong>Re: Dinner Tonight</strong></p>
					<p>Sure, let's plan on meeting at Highland Kitchen at 8:00 tonight. Can't wait! </p>
					<p class="ui-li-aside"><strong>4:48</strong>PM</p>
				</a></li>
			</ul>
		

		

			<ul data-role="listview" data-inset="true" data-theme="a" data-divider-theme="a" data-count-theme="a">
				<li data-role="list-divider">Divider</li>
				<li><a href="index.html" data-theme="a">Inbox <span class="ui-li-count">12</span></a></li>
				<li><a href="index.html">Outbox <span class="ui-li-count">0</span></a></li>
				<li><a href="index.html">Sent <span class="ui-li-count">328</span></a></li>
			</ul>
		

		
			<ul data-role="listview" data-split-icon="plus" data-theme="a" data-split-theme="a" data-split-icon="plus" data-inset="true">
				<li><a href="#">
					<h2>Broken Bells</h2>
					<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
				</li>
				<li><a href="#">
					<h2>Phoenix</h2>
					<a href="#purchase" data-theme="a" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
				</li>
			</ul>
		

		
			<ul data-role="listview" data-inset="true" class="ui-icon-alt">
				<li><a href="#">Acura</a></li>
				<li><a href="#">Audi</a></li>
				<li><a href="#">BMW</a></li>
				<li><a href="#">Cadillac</a></li>
				<li><a href="#">Ferrari</a></li>
			</ul>
		

		
			<form>
				<ul data-role="listview" data-inset="true">
					<li data-role="fieldcontain">
						<label for="name2">Text Input:</label>
						<input type="text" name="name2" id="name2" value="" data-clear-btn="true">
					</li>
					<li data-role="fieldcontain">
						<label for="textarea2">Textarea:</label>
					<textarea cols="40" rows="8" name="textarea2" id="textarea2"></textarea>
					</li>
					<li data-role="fieldcontain">
						<label for="flip2">Flip switch:</label>
						<select name="flip2" id="flip2" data-role="slider">
							<option value="off">Off</option>
							<option value="on">On</option>
						</select>
					</li>
					<li data-role="fieldcontain">
						<label for="slider2">Slider:</label>
						<input type="range" name="slider2" id="slider2" value="0" min="0" max="100" data-highlight="true">
					</li>

					<li data-role="fieldcontain">
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
								<div class="ui-block-a"><button type="submit" data-theme="a">Cancel</button></div>
								<div class="ui-block-b"><button type="submit" data-theme="a">Submit</button></div>
						</fieldset>
					</li>
				</ul>
			</form>
		

		
			<div data-role="collapsible" data-theme="a" data-content-theme="a">
				<h2>Choose a car model...</h2>
				<ul data-role="listview" data-filter="true">
					<li><a href="index.html">Acura</a></li>
					<li><a href="index.html">Audi</a></li>
					<li><a href="index.html">BMW</a></li>
					<li><a href="index.html">Cadillac</a></li>
					<li><a href="index.html">Chrysler</a></li>
					<li><a href="index.html">Dodge</a></li>
					<li><a href="index.html">Ferrari</a></li>
					<li><a href="index.html">Ford</a></li>
					<li><a href="index.html">GMC</a></li>
					<li><a href="index.html">Honda</a></li>
				</ul>
			</div>
		

		
			<div data-role="collapsible-set" data-theme="a" data-content-theme="a">
				<div data-role="collapsible">
					<h2>Filtered list</h2>
					<ul data-role="listview" data-filter="true" data-filter-theme="a" data-divider-theme="a">
						<li><a href="index.html">Adam Kinkaid</a></li>
						<li><a href="index.html">Alex Wickerham</a></li>
						<li><a href="index.html">Avery Johnson</a></li>
						<li><a href="index.html">Bob Cabot</a></li>
						<li><a href="index.html">Caleb Booth</a></li>
					</ul>
				</div>
				<div data-role="collapsible">
					<h2>Formatted text</h2>
					<ul data-role="listview" data-theme="a" data-divider-theme="a">
						<li data-role="list-divider">Friday, October 8, 2010 <span class="ui-li-count">2</span></li>
						<li><a href="index.html">
							<h3>Stephen Weber</h3>
							<p><strong>You've been invited to a meeting at Filament Group in Boston, MA</strong></p>
							<p>Hey Stephen, if you're available at 10am tomorrow, we've got a meeting with the jQuery team.</p>
							<p class="ui-li-aside"><strong>6:24</strong>PM</p>
						</a></li>
						<li><a href="index.html">
							<h3>jQuery Team</h3>
							<p><strong>Boston Conference Planning</strong></p>
							<p>In preparation for the upcoming conference in Boston, we need to start gathering a list of sponsors and speakers.</p>
							<p class="ui-li-aside"><strong>9:18</strong>AM</p>
						</a></li>
					</ul>
				</div>
				<div data-role="collapsible">
					<h2>Thumbnails and split button</h2>
					<ul data-role="listview" data-split-icon="gear" data-split-theme="a">
						<li><a href="index.html">
							<img src="../../_assets/img/album-bb.jpg" />
							<h3>Broken Bells</h3>
							<p>Broken Bells</p>
							</a><a href="lists-split-purchase.html" data-rel="dialog" data-transition="slideup">Purchase album
						</a></li>
						<li><a href="index.html">
							<img src="../../_assets/img/album-hc.jpg" />
							<h3>Warning</h3>
							<p>Hot Chip</p>
						</a><a href="lists-split-purchase.html" data-rel="dialog" data-transition="slideup">Purchase album
						</a></li>
						<li><a href="index.html">
							<img src="../../_assets/img/album-p.jpg" />
							<h3>Wolfgang Amadeus Phoenix</h3>
							<p>Phoenix</p>
							</a><a href="lists-split-purchase.html" data-rel="dialog" data-transition="slideup">Purchase album
						</a></li>
					</ul>
				</div>
			</div>
		

		
			<div data-role="collapsible-set" data-theme="a" data-content-theme="a" data-inset="false">
				<div data-role="collapsible">
					<h2>Mailbox</h2>
					<ul data-role="listview">
						<li><a href="index.html">Inbox <span class="ui-li-count">12</span></a></li>
						<li><a href="index.html">Outbox <span class="ui-li-count">0</span></a></li>
						<li><a href="index.html">Drafts <span class="ui-li-count">4</span></a></li>
						<li><a href="index.html">Sent <span class="ui-li-count">328</span></a></li>
						<li><a href="index.html">Trash <span class="ui-li-count">62</span></a></li>
					</ul>
				</div>
				<div data-role="collapsible">
					<h2>Calendar</h2>
					<ul data-role="listview" data-theme="a" data-divider-theme="a">
						<li data-role="list-divider">Friday, October 8, 2010 <span class="ui-li-count">2</span></li>
						<li><a href="index.html">
								<h3>Stephen Weber</h3>
								<p><strong>You've been invited to a meeting at Filament Group in Boston, MA</strong></p>
								<p>Hey Stephen, if you're available at 10am tomorrow, we've got a meeting with the jQuery team.</p>
								<p class="ui-li-aside"><strong>6:24</strong>PM</p>
						</a></li>
						<li><a href="index.html">
							<h3>jQuery Team</h3>
							<p><strong>Boston Conference Planning</strong></p>
							<p>In preparation for the upcoming conference in Boston, we need to start gathering a list of sponsors and speakers.</p>
							<p class="ui-li-aside"><strong>9:18</strong>AM</p>
						</a></li>
						<li data-role="list-divider">Thursday, October 7, 2010 <span class="ui-li-count">1</span></li>
						<li><a href="index.html">
							<h3>Avery Walker</h3>
							<p><strong>Re: Dinner Tonight</strong></p>
							<p>Sure, let's plan on meeting at Highland Kitchen at 8:00 tonight. Can't wait! </p>
							<p class="ui-li-aside"><strong>4:48</strong>PM</p>
						</a></li>
						<li data-role="list-divider">Wednesday, October 6, 2010 <span class="ui-li-count">3</span></li>
						<li><a href="index.html">
							<h3>Amazon.com</h3>
							<p><strong>4-for-3 Books for Kids</strong></p>
							<p>As someone who has purchased children's books from our 4-for-3 Store, you may be interested in these featured books.</p>
							<p class="ui-li-aside"><strong>12:47</strong>PM</p>
						</a></li>
					</ul>
				</div>
				<div data-role="collapsible">
					<h2>Contacts</h2>
					<ul data-role="listview" data-autodividers="true" data-theme="a" data-divider-theme="a">
						<li><a href="index.html">Adam Kinkaid</a></li>
						<li><a href="index.html">Alex Wickerham</a></li>
						<li><a href="index.html">Avery Johnson</a></li>
						<li><a href="index.html">Bob Cabot</a></li>
						<li><a href="index.html">Caleb Booth</a></li>
						<li><a href="index.html">Christopher Adams</a></li>
						<li><a href="index.html">Culver James</a></li>
					</ul>
				</div>
			</div>
		

		
			<ul data-role="listview" data-header-theme="a">
				<li>Animals
					<ul>
						<li>Pets
							<ul>
								<li><a href="index.html">Canary</a></li>
								<li><a href="index.html">Cat</a></li>
								<li><a href="index.html">Dog</a></li>
							</ul>
						</li>
						<li>Farm animals
							<ul>
								<li><a href="index.html">Chicken</a></li>
								<li><a href="index.html">Cow</a></li>
								<li><a href="index.html">Sheep</a></li>
							</ul>
						</li>
						<li>Wild animals>
							<ul>
								<li><a href="index.html">Alligator</a></li>
								<li><a href="index.html">Bear</a></li>
								<li><a href="index.html">Zebra</a></li>
							</ul>
						</li>
					</ul>
				</li>
				<li>Colors
					<ul>
						<li><a href="index.html">Blue</a></li>
						<li><a href="index.html">Green</a></li>
						<li><a href="index.html">Red</a></li>
					</ul>
				</li>
				<li>Vehicles
					<ul>
						<li>Cars
							<ul>
								<li><a href="index.html">Audi</a></li>
								<li><a href="index.html">BMW</a></li>
								<li><a href="index.html">Volkswagen</a></li>
							</ul>
						</li>
						<li>Planes
							<ul>
								<li><a href="index.html">Boeing</a></li>
								<li><a href="index.html">Embraer</a></li>
								<li><a href="index.html">Airbus</a></li>
							</ul>
						</li>
					</ul>
				</li>
			</ul>
		

	</div><!-- /content -->

	<div data-role="footer">
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

</div><!-- /page -->
</body>
</html>
