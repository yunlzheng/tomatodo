/**
 * Created by zheng on 13-10-23.
 */
var app = app || {};

app.Tomato = Backbone.Model.extend({

    urlRoot: '/rest/tomato',
    defaults: {
        title:"",
        created_at:""
    },

    parse: function(response) {
          response.id = response._id.$oid;
          delete response._id;
          return response;
    }

});