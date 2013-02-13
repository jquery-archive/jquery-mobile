(function( $, undefined ) {	
	$( document ).on( "mobileinit", function(){
		$.widget( "mobile.panel", $.mobile.panel, {
			options: {
				classes: {
					panel: "ui-panel",
					panelOpen: "ui-panel-open",
					panelClosed: "ui-panel-closed",
					panelFixed: "ui-panel-fixed",
					panelInner: "ui-panel-inner",
					modal: "ui-panel-dismiss",
					modalOpen: "ui-panel-dismiss-open",
					pagePanel: "ui-page-panel",
					pagePanelOpen: "ui-page-panel-open",
					contentWrap: "ui-panel-content-wrap",
					contentWrapOpen: "ui-panel-content-wrap-open",
					contentWrapClosed: "ui-panel-content-wrap-closed",
					contentFixedToolbar: "ui-panel-content-fixed-toolbar",
					contentFixedToolbarOpen: "ui-panel-content-fixed-toolbar-open",
					contentFixedToolbarClosed: "ui-panel-content-fixed-toolbar-closed",
					animate: "ui-panel-animate"
				},
				animate: true,
				theme: "c",
				position: "left",
				dismissible: true,
				display: "reveal", //accepts reveal, push, overlay
				initSelector: ":jqmData(role='panel')",
				swipeClose: true,
				positionFixed: false,
				globalNav:false
			},
			_create: function(){
				this._super();
				if(this.options.globalNav){
					this._globalnav();
				}
			},
			_globalnav: function(){
				var base = $('base').attr('href').split('demos')[0]+this.options.globalNav+"/";
				this.element.find( 'a' ).each(function(){
					var href = base+$(this).attr('href');
					$(this).attr('href',href);
				});
			}
		});
	});
})( jQuery );