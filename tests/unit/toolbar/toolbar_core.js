/*
 * mobile Fixed Toolbar unit tests
 */
(function($){
    module( "toolbar" );

    test( "header classes and roles assigned correctly", function( assert ) {
        $( ":mobile-pagecontainer" ).pagecontainer( "change", "#default" );
        var toolbar = $( "#testHeaderClasses" );

        assert.hasClasses( toolbar, "ui-toolbar-header", "toolbar gets ui-toolbar-header after init" ); 
        assert.hasClasses( toolbar.find( "h1" ), "ui-toolbar-title", "toolbar title assigned correctly");
        ok( toolbar.attr( "role" ) === "banner", "header gets banner role assigned" );
        ok( toolbar.find( "h1" ).attr( "role" ) === "heading", "heading role properly assigned");
    });


    test( "footer classes and roles assigned correctly", function( assert ) {
        $( ":mobile-pagecontainer" ).pagecontainer( "change", "#default" );
        var toolbar = $( "#testFooterClasses" );

        assert.hasClasses( toolbar, "ui-toolbar-footer", "toolbar gets ui-toolbar-footer after init" ); 
        assert.hasClasses( toolbar.find( "h1" ), "ui-toolbar-title", "toolbar title assigned correctly");
        ok( toolbar.attr( "role" ) === "contentinfo", "footer gets contentinfo role assigned" );
        ok( toolbar.find( "h1" ).attr( "role" ) === "heading", "heading role properly assigned");
    });


    asyncTest( "manual init works properly", function( assert ) {
        $( ":mobile-pagecontainer" ).pagecontainer( "change", "#default" );
        expect( 3 );

        var toolbar = $( "#testInit" ).toolbar({
            create: function( event, ui ) {
                ok( true, "create event fired" );
                start();
            }
        });

        assert.hasClasses( toolbar, "ui-toolbar-footer", "manual init gets footer class" );
        assert.hasClasses( toolbar.find( "h1" ), "ui-toolbar-title", "ui-toolbar-title assigned");
    });

    asyncTest( "external headers are created properly", function( assert ) {
        $( ":mobile-pagecontainer" ).pagecontainer( "change", "#default" );
        expect( 3 );

        var toolbar = $( "#testExternalHeader" ).toolbar({
            create: function( event, ui ) {
                ok( true, "external toolbar create event" );
                start();
            }
        });

        assert.hasClasses( toolbar, "ui-toolbar-header", "external toolbar gets ui-toolbar-header class" );
        assert.hasClasses( toolbar.find( "h1" ), "ui-toolbar-title", "ui-toolbar-title assigned properly" );
    });

     asyncTest( "external footers are created properly", function( assert ) {
        $( ":mobile-pagecontainer" ).pagecontainer( "change", "#default" );
        expect( 3 );

        var toolbar = $( "#testExternalFooter" ).toolbar({
            create: function( event, ui ) {
                ok( true, "external toolbar create event" );
                start();
            }
        });

        assert.hasClasses( toolbar, "ui-toolbar-footer", "external toolbar gets ui-toolbar-footer class" );
        assert.hasClasses( toolbar.find( "h1" ), "ui-toolbar-title", "ui-toolbar-title assigned properly" );
    });

    test( "destroy preserves original structure", function() {
        $( ":mobile-pagecontainer" ).pagecontainer( "change", "#destroyPage" );

        var unEnhanced = $("#testDestroy").clone(),
            destroyed = $("#testDestroy").toolbar().toolbar("destroy"),
            unEnhancedHeader = $( "<div data-" + ( $.mobile.ns || "" ) + "role='header'>" +
                            "<h1>title</h1>" +
                            "</div>" ),
            headerClone = unEnhancedHeader.clone();
        $( "#destroyPage" ).append( headerClone );
        headerClone.toolbar().toolbar("destroy");

        ok( $.testHelper.domEqual( destroyed, unEnhanced ), "unEnhanced footer equals destroyed" );
        ok( $.testHelper.domEqual( headerClone, unEnhancedHeader), "headers match after destroy" );
     });

})(jQuery);
