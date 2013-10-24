/**
 * Created by zheng on 13-10-23.
 */

var app = app || {};


app.TomatoView = Backbone.View.extend({

    tagName: "li",

    template: _.template( $('#tpl-tomato-item').html() ),

    events: {

      'click .tomato-trash': 'clear',
      'dblclick .tomato-name': 'edit',
      'blur  .tomato-edit' : 'done',
      'keypress .tomato-edit': 'doneOnEnter'
    
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

    edit: function(){

        this.$el.addClass('editing');

    },

    done: function(){

        var value = this.$tomatoEdit.val().trim();
        if( value ){
            this.model.save({ title: value });
        }
        this.$el.removeClass('editing');

    },

    doneOnEnter: function(){

         if( event.which !==ENTER_KET){
            return;
        }

        this.done();

    },

    clear: function(){
        this.model.destroy();
    }

});