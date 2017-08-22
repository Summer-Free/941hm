$(function() {

	//top bar 滚动
	$(".slide-top-bar").slideTop();

	//side bar 滚动
	$(".sidebar").slideTop();

	//每日秒杀
	$(".main-body").slideScroll();

});

window.onload = function() {
	//banner slide
	$("#header .btm .JS-slide").slideFade();
};