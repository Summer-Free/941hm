$(function() {

	//头部图片轮播
	$(".slide-banner").slideFade();	

	//倒计时函数
	function countDown(selector,endTime) {

		var $time = $(selector), //获取要改变时间的元素
			E_date = new Date(endTime), //获取结束时间的时间戳
			timer = "",
			action = function() {

				var date = new Date(), //获取当前时间戳
					result_time = E_date.getTime() - date.getTime(), //获取结束时间和当前时间的剩余时间
					h = "",
					m = "",
					s = "";

					h = Math.floor(result_time/(1000*60*60));
					m = Math.floor(result_time/(1000*60)) - h*60;
					s = Math.floor(result_time/1000)- h*60*60 - m*60;

					//当时间是个位数时，在前面添加 0，（为了美观）
					h = h < 10 ? "0"+h:h; 
					m = m < 10 ? "0"+m:m;
					s = s < 10 ? "0"+s:s;

					//将获取的值展示到前端
					$time.text(h + " : " + m + " : " + s);

			};

			//开启定时器，
			timer = setInterval(action,1000);

	};

	//调用
	countDown(".count-down .time","2018/6/13 00:00:00");

});