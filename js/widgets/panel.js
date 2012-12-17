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
			panelClosed: "ui-panel-closed",
			modal: "ui-panel-dismiss",
			modalOpen: "ui-panel-dismiss-open",
			openComplete: "ui-panel-open-complete",

			contentWrap: "ui-panel-content-wrap",
			contentWrapOpen: "ui-panel-content-wrap-open",
			wrapOpenComplete: "ui-panel-content-wrap-open-complete",
			pageBlock: "ui-panel-page-block",
			panelAnimating: "ui-page-panel-animating"
		},
		animate: true,
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

		// if animating, add the class to do so
		if ( $.support.cssTransitions && self.options.animate ) {
			this.element.add( self._wrapper ).addClass( "ui-panel-animate" );
		}

		self._bindCloseEvents();
		self._bindLinkListeners();
		self._bindPageEvents();

		if( self.options.dismissible ){
			self._createModal();
		}

		if( !self._page.hasClass( self.options.classes.pageBlock ) ){
			self._page.addClass( self.options.classes.pageBlock );
		}

		// move the panel to the right place in the DOM
		self.element[ this.options.position === "left" ? "insertBefore" : "insertAfter" ]( self._wrapper );

		self._trigger( "create" );
	},

	_createModal: function( options ){
		var self = this;
		self._modal = $( "<div class='" + self.options.classes.modal + " " + self.options.display + "-" + self.options.position +"' data-panelid='" + self._panelID + "'></div>" )
			.on( "vclick" , function(){
				self.close.call( self );
			})
			.appendTo( this._page );
	},

	_getPosDisplayClasses: function( prefix ){
		return [
			" ",
			" ",
			"-position-" + this.options.position,
			"-display-" + this.options.display
		].join( " " + prefix );
	},

	_addPanelClasses: function(){
		var panelClasses = this._getPosDisplayClasses( this.options.classes.panel ) + " " + this.options.classes.panelClosed;

		if( this.options.theme ){
			panelClasses += " ui-body-" + this.options.theme;
		}

		this.element.addClass( panelClasses );
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

		$( window )
			// on swipe, close the panel (should swipe open too?)
			.on( "swipe" , function( e ){
				self.close( true );
			});

		self._page
			// Close immediately if another panel on the page opens
			.on( "panelbeforeopen", function( e ){
				if( self._open && e.target !== self.element ){
					self.close( true );
				}
			})
			// clean up open panels after page hide
			.on(  "panelbeforehide", function( e ) {
				self.close( true );
			})
			// on escape, close? might need to have a target check too...
			.on( "keyup", function( e ) {
				if( e.keyCode === 27 && self._open ){
					self.close( true );
				}
			});
	},

	// state storage of open or closed
	_open: false,

	_contentWrapOpenClasses: null,
	_modalOpenClasses: null,

	open: function( options ){
		var self = this,
			o = self.options,
			complete = function(){
				self.element.addClass( o.classes.openComplete );
				self._wrapper.addClass( o.classes.wrapOpenComplete );
				self._page.removeClass( o.classes.panelAnimating );
				self._trigger( "open" );
			};


		self._trigger( "beforeopen" );

		if ( $.support.cssTransitions && o.animate ) {
			self.element.one( self._transitionEndEvents , complete );
		} else{
			setTimeout( complete , 0 );
		}
		self._page.addClass( o.classes.panelAnimating );
		self.element.removeClass( o.classes.panelClosed );
		self.element.addClass( o.classes.panelOpen );
		self._contentWrapOpenClasses = self._getPosDisplayClasses( o.classes.contentWrap );
		self._wrapper.addClass( self._contentWrapOpenClasses + " " + o.classes.contentWrapOpen );
		self._modalOpenClasses = self._getPosDisplayClasses( o.classes.modal ) + " " + o.classes.modalOpen;
		self._modal.addClass( self._modalOpenClasses );

		self._open = true;

	},

	close: function( immediate ){
		var o = this.options,
			self = this,
			complete = function(){
				self.element.addClass( o.classes.panelClosed );
				self._wrapper.removeClass( self._contentWrapOpenClasses );
				self._page.removeClass( o.classes.panelAnimating );
				self._trigger( "close" );
			};

		self._trigger( "beforeclose" );

		if ( $.support.cssTransitions && o.animate ) {
			self.element.one( self._transitionEndEvents , complete );
		} else{
			setTimeout( complete , 0 );
		}

		self._page.addClass( o.classes.panelAnimating );
		self.element.removeClass( o.classes.panelOpen + " " + o.classes.openComplete );
		self._modal.removeClass( self._modalOpenClasses );
		self._wrapper.removeClass( o.classes.contentWrapOpen + " " + o.classes.contentWrapOpenComplete );

		self._open = false;
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

