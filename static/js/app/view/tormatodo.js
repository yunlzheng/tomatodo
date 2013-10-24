var app = app || {};
var SENCONDS = 1500; //25 minutes
var RESTTIME = 300; //5 minutes
var ENTER_KET = 13;

app.Tormato = Backbone.View.extend({

	el: "#tomotodo",

	clock: null,

	events: {
		'click .btn-start': 'startTomato',
        'click .btn-finish': 'finishTomato', //完成一个番茄并，返回初始页面
        'click #btn_giveup': 'giveupTomato',
        'click .btn-start-rest': 'startRest',
        'click .btn-rest-onfinish': 'startRestOnFinish',
        'keypress #txt_tomato_summary': 'createTomatoOnEnter',
        'keypress #txt_todo_input': 'createTodoOnEnter'
	},

	initialize: function() {
        // 番茄相关
        this.$tomato = this.$("#tomato");
        this.$tomato_list = this.$("#tomato-list");
        this.$tomato_staus = this.$("#tomato-status");
        this.$trigger = this.$('.trigger');
        this.$clock = this.$('.clock');
        this.$summary = this.$('.summary');
        this.$clock_display = this.$('.clock_display');
        this.$input_summary = this.$("#txt_tomato_summary");
        this.listenTo(app.Tomatos, 'add', this.addOneTomato);
        this.listenTo(app.Tomatos, 'reset', this.addAllTomato);
        this.listenTo(app.Tomatos, 'all', this.renderTomato);

        //todo 
        this.$todo_list = this.$('#todo-list');
        this.$todo_empty = this.$("#todo-empty");
        this.$input_todo = this.$('#txt_todo_input');
        this.listenTo(app.Todos, 'add', this.addOneTodo);
        this.listenTo(app.Todos, 'reset', this.addAllTodo);
        this.listenTo(app.Todos, 'all', this.renderTodo);

        this.resetTomato();

        app.Tomatos.fetch();
        app.Todos.fetch();
		
	},

    renderTodo: function(){

        if( app.Todos.length ){

            this.$todo_list.show();
            this.$todo_empty.hide();
        
        }else{
        
            this.$todo_list.hide();
            this.$todo_empty.show();
            
        }

    },

    renderTomato: function(){

        if( app.Tomatos.length ){

            this.$tomato_list.show();
            this.$tomato_staus.hide();

        }else{

            this.$tomato_list.hide();
            this.$tomato_staus.show();

        }

    },

	render: function() {

		// this.$tomato.html( this.template() );
		return this;

	},

    addOneTomato: function(tomato){

        var view = new app.TomatoView( { model: tomato } );
        this.$tomato_list.prepend( view.render().el );

    },

    addOneTodo: function(todo){
        var view = new app.TodoView( { model:todo } );
        this.$todo_list.prepend( view.render().el );
    },

    addAllTomato: function(){

        this.$tomato_list.html("");

        app.Tomatos.each(this.addOneTomato, this);

    },

    addAllTodo: function(){

        this.$todo_list.html("");
        app.Todos.each(this.addOneTodo, this);

    },

    createTomatoOnEnter: function(event){

       
        var $p = this.$input_summary.parent('.form-group');
        $p.removeClass('has-error');

        if( event.which !==ENTER_KET || !this.$input_summary.val().trim()){
            return;
        }
        //TODO：后台创建一个番茄记录

        this.finishTomato();

    },

    createTodoOnEnter: function(event){

        if( event.which !==ENTER_KET || !this.$input_todo.val().trim()){
            return;
        }
        app.Todos.create(this.newTodoAttributes());
        this.$input_todo.val('');
    },

    newTodoAttributes: function(){

        return {
            title: this.$input_todo.val().trim(),
            completed: false,
            completed_at: this.getCurrentTime(),
            created_at: this.getCurrentTime()
        };

    },

    //完成一个番茄
    createTomato: function(){

        var value = this.$input_summary.val().trim();
        var $p = this.$input_summary.parent('.form-group');
        if (!value){
            $p.addClass('has-error');
            this.$input_summary.focus();
            return false;
        }
        $p.removeClass('has-error');
        app.Tomatos.create({ title :  value, created_at: this.getCurrentTime()});
        return true;

    },

    finishTomato: function(){
        if(this.createTomato()){
             this.resetTomato();
            return true;
        }
        return false;
    },

    resetTomato: function(){

        this.$('.clock_info').hide();
        this.$('#btn_giveup').show();
        this.$summary.hide();
        this.$trigger.show();
        this.$clock.hide();
        this.$input_summary.val("");
        this.$clock_display.text("任务即将开始");

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
				var day1 = Math.floor(leftsecond/(60*60*24)); 
				var hour = Math.floor((leftsecond-day1*24*60*60)/3600); 
				var minute = Math.floor((leftsecond-day1*24*60*60-hour*3600)/60); 
				var second = Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60);
				var tmp = minute+"分"+second+"秒";
				that.$clock_display.text(tmp);
			
            }else{
				that.summaryTomato();
			}
			
		}, 1000);

	},

    startRestOnFinish: function(){

        if(this.finishTomato()){
             this.startRest();
        }

    },

    //直接开始休息
    startRest: function(){

        window.senconds = RESTTIME;
		var that = this;
		this.$trigger.hide();
		this.$clock.show();
        this.$clock_display.text("休息时间");
        this.$('#btn_giveup').hide();
        this.$('.clock_info').show();
		this.clock = window.setInterval(function(){

			if ( window.senconds > 0 ){

				var leftsecond = --window.senconds;
				var day1 = Math.floor(leftsecond/(60*60*24));
				var hour = Math.floor((leftsecond-day1*24*60*60)/3600);
				var minute = Math.floor((leftsecond-day1*24*60*60-hour*3600)/60);
				var second = Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60);
				var tmp = minute+"分"+second+"秒";
				that.$clock_display.text(tmp);

            }else{

                that.resetTomato();

            }

		}, 1000);

    },

    //总结一个番茄
	summaryTomato: function(){

		window.clearInterval(this.clock);
		this.$summary.show();
		this.$clock.hide();
        this.$input_summary.focus();
        //调用html5 audio播放提示音
         var hasVideo = !!(document.createElement('video').canPlayType);
         if(hasVideo===true){
             //播放提示音
             var snd = new Audio("/static/voice/notification.mp3"); // buffers automatically when created
             snd.play();

         }
		//调用webkitNotifications
        if(window.webkitNotifications){
            //浏览器功能检测
            //console.log("Notifications are supported!");
            if (window.webkitNotifications.checkPermission() === 0) {

                 var notification = window.webkitNotifications.createNotification(
                        "../static/icons/clock.jpg", "又完成一个番茄", "总结一下这个番茄完成的工作");
                 notification.show();

             }else{
                 window.webkitNotifications.requestPermission();
             }
        }
	},

    getCurrentTime: function(){

        var date = new Date();
        return date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

    }

});