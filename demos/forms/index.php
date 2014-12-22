<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Form elements - jQuery Mobile Demos</title>
		<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
		<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
		<link rel="shortcut icon" href="../favicon.ico">
		<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
		<script src="../../external/jquery/jquery.js"></script>
		<script src="../_assets/js/"></script>
		<script src="../../js/"></script>
	</head>
	<body>
	<div data-role="page" class="jqm-demos" data-quicklinks="true">

		<div data-role="header" class="jqm-header">
			<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p><span class="jqm-version"></span> Demos</p>
			<a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
			<a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
			</div><!-- /header -->

    <div role="main" class="ui-content jqm-content">

        <h1>Form elements</h1>

        <p>All form widgets begin with native form elements with rich HTML semantics that are enhanced to make them more attractive and finger-friendly.
        </p>

		<h2>Markup conventions</h2>

		<p>When constructing forms to be used in jQuery Mobile, most of the standard guidelines used to create forms that submit via ordinary HTTP POST or GET still apply. Additionally, the <code>id</code> attributes of form controls need to be not only unique on a given page, but also unique across the pages in a site. This is because jQuery Mobile's single-page navigation model allows many different "pages" to be present in the DOM at the same time. You must be careful to use unique <code>id</code> attributes so there will be only one of each in the DOM. Be sure to pair them properly with <code>label</code> elements via the <code>for</code> attribute.</p>

        <h2>Buttons</h2>

		<p>Buttons are used within a wide range of other plugins. The button markup is flexible and can be created from links or form buttons. Learn more about <a href="../button/">buttons</a>.</p>
        <div data-demo-html="true">
            <a href="#" class="ui-button ui-corner-all ui-shadow">Link button</a>
            <form>
                <button class="ui-shadow ui-button ui-corner-all">Button element</button>
                <input type="button" value="Button element" data-icon="delete" data-theme="a">
            </form>
        </div><!-- /demo-html -->

        <p>Inline buttons</p>
        <div data-demo-html="true">
            <a href="#" class="ui-shadow ui-button ui-corner-all ui-button-inline ui-icon-beginning">Inline + icon<span class="ui-icon ui-icon-star"></span></a>
            <a href="#" class="ui-shadow ui-button ui-corner-all ui-button-inline ui-button-b ui-mini">Mini + theme</a>
            <a href="#" class="ui-shadow ui-button ui-corner-all ui-button-inline ui-button-icon-only ui-button-b ui-mini">icon only button<span class="ui-icon ui-icon-plus"></span></a>
        </div><!-- /demo-html -->

        <p>Horizontal grouped buttons</p>
        <div data-demo-html="true">
            <div data-role="controlgroup" data-type="horizontal" data-mini="true">
                <a href="#" class="ui-shadow ui-button ui-corner-all ui-icon-beginning ui-button-b">Add<span class="ui-icon ui-icon-plus"></span></a>
                <a href="#" class="ui-shadow ui-button ui-corner-all ui-icon-beginning ui-button-b">Delete<span class="ui-icon ui-icon-delete"></span></a>
                <a href="#" class="ui-shadow ui-button ui-corner-all ui-icon-beginning ui-button-b">More<span class="ui-icon ui-icon-grid"></span></a>
            </div>
        </div><!-- /demo-html -->

        <h2>Sliders</h2>

		<p>Sliders are used to enter numeric values along a numeric continuum by dragging a handle or entering in a value. Learn more about <a href="../slider/" data-ajax="false">sliders</a>.</p>

        <div data-demo-html="true">
            <label for="slider">Slider:</label>
            <input type="range" name="slider" id="slider" value="50" min="0" max="100">
        </div><!-- /demo-html -->

        <div data-demo-html="true">
            <label for="slider-fill">Slider with fill and step of 50:</label>
            <input type="range" name="slider-fill" id="slider-fill" value="60" min="0" max="1000" step="50" data-highlight="true">
        </div><!-- /demo-html -->

        <div data-demo-html="true">
            <label for="slider-fill-mini">Slider with fill, mini, track theme:</label>
            <input type="range" name="slider-fill-mini" id="slider-fill-mini" value="40" min="0" max="100" data-mini="true" data-highlight="true" data-theme="b" data-track-theme="b">
        </div><!-- /demo-html -->

        <h2>Range slider</h2>

		<p>Range sliders offer two handles to set a min and max value along a numeric continuum. Learn more about <a href="../rangeslider/" data-ajax="false">range sliders</a>.</p>

        <div data-demo-html="true">
        <form>
            <div data-role="rangeslider">
                <label for="range-1a">Rangeslider:</label>
                <input type="range" name="range-1a" id="range-1a" min="0" max="100" value="40">
                <label for="range-1b">Rangeslider:</label>
                <input type="range" name="range-1b" id="range-1b" min="0" max="100" value="80">
            </div>
        </form>
        </div><!-- /demo-html -->

		<div data-demo-html="true">
        <form>
            <div data-role="rangeslider" data-mini="true">
                <label for="range-2a">Mini rangeslider:</label>
                <input type="range" name="range-2a" id="range-2a" min="0" max="100" value="40">
                <label for="range-2b">Mini rangeslider:</label>
                <input type="range" name="range-2b" id="range-2b" min="0" max="100" value="80">
            </div>
        </form>
        </div><!-- /demo-html -->

        <h2>Flip switch</h2>

		<p>Flip switches are used for boolean style inputs like true/false or on/off in a compact UI element. Learn more about <a href="../slider-flipswitch/" data-ajax="false">flip switches</a>.</p>

        <div data-demo-html="true">
            <label for="slider2">Flip switch:</label>
            <select name="slider2" id="slider2" data-role="slider">
                <option value="off">Off</option>
                <option value="on">On</option>
            </select>
        </div><!-- /demo-html -->

        <div data-demo-html="true">
            <label for="slider-flip-m">Mini flip switch:</label>
            <select name="slider-flip-m" id="slider-flip-m" data-role="slider" data-mini="true">
                <option value="off">No</option>
                <option value="on" selected>Yes</option>
            </select>
        </div><!-- /demo-html -->

        <h2>Checkboxes</h2>

		<p>Checkboxes are used to provide a list of options where more than one can be selected. Learn more about <a href="../checkboxradio-checkbox/">checkboxes</a>.</p>

        <div data-demo-html="true">
            <fieldset data-role="controlgroup">
                <legend>Checkboxes, vertical controlgroup:</legend>
                <input type="checkbox" name="checkbox-1a" id="checkbox-1a" checked>
                <label for="checkbox-1a">Cheetos</label>

                <input type="checkbox" name="checkbox-2a" id="checkbox-2a">
                <label for="checkbox-2a">Doritos</label>

                <input type="checkbox" name="checkbox-3a" id="checkbox-3a">
                <label for="checkbox-3a">Fritos</label>

                <input type="checkbox" name="checkbox-4a" id="checkbox-4a">
                <label for="checkbox-4a">Sun Chips</label>
            </fieldset>
        </div><!-- /demo-html -->

        <div data-demo-html="true">
            <fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
                <legend>Checkboxes, mini, horizontal controlgroup:</legend>
                <input type="checkbox" name="checkbox-6" id="checkbox-6">
                <label for="checkbox-6">b</label>

                <input type="checkbox" name="checkbox-7" id="checkbox-7" checked>
                <label for="checkbox-7"><em>i</em></label>

                <input type="checkbox" name="checkbox-8" id="checkbox-8">
                <label for="checkbox-8">u</label>
            </fieldset>
        </div><!-- /demo-html -->

        <h2>Radio buttons</h2>

		<p>Radio buttons are used to provide a list of options where only a single option can be selected. Learn more about <a href="../checkboxradio-radio/">radiobuttons</a>.</p>

        <div data-demo-html="true">
                <fieldset data-role="controlgroup">
                    <legend>Radio buttons, vertical controlgroup:</legend>
                        <input type="radio" name="radio-choice-1" id="radio-choice-1" value="choice-1" checked="checked">
                        <label for="radio-choice-1">Cat</label>

                        <input type="radio" name="radio-choice-1" id="radio-choice-2" value="choice-2">
                        <label for="radio-choice-2">Dog</label>

                        <input type="radio" name="radio-choice-1" id="radio-choice-3" value="choice-3">
                        <label for="radio-choice-3">Hamster</label>

                        <input type="radio" name="radio-choice-1" id="radio-choice-4" value="choice-4">
                        <label for="radio-choice-4">Lizard</label>
                </fieldset>
        </div><!-- /demo-html -->

        <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
                    <legend>Radio buttons, mini, horizontal controlgroup:</legend>
                        <input type="radio" name="radio-choice-b" id="radio-choice-c" value="list" checked="checked">
                        <label for="radio-choice-c">List</label>
                        <input type="radio" name="radio-choice-b" id="radio-choice-d" value="grid">
                        <label for="radio-choice-d">Grid</label>
                        <input type="radio" name="radio-choice-b" id="radio-choice-e" value="gallery">
                        <label for="radio-choice-e">Gallery</label>
                </fieldset>
        </div><!-- /demo-html -->

        <h2>Selects</h2>

		<p>The select menu is used to offer a list of options in a compact picker. Ours is based on a native select element, which is hidden from view and replaced with a custom-styled select button. Tapping it opens the native menu or a custom styled version. Learn more about <a href="../selectmenu/">selects</a>.</p>

        <div data-demo-html="true">
            <label for="select-choice-1" class="select">Select, native menu</label>
            <select name="select-choice-1" id="select-choice-1">
                <option value="standard">Standard: 7 day</option>
                <option value="rush">Rush: 3 days</option>
                <option value="express">Express: next day</option>
                <option value="overnight">Overnight</option>
            </select>
        </div><!-- /demo-html -->

		<div data-demo-html="true">
            <label for="select-choice-mini" class="select">Mini select, inline</label>
            <select name="select-choice-mini" id="select-choice-mini" data-mini="true" data-inline="true">
                <option value="standard">Standard: 7 day</option>
                <option value="rush">Rush: 3 days</option>
                <option value="express">Express: next day</option>
                <option value="overnight">Overnight</option>
            </select>
        </div><!-- /demo-html -->

        <div data-demo-html="true">
            <label for="select-choice-a" class="select">Custom select menu:</label>
            <select name="select-choice-a" id="select-choice-a" data-native-menu="false">
                <option>Custom menu example</option>
                <option value="standard">Standard: 7 day</option>
                <option value="rush">Rush: 3 days</option>
                <option value="express">Express: next day</option>
                <option value="overnight">Overnight</option>
            </select>
        </div><!-- /demo-html -->

        <div data-demo-html="true">
            <label for="select-choice-8" class="select">Multi-select with optgroups, custom icon and position:</label>
            <select name="select-choice-8" id="select-choice-8" multiple="multiple" data-native-menu="false" data-icon="grid" data-iconpos="left">

                <option>Choose a few options:</option>
                <optgroup label="USPS">
                    <option value="standard" selected>Standard: 7 day</option>
                    <option value="rush">Rush: 3 days</option>
                    <option value="express">Express: next day</option>
                    <option value="overnight">Overnight</option>
                </optgroup>
                <optgroup label="FedEx">
                    <option value="firstOvernight">First Overnight</option>
                    <option value="expressSaver">Express Saver</option>
                    <option value="ground">Ground</option>
                </optgroup>
            </select>
        </div><!-- /demo-html -->

        <h2>Text inputs & Textareas</h2>

		<p>Text inputs and textareas are coded with standard HTML elements, then enhanced by jQuery Mobile to make them more attractive and useable on a mobile device. Learn more about <a href="../textinput/">text inputs and textareas</a>.</p>

        <div data-demo-html="true">
             <label for="text-basic">Text input:</label>
             <input type="text" name="text-basic" id="text-basic" value="">
        </div><!-- /demo-html -->

        <div data-demo-html="true">
            <label for="textarea">Textarea:</label>
            <textarea cols="40" rows="8" name="textarea" id="textarea"></textarea>
        </div><!-- /demo-html -->

        <div data-demo-html="true">
             <label for="number-pattern">Number + [0-9]* pattern:</label>
             <input type="number" name="number" pattern="[0-9]*" id="number-pattern" value="">
        </div><!-- /demo-html -->

        <div data-demo-html="true">
             <label for="date">Date:</label>
             <input type="date" name="date" id="date" value="">
        </div><!-- /demo-html -->

        <div data-demo-html="true">
             <label for="tel">Tel:</label>
             <input type="tel" name="tel" id="tel" value="">
        </div><!-- /demo-html -->

        <div data-demo-html="true">
             <label for="search">Search Input:</label>
             <input type="search" name="password" id="search" value="" placeholder="Placeholder text...">
        </div><!-- /demo-html -->

        <div data-demo-html="true">
             <label for="file">File:</label>
             <input type="file" name="file" id="file" value="">
        </div><!-- /demo-html -->

        <div data-demo-html="true">
             <label for="password">Password:</label>
             <input type="password" name="password" id="password" value="" autocomplete="off">
        </div><!-- /demo-html -->

		<p>See the <a href="../forms-gallery/">form gallery</a> for more form element examples.</p>

		<h2>Accessibly hidden labels</h2>

		<p>For the sake of accessibility, jQuery Mobile requires that all form elements be paired with a meaningful <code>label</code>. To hide labels in a way that leaves them visible to assistive technologies &mdash; for example, when letting an element's <code>placeholder</code> attribute serve as a label &mdash; apply the helper class <code>ui-hidden-accessible</code> to the label. View more examples of <a href="../forms-label-hidden-accessible/">accessibly hidden labels</a>.</p>

		<div data-demo-html="true">
			<label for="textinput-hide" class="ui-hidden-accessible">Text Input:</label>
			<input type="text" name="textinput-hide" id="textinput-hide" placeholder="Text input" value="">
		</div><!--/demo-html -->

		<h2>Disabling form elements</h2>

		<p>All jQuery Mobile widgets can be disabled in the markup by adding the standard <code>disabled</code> attribute to the element, just like you would with native controls. To dynamically disable or enable them, each form widget also has standard <code>disable</code> and <code>enable</code> methods that are documented with each form widget. View more examples of <a href="../forms-disabled/">disabled form elements</a>.</p>

		<div data-demo-html="true">
			<div class="ui-field-contain">
				<label for="textinput-disabled">Text Input:</label>
				<input disabled="disabled" type="text" name="textinput-disabled" id="textinput-disabled" placeholder="Text input" value="">
			</div>
		</div><!--/demo-html -->

		<p>Note that you can disable buttons created from <code>button</code> or <code>input</code>-based markup, but not links with a role of button. Links don't have a parallel disabled feature in HTML, but if you need to disable a link-based button (or any element), it's possible to apply the disabled class <code>ui-disabled</code> yourself with JavaScript to achieve the same effect. </p>

		<h2>Fieldcontainer groupings</h2>

		<p>To improve the styling of labels and form elements on wider screens, wrap a <code>div</code> or <code>fieldset </code>with the <code>class="ui-field-contain"</code> attribute around each label/form element. This framework aligns the input and associated label side-by-side, and breaks to stacked block-level elements below ~448px. The framework will also add a thin bottom border to act as a field separator. See more examples of <a href="../forms-field-contain/">fieldcontainer groupings</a>.</p>

		<div data-demo-html="true">
			<div class="ui-field-contain">
				<label for="textinput-fc">Text Input:</label>
				<input type="text" name="textinput-fc" id="textinput-fc" placeholder="Text input" value="">
			</div>
		</div><!--/demo-html -->

		<div data-demo-html="true">
			<div class="ui-field-contain">
				<label for="select-native-fc">Native select:</label>
				<select name="select-native-fc" id="select-native-fc">
					<option value="small">One</option>
					<option value="medium">Two</option>
					<option value="large">Three</option>
				</select>
			</div>
		</div><!--/demo-html -->

   		<h2>Auto-initialization of form elements</h2>
		<p>By default, jQuery Mobile will automatically enhance certain native form controls into rich touch-friendly components. This is handled internally by finding form elements by tag name and running a plugin method on them. For instance, a <code>select</code> element will be found and initialized with the "selectmenu" plugin, while an <code>input</code> element with a <code>type="checkbox"</code> will be enhanced with the "checkboxradio" plugin. Once initialized, you can address these enhanced components programmatically through their jQuery UI widget API methods. See options, methods, and events listed on each form plugin's documentation page for details. </p>

		<h2>Initializing groups of dynamically-injected form elements</h2>
		<p>If you should generate new markup client-side or load in content via Ajax and inject it into a page, you can trigger the <code>create</code> event to handle the auto-initialization for all the plugins contained within the new markup. This can be triggered on any element (even the page div itself), saving you the task of manually initializing each plugin (see below).</p>

		<p>For example, if a block of HTML markup (say a login form) was loaded in through Ajax, trigger the create event to automatically transform all the widgets it contains (inputs and buttons in this case) into the enhanced versions. The code for this scenario would be:</p>

