/**
 * Created by zheng on 13-10-23.
 */

var app = app || {};

var TomatoList = Backbone.Collection.extend({

    url: "/rest/tomato",

    model: app.Tomato,

    all: function(){

        return this.filter(function(todo){
            return todo.get('title');
        });

    }

});

app.Tomatos = new TomatoList()