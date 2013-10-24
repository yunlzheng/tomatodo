/**
 * Created by zheng on 13-10-23.
 */

var app = app || {};


app.TodoView = Backbone.View.extend({

    tagName: "div",

    className: "item",

    template: _.template( $('#tpl-todo-item').html() ),

    events: {
        'click .trash': 'clear',
        'dblclick .title': 'edit',
        'blur .edit':'done',
        'keypress .edit':'doneOnEnter'
    },

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {

        this.$el.html( this.template(this.model.toJSON()) );
        this.$edit = this.$(".edit");
        return this;
    },

    edit: function(){

        this.$el.addClass('editing');
        this.$edit.focus();

    },

    done: function(){
        var value = this.$edit.val().trim();
        if ( value ){
            this.model.save({title: value});
        }
        this.$el.removeClass('editing');
    },

    doneOnEnter: function(event){

        if( event.which !==ENTER_KET){
            return;
        }

        this.done();

    },

    clear: function(){
        this.model.destroy();
    }

});