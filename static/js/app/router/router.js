var app = app || {};

var Workspace = Backbone.Router.extend({

	routes: {
		"*test": 'testRouter'
	},

	testRouter: function( param ) {

		if(param){

			console.log(param);

		}

	}

});

app.Router = new Workspace();
Backbone.history.start();