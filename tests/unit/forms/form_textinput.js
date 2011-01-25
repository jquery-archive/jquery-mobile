/*
 * mobile forms.textinput unit tests
 */

(function($) {
  module('jquery.mobile.forms.textinput.js');
  
  asyncTest( "textareas should autogrow to fit their initial text", 1, function(){
    setTimeout(function() {
      var textAreaWithText = $('#textAreaWithLargeText')[0];
      ok( (textAreaWithText.clientHeight >= textAreaWithText.scrollHeight), "TextArea should autogrow to fit initial text.");      
      start();
    }, 100);
  });

})(jQuery);

