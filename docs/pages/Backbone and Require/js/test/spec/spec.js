define(["jquery","backbone","views/UserView","models/UserModel","collections/UsersCollection","jasminejquery"], function($, Backbone, UserView, UserModel, UsersCollection) {

    // First Test Suite that contains all of the app's tests
    describe("Backbone-Require-Boilerplate (BRB)", function() {

        // Runs before every View spec
        beforeEach(function() {

            // Creates a new Model instance and sets default values
            user = new UserModel().set({ "firstname": "Greg", "lastname": "Franko", "email": "example@gmail.com", "phone": "703-243-7371" }),

            // Creates a new Collection instance (Adds the previous Model instance to the Collection)
            users = new UsersCollection([user]),

            // Instantiating the mainView instance
            mainView = new UserView({

                // Declares the View's collection instance property
                collection: users

            });

        });

        // Backbone Views Suite: contains all tests related to views
    	describe("Backbone Views", function() {

            it("should have a collection property that is an instance of the users collection", function() {

                expect(mainView.collection instanceof UsersCollection).toBe(true);

            })

            it("should have four event handlers", function() {

                expect(_.keys(mainView.events).length).toEqual(4);

            });


        }); // End of the Backbone Views test suite

        // Backbone Models Suite: contains all tests related to models
        describe("Backbone Models", function() {

            // Runs before every Model spec
            beforeEach(function() {

                // We are spying on the _validate method to see if it gets called
                spyOn(UserModel.prototype, "validate").andCallThrough();

            });

            it("should be in a valid state", function() {

                expect(user.isValid()).toBe(true);

            })

            it("should call the validate method when setting a property", function() {

            	user.set({ firstname: "Greg" });

                expect(UserModel.prototype.validate).toHaveBeenCalled();

            });

        }); // End of the Backbone Models test suite

        // Backbone Collections Suite: contains all tests related to collections
        describe("Backbone Collections", function() {

            it("should have one model", function() {

                expect(users.length).toEqual(1);

            });

        }); // End of the Backbone Collections test suite

    }); // End of the Backbone test suite

});