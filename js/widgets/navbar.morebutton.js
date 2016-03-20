/*!
 * jQuery Mobile Navbar @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>description: navbar morebutton extension.
//>>label: NavbarMoreButton
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.navbar.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
    if ( typeof define === "function" && define.amd ) {

        // AMD. Register as an anonymous module.
        define( [
            "jquery",
            "./navbar",
            "./popup",
            "./listview",
            "../widget" ], factory );
    } else {

        // Browser globals
        factory( jQuery );
    }
} )( function( $ ) {

return $.widget( "mobile.navbar", $.mobile.navbar, {

    options: {
        morebutton: false,
        morebuttontext: "...",
        morebuttoniconpos: "top",
        morebuttonicon: null
    },

    _create: function() {
        this._super();
        if ( this.options.morebutton  && this.numButtons > this.maxButton ) {
            this._createNavPopup();
        }
    },

    _id: function() {
        return this.element.attr( "id" ) || ( this.widgetName + this.uuid );
    },

    _createNavRows: function() {
        if ( this.options.morebutton ) {
            return;
        }

        this._super();
    },

    _createNavPopup: function() {
        var popupDiv;
        var popupNav;
        var moreButton;
        var pos;
        var buttonItem;
        var id = this._id() + "-popup";
        var navItems = this.navbar.find( "li" );
        var buttonCount = navItems.length;
        var maxButton = this.maxButton;
        var iconpos = this.iconpos;
        var icon = this.options.morebuttonicon;

        popupDiv = $( "<div id='" + id + "'></div>" );
        this._addClass( popupDiv, "ui-navbar-popup" );
        popupNav = $( "<ul>" );
        this._addClass( popupNav, "ui-navbar-popupnav" );
        popupNav.appendTo( popupDiv );

        // Enhance buttons and move to new rows
        for ( pos = 0; pos < buttonCount; pos++ ) {
            buttonItem = navItems.eq( pos );
            this._makeNavButton( buttonItem.find( "a" ), iconpos );
            if ( pos + 1 === maxButton ) {

                moreButton = $( "<li></li>" ).append( $( "<button></button>" )
                                    .attr( "data-rel", "popup" )
                                    .button( {
                                        icon: icon,
                                        iconPosition: this.options.morebuttoniconpos,
                                        label: this.options.morebuttontext
                                    } ) );
                this._on( moreButton, {
                    "click": "_openMoreButton"
                } );
                this.navbar.find( "ul" ).first().append( moreButton );
            }
            if ( pos + 1 >= maxButton ) {
                buttonItem.detach();
                popupNav.append( buttonItem );
            }
            popupNav.listview();

        }
        popupDiv.appendTo( this.navbar );
        popupDiv.popup( { positionTo: moreButton } );

        this.moreButton = moreButton;
        this.popupDiv = popupDiv;
    },

    _openMoreButton: function() {
        $( "#" + this._id() + "-popup" ).popup( "open" );
    },

    refresh: function() {
        var newitems;
        var that = this;
        var iconpos = this.iconpos;
        if ( !this.options.morebutton ) {
          this._super();
          return;
        }

        if ( this.popupDiv ) {
            newitems = this.moreButton.parent().nextAll();
            newitems.find( "a" ).each( function() {
              that._makeNavButton( this, iconpos );
            } );
            newitems.appendTo( this.popupDiv.find( "ul" ) );
        }
        this._createNavPopup();
    },

    _destroy: function() {
        var navitems;

        if ( !this.options.morebutton ) {
            this._super();
            return;
        }

        if ( this.popupDiv ) {
            navitems = this.popupDiv.find( "li" ).detach();
            this.popupDiv.remove();
            this.moreButton.parent().remove();
            this.navbar.find( "ul" ).append( navitems );
            this.navbar.removeClass( "ui-navbar" );
            this.navButtons = this.navbar.find( "a" );
            this.navButtons.each( function() {
                $( this ).button( "destroy" );
            } );
        }
    }
} );

} );
