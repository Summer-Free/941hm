$(function(){
    //判断是否登录
    $(".show").click(function(){
            var user_id=$(this).attr("value");
            //console.log(user_id);
            //如果用户未登录   进入登录过程 
            if(user_id <= 0){
                $(".flex_message").show();
                //当用户是新用户   可参加活动   if  注册时间<活动开始时间 给Tips  
            }else{
                window.location.href = "../mobile/index.php?r=collect/collect";
            }
            // $("#output").css('display',"block");
        });
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
                    window.location.href="../mobile/index.php?r=collect/collect";
                }else {
                    console.log(result);
                }
            });
        };
    });
    //点击查看规则
    $("#rule").click(function(){
        $(".flex_rule").show();
    });
    //关闭
    $(".message_close").click(function() {
        $(".flex_message").hide();
        $(".flex_information").hide();
    });
    $(".rule_finish").click(function() {
        $(".flex_rule").hide();
    });
    //点击换取靠枕
    $(".exchange_pillow").click(function() {
        $(".flex_information").show();
        $("#information_finish").click(function() {
            var tel=$("#tel").val();
            var name=$("#name").val();
            var addr=$("#addr").val();
            if(tel=="" || name=="" || addr==""){
                $(".tips").html("<span class='error'>信息不能为空</span>");
                return false;
            }
            else if(!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(tel))) {
                $(".tips").html("<span class='error'>您的号码有误</span>");
                return false;
            }
                /*var sheng=addr.substring(2, 3);
                var shi=addr.substring(5, 6);
                var qu=addr.substring(8, 9);
                else if(sheng != "省"&&shi != "市"&&qu != "区"){
                    $(".tips").html("<span class='error'>请输入正确的地址</span>");
                    return false;
                }*/
            else{
                //验证成功并跳转到成功领取靠枕页面
                $(".collect_prize").show();
                $(".collect_prize_pillow").show();
            }
        });
    });
    //点击换取四件套
    $(".exchange_sheet").click(function(){
        $(".flex_information").show();
        $("#information_finish").click(function() {
            var tel=$("#tel").val();
            var name=$("#name").val();
            var addr=$("#addr").val();
            if(tel=="" || name=="" || addr==""){
                $(".tips").html("<span class='error'>信息不能为空</span>");
                return false;
            }
            else if(!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(tel))) {
                $(".tips").html("<span class='error'>您的号码有误</span>");
                return false;
            }
                /*var sheng=addr.substring(2, 3);
                var shi=addr.substring(5, 6);
                var qu=addr.substring(8, 9);
                else if(sheng != "省"&&shi != "市"&&qu != "区"){
                    $(".tips").html("<span class='error'>请输入正确的地址</span>");
                    return false;
                }*/
            else{
                //验证成功并跳转到成功领取靠枕页面
                $(".collect_prize").show();
                $(".collect_prize_sheet").show();
            }
        });
    });
    //预加载时间，判断点赞数量
    $(document).ready(function(){
        var pnum=$(".exchange_pillow").attr("count");
        console.log(pnum);
        if(pnum>0=88){
            console.log(">=88");
            $(".exchange_pillow").show();
            $(".exchange_pillow_grey").hide();
            $(".exchange_sheet").show();
            $(".exchange_sheet_grey").hide();
        }
        else if(pnum<20){
            console.log("小于20");
        }
        else{
            console.log("20<=pnum<88");
            $(".exchange_pillow").show();
            $(".exchange_pillow_grey").hide();
        }
    });
});