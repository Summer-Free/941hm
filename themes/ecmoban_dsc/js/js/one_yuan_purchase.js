$(function() {

	//头部图片轮播
	$(".slide-banner").slideFade();	

	//开启定时器
	$(".count-down .time").countDown({
		startTime: "", //开始时间
		endTime: "2018/6/13 00:00:00",   //结束时间
		tian: false,   //是否显示天
		miao: true,    //是否显示秒
		tianZ: "",     //天后面需要加的字段
		shiZ: " : ",   //时后面需要加的字段
		fenZ: " : ",   //分后面需要加的字段
		miaoZ: "",     //秒后面需要加的字段
	});


});