<pre><code>
$( ...new markup that contains widgets... ).appendTo( ".ui-page" ).trigger( "create" );
</code></pre>

		<h2>Refreshing form elements</h2>

		 <p>In jQuery Mobile, some enhanced form controls are simply styled (inputs), but others are custom controls (selects, sliders) built from, and kept in sync with, the native control. To programmatically update a form control with JavaScript, first manipulate the native control, then use the <code>refresh</code> method to tell the enhanced control to update itself to match the new state. Here are some examples of how to update common form controls, then call the <code>refresh</code> method:</p>

		<h3>Checkboxes:</h3>

<pre><code>
$( "input[type='checkbox']" ).prop( "checked", true ).checkboxradio( "refresh" );
</code></pre>

		<h3>Radios:</h3>

<pre><code>
$( "input[type='radio']" ).prop( "checked", true ).checkboxradio( "refresh" );
</code></pre>

		<h3>Selects:</h3>

<pre><code>
var myselect = $( "#selectfoo" );
myselect[0].selectedIndex = 3;
myselect.selectmenu( "refresh" );
</code></pre>

		<h3>Sliders:</h3>

<pre><code>
$( "input[type='range']" ).val( 60 ).slider( "refresh" );
</code></pre>

		<h3>Flip switches:</h3>

        <p>They use the slider widget.</p>

