define(['jquery', 'backbone','models/CategoryModel'], function($, Backbone, CategoryModel){

    var View = Backbone.View.extend({

        initialize: function() {

            // The render method is called when Category Models are added or removed to the Collection
            this.collection.on("added", this.render, this);

        },


        // Renders all of the Category models on the UI
        render: function() {

            // Setting the view's template property
            this.template = _.template( $("script#categoryItems").html(), { "collection": this.collection } );

            // Renders the view's template inside of the current listview element
            this.$el.find("ul").html(this.template);

            return this;

        }

    });
	
    // Returns the View class
    return View;
});