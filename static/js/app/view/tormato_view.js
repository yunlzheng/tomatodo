var app = app || {};
var SENCONDS = 1500; //25 minutes
var ENTER_KET = 13;

app.TormatoView = Backbone.View.extend({

	el: "#tomato",

	clock: null,

	template: _.template( $("#tormato-init-template").html() ),

	events: {
		'click .btn-start': 'startTomato',
        'click .btn-finish': 'finishTomato',
        'click #btn_giveup': 'giveupTomato',
        'keypress #txt_tomato_summary': 'createTomatoOnEnter'
	},

	initialize: function() {

		this.render();
		
	},

	render: function() {

		this.$el.html( this.template() );
		this.$trigger = this.$('.trigger');
		this.$clock = this.$('.clock');
        this.$summary = this.$('.summary');
		this.$clock_display = this.$('.clock_display');
        this.$input_summary = this.$("#txt_tomato_summary");
		return this;

	},

    createTomatoOnEnter: function(event){

        if( event.which !==ENTER_KET || !this.$input_summary.val().trim()){
            return;
        }
        //TODO：后台创建一个番茄记录
        this.$input_summary.val("");
        this.finishTomato();

    },

    //完成一个番茄
    finishTomato: function(){

        this.$summary.hide();
        this.$trigger.show();
        that.$clock_display.text("任务即将开始");

    },

    //放弃正在执行的番茄
    giveupTomato: function(){

        window.clearInterval(this.clock);
        this.$trigger.show();
        this.$clock.hide();
        this.$summary.hide();
        return false;

    },

    //开始一个番茄
	startTomato: function(){

		window.senconds = SENCONDS;
		var that = this;
		this.$trigger.hide();
		this.$clock.show();
		this.clock = window.setInterval(function(){

			if ( window.senconds > 0 ){
				var leftsecond = --window.senconds;
				var day1=Math.floor(leftsecond/(60*60*24)); 
				var hour=Math.floor((leftsecond-day1*24*60*60)/3600); 
				var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60); 
				var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60);
				var tmp = minute+"分"+second+"秒";
				that.$clock_display.text(tmp);
			}else{
				that.summaryTomato();
			}
			
		}, 1000);

	},

    //总结一个番茄
	summaryTomato: function(){

		window.clearInterval(this.clock);
		this.$summary.show();
		this.$clock.hide();
        //调用html5 audio播放提示音
         var hasVideo = !!(document.createElement('video').canPlayType);
         if(hasVideo==true){
             //播放提示音
             var snd = new Audio("/static/voice/notification.mp3"); // buffers automatically when created
             snd.play();

         }
		//调用webkitNotifications
        if(window.webkitNotifications){
            //浏览器功能检测
            //console.log("Notifications are supported!");
            if (window.webkitNotifications.checkPermission() == 0) {

                 var notification = window.webkitNotifications.createNotification(
                        "../static/icons/clock.jpg", "又完成一个番茄", "总结一下这个番茄完成的工作");
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