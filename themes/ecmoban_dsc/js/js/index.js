$(function() {

	//top bar
	$(".slide-top-bar").slideTop();

	//banner slide
	$(".slide-banner").slideFade();

	//每日秒杀,图片滚动
	$(".slide-mrms").slideScroll();

	//品牌街,图片滚动
	$(".section-4 .slide-ppj").slideScroll({speed: 5000,duration: 1500});
});