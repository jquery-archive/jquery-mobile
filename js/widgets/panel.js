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
			active: "ui-panel-active"
		},
		theme: null,
		position: "left",
		dismissible: true,
		display: "reveal",
		initSelector: ":jqmData(role='panel')"
	},

	_panelID: null,
	_closeLink: null,
	_page: null,
	_modal: null,

	_create: function() {
		var self = this,
			$el = self.element;

		// expose some private props to other methods
		self._panelID = $el.attr( "id" );
		self._closeLink = $el.find( ":jqmData(rel='close')" );
		self._page = $el.closest( ":jqmData(role='page')" );

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
			panelClasses = o.classes.panel;

		if( o.theme ){
			panelClasses += " ui-body-" + o.theme;
		}

		if( $.support.cssTransform3d ){
			panelClasses += " ui-panel-transforms";
		} else {
			panelClasses +=  " ui-panel-positioning";
		}

		panelClasses += " " + "ui-panel-position-" + o.position + " " + "ui-panel-display-" + o.display;

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
			cb = function(){
				self.element.addClass( o.classes.panelOpen );
			};
		self._trigger( "beforeopen" );

		if ( $.mobile.support.cssTransitions ) {
			self.element.one( self._transitionEndEvents , cb );
		} else{
			setTimeout( cb , 0 );
		}

		self._modal.addClass( self._getOpenClasses( o.classes.modal ) );
		self.element.addClass( self._getOpenClasses( o.classes.panel ) );

		self.element.addClass( o.classes.active );
		self._open = true;
		self._trigger( "open" );
	},

	close: function( immediate ){
		var o = this.options;
		this._trigger( "beforeclose" );

		this.element.removeClass( o.classes.active + " " + o.classes.panelOpen );
//		this.element.removeClass( o.classes.panelOpen + " " + this._getOpenClasses( o.classes.panel ) );
		this._modal.removeClass( this._getOpenClasses( o.classes.modal ) );

		this._open = false;
		this._trigger( "close" );
	},

	toggle: function( options ){
		this[ this._open ? "close" : "open" ]();
	},

	// cached string of classes used to last open the panel
	_lastOpenClasses: null,

	// return string of classes needed for opening panel
	_getOpenClasses: function( joiner ){
		var o = this.options;
		this._lastOpenClasses = [
				"",
				"-position-" + o.position,
				"-dismissible-" + o.dismissible,
				"-display-" + o.display
			].join( " " + joiner );

		return this._lastOpenClasses;
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

