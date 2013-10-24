/**
 * Created by zheng on 13-10-23.
 */
var app = app || {};

app.Todo = Backbone.Model.extend({

    urlRoot: '/rest/todo',
    defaults: {
        title:"",
        completed:false,
        completed_at:"1990-12-31",
        created_at:"1990-12-31"
    },

    parse: function(response) {
          response.id = response._id.$oid;
          response.created_at = response.created_at.$date;
          response.created_at = this.parseDate(response.create_at);

          response.completed_at = response.completed_at.$date;
          response.completed_at = this.parseDate(response.completed_at);

          delete response._id;
          return response;
    },

    parseDate: function(datetime){
      var day2 = new Date(datetime);
      var localString = day2.getFullYear()+"-"+(day2.getMonth()+1)+"-"+day2.getDate()+" "+day2.getHours()+":"+day2.getMinutes()+":"+day2.getSeconds();
    },

    toggle: function(){
        this.save({
            completed: !this.get('completed')
        });
    }

});