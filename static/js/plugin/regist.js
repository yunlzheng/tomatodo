/**
 * Created by zheng on 13-10-25.
 */
$(function(){

    $('body').delegate('.btn-submit','click',function(){

        $("#regist-form").submit();

    });

});