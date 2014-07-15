//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Trigger "pagebottomreached" when the user scrolls to the bottom
//>>label: Page Scrolling
//>>group: Core

define( [ "jquery", "./page", "../events/touch" ], function ( jQuery ) {
    //>>excludeEnd("jqmBuildExclude");
    (function ( $, undefined ) {

        $.widget( "mobile.page", $.mobile.page, {
            _create: function () {
                this._super();
                this._on(this.document, {
                    "scrollstop": "_handleScrollStop"
                });
            },

            _handleScrollStop: function () {
                var screenHeight, header, scrolled, footer, scrollEnd, activePage;

                if ( this.element.hasClass( "ui-page-active" ) ) {
                    activePage = this.element;
                    toolbars = function () {
                        if ( $( ":mobile-pagecontainer > div.ui-header" ) || $( ":mobile-pagecontainer > div.ui-header" )) {
                            var header = $( ".ui-header" ).hasClass( "ui-header-fixed" ) ? $( ".ui-header" ).outerHeight() - 1 : $( ".ui-header" ).outerHeight(),
                                footer = $( ".ui-footer" ).hasClass( "ui-footer-fixed" ) ? $( ".ui-footer" ).outerHeight() - 1 : $( ".ui-footer" ).outerHeight();
                            return header + footer;
                        }
                        if ( $( "div.ui-header", activePage ) || $( "div.ui-footer", activePage )) {
                            var header = $( ".ui-header", activePage ).hasClass( "ui-header-fixed" ) ? $( ".ui-header", activePage ).outerHeight() - 1 : $( ".ui-header", activePage ).outerHeight(),
                                footer = $( ".ui-footer", activePage ).hasClass( "ui-footer-fixed" ) ? $( ".ui-footer", activePage ).outerHeight() - 1 : $( ".ui-footer", activePage ).outerHeight();
                            return header + footer;
                        }
                    },
                    screenHeight = $.mobile.getScreenHeight();
                    contentHeight = $( ".ui-content", activePage ).outerHeight();
                    scrolled = $( window ).scrollTop();
                    scrollEnd = contentHeight - screenHeight + toolbars();
                    if ( scrolled >= scrollEnd ) {
                        this._trigger( "bottomreached" );
                    }
                }
            }
        });

    })(jQuery);
    //>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
