$(function() {

	//头部图片轮播
	$(".slide-banner").slideFade();	

	//开启定时器
	$(".count-down .time").countDown({
		startTime: "", //开始时间
		endTime: "2018/6/13 00:00:00",   //结束时间
		tian: false,   //是否显示天
		miao: true,    //是否显示秒
		tianZ: "",     //是否加上天字
		shiZ: "",      //是否加上时字
		fenZ: "",      //是否加上分字
		miaoZ: "",     //是否加上秒字
	});


});