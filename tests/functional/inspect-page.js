// inspect-page
// Inspect and set options for widgets on a jQuery Mobile page
//
// To use:
// 1. Add inspect-page.js, option-list.js, and inspect-page.html to the folder where the app under test is located
// 2. Add a reference to this script (inspect-page.js), and to option-list.js to the list of scripts loaded from the app
// under test
//
// The result:
// Every page of the app which has a jQuery Mobile header (<div data-role='header'>) will have a button on the right
// labelled "Test Options". When you click this button, a list of all widgets found on the current page will be
// displayed. If more than one widget is associated with a given element, each one will be shown. When you click on a
// widget, its options will be shown editably on the right of the list. Modifications to the options will result in a
// <element>.widgetname("option", <optionName>, <newValue>) call to the widget.
//
// To customize:
// After including this file in your app, you can overwrite the "addInspectionTrigger" function to do something other
// than what the default does (which is to add the button to the page header), and, within the new handler, you can call
// "launchInspector" from the context of an element of your choosing. The context is only important if you also have
// web-ui-fw defined in your app, because the coordinates of the context element are used for launching a popup window
// which contains the widget list and the option list

(function( $, undefined) {

    function elemName( elem ) {
        var str = elem.tagName
            + ( $( elem ).attr( "id" ) === undefined ? "" : ( "#" + $( elem ).attr( "id" ) ) )
            + ( $( elem ).attr( "class" ) === undefined ? ""
                : ( "." + $( elem ).attr( "class" ).replace( " ", "." ) ) );

        if ( str.length > 40 )
            str = str.substring( 0, 40 ) + "...";

        return str;
    }

    function launchInspector() {
        var src = $( this ),
            page = src.closest( ":jqmData(role='page')" ),
            widgetList = $( "#widget-list" ).empty(),
            optionList = $( "#option-list" ),
            realList = $( "<ul data-role='listview' data-scroll='y' class='inspect-page-pane'></ul>" )
                .appendTo( widgetList );

        if ( optionList.data( "optionlist" ) )
            optionList.optionlist( "destroy" );

        page.find( "*" ).each( function() {
            var widgets = $.todons.optionlist.widgetsFromElement( this );
            if ( widgets ) {
                realList.append( "<li data-role='list-divider'>" + elemName( this ) + "</li>" );
                $.each( widgets, function( key, value ) {
                    $( "<li><a>" + value.namespace + "." + value.widgetName + "</a></li>" )
                        .appendTo( realList )
                        .find( "a" )
                        .bind( "vclick", function() {
                            if ( optionList.data( "optionlist" ) )
                                optionList.optionlist( "destroy" );
                            optionList.optionlist();
                            optionList.optionlist( "option", "widget", value );
                        });
                });
            }
        });

        listPage = realList.closest( ":jqmData(role='page')" );
        if ( listPage.data( "page" ) ) {
            realList.listview();
            if ( $.mobile.scrollview )
                realList.scrollview();
        }
    }

    var addInspectionTrigger = function( pg ) {
        if ( $( pg ).find( "[data-option-inspect-button='true']" ).length === 0 ) {
            $( "<a href='#inspect-page' data-option-inspect-button='true' class='ui-btn-right' data-iconpos='left' data-icon='grid'>Test Options</a>" )
                .appendTo( $( ":jqmData(role='header')", pg ) )
                .buttonMarkup()
                .bind( "vclick", launchInspector );
        }
    }

    $( document )
        .ready( function() {
            $.mobile.loadPage( "inspect-page.html" );
        })
        .bind( "pagecreate", function( e ) { addInspectionTrigger( e.target ); } );
})( jQuery );
