/*
 * mobile select unit tests
 */

(function($){
	module("jquery.mobile.forms.select native");

	test( "native menu selections alter the button text", function(){
		var select = $("#native-select-choice-few"), setAndCheck;

		setAndCheck = function(key){
      var text;

		  select.val(key).selectmenu('refresh');
		  text = select.find("option[value='" + key + "']").text();
		  same(select.parent().find(".ui-btn-text").text(), text);
		};

    setAndCheck('rush');
    setAndCheck('standard');
	});
})(jQuery);