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
			modal: "ui-panel-dismiss"
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
		this._modal = $( "<div class='" + this.o.classes.modal +"' data-panelid='" + this._panelID + "'></div>" )
			.on( "vclick" , this.close );
	},

	_addPanelClasses: function(){
		var $el = this.element,
			panelClasses = this.options.classes.panel;

		if( o.theme ){
			panelClasses += "ui-body-" + o.theme;
		}

		if( $.support.cssTransform3d ){
			panelClasses += "ui-panel-transforms";
		} else {
			panelClasses +=  "ui-panel-positioning";
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

	_bindLinkListeners: function( roleType , callback ){
		var self = this;

		$( document ).on( "vclick" , "a", function( e ) {
			if( this.href.split( "#" )[ 1 ] === self._panelID ){
				e.preventDefault();
				self.toggle();
				$( this ).addClass( $.mobile.activeBtnClass );
				return false;
			}
		});
	},

	_bindPageEvents: function(){
		var self = this;

		self._page
			// on swipe, close the panel (should swipe open too?)
			.on( "swipe" , function( e ){
				self.close();
			})
			// Close immediately if another panel on the page opens
			.on( "pagebeforeopen", function( e ){
				if( self._open && e.target !== self.element ){
					self.close( true );
				}
			})
			// clean up open panels after page hide
			.on(  "pagehide", self.close )
			// on escape, close? might need to have a target check too...
			.on( "keyup", function() {
				if( e.keyCode === 27 && self._open ){
					self.close();
				}
			});
	},

	// state storage of open or closed
	_open: false,

	open: function( options ){
		this._trigger( "beforeopen" );
		this._position( o );
		this._openPanel( o );
		this._open = true;
		this._trigger( "open" );
	},

	// cached string of classes used to last open the panel
	_lastOpenClasses: null,

	// return string of classes needed for opening panel
	_getOpenClasses: function( options ){
		this._lastOpenClasses = [
				"-position-" + o.position,
				"-dismissible-" + o.dismissible,
				"-display-" + o.display
			].join( " " + o.classes.panel );

		return this._lastOpenClasses;
	},

	_openPanel: function(){
		var o = options,
			$el = this.element,
			klass = o.classes.panel,
			$page = $el.closest( ":jqmData(role='page')" ),
			$contentsWrap = $page.find( "." + o.classes.contentWrap ),
			self = this,
			_triggerAndResolve = function(){
				self._trigger( "open" , "open" , { link: o.link } );
				deferred.resolve( options );
				$page.addClass( "ui-panel-open" );
			};
		
		$el.one( self._transitionEndEvents , _triggerAndResolve );

		setTimeout(function(){
			$el.addClass( klass + "-active" );
			if( o.display === "reveal" || o.display === "push" ){
				$contentsWrap.addClass( "panel-shift-" + o.position );
			}
			if( o.display === "push" ){
				$contentsWrap.addClass( "panel-push" );
			}
			$( ".ui-page-active" ).addClass( "ui-panel-body-scroll-block" );
		}, 0);//TODO setTimout hacks
		return deferred.promise();
	},

	_transitionEndEvents: "webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd",

	// TODO: simplify internals
	close: function( immediate ){
		/* 
		TODO: this method should largely mimic the open method's flow:
		this._trigger( "beforeclose" );
		this._position();
		this._closePanel();
		this._open = false;
		this._trigger( "close" );

		"immediate" arg should forego adding transition classes
		*/


		var deferred = $.Deferred();
		var o = $.extend( {} , this.options ),
			klass = o.classes.panel,
			$el = this.element,
			position = $el.jqmData( "position" ),
			display = $el.jqmData( "display" ),
			dismissible = $el.jqmData( "dismissible" ),
			$page = $el.closest( ":jqmData(role='page')" ),
			$contentsWrap = $page.find( "." + o.classes.contentWrap ),
			_closePanel = function(){
				var responsiveClasses = $el[0].className.match(/ui-responsive-?\w*/g) || [];

				$el.removeClass( klass + "-position-" + position )
					.removeClass( klass + "-display-" + display )
					.removeClass( klass + "-dismissible-" + dismissible );
				for( var j = 0, len = responsiveClasses.length; j < len; j++ ){
					$contentsWrap.removeClass( responsiveClasses[ j ] );
				}
				$el.trigger( "close" );
				deferred.resolve( o , toggle );
			};
		$page.removeClass( "ui-panel-open" );
		for( var i in options ){
			if( options.hasOwnProperty( i ) ){
				o[ i ] = options[ i ];
			}
		}
		
		if( toggle ){
			$el.addClass( "ui-panel-toggle" );
		}
		
		$el.one( transitionEndEvents , _closePanel );

		$el.removeClass( klass + "-active" );

		$( "#page-block" ).remove();

		$( "." + o.classes.contentWrap ).removeClass( "panel-shift-" + position )
			.removeClass( "panel-push" );
		$( ".ui-page-active" ).removeClass( "ui-panel-body-scroll-block" );
		return deferred.promise();
	},

	toggle: function( options ){
		this[ this._open ? "close" : "open" ]();
	},

	destroy: function(){

	},
});

// TODO: not sure if this is needed?
$( document ).bind( "panelopen panelclose" , function( e , data ){
	var $link = data.link, $parent;
	if( $link ){
		$parent = $link.parent().parent();
		if ($parent.hasClass("ui-li")) {
			$link = $parent.parent();
		}
		$link.removeClass( $.mobile.activeBtnClass );
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

