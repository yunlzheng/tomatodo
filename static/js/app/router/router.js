var app = app || {};

var Workspace = Backbone.Router.extend({

	routes: {
		"settings": 'settings',
		"/": 'default'
	},

	initialize: function(options) {

		$('.settings').hide();

	},

	settings: function( param ) {

		$('.settings').show();

	}

});

app.Router = new Workspace();
Backbone.history.start();