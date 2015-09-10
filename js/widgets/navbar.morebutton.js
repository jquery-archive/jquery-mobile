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
        return ( this.element.attr( "id" ) || ( this.widgetName + this.uuid ) );
    },

    _createNavRows: function() {
        if ( this.options.morebutton ) {
            return;
        }

        this._super();
    },

    _createNavPopup: function() {
        var popupDiv, popupNav, moreButton, pos, buttonItem, id,
            navItems = this.navbar.find( "li" ),
            buttonCount = navItems.length,
            maxButton = this.maxButton,
            iconpos = this.iconpos,
            icon = this.options.morebuttonicon;

        id = this._id() + "-popup";

        popupDiv = $( "<div class='ui-navbar-popup' id='" + id + "'></div>" );
        popupNav = $( "<ul class='ui-navbar-popupnav'>" )
            .appendTo( popupDiv );

        // enhance buttons and move to new rows
        for ( pos = 0; pos < buttonCount; pos++ ) {
            buttonItem = navItems.eq( pos );
            this._makeNavButton( buttonItem.find( "a" ), iconpos );
            if ( pos + 1 === maxButton ) {

                moreButton = $( "<li></li>" ).append( $( "<a></a>" )
                                    .attr( "href", "#" + id )
                                    .attr( "data-rel", "popup" )
                                    .button( {
                                        icon: icon,
                                        iconPosition: this.options.morebuttoniconpos,
                                        label: this.options.morebuttontext

                                    } ) );
                this.navbar.find( "ul" ).first().append( moreButton );
            }
            if ( pos + 1 >= maxButton ) {
                buttonItem.detach();
                popupNav.append( buttonItem );
            }
            popupNav.listview();

        }
        popupDiv.appendTo( this.navbar );
        popupDiv.popup();

        $.extend( this, {
            moreButton: moreButton,
            popupDiv: popupDiv
        } );
    },

    refresh: function() {
        var newitems,
            self = this,
            iconpos = self.iconpos;
        if ( !self.options.morebutton ) {
          self._super();
          return;
        }

        if ( self.popupDiv ) {
            newitems = self.moreButton.parent().nextAll();
            newitems.find( "a" ).each( function() {
              self._makeNavButton( this, iconpos );
            } );
            newitems.appendTo( self.popupDiv.find( "ul" ) );
        }
        self._createNavPopup();
    },

    _destroy: function() {
        var navitems,
            self = this;

        if ( !self.options.morebutton ) {
            self._super();
            return;
        }

        if ( self.popupDiv ) {
            navitems = self.popupDiv.find( "li" ).detach();
            self.popupDiv.remove();
            self.moreButton.parent().remove();
            self.navbar.find( "ul" ).append( navitems );
            self.navbar.removeClass( "ui-navbar" );
            self.navButtons = self.navbar.find( "a" );
            self.navButtons.each( function() {
                var icon = $.mobile.getAttribute( this, "icon" ),
                    theme = $.mobile.getAttribute( this, "theme" ),
                    classes = "ui-button";

                if ( theme ) {
                    classes += " ui-button-" + theme;
                }
                if ( icon ) {
                    classes += " ui-icon-" + icon + " ui-button-icon-" + self.iconpos;
                }
                $( this ).removeClass( classes );
            } );
        }
    }
} );

} );
