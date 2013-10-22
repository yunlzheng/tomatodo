var app = app || {};
var SENCONDS = 1500; //25 minutes

app.TormatoView = Backbone.View.extend({

	el: "#tomato",

	clock: null,

	template: _.template( $("#tormato-init-template").html() ),

	events: {
		'click .btn': 'startTormato'
	},

	initialize: function() {

		this.render();
		
	},

	render: function() {

		this.$el.html( this.template() );
		this.$trigger = this.$('.trigger');
		this.$clock = this.$('.clock');
		this.$clock_display = this.$('.clock_display');
		this.$trigger.show();
		this.$clock.hide();
		return this;

	},

	startTormato: function(){

		window.senconds = SENCONDS;
		var that = this;
		this.$trigger.hide();
		this.$clock.show();
		this.clock = window.setInterval(function(){

			if ( window.senconds > 0 ){
				leftsecond = --window.senconds;
				var day1=Math.floor(leftsecond/(60*60*24)); 
				var hour=Math.floor((leftsecond-day1*24*60*60)/3600); 
				var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60); 
				var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60);
				var tmp = minute+"分"+second+"秒";
				that.$clock_display.text(tmp);
			}else{
				that.finishTormato();
			}
			
		}, 1000);

	},

	finishTormato: function(){

		window.clearInterval(this.clock);
		this.$trigger.show();
		this.$clock.hide();
		//调用webkitNotifications
        if(window.webkitNotifications){
            //浏览器功能检测
            //console.log("Notifications are supported!");
            if (window.webkitNotifications.checkPermission() == 0) {

                 var notification = window.webkitNotifications.createNotification(
                        "../static/icons/retina.svg", "time over", "time over");
                 notification.show();
                 window.setTimeout(function(){

                    notification.cancel();

                 }, 5000);

             }else{
                 window.webkitNotifications.requestPermission();
             }

        }

	}

});