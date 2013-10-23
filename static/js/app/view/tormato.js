/**
 * Created by zheng on 13-10-23.
 */

var app = app || {};


app.TomatoView = Backbone.View.extend({

    tagName: "li",

    template: _.template( $('#tpl-tomato-item').html() ),

    initialize: function() {

    },

    render: function() {


        this.$el.html( this.template(this.model.toJSON()) );
        return this;
    }

});