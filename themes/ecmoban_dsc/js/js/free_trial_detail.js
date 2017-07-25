$(function() {

	//点击免费申请按钮,弹出申请表单
	$(".section-1 .status .bg-linear").dialogShow({
		dialog: ".dialog-form",
		closeBtn: ".dialog-form .close"
	});

	//如果元素存在，则开启倒计时
	if($(".section-1 .product-detail .time span")) {

		$(".section-1 .product-detail .time span").countDown({
			startTime: "", //开始时间
			endTime: "2018/6/13 00:00:00",   //结束时间
			tian: true,   //是否显示天
			miao: false,    //是否显示秒
			tianZ: "天",     //是否加上天字
			shiZ: "时",      //是否加上时字
			fenZ: "分",      //是否加上分字
			miaoZ: "",     //是否加上秒字
		});
	};

});

//当页面中所有元素，包括图片加载完成后
window.onload = function() {

	//给元素赋值高度,(由于定位造成的高度塌陷)
	$(".section-2>.right").getHeight();

	//锚点平滑滚动调用
	$('.section-2 .tab-nav li a').anchorScroll();

	//锚点效果调用
	$(".section-2 .right .tab-nav").navFixed();

};