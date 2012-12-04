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
			contentWrap: "ui-panel-content-wrap"
		},
		theme: null,
		position: "left",
		dismissible: true,
		display: "reveal",
		initSelector: ":jqmData(role='panel')"
	},
	_handleLink: function( roleType , callback ){
		var elId = this.element.attr( "id" ),
			self = this;
		$( document ).on( "click" , "a", function( e ) {
			var $link = $( this ),
				id = $link.attr( "href" ).split( "#" )[1];
			if( elId === id ){
				e.preventDefault();
				callback.call( self , $link , id );
				return false;
			}
		});
	},
	_blockPage: function( options ){
		var deferred = $.Deferred();
		var $div = $( "<div>" ),
			$panel = this,
			slideDir = options.position === "left" ? "right" : "left",
			clickable = options.dismissible && options.display !== "push",
			klass = clickable ? "ui-panel-dismiss" : "ui-panel-no-dismiss";
		setTimeout(function(){
			if( $panel.element.hasClass( "ui-responsive" ) ){
				$div.addClass( "ui-responsive" );
			}
			$div.addClass( "ui-panel-dismiss-overlay" )
				.css( "height" , $.mobile.activePage.height() )
				.css( slideDir , 0 )
				.attr( "id" , "page-block" )
				.addClass( klass )
				.appendTo( $.mobile.activePage );
			if( clickable ){
				$div.bind( "vclick" , function(){
					$panel.close();
				});
			}
			deferred.resolve( options );
		}, 0); // TODO get rid of setTimeout 0 hacks
		return deferred.promise();
	},
	_create: function() {
		var o = this.options,
			klass = o.classes.panel,
			$el = this.element,
			$closeLink = $el.find( "[data-rel=close]" ),
			$page = $el.closest( ":jqmData(role='page')" );

		$el.addClass( klass );
		if( $( "." + o.classes.contentWrap ).length === 0 ){
			$( ".ui-header, .ui-content, .ui-footer" ).wrapAll( '<div class="' + o.classes.contentWrap + '" />' );
		}
		if( o.theme ){
			$el.addClass( "ui-body-" + o.theme );
		}

		$page.addClass( $.support.cssTransform3d ? "ui-panel-transforms" : "ui-panel-positioning" );

		this._handleLink( "panel" , function( $link , id ){
			var options = $.extend( {} , this.options ),
				op = {
					position: $link.jqmData( "position" ),
					dismissible: $link.jqmData( "dismissible" ),
					display: $link.jqmData( "display" )
				};
			for( var i in op ){
				if( op.hasOwnProperty( i ) && typeof op[ i ] !== "undefined" ){
					options[ i ] = op[ i ];
				}
			}
			$( "#" + id ).panel( "toggle" , {
				position: options.position,//left right
				dismissible: options.dismissible,//true or false
				display: options.display,// overlay or push
				link: $link
			});
		});
		$closeLink.on( "vclick" , function( e ){
			e.preventDefault();
			$el.panel( "close" );
			return false;
		});
		this._trigger( "create" );
	},
	_position: function( options ){
		var deferred = $.Deferred();
		var o = options,
			klass = o.classes.panel,
			$el = this.element;
		setTimeout(function(){
			$el.addClass( "hidden" )
				.addClass( klass + "-position-" + o.position )
				.addClass( klass + "-dismissible-" + o.dismissible )
				.addClass( klass + "-display-" + o.display )
				.jqmData( "position" , o.position )
				.jqmData( "display" , o.display )
				.jqmData( "dismissible" , o.dismissible )
				.removeClass( "hidden" );
				deferred.resolve( options );
		}, 0); // TODO get rid of setTimeout 0 hacks
		return deferred.promise();
	},
	_openPanel: function( options ){
		var deferred = $.Deferred();
		var o = options,
			$el = this.element,
			klass = o.classes.panel,
			$contentsWrap = $( "." + o.classes.contentWrap ),
			self = this,
			_triggerAndResolve = function(){
				self._trigger( "open" , "open" , { link: o.link } );
				deferred.resolve( options );
			};
		if( o.display === "reveal" ){
			$contentsWrap.one( "webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd" , _triggerAndResolve );
		} else {
			$el.one( "webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd" , _triggerAndResolve );
		}
		setTimeout(function(){
			$el.addClass( klass + "-active" );
			if( o.display === "reveal" || o.display === "push" ){
				$contentsWrap.addClass( "panel-shift-" + o.position );
			}
			if( o.display === "push" ){
				$contentsWrap.addClass( "panel-push" );
			}
			$( "body" ).addClass( "ui-panel-body-scroll-block" );
		}, 0);//TODO setTimout hacks
		return deferred.promise();
	},
	_destroy: function(){},
	open: function( options , toggle ){
		var self = this;
		var deferred = $.Deferred();
		var o = $.extend( {} , this.options ),
			klass = o.classes.panel,
			$el = this.element,
			$contentsWrap = $( "." + o.classes.contentWrap );
		for( var i in options ){
			if( options.hasOwnProperty( i ) ){
				o[ i ] = options[ i ];
			}
		}
		if( $el.hasClass( "ui-responsive" ) ){
			$contentsWrap.addClass( "ui-responsive" );
		}
		this._position( o )
		.then( function( o ){
			return self._openPanel( o );
		})
		.then( function( o ){
			return self._blockPage( o );
		})
		.then( function( o ){
			deferred.resolve( o );
		});
		return deferred.promise();
	},
	close: function( options , toggle ){
		var deferred = $.Deferred();
		var o = $.extend( {} , this.options ),
			klass = o.classes.panel,
			$el = this.element,
			position = $el.jqmData( "position" ),
			display = $el.jqmData( "display" ),
			dismissible = $el.jqmData( "dismissible" ),
			$contentsWrap = $( "." + o.classes.contentWrap );
			_closePanel = function(){
				$el.removeClass( klass + "-position-" + position )
					.removeClass( klass + "-display-" + display )
					.removeClass( klass + "-dismissible-" + dismissible );
				$contentsWrap.removeClass( "ui-responsive" );
				$el.data( "mobile-panel" )._trigger( "close" , "close" , { link: o.link } );
				deferred.resolve( o , toggle );
			};
		for( var i in options ){
			if( options.hasOwnProperty( i ) ){
				o[ i ] = options[ i ];
			}
		}
		if( toggle ){
			$el.addClass( "ui-panel-toggle" );
		}
		if( display === "reveal" ){
			$contentsWrap.one( "webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd" , _closePanel );
		} else {
			$el.one( "webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd" , _closePanel );
		}

		$el.removeClass( klass + "-active" );
		$( "#page-block" ).remove();
		$( "." + o.classes.contentWrap ).removeClass( "panel-shift-" + position )
			.removeClass( "panel-push" );
		$( "body" ).removeClass( "ui-panel-body-scroll-block" );
		return deferred.promise();
	},
	toggle: function( options ){
		var $el = this.element,
			active = $( ".ui-panel-active" ).data( "mobile-panel" ),
			self = this;
		if( active &&
				( active.element.jqmData( "position") === options.position ) &&
				( active.element.attr( "id" ) === $el.attr( "id" ) ) &&
				( active.element.jqmData( "display" ) === options.display ) ){
			return active.close( options );
		} else if ( active ){
			active.close( options , true ).
			then( function( options , toggle ){
				self.open( options , toggle );
			});
		} else {
			return this.open( options );
		}
	},
	refresh: function(){
	}
});

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

$( document ).bind( "pagehide" , function( e , data ){
	$( ".ui-panel-active" ).panel( "close" );
});

$(document).keyup(function(e) {
	if( e.keyCode === 27 ){
		$( ".ui-panel-active" ).panel( "close" );
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

