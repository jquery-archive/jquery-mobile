define(["jquery","backbone","models/CategoryModel"], function($, Backbone, CategoryModel) {

    var Collection = Backbone.Collection.extend({

        initialize: function(models, options) {

            this.type = options.type;

        },

        model: CategoryModel,

        jsonArray: [

            { "category": "animals", "type": "Pets" },

            { "category": "animals", "type": "Farm Animals" },

            { "category": "animals", "type": "Wild Animals" },

            { "category": "colors", "type": "Blue" },

            { "category": "colors", "type": "Green" },

            { "category": "colors", "type": "Orange" },

            { "category": "colors", "type": "Purple" },

            { "category": "colors", "type": "Red" },

            { "category": "colors", "type": "Yellow" },

            { "category": "colors", "type": "Violet" },

            { "category": "vehicles", "type": "Cars" },

            { "category": "vehicles", "type": "Planes" },

            { "category": "vehicles", "type": "Construction" }

        ],

        sync: function(method, model, options) {

            var categories = [],
                self = this,
                deferred = $.Deferred();

            setTimeout(function() {

                categories = _.filter(self.jsonArray, function(row) {

                    return row.category === self.type;

                });

                options.success( categories );
                self.trigger("added");
                deferred.resolve(categories);


            }, 2000);

            return deferred;

        }

    });

    // Returns the Model class
    return Collection;

});