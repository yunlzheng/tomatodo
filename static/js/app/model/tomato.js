/**
 * Created by zheng on 13-10-23.
 */
var app = app || {};

app.Tomato = Backbone.Model.extend({

    urlRoot: '/rest/tomato',
    defaults: {
        title:"",
        created_at:"1990-12-31"
    },

    parse: function(response) {
          response.id = response._id.$oid;
          response.created_at = response.created_at.$date;
          var day2 = new Date(response.created_at);
          var localString = day2.getFullYear()+"-"+(day2.getMonth()+1)+"-"+day2.getDate()+" "+day2.getHours()+":"+day2.getMinutes()+":"+day2.getSeconds();
          response.created_at = localString;
          delete response._id;
          return response;
    }

});