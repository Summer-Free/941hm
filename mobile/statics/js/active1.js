$(function() {
	is20 = false;
	//初始化抽奖次数
    var url = '../mobile/index.php?r=active/index/count';
    var tel = 0;
    var times = 0;
    var param = {phone:tel,times:times};
	$.post(url,param,function(data){
		var result = eval('('+data+')');
		$(".start span").text(rsult.times);
	})
    var no_img = '../mobile/statics/img/404.png';
    // 登录弹窗
    var getTel = function () {
        var $dialog = $(".dialog-getTel");
        $dialog.show();
    };
    
    //抽奖
    var prize = function (e) {
        if(e.hasClass('is_take')){+
            layer.open({content:'这个已经翻过了'})
            return false;
        }
        var index = e.index();
        var li_index = e.parent().index();
        var x = li_index*3+index;
        var param = {which:x};
        var url = '../mobile/index.php?r=active/index/prize';
        $.post(url,param,function (data) {
            var result = eval('('+data+')');
//          var result = {};
//          result.code = "5"
			console.log(result)
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
                    var url = '../mobile/index.php?r=active/index/count';
                    $(".flex span").text(times);
                    $.post(url,{phone:tel},function(data){
                        
                    });
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
        if(!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(phone))) {
            $("#tel+span").remove();
            $("#tel").after("<span class='error'>您的号码有误</span>");
            return false;
        }
//      else if(phone != ""){
//          var url = '/mobile/index.php?r=active/index/double';
//          var param = {phone:tel};
//          $.post(url,function (data) {
//              var result = eval('('+data+')');
//              if(result.code == 16){
//                  $("#tel+span").remove();
//                  $("#tel").after("<span class='error'>您已参加过该活动</span>");
//                  return false;
//              }
//          })
//      }else{
            $("#tel+span").remove();
            return true;
//      };
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
        var url = '../mobile/index.php?r=active/index/position';
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
    }

    //点击牌面，弹出弹窗
    
     $(".sec-2 li div").on("click",function() {
        prize($(this));
        $("#tel").val("").focus();
		$("#pwd").val("");
		$("#code").val("");
    });
    
    //点击开始，弹出弹窗，
/*    $(".start button").on("click",function() {
        prize($(this));
		getTel();
		$("#tel").val("").focus();
		$("#pwd").val("");
		$("#code").val("");
    });*/

    //点击关闭按钮，关闭弹窗
    $(".dialog .close").on("click",function() {
        var $this = $(this);
        $this.parents(".dialog").hide();
        $(".error").remove();
    });

    
    /*
     * 抽奖次数初始化时，应从后台读取 times
     * 弹窗验证
     * 		新用户注册：抽奖次数+1，注册成功后，将times+1并返回后台保存
     * 		新用户登录：抽奖次数+1，登录后，将times+1并返回后台保存
     * 		老用户登录 ：
     * 开始抽奖
     */
     $(".dialog-getTel .next").on("click",function(){
    	tel = $('#tel').val();
        var check_tel = check_phone(tel),$this = $(this);
        if(check_tel){
            var param = {phone:tel};
            var url = '../mobile/index.php?r=active/index/user';
        	$.post(url,param,function(data){
        		 var result = eval('('+data+')');
           		 console.log(result);
//				var result = {};
//				result.code = 20;
           		if (result.code == 19) { //未注册,注册成功，抽奖次数+1，积分+20
           		 	console.log(result.info);
           		 	$(".dialog-getTel .getCode1").css("display","block");
                    $(".dialog-getTel .finish").css("display","block");
                    $(".dialog-getTel .next").css("display","none");
                    $('#code').val("").focus();
                    var url = '../mobile/index.php?r=active/index/count';
                    $(".flex span").text(times);
                    $.post(url,{phone:tel},function(data){
                        
                    });
                    setInterval(function(){
                    	if ($('#tel').val() != tel) {
                    		$(".dialog-getTel .getCode1").css("display","none");
			                $(".dialog-getTel .finish").css("display","none");
			                $(".dialog-getTel .next").css("display","block");
			                $(".error").remove();
                    	} 
                    },0)
           		 } else if (result.code == 21){//新会员
           		 	//console.log(result.info);
           		 	$(".dialog-getTel .getCode1").css("display","none");
					$(".dialog-getTel .getPass").css("display","block");
					$(".dialog-getTel .finish").css("display","block");
			    	$(".dialog-getTel .next").css("display","none");
			    	$(".dialog-getTel .finish").text("登录");
			    	$("#pwd").val("").focus();
			    	//开始验证密码
					is20 = true;		
           		 	 //用户修改电话号，将重新验证电话号
           		 	 alert(is20)
           		 	setInterval(function(){
                    	if ($('#tel').val() != tel) {
                    		$(".dialog-getTel .getCode1").css("display","none");
							$(".dialog-getTel .getPass").css("display","none");
							$(".dialog-getTel .finish").css("display","none");
					    	$(".dialog-getTel .next").css("display","block");
					    	$(".error").remove();
		                };
                    },0);                 
           		}else if(result.code == 20){//老用户,不进行游戏
           		 	$(".dialog-getTel .getCode1").css("display","none");
					$(".dialog-getTel .getPass").css("display","block");
					$(".dialog-getTel .finish").css("display","block");
			    	$(".dialog-getTel .next").css("display","none");
			    	$(".dialog-getTel .finish").text("登录");
			    	$("#pwd").val("").focus();
			    	//开始验证密码
           		 	$(".dialog-getTel .finish").on("click",function(){
           		 	 	testPwd21();
           		 	 });
           		 	 //用户修改电话号，将重新验证电话号
           		 	 setInterval(function(){
                    	if ($('#tel').val() != tel) {
                    		$(".dialog-getTel .getCode1").css("display","none");
							$(".dialog-getTel .getPass").css("display","none");
							$(".dialog-getTel .finish").css("display","none");
					    	$(".dialog-getTel .next").css("display","block");
					    	$(".error").remove();
                    	} 
                    },0)
           		 }
           		 else{
                    console.log("输入异常");
           		 }
        	})
	     }
	})
     //新用户密码验证，验证成功，抽奖次数+1(每日)
    $(".finish").on("click",function(){
    	if (is20) {
	     	testPwd20();
	    }
    })
 	function testPwd20(){
		$dialog = $(".dialog-getTel");
	 	var tel = $('#tel').val();
	 	var code = $('#pwd').val();
	 	var param = {phone:tel,pwd:code};
	    var url = '../mobile/index.php?r=active/index/login';
        console.log(tel);
        console.log(code);
	 	$.post(url,param,function(data){
	    	var result = eval('('+data+')');
			//验证成功
			if(result.code == 13){
	            /* var times = parseInt($(".flex span").text())+1;*/
                //抽奖次数
	            var url = '../mobile/index.php?r=active/index/count';
	            $(".flex span").text(times);
				$.post(url,{phone:tel},function(data){

                });
				init_prize();
	            $dialog.hide();
	        //验证失败
			}else if(result.code != 13){
				$(".getCode+span").remove();
	            $(".getPass").after("<span class='error'>密码错误</span>");
			}
		})
   }
     
     //验证成功，抽奖次数+1
    
     //老用户密码验证
	  function testPwd21(){
		$dialog = $(".dialog-getTel");
	 	var tel = $('#tel').val();
	 	var code = $('#pwd').val();
	 	var param = {phone:tel,pwd:code};
	    var url = '../mobile/index.php?r=active/index/login';
	 	$.post(url,param,function(data){
	  		var result = eval('('+data+')');
		//  验证成功
			if(result == "true"){
	            $dialog.hide();
                var url = '../mobile/index.php?r=active/index/count';
                $(".flex span").text(times);
                $.post(url,{phone:tel},function(data){
                    
                });
	        //验证失败
			}else if(result == "false"){
				$(".getCode+span").remove();
	            $(".getPass").after("<span class='error'>密码错误</span>");
			}
		});
	 }
	//点击获取验证码
    $(".dialog-getTel .getCode button").on("click",function(e) {
        var tel = $('#tel').val();
        var check_tel = check_phone(tel),$this = $(this);
        if(check_tel){
            var param = {phone:tel};
            var url = '../mobile/index.php?r=active/index/send';
            $.post(url,param,function (data) {
                var result = eval('('+data+')');
                console.log(result)
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
    $(".dialog-getTel .finish").on("click",function() {
    	if($(".dialog-getTel .getCode1").css("display") =="none"){
    		return;
    	}
    	var tel = $("#tel").val(),
    		code = $("#code").val(),
    		$dialog = $(".dialog-getTel");
    		if(code == "") {
    			$(".getCode+span").remove();
    			$(".getCode1").after("<span class='error'>您的验证码有误</span>");
    			// $(".dialog-getTel a").css("margin-top",".5rem");
    		}else {
    			$(".getCode+span").remove();
    			// $(".dialog-getTel a").css("margin-top","2rem");
    			var param = {phone:tel,code:code};
    			var url = '../mobile/index.php?r=active/index/check';
    			$.post(url,param,function (data) {
                    var result = eval('('+data+')');
                     console.log(result);
                    if(result.code == 13){
                        init_prize();
                        $dialog.hide();
                        /*
                        var times = Number($(".flex span").text()) + 1;
                        var url = '../mobile/index.php?r=active/index/xx';
                        $(".flex span").text(times);
						$.post(url,{times:times},function(data){});
						*/
	                    }else {
                    	
                        $(".getCode+span").remove();
                        $(".getCode1" ).after("<span class='error'>"+result.info+"</span>");
                        return false;
                    }
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
});