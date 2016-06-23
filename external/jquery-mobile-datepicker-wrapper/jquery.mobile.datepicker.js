/*!
 * jQuery Mobile Datepicker
 * http://uglymongrel.com.com
 *
 * Copyright 2014 Alexander Schmitz and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.uglymongrel.com.com/jquery-mobile-datepicker-wrapper/
 */
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Consistent styling for native dates. Tapping opens a calender to select date.
//>>label: Datepicker
//>>group: Forms
//>>css.structure: ../external/uglymongrel/arschmitz/jquery.mobile.datepicker.wrapper.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css
//>>excludeEnd("jqmBuildExclude");
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

	// AMD. Register as an anonymous module.
	define([
		"jquery",
		"jquery-ui/datepicker"
	], factory );
  } else {

	// Browser globals
	factory( jQuery );
  }
}(function( $ ) {
$.widget("mobile.date",{
	options:{
		defaultDate: null, // Used when field is blank: actual date,
			// +/-number for offset from today, null for today
		appendText: "", // Display text following the input box, e.g. showing the format
		buttonText: "...", // Text for trigger button
		buttonImage: "", // URL for trigger button image
		buttonImageOnly: false, // True if the image appears alone, false if it appears on a button
		hideIfNoPrevNext: false, // True to hide next/previous month links
			// if not applicable, false to just disable them
		navigationAsDateFormat: false, // True if date formatting applied to prev/today/next links
		gotoCurrent: false, // True if today link goes back to current selection instead
		changeMonth: false, // True if month can be selected directly, false if only prev/next
		changeYear: false, // True if year can be selected directly, false if only prev/next
		yearRange: "c-10:c+10", // Range of years to display in drop-down,
			// either relative to today's year (-nn:+nn), relative to currently displayed year
			// (c-nn:c+nn), absolute (nnnn:nnnn), or a combination of the above (nnnn:-n)
		showOtherMonths: false, // True to show dates in other months, false to leave blank
		selectOtherMonths: false, // True to allow selection of dates in other months, false for unselectable
		showWeek: false, // True to show week of the year, false to not show it
		calculateWeek: this.iso8601Week, // How to calculate the week of the year,
			// takes a Date and returns the number of the week for it
		shortYearCutoff: "+10", // Short year values < this are in the current century,
			// > this are in the previous century,
			// string value starting with "+" for current year + value
		minDate: null, // The earliest selectable date, or null for no limit
		maxDate: null, // The latest selectable date, or null for no limit
		beforeShowDay: null, // Function that takes a date and returns an array with
			// [0] = true if selectable, false if not, [1] = custom CSS class name(s) or "",
			// [2] = cell title (optional), e.g. $.datepicker.noWeekends
		onSelect: null, // Define a callback function when a date is selected
		onChangeMonthYear: null, // Define a callback function when the month or year is changed
		beforeShow: null, // Define a callback function when the calendar is shown
		numberOfMonths: 1, // Number of months to show at a time
		showCurrentAtPos: 0, // The position in multipe months at which to show the current month (starting at 0)
		stepMonths: 1, // Number of months to step back/forward
		stepBigMonths: 12, // Number of months to step back/forward for the big links
		altField: "", // Selector for an alternate field to store selected dates into
		altFormat: "", // The date format to use for the alternate field
		constrainInput: true, // The input is constrained by the current date format
		showButtonPanel: false, // True to show button panel, false to not show it
		autoSize: false, // True to size the input for the date format, false to leave as is
		disabled: false, // The initial disabled state
		inline: false, // True to set the calendar always visible
		theme: "a",
		dateFormat: "mm/dd/yy"
	},
	_getCreateOptions: function(){
		$.extend( this.options, $.datepicker._defaults );
		return this._super();
	},
	_create:function(){
		var calendar;

		if( this.options.inline ){
			this.options.altField = this.element;
			calendar = $("<div>").datepicker(this.options);
			this.element.parent().after(calendar);
		} else {
			this.element.datepicker( this.options );
			calendar = this.element.datepicker( "widget" );
		}

		this.baseWidget = ( !this.options.inline )? this.element: this.calendar;

		if ( this.options.inline ) {
			this._on({
				"change": function() {
					calendar.datepicker( "setDate", this.element.val() );
				}
			});
		}
	},
	setOption:function( key, value ){
		this.baseWidget.datepicker( "option", key, value );
	},
	getDate: function(){
		return this.baseWidget.datepicker( "getDate" );
	},
	_destroy: function(){
		return this.baseWidget.datepicker( "destroy" );
	},
	isDisabled: function(){
		return this.baseWidget.datepicker( "isDisabled" );
	},
	refresh: function(){
		return this.baseWidget.datepicker( "refresh" );
	},
	setDate: function( date ){
		return this.baseWidget.datepicker( "setDate", date );
	},
	widget:function(){
		return this.element;
	}
});

return $.mobile.date;

}));
