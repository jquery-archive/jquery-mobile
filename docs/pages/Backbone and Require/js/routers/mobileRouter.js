define(["jquery","backbone", "../models/CategoryModel", "../collections/CategoriesCollection", "../views/CategoryView"], function($, Backbone, categoryModel, categoriesCollection, categoryView) {

    var Router = Backbone.Router.extend({

        initialize: function() {

            this.animalsView = new categoryView({ el: "#animals", collection: new categoriesCollection([], {type: "animals"}) });

            this.colorsView = new categoryView({ el: "#colors", collection: new categoriesCollection([], {type: "colors"}) });

            this.vehiclesView = new categoryView({ el: "#vehicles", collection: new categoriesCollection([], {type: "vehicles"}) });

            // Tells Backbone to start watching for hashchange events
            Backbone.history.start();

        },

        // All of your Backbone Routes (add more)
        routes: {

            // When there is no hash bang on the url, the home method is called
            "": "home",

            "category?:type": "category"

        },

        home: function() {

            $.mobile.changePage( "#categories" , { reverse: false, changeHash: false } );

        },

        category: function(type) {

            var currentView = this[type + "View"];

            if(!currentView.collection.length) {

                $.mobile.loading('show');

                currentView.collection.fetch().done(function() {

                    $.mobile.changePage( "#" + type, { reverse: false, changeHash: false } );
    
                });

            }

            else {

                $.mobile.changePage( "#" + type, { reverse: false, changeHash: false } );

            }

        }

    });

    // Returns the Router class
    return Router;

});