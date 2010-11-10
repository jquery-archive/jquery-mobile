/*
* jQuery Mobile Framework : "fieldcontain" plugin - simple class additions to make form row separators
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/
(function($){
$.fn.fieldcontain = function(options){
	var o = $.extend({
		theme: 'c'
	},options);
	return $(this).addClass('ui-field-contain ui-body ui-br');
};
})(jQuery);