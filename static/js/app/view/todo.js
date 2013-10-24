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
        'keypress .edit':'doneOnEnter',
        'click .toggle':'toggleCompleted'
    },

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {

        this.$el.html( this.template(this.model.toJSON()) );
        this.$edit = this.$(".edit");
        this.$check = this.$('.toggle');
        this.$el.toggleClass('completed', this.model.get('completed'));
        this.$check.toggleClass('checked', this.model.get('completed'));
        this.toggleVisible();
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

    toggleCompleted: function( e ){
        this.model.toggle();
        this.$check.toggleClass('checked', this.model.get('completed'));
        return true;
    },

    toggleVisible: function(){
        this.$el.toggleClass('hidden', this.isHidden());
    },

    clear: function(){

        this.model.destroy();
    },

    isHidden: function(){

        return false;

    }

});