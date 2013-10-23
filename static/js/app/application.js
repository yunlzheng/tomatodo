var app = app || {};
var ENTER_KET = 13;

$(function(){

	tormato = new app.TormatoView();
    //页面刷新或者管理事件
    $(window).bind('beforeunload', function(e){
        return false;
    });

});