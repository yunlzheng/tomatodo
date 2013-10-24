/**
 * Created by zheng on 13-10-23.
 */

var app = app || {};

var TodoList = Backbone.Collection.extend({

    url: "/rest/todo",

    model: app.Todo,

    all: function(){

        return this.filter(function(todo){
            return todo.get('title');
        });

    }

});

app.Todos = new TodoList();