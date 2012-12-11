//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Responsive presentation and behavior for HTML data panels
//>>label: Panel
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.panel.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../jquery.mobile.widget", "./page", "./page.sections" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.panel", $.mobile.widget, {
	options: {
		classes: {
			panel: "ui-panel",
			panelOpen: "ui-panel-open",
			modal: "ui-panel-dismiss",
			modalOpen: "ui-panel-dismiss-open",
			openComplete: "ui-panel-open-complete",
			contentWrap: "ui-panel-content-wrap"
		},
		theme: null,
		position: "left",
		dismissible: true,
		display: "overlay", //accepts reveal, push, overlay
		initSelector: ":jqmData(role='panel')"
	},

	_panelID: null,
	_closeLink: null,
	_page: null,
	_modal: null,
	_wrapper: null,

	_create: function() {
		var self = this,
			$el = self.element,
			_getWrapper = function(){
				var $wrapper = self._page.find( "." + self.options.classes.contentWrap );
				if( $wrapper.length === 0 ){
					$wrapper = self._page.find( ".ui-header, .ui-content, .ui-footer" ).wrapAll( '<div class="' + self.options.classes.contentWrap + '" />' ).parent();
				}
				return $wrapper;
			};

		// expose some private props to other methods
		self._panelID = $el.attr( "id" );
		self._closeLink = $el.find( ":jqmData(rel='close')" );
		self._page = $el.closest( ":jqmData(role='page')" );
		self._wrapper = _getWrapper();
		self._addPanelClasses();
		self._bindCloseEvents();
		self._bindLinkListeners();
		self._bindPageEvents();

		if( self.options.dismissible ){
			self._createModal();
		}

		self._trigger( "create" );
	},

	_createModal: function( options ){
		this._modal = $( "<div class='" + this.options.classes.modal +"' data-panelid='" + this._panelID + "'></div>" )
			.on( "vclick" , this.close );
	},

	_addPanelClasses: function(){
		var $el = this.element,
			o = this.options,
			panelClasses = [
				" ",
				" ",
				"-position-" + o.position,
				"-display-" + o.display
				].join( " " + o.classes.panel );

		if( o.theme ){
			panelClasses += " ui-body-" + o.theme;
		}

		$el.addClass( panelClasses );
	},

	_bindCloseEvents: function(){
		var self = this;
		self._closeLink.on( "vclick" , function( e ){
			e.preventDefault();
			self.close();
			return false;
		});
	},

	_bindLinkListeners: function(){
		var self = this;

		$( document ).on( "click" , "a", function( e ) {
			if( this.href.split( "#" )[ 1 ] === self._panelID ){
				e.preventDefault();
				var $link = $( this );
				$link.addClass( $.mobile.activeBtnClass );
				self.element.one( "panelopen panelclose", function(){
					$link.removeClass( $.mobile.activeBtnClass );
				});
				self.toggle();
				return false;
			}
		});
	},

	_bindPageEvents: function(){
		var self = this;

		self._page
			// on swipe, close the panel (should swipe open too?)
			.on( "swipe" , function( e ){
				self.close.call( self );
			})
			// Close immediately if another panel on the page opens
			.on( "pagebeforeopen", function( e ){
				if( self._open && e.target !== self.element ){
					self.close.call( self , true );
				}
			})
			// clean up open panels after page hide
			.on(  "pagebeforehide", function( e ) {
				self.close.call( self );
			})
			// on escape, close? might need to have a target check too...
			.on( "keyup", function( e ) {
				if( e.keyCode === 27 && self._open ){
					self.close.call( self );
				}
			});
	},

	// state storage of open or closed
	_open: false,

	open: function( options ){
		var self = this,
			o = self.options,
			complete = function(){
				self.element.addClass( o.classes.openComplete );
				self._trigger( "open" );
			};

		// move the panel to the right place in the DOM
		self.element[ o.position === "left" ? "insertBefore" : "insertAfter" ]( self._wrapper );

		self._trigger( "beforeopen" );

		if ( $.mobile.support.cssTransitions ) {
			self.element.one( self._transitionEndEvents , complete );
		} else{
			setTimeout( complete , 0 );
		}

		self._modal.addClass( o.classes.modalOpen );
		self.element.addClass( o.classes.panelOpen );

		self._open = true;

	},

	close: function( immediate ){
		var o = this.options,
			complete = function(){
				self._trigger( "close" );
			};

		this._trigger( "beforeclose" );

		this.element.removeClass( o.classes.panelOpen + " " + o.classes.openComplete );
		this._modal.removeClass( o.classes.modalOpen );

		this._open = false;
	},

	toggle: function( options ){
		this[ this._open ? "close" : "open" ]();
	},

	_transitionEndEvents: "webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd",

	destroy: function(){
		// unbind events, remove generated elements, remove classes, remove data
	}
});


//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ) {
	$.mobile.panel.prototype.enhanceWithin( e.target );
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");

