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
			contentWrapClosed: "ui-panel-content-wrap-closed",
			panelUnfixed: "ui-panel-unfixed",
			contentWrapOpenComplete: "ui-panel-content-wrap-open-complete",
			pageBlock: "ui-panel-page-block",
			pagePanel: "ui-page-panel",
			cssTransform3d: "ui-panel-3dtransforms"
		},
		animate: true,
		theme: null,
		position: "left",
		dismissible: true,
		display: "overlay", //accepts reveal, push, overlay
		initSelector: ":jqmData(role='panel')",
		swipeClose: true,
		positionFixed: true
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
					if( $.support.cssTransform3d && !!self.options.positionFixed ) {
						$wrapper.addClass( self.options.classes.cssTransform3d );
					}
				}
				return $wrapper;
			};

		// expose some private props to other methods
		self._panelID = $el.attr( "id" );
		self._closeLink = $el.find( ":jqmData(rel='close')" );
		self._page = $el.closest( ":jqmData(role='page')" );
		self._wrapper = _getWrapper();
		self._addPanelClasses();
		self._wrapper.addClass( this.options.classes.contentWrapClosed );

		// if animating, add the class to do so
		if ( $.support.cssTransform3d && self.options.animate ) {
			this.element.add( self._wrapper ).addClass( "ui-panel-animate" );
		}

		self._bindCloseEvents();
		self._bindLinkListeners();
		self._bindPageEvents();

		if( self.options.dismissible ){
			self._createModal();
		}

	},

	_createModal: function( options ){
		var self = this;
		self._modal = $( "<div class='" + self.options.classes.modal + " " + self.options.display + "-" + self.options.position +"' data-panelid='" + self._panelID + "'></div>" )
			.on( "mousedown" , function(){
				self.close();
			})
			.appendTo( this._page );
	},

	_getPosDisplayClasses: function( prefix ){
		return prefix + "-position-" + this.options.position + " " + prefix + "-display-" + this.options.display;
	},

	_getPanelClasses: function(){
		var panelClasses = this.options.classes.panel +
						" " + this._getPosDisplayClasses( this.options.classes.panel ) +
						" " + this.options.classes.panelClosed;

		if( this.options.theme ){
			panelClasses += " ui-body-" + this.options.theme;
		}

		if( $.support.cssTransform3d && !!this.options.positionFixed ) {
			panelClasses += " " + this.options.classes.cssTransform3d;
		}
		return panelClasses;
	},

	_addPanelClasses: function(){
		this.element.addClass( this._getPanelClasses() );
	},

	_bindCloseEvents: function(){
		var self = this;
		self._closeLink.on( "click.panel" , function( e ){
			e.preventDefault();
			self.close();
			return false;
		});
	},

	_positionPanel: function(){
		if ( this.element.height() > $.mobile.getScreenHeight() ) {
			this._unfixPanel();
			this._scrollIntoView();
		}
		else {
			this._fixPanel();
		}
	},

	_scrollIntoView: function(){
		if( $(window).scrollTop() > $.mobile.getScreenHeight() ){
			window.scrollTo( 0, 0);
		}
	},

	_bindFixListener: function(){
		this._on( $( window ), { "throttledresize": "_positionPanel" });
	},

	_unbindFixListener: function(){
		this._off( $( window ), "throttledresize" );
	},

	_unfixPanel: function(){
		this.element.addClass( this.options.classes.panelUnfixed );
	},

	_fixPanel: function(){
		this.element.removeClass( this.options.classes.panelUnfixed );
	},

	_bindLinkListeners: function(){
		var self = this;

		this._page.on( "click.panel" , "a", function( e ) {
			if( this.href.split( "#" )[ 1 ] === self._panelID && self._panelID !== undefined ){
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
		if( !!this.options.swipeClose ){
			self.element
				// on swipe, close the panel (should swipe open too?)
				.on( "swipe.panel" , function( e ){
					self.close( );
				});
		}
		self._page
			// Close immediately if another panel on the page opens
			.on( "panelbeforeopen", function( e ){
				if( self._open && e.target !== self.element[ 0 ] ){
					self.close( true );
				}
			})
			// clean up open panels after page hide
			.on(  "pagebeforehide", function( e ) {
				if( self._open ){
					self.close( true );
				}
			})
			// on escape, close? might need to have a target check too...
			.on( "keyup.panel", function( e ) {
				if( e.keyCode === 27 && self._open ){
					self.close( );
				}
			});
	},

	// state storage of open or closed
	_open: false,

	_contentWrapOpenClasses: null,
	_modalOpenClasses: null,

	open: function( immediate ){
		if( !this._open ){
			var self = this,
				o = self.options,
				complete = function(){
					self.element.add( self._wrapper ).unbind( self._transitionEndEvents, complete );
					self.element.addClass( o.classes.openComplete );
					self._wrapper.addClass( o.classes.contentWrapOpenComplete );
					self._page.addClass( o.classes.pageBlock );
					self._positionPanel();
					self._bindFixListener();
					self._trigger( "open" );
				};

			if( this.element.closest( ".ui-page-active" ).length < 0 ){
				immediate = true;
			}
			self._trigger( "beforeopen" );

			if ( !immediate && $.support.cssTransform3d && o.animate ) {
				self.element.add( self._wrapper ).on( self._transitionEndEvents , complete );
			} else{
				setTimeout( complete , 0 );
			}
			self.element.removeClass( o.classes.panelClosed );
			self.element.addClass( o.classes.panelOpen );
			self._contentWrapOpenClasses = self._getPosDisplayClasses( o.classes.contentWrap );
			self._wrapper.removeClass( o.classes.contentWrapClosed );
			self._wrapper.addClass( self._contentWrapOpenClasses + " " + o.classes.contentWrapOpen );
			self._modalOpenClasses = self._getPosDisplayClasses( o.classes.modal ) + " " + o.classes.modalOpen;
			if( this._modal ) {
				self._modal.addClass( self._modalOpenClasses );
			}
			self._open = true;
		}
	},

	close: function( immediate ){
		if( this._open ){
			var o = this.options,
				self = this,
				complete = function(){
					self.element.add( self._wrapper ).off( self._transitionEndEvents , complete );
					self.element.addClass( o.classes.panelClosed );
					self._wrapper.removeClass( self._contentWrapOpenClasses );
					self._wrapper.addClass( o.classes.contentWrapClosed );
					self._page.removeClass( o.classes.pageBlock );
					self._fixPanel();
					self._unbindFixListener();
					self._trigger( "close" );
				};
			if( this.element.closest( ".ui-page-active" ).length < 0 ){
				immediate = true;
			}
			self._trigger( "beforeclose" );

			if ( !immediate && $.support.cssTransform3d && o.animate ) {
				self.element.add( self._wrapper ).on( self._transitionEndEvents , complete );
			} else{
				setTimeout( complete , 0 );
			}

			self.element.removeClass( o.classes.panelOpen + " " + o.classes.openComplete );
			if( this._modal ) {
				self._modal.removeClass( self._modalOpenClasses );
			}
			self._wrapper.removeClass( o.classes.contentWrapOpen + " " + o.classes.contentWrapOpenComplete );

			self._open = false;
		}
	},

	toggle: function( options ){
		this[ this._open ? "close" : "open" ]();
	},

	_transitionEndEvents: "webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd",

	_destroy: function(){
		var classes = this.options.classes,
			hasOtherSiblingPanels = this.element.siblings( "." + classes.panel ).length;

		// create
		if( !hasOtherSiblingPanels ) {
			this._wrapper.children().unwrap();
			this._page.find( "a" ).unbind( "panelopen panelclose" );
		} else if( this._open ) {
			this._wrapper.removeClass( [ classes.contentWrapOpen, classes.contentWrapOpenComplete ].join( " " ) );
		}

		this.element.removeClass( [ this._getPanelClasses(), classes.panelAnimate ].join( " " ) )
			.off( "swipe.panel" )
			.off( "panelbeforeopen" )
			.off( "panelbeforehide" )
			.off( "keyup.panel" );

		this._closeLink.off( "click.panel" );

		if( this._modal ) {
			this._modal.remove();
		}

		// open and close
		this.element.off( this._transitionEndEvents )
			.removeClass( [ classes.openComplete, classes.panelUnfixed, classes.panelClosed, classes.panelOpen ].join( " " ) );
		this._page.removeClass( classes.pageBlock );
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

