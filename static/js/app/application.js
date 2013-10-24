var app = app || {};

$(function(){

	new app.Tormato();
    //页面刷新或者管理事件
    $(window).bind('beforeunload', function(e){
        return false;
    });

});