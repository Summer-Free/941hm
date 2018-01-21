$(function(){
    //获取当前的手机号
    $("#gcode").click(function(){
        var tel=$("#tel").val();
        if(!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(tel))) {
            $("#tel+span").remove();
            $(".tips").html("<span class='error'>您的号码有误</span>");
            return false;
        }else{

            var param = {phone:tel};
            //console.log(tel);
            var url = '../mobile/index.php?r=collect/index/checknum';
            $.post(url,param,function(data) 
            {
                var result = eval('('+data+')');
                //console.log(result);
                if(result.id == 1)//这个用户是老用户  不可参加活动
                {
                    $("#tel+span").remove();
                    $(".tips").html("<span class='error'>活动限新用户</span>");
                    return false;
                }else if (result.id == 2) {//新用户
                    //console.log(tel);
                    var param = {phone:tel};
                    var url = '../mobile/index.php?r=collect/index/send';  
                    $.post(url,param,function (data) {
                        var result = eval('('+data+')');
                        //console.log(result);
                        if(result.id == 3){
                            var time = 60,
                                timer,
                                action = function() {
                                    //console.log(time);
                                    time--;
                                    if(time>0) {
                                        //console.log(time);
                                        $("#gcode").text(time + "秒后重发");
                                    }else if(time<=0){
                                        //console.log(time);
                                        $("#gcode").text("获取验证码");
                                        $(this).prop("disabled",false);
                                        clearInterval(timer);
                                    }
                                };
                            // e.preventDefault();
                            $(this).prop("disabled",true);
                            timer = setInterval(action,1000);
                        }else {
                            $(".getCode+span").remove();
                            $(".tips").html("<span class='error'>"+result.info+"</span>");
                            // $(".dialog-getTel a").css("margin-top",".5rem");
                        }
                    });
                } 
            })
        }
    });
    //完成验证码登录
    $(".finish").click(function() {
        var tel = $("#tel").val();
        var code = $("#code").val();
        //console.log(tel);
        //console.log(code);
        if(code == "") {
            //$(".getCode+span").remove();
            $(".tips").html("<span class='error'>验证码有误</span>");
        }
        else {
            //$(".getCode+span").remove();
            var param = {phone:tel,code:code};
            var url = '../mobile/index.php?r=collect/index/check';
            $.post(url,param,function (data) {
                var result = eval('('+data+')');
                if(result.id == 8){
                    console.log(result);
                    window.location.href="index.php?r=collect/collect/cogoods";
                    console.log(result);
                    //$(".flex_message").hide();
                }else {
                    console.log(result);
                }
            });
        };
    });
    //帮助点赞
    $(".collect_button_help").click(function() {
        var user_id=$(this).attr("value");
        if(user_id <= 0){
            $(".flex_message").show();
            //当用户是新用户   可参加活动   if  注册时间<活动开始时间 给Tips
        }
        else{
            console.log(user_id);
            //防止重复点击集赞按钮
            var pro_url=window.location.search;
            var pro_id=pro_url.substring(29);
            console.log(pro_id);
            var url='../mobile/index.php?r=collect/collect/ggood';
            var param={user_id:user_id};
            $.post(url, param, function(data) {
                var result = eval('('+data+')');
                if(result.id){
                    //此时判断为真
                    //$(".collect_button_help1").hide();
                    //$(".collect_button_help2").show();
                }
                else{
                    //显示点赞成功
                    $(".flex_rule").show();
                }
            });
            $(".collect_button_help1").hide();
            $(".collect_button_help2").show();

            //如果用户已经登录 可以点赞
        }
    });
    //关闭
    $(".message_close").click(function() {
        $(".flex_message").hide();
    });
    $(".rule_finish").click(function() {
        $(".flex_rule").hide();
    });
});