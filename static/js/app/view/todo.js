/**
 * Created by zheng on 13-10-23.
 */

var app = app || {};


app.TodoView = Backbone.View.extend({

    tagName: "div",

    className: "item",

    template: _.template( $('#tpl-todo-item').html() ),

    events: {
        'click .trash': 'clear'
    },

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {

        this.$el.html( this.template(this.model.toJSON()) );
        this.$tomatoEdit = this.$(".tomato-edit");
        return this;
    },

    clear: function(){
        this.model.destroy();
    }

});