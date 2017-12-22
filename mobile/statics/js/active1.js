$(function() {
    var no_img = '../mobile/statics/img/404.png';
    // 登录弹窗
    var getTel = function () {
        var $dialog = $(".dialog-getTel");
        $dialog.show();
    };
    //抽奖
    var prize = function (e) {
        if(e.hasClass('is_take')){
            layer.open({content:'这个已经翻过了'})

            return false;
        }
        var index = e.index();
        var li_index = e.parent().index();
        var x = li_index*3+index;
        var param = {which:x};
        var url = '/mobile/index.php?r=active/index/prize';
        $.post(url,param,function (data) {
            var result = eval('('+data+')');

            switch (result.code){
                case '0' :
                    // 抽奖成功
                    if(result.prize_type == 1){
                        result.prize_name = result.prize_name.split(',')[1];
                    }
                    $('.prize_name').text(result.prize_name);
                    $('.sec-2 div').eq(x).addClass('is_take');

                    $('.sec-2 div').eq(x).find('img').attr('src',result.textfile);
                    var $dialog = $(".dialog-Winning");
                    $dialog.show();
                    break;
                case '1' :
                    //活动未开始
                case '2' :
                    // 活动结束
                case '3' :
                    //您今天已经参加活动，请明天再来！
                case '6' :
                    // 网络拥堵，请稍后再试
                    layer.open({content:result.info})
                    break;
                case '5' :
                // 什么都没有抽到，明天加油
                    $('.sec-2 div').eq(x).addClass('is_take');
                    $('.sec-2 div').eq(x).find('img').attr('src',no_img);
                    layer.open({content:result.info})
                    break;
                case '4' :
                    // 用户未登录
                    getTel();
                    break;

                default:
                    //
                    layer.open({content:'未知错误'})
                    break;
            }
        });
    };
    // 验证手机号码
    var check_phone = function (phone) {
        if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone))) {
            $("#tel+span").remove();
            $("#tel").after("<span class='error'>您的号码有误</span>");
            return false;
        }else if(phone == null){
            var param = {phone:phone};
            var url = '/mobile/index.php?r=active/index/double';
            $.post(url,param,function (data) 
            {
                var result = eval('('+data+')');
                if(result.code == 16)
                {
                    $("#tel+span").remove();
                    $("#tel").after("<span class='error'>您的号码有误</span>");
                    return false;
                } 
            })
        }
        else{
            $("#tel+span").remove();
            return true;
        };
    };
    // 判断是否微信
    var isWeiXin =  function () {
        var ua = window.navigator.userAgent.toLowerCase();
        // console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }
    //初始化奖品
    var init_prize = function () {
        var url = '/mobile/index.php?r=active/index/position';
        $.post(url,function (data) {
            var result = eval('('+data+')');
            if(result.code == 4){
                // getTel();
                return false;
            }
            var sec_div = $('.sec-2 div');
            for(var x in result){
                // 未中奖图片
                sec_div.eq(result[x].which).addClass('is_take');
                sec_div.eq(result[x].which).find('img').attr('src',result[x].textfile|| no_img);
            }
        })
    };
    init_prize();

    //微信打开时，显示关注公众号广告条
    if(isWeiXin()) {
        $(".follow").show();
        console.log("111")
    }

    //点击牌面，弹出弹窗
    $(".sec-2 li div").on("click",function() {
        prize($(this));
    });

    //点击关闭按钮，关闭弹窗
    $(".dialog .close").on("click",function() {
        var $this = $(this);

        $this.parents(".dialog").hide();
    });

    //点击获取验证码
    $(".dialog-getTel .getCode button").on("click",function(e) {
        var tel = $('#tel').val();
        var check_tel = check_phone(tel),$this = $(this);
        if(check_tel){
            var param = {phone:tel};
            var url = '/mobile/index.php?r=active/index/send';
            $.post(url,param,function (data) {
                var result = eval('('+data+')');
                if(result.code == 10){
                    var time = 60,
                        timer,
                        action = function() {
                            time--;
                            if(time > 0) {
                                $this.text(time + "秒后可重新获取");
                            }else {
                                $this.text("获取验证码").prop("disabled",false);
                                clearInterval(timer);
                            }
                        };
                    // e.preventDefault();
                    $this.prop("disabled",true);
                    timer = setInterval(action,1000);
                }else {
                    $(".getCode+span").remove();
                    $(".getCode").after("<span class='error'>"+result.info+"</span>");
                    // $(".dialog-getTel a").css("margin-top",".5rem");
                }
            });
        }

    });
    // 完成验证码登录
    $(".dialog-getTel a").on("click",function() {
    	var tel = $("#tel").val(),
    		code = $("#code").val(),
    		$dialog = $(".dialog-getTel");
    		if(code == "") {
    			$(".getCode+span").remove();
    			$(".getCode").after("<span class='error'>您的验证码有误</span>");
    			// $(".dialog-getTel a").css("margin-top",".5rem");
    		}else {
    			$(".getCode+span").remove();
    			// $(".dialog-getTel a").css("margin-top","2rem");
    			var param = {phone:tel,code:code};
    			var url = '/mobile/index.php?r=active/index/check';
    			$.post(url,param,function (data) {
                    var result = eval('('+data+')');
                    if(result.code == 13){
                        init_prize();
                        $dialog.hide();
                    }else {
                        $(".getCode+span").remove();
                        $(".getCode").after("<span class='error'>"+result.info+"</span>");
                        return false;
                    }

                    console.log(result);
                });
    		};

    });

    $(".dialog-Winning a").on("click",function() {
        var $dialog = $(".dialog-Winning");
        $dialog.hide();
    });
    // 分享弹框
    $('.share').on('click',function () {
        if(isWeiXin()){
            $('.dialog-wx-share').show();
        }else {
            $('.dialog-share').show();
        }
    });

    $('.dialog-share,.dialog-wx-share').on('click',function () {
        $(this).hide();
    });
    
    
 ////////////////////////////分割线/////////////////////////////
    //签到
    $(".qian button").on("click",function(){
    	var url = '/mobile/index.php?r=active/index/click';
    	$.post(url,function(data){
    		var result = eval('('+data+')');
    		if(result.code !=4){//已登录
    			 $(".qian button").text("已签到");
    		}else{
    			console.log("未登录");
    		}
    	})
    })
});