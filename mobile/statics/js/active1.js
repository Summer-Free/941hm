$(function() {
	var istrueimg = 0;
	//签到初始化
	var qian = function(){
		var url = '../mobile/index.php?r=active/index/sign';
		$.post(url,function (data){
			console.log(data)
			var result = eval('('+data+')');
			if(result.code == 22){
				$(".true").hide();
				$(".false").show();
			}
		});
	}
	qian();
	//当天日期
	var getTime =  function(){
		var dates = new Date();
		var year = dates.getFullYear();
		var month = dates.getMonth() +1;
		var date = dates.getDate();
		var day = dates.getDay();
		var weeks = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
		var week = document.getElementById("week");
		var time = document.getElementById("time");
		var intime = document.getElementById("intime");
		week.innerText=(weeks[day]);
		time.innerText=(year+"年"+(month)+"月"+date+"日");
		intime.innerText=(year+"年"+(month)+"月");
		setTimeout(arguments.callee,0);
		return date;
	}
    getTime();
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
        var url = '../mobile/index.php?r=active/index/prize';
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
                    var $dialog = $(".tling");
                    $dialog.show();
                    break;
                case '1' :
                    //活动未开始
                case '2' :
                    // 活动结束
                case '3' :
                    //您今天已经参加活动，请明天再来！
                case '19' :
                    //您今天已经参加活动，请明天再来！
                case '23' :
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
                    layer.open({content:'未知错误'})
                    break;
            }
        });
    };
    // 验证手机号码
    var check_phone = function (phone) {
        if(!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(phone))) {
            $("#tel+span").remove();
            $("#tel").after("<span class='error'>您的号码有误</span>");
            return false;
        }else if(phone == null){
            var param = {phone:phone};
            var url = '../mobile/index.php?r=active/index/double';
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
            var url = '../mobile/index.php?r=active/index/send';
            $.post(url,param,function (data) {
                var result = eval('('+data+')');
                if(result.code == 10){
                    var time = 60,
                        timer,
                        action = function() {
                            time--;
                            if(time > 0) {
                                $this.text(time + "秒后重新获取");
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
    			var url = '../mobile/index.php?r=active/index/check';
    			$.post(url,param,function (data) {
                    var result = eval('('+data+')');
                    if(result.code == 13){
                        init_prize();
                        $dialog.hide();
                        qian();
                        if(istrueimg) $(".tqian").show();
                    }else {
                        $(".getCode+span").remove();
                        $(".getCode").after("<span class='error'>"+result.info+"</span>");
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
      $(".false").on("click",function(){
      	layer.open({content:'今天已签到'});
      })
    //签到
    $(".true").on("click",function(){
    	var url = '../mobile/index.php?r=active/index/sign';
    	$.post(url,function (data){
    		var result = eval('('+data+')');
    		if(result.code == 20){
    			$(".true").hidden();
    			$(".false").show();
    			$(".tqian").show();
    		}else if(result.code == 4){
    			getTel();
    			istrueimg =1;
    		}else if(result.code == 21){
    			 layer.open({content:result.info});
    		}
    	})
    });
    //签到记录
    $(".img").on("click",function(){
    	var url = '../mobile/index.php?r=active/index/signlog';
    	$.post(url,function (data){
    		var result = eval('('+data+')');
    		if(result.code == 0){
    			var arr = [];
    			$(".ago").show();
    			$("main,header,footer").hide();
    			for(var j = 0; j<result.account_log.length; j++){
 					var time = parseInt(result.account_log[j].change_time) + 28800 ;
    				var local = new Date(parseInt(time) * 1000).toLocaleString();
    				var localtime = local.split("/")[2].split(" ")[0];
    				var localmonth = local.split("/")[1];
    				var dates = new Date();
					var month = dates.getMonth() +1;
					if(month == localmonth){
						arr.push(localtime);
					}
    			}
    			cal(arr);
				var count = arr.length;
				var length = result.account_log.length;
				//当月签到天数
				$(".texts ul:eq(1) li:eq(1)").text(count);
				//当月签到积分
				$(".texts ul:eq(0) li:eq(1)").text(count*20 );
				//累计积分
				$(".texts ul:eq(2) li:eq(1)").text(length*20 );
    		}else if(result.code == 4){
    			layer.open({content:result.info});
    		}
    	})
    });
    //关闭签到记录页
    $(".ago").on("click",function(){
    	$(".ago").hide();
    	$("main,header,footer").show();
    })
    //关闭签到提示
    $(".tqian").on("click",function(){
    	$(".tqian").hide();
    })
    //关闭领取提示
    $(".tling").on("click",function(){
    	$(".tling").hide();
    })
    //关闭验证框
    $(".cansle").on("click",function(){
    	$(".dialog-getTel").hide();
    	istrueimg = 0;
    })
	var cal = function(arr){
    	var dates = new Date();
		var year = dates.getFullYear();
		var month = dates.getMonth()+1;
		var date = dates.getDate();
		var day = dates.getDay();
		var weeks = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
		var b = year % 4;
		var c = year % 100;
		var d = year % 400;
		//判断当月天数
		if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10|| month == 12 ){
			var days = 31;
		}else if(month == 2){
			if((b == 0 && c != 0) || d == 0 ){
				days = 29;
			}else{
				days = 28;
			}
		}else{
			days = 30;
		}
		//判断当月第一天是周几
		var firstDay =  + "0123456".split("")[new Date(Date.UTC(year, month-1, 1)).getDay()];
		//开始打印
		for(var i=0; i< firstDay; i++){
			$(".cla1 td:eq("+i+")").text(" ");
		}
		for(var j=1, i= firstDay; j<=7-firstDay; j++,i++) {
			$(".cla1 td:eq("+i+")").text(j);
		}
		var a =2;
		var b = 0; 
		var times = 0;
		for(var i=8-firstDay; i<=days;i++){
			for(var j=0; j<arr.length;j++){
				if(arr[j] == i){
					$(".cla"+a+" td:eq("+b+")").css({
						"background": "url(../mobile/statics/img/newapp/dui.jpg) no-repeat",
						"background-size":"contain",
						"background-position":"50%"
					});
				}
			}
			$(".cla"+a+" td:eq("+b+")").text(i);
			if(b==6){
				b=0;
				a++;
			}else{
				b++;
			}
		} 
	}
    $(".active_rule").on("click",function(){
        $(".active_rule_con").show();
    });
    $(".active_rule_close").on("click",function(){
        $(".active_rule_con").hide();
    });
});