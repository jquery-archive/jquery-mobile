<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Form test 1 - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="shortcut icon" href="../../favicon.ico">
	<script src="../../../js/jquery.js"></script>
	<script src="../../../js/"></script>
</head>
<body>
<div data-role="page" data-theme="b">

	<div data-role="header" data-theme="b">
		<h1>Form test 1</h1>
		<a href="../../" data-rel="back" data-icon="back" data-iconpos="notext">Back</a>
	</div><!-- /header -->

	<div data-role="content">

        
            <a href="#" data-role="button">Link button</a>
            <input type="button" value="Button element" data-icon="delete" data-theme="b" />
            <input type="submit" value="Submit button, mini" data-icon="grid" data-iconpos="right" data-mini="true"  data-theme="a" />
        

        
            <a href="#" data-role="button" data-inline="true" data-icon="star">Inline + icon</a>
            <a href="#" data-role="button" data-inline="true" data-theme="b" data-mini="true">Mini + theme</a>
            <a href="#" data-role="button" data-inline="true" data-icon="plus" data-iconpos="notext" data-theme="a" data-mini="true">icon only button</a>
        

        
            <div data-role="controlgroup" data-type="horizontal" data-mini="true">
                <a href="#" data-role="button" data-icon="plus" data-theme="b">Add</a>
                <a href="#" data-role="button" data-icon="delete" data-theme="b">Delete</a>
                <a href="#" data-role="button" data-icon="grid" data-theme="b">More</a>
            </div>
        

        
            <label for="slider">Slider:</label>
            <input type="range" name="slider" id="slider" value="50" min="0" max="100" />
        

        
            <label for="slider-fill">Slider with fill and step of 50:</label>
            <input type="range" name="slider-fill" id="slider-fill" value="60" min="0" max="1000" step="50" data-highlight="true" />
        

        
            <label for="slider-fill-mini">Slider with fill, mini, track theme:</label>
            <input type="range" name="slider-fill-mini" id="slider-fill-mini" value="40" min="0" max="100" data-mini="true" data-highlight="true" data-theme="b" data-track-theme="a" />
        

        
        <form>
            <div data-role="rangeslider">
                <label for="range-1a">Rangeslider:</label>
                <input type="range" name="range-1a" id="range-1a" min="0" max="100" value="40">
                <label for="range-1b">Rangeslider:</label>
                <input type="range" name="range-1b" id="range-1b" min="0" max="100" value="80">
            </div>
        </form>
        

		
        <form>
            <div data-role="rangeslider" data-mini="true">
                <label for="range-2a">Mini rangeslider:</label>
                <input type="range" name="range-2a" id="range-2a" min="0" max="100" value="40">
                <label for="range-2b">Mini rangeslider:</label>
                <input type="range" name="range-2b" id="range-2b" min="0" max="100" value="80">
            </div>
        </form>
        </form>
        

        
            <label for="slider2">Flip switch:</label>
            <select name="slider2" id="slider2" data-role="slider">
                <option value="off">Off</option>
                <option value="on">On</option>
            </select>
        

        
            <label for="slider-flip-m">Mini flip switch:</label>
            <select name="slider-flip-m" id="slider-flip-m" data-role="slider" data-mini="true">
                <option value="off">No</option>
                <option value="on" selected>Yes</option>
            </select>
        

        
            <fieldset data-role="controlgroup">
                <legend>Checkboxes, vertical controlgroup:</legend>
                <input type="checkbox" name="checkbox-1a" id="checkbox-1a" checked  />
                <label for="checkbox-1a">Cheetos</label>

                <input type="checkbox" name="checkbox-2a" id="checkbox-2a" />
                <label for="checkbox-2a">Doritos</label>

                <input type="checkbox" name="checkbox-3a" id="checkbox-3a" />
                <label for="checkbox-3a">Fritos</label>

                <input type="checkbox" name="checkbox-4a" id="checkbox-4a" />
                <label for="checkbox-4a">Sun Chips</label>
            </fieldset>
        

        
            <fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
                <legend>Checkboxes, mini, horizontal controlgroup:</legend>
                <input type="checkbox" name="checkbox-6" id="checkbox-6" />
                <label for="checkbox-6">b</label>

                <input type="checkbox" name="checkbox-7" id="checkbox-7" checked />
                <label for="checkbox-7"><em>i</em></label>

                <input type="checkbox" name="checkbox-8" id="checkbox-8" />
                <label for="checkbox-8">u</label>
            </fieldset>
        

        
                <fieldset data-role="controlgroup">
                    <legend>Radio buttons, vertical controlgroup:</legend>
                        <input type="radio" name="radio-choice-1" id="radio-choice-1" value="choice-1" checked="checked" />
                        <label for="radio-choice-1">Cat</label>

                        <input type="radio" name="radio-choice-1" id="radio-choice-2" value="choice-2"  />
                        <label for="radio-choice-2">Dog</label>

                        <input type="radio" name="radio-choice-1" id="radio-choice-3" value="choice-3"  />
                        <label for="radio-choice-3">Hamster</label>

                        <input type="radio" name="radio-choice-1" id="radio-choice-4" value="choice-4"  />
                        <label for="radio-choice-4">Lizard</label>
                </fieldset>
        

        
                <fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
                    <legend>Radio buttons, mini, horizontal controlgroup:</legend>
                        <input type="radio" name="radio-choice-b" id="radio-choice-c" value="list" checked="checked" />
                        <label for="radio-choice-c">List</label>
                        <input type="radio" name="radio-choice-b" id="radio-choice-d" value="grid" />
                        <label for="radio-choice-d">Grid</label>
                        <input type="radio" name="radio-choice-b" id="radio-choice-e" value="gallery" />
                        <label for="radio-choice-e">Gallery</label>
                </fieldset>
        

        
            <label for="select-choice-1" class="select">Select, native menu</label>
            <select name="select-choice-1" id="select-choice-1">
                <option value="standard">Standard: 7 day</option>
                <option value="rush">Rush: 3 days</option>
                <option value="express">Express: next day</option>
                <option value="overnight">Overnight</option>
            </select>
        

		
            <label for="select-choice-mini" class="select">Mini select, inline</label>
            <select name="select-choice-mini" id="select-choice-mini" data-mini="true" data-inline="true">
                <option value="standard">Standard: 7 day</option>
                <option value="rush">Rush: 3 days</option>
                <option value="express">Express: next day</option>
                <option value="overnight">Overnight</option>
            </select>
        

        
            <label for="select-choice-a" class="select">Custom select menu:</label>
            <select name="select-choice-a" id="select-choice-a" data-native-menu="false">
                <option>Custom menu example</option>
                <option value="standard">Standard: 7 day</option>
                <option value="rush">Rush: 3 days</option>
                <option value="express">Express: next day</option>
                <option value="overnight">Overnight</option>
            </select>
        

        
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
        

        
             <label for="text-basic">Text input:</label>
             <input type="text" name="text-basic" id="text-basic" value=""  />
        

        
            <label for="textarea">Textarea:</label>
            <textarea cols="40" rows="8" name="textarea" id="textarea"></textarea>
        

        
             <label for="number-pattern">Number + [0-9]* pattern:</label>
             <input type="number" name="number" pattern="[0-9]*" id="number-pattern" value="" />
        

        
             <label for="date">Date:</label>
             <input type="date" name="date" id="date" value="" />
        

        
             <label for="tel">Tel:</label>
             <input type="tel" name="tel" id="tel" value="" />
        

        
             <label for="search">Search Input:</label>
             <input type="search" name="password" id="search" value="" placeholder="Placeholder text..." />
        

        
             <label for="file">File:</label>
             <input type="file" name="file" id="file" value="" />
        

        
             <label for="password">Password:</label>
             <input type="password" name="password" id="password" value="" autocomplete="off" />
        

		
			<label for="textinput-hide" class="ui-hidden-accessible">Text Input:</label>
			<input type="text" name="textinput-hide" id="textinput-hide" placeholder="Text input" value="">
		

		
			<div data-role="fieldcontain">
				<label for="textinput-disabled">Text Input:</label>
				<input disabled="disabled" type="text" name="textinput-disabled" id="textinput-disabled" placeholder="Text input" value="">
			</div>
		

		
			<div data-role="fieldcontain">
				<label for="textinput-fc">Text Input:</label>
				<input type="text" name="textinput-fc" id="textinput-fc" placeholder="Text input" value="">
			</div>
		

		
			<div data-role="fieldcontain">
				<label for="select-native-fc">Native select:</label>
				<select name="select-native-fc" id="select-native-fc">
					<option value="small">One</option>
					<option value="medium">Two</option>
					<option value="large">Three</option>
				</select>
			</div>
		

	</div><!-- /content -->

	<div data-role="footer" data-theme="b">
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

</div><!-- /page -->
</body>
</html>