<pre><code>
var myswitch = $( "#selectbar" );
myswitch[ 0 ].selectedIndex = 1;
myswitch.slider( "refresh" );
</code></pre>

		<h2>Preventing auto-initialization of form elements</h2>

		<p>If you'd prefer that a particular form control be left untouched by jQuery Mobile, simply give that element the attribute <code> data-role="none"</code>. For example:</p>

<pre><code>
&lt;label for=&quot;foo&quot;&gt;
&lt;select name=&quot;foo&quot; id=&quot;foo&quot; <strong>data-role=&quot;none&quot;</strong>&gt;
	&lt;option value="a"&gt;A&lt;/option&gt;
	&lt;option value="b"&gt;B&lt;/option&gt;
	&lt;option value="c"&gt;C&lt;/option&gt;
&lt;/select&gt;
</code></pre>

		<p>If you'd like to prevent auto-initialization without adding attributes to your markup, you can customize the selector that is used for preventing auto-initialization by setting the page plugin's <code>keepNative</code> option (which defaults to <code>[data-role="none"]</code>). Be sure to configure this option inside an event handler bound to the <code>mobileinit</code> event, so that it applies to the first page as well as subsequent pages that are loaded.</p>

<pre><code>
$( document ).bind( "mobileinit", function() {
	<strong>$.mobile.page.prototype.options.keepNative = "select, input.foo, textarea.bar";</strong>
});
</code></pre>

		<p>Alternately you can use the <code>data-enhance="false"</code> data attribute on a parent element with <code>$.mobile.ignoreContentEnabled</code> set to true. Beware though, this will incur a performance penalty for each and every element in the page that would otherwise be enhanced as jQuery Mobile must traverse the set of parents to look for those elements.</p>

		<p>One special case is that of selects. The above sample will prevent any and all augmentation from taking place on select elements in the page if <code>select</code> is included. If you wish to retain the native performance and appearance of the menu itself and benefit from the visual augmentation of the select button by jQuery Mobile, you can set <code>$.mobile.selectmenu.prototype.options.nativeMenu</code> to true in a <code>mobileinit</code> callback as a global setting or use <code>data-native-menu="true"</code> on a case by case basis.</p>

		<h2>File Inputs + Ajax</h2>
		<p>Using a multipart form with a file input is not supported by Ajax. In this case you should decorate the parent form with <code>data-ajax="false"</code> to ensure the form is submitted properly to the server.</p>

	</div><!-- /content -->

	<?php include( '../jqm-navmenu.php' ); ?>

	<div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
		<p>Copyright 2014 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../jqm-search.php' ); ?>

</div><!-- /page -->

</body>
</html>
