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
			panel: "ui-panel"
		},
		theme: null,
		position: "left",
		dismissible: true,
		display: "pan",
		initSelector: ":jqmData(role='panel')"
	},
	_handleLink: function( roleType , callback ){
		var elId = this.element.attr( "id" ),
			self = this;
		$( document ).bind( "pagebeforechange", function( e, data ) {
			var $link, id;
			if ( data.options.role === roleType ) {
				e.preventDefault();
				$link = data.options.link;
				id = $link.attr( "href" ).split( "#" )[1];
				if( elId === id ){
					callback.call( self , $link , id );
				}
				return false;
			}
		});
	},
	_blockPage: function( clickable , position ){
		var deferred = $.Deferred();
		var $div = $( "<div>" ),
			$panel = this,
			slideDir = position === "left" ? "right" : "left",
			klass = clickable ? "ui-panel-dismiss" : "ui-panel-no-dismiss";
		setTimeout(function(){
			$div.css( "width" , "70%" )
				.css( "height" , $.mobile.activePage.height() )
				.css( "position" , "absolute" )
				.css( "top" , 0 )
				.css( slideDir , 0 )
				.attr( "id" , "page-block" )
				.addClass( klass )
				.appendTo( $.mobile.activePage );
			if( clickable ){
				$div.bind( "vclick" , function(){
					$panel.close();
				});
			}
			deferred.resolve();
		}, 0); // TODO get rid of setTimeout 0 hacks
		return deferred.promise();
	},
	_create: function() {
		var o = this.options,
			klass = o.classes.panel,
			$el = this.element,
			$closeLink = $el.find( "[data-rel=close]" );
		$el.addClass( klass );
		$el.parents( "[data-role=page]" ).addClass( "panel-page" );
		if( o.theme ){
			$el.addClass( "ui-body-" + o.theme );
		}
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
	_destroy: function(){},
	open: function( options , toggle ){
		var self = this;
		var deferred = $.Deferred();
		var o = $.extend( {} , this.options ),
			klass = o.classes.panel,
			$el = this.element;
		for( var i in options ){
			if( options.hasOwnProperty( i ) ){
				o[ i ] = options[ i ];
			}
		}
		this._position( o )
		.then( function(){
			return self._blockPage( o.dismissible , o.position );
		})
		.then( function(){
			$el.one( "webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd" , function(){
				self._trigger( "open" , "open" , { link: o.link } );
				deferred.resolve();
			});
			$el.addClass( klass + "-active" );
			if( o.display === "pan" ){
				$( ".ui-content, .ui-header, .ui-footer" ).addClass( "panel-shift-" + o.position );
			}
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
			dismissible = $el.jqmData( "dismissible" );
		for( var i in options ){
			if( options.hasOwnProperty( i ) ){
				o[ i ] = options[ i ];
			}
		}
		if( toggle ){
			$el.addClass( "ui-panel-toggle" );
		}

		$el.one( "webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd" , function(){
			var $this = $( this );
			$this.removeClass( klass + "-position-" + position )
				.removeClass( klass + "-display-" + display )
				.removeClass( klass + "-dismissible-" + dismissible );
			$this.data( "mobile-panel" )._trigger( "close" , "close" , { link: o.link } );
			deferred.resolve( o , toggle );
		});

		$el.removeClass( klass + "-active" );
		$( "#page-block" ).remove();
		$( ".ui-content, .ui-header, .ui-footer" ).removeClass( "panel-shift-" + position );
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

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ) {
	$.mobile.panel.prototype.enhanceWithin( e.target );
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");

