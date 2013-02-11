(function( $, undefined ) {

	$.widget( "mobile.h2linker", $.mobile.widget, {
		options:{
			initSelector: ":jqmData(quicklinks='true')"
		},

		_create:function(){
			var self = this,
				bodyid = "ui-page-top",
				panel = "<div data-role='panel' class='jqm-nav-panel jqm-quicklink-panel' data-position='right' data-display='overlay' data-theme='c'><ul data-role='listview' data-inset='false' data-theme='d' data-divider-theme='d' class='jqm-list'><li class='jqm-list-header'>Jump to section</li></ul></div>",
				first = true,
				h2dictionary = new Object();
				if(typeof $("body").attr("id") === "undefined"){
					$("body").attr("id",bodyid);
				} else {
					bodyid =  $("body").attr("id");
				}
				this.element.find("h2").each(function(){
					var id, text = $(this).text();
					
					if(typeof $(this).attr("id") === "undefined"){
						id = text.replace(/[^\.a-z0-9:_-]+/i,"");
						$(this).attr( "id", id );
					} else {
						id = $(this).attr("id");
					}

					h2dictionary[id] =  text;
					if(!first){
						$(this).before("<a href='#"+bodyid+"' class='jqm-sections-link ui-link jqm-top-link'>Return to top<span class='ui-icon ui-icon-arrow-u'>&nbsp;</span></a>");
					} else {
						$(this).before("<a href='#'' data-ajax='false' class='jqm-sections-link ui-link jqm-top-link jqm-open-quicklink-panel'>Jump to section<span class='ui-icon ui-icon-bars'>&nbsp;</span></a>");
					}
					first = false;
				});
				this._on(".jqm-open-quicklink-panel", {
					"click": function(){
						$(".ui-page-active .jqm-quicklink-panel").panel("open");
						return false;
					}
				});

				if( $(h2dictionary).length > 0 ){
					this.element.prepend(panel)
					this.element.find(".jqm-quicklink-panel").panel().find("ul").listview();
				}
				$.each(h2dictionary,function(id,text){
					self.element.find(".jqm-quicklink-panel ul").append("<li><a href='#"+id+"'>"+text+"</a></li>");
				});
				self.element.find(".jqm-quicklink-panel ul").listview("refresh");

		}
	});
	$.mobile.document.bind( "pagecreate create", function( e ) {
		var initselector = $.mobile.h2linker.prototype.options.initSelector;
		if($(e.target).data("quicklinks")){
			$(e.target).h2linker();
		}
	});
})( jQuery );