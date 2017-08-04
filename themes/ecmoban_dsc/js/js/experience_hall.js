$(function() {

	//头部图片轮播
	$(".section-1").slideFade();	

	//给元素赋值高度(定位造成的高度塌陷)
	$(".section-2 .wrap").getHeight();
	$(".section-2 .wrap").height($(".section-2 .wrap").height() - 30);

	
	
});
