$(function() {

	//top bar
	$(".slide-top-bar").slideTop();

	//每日秒杀,图片滚动
	$(".slide-mrms").slideScroll({
		speed: 1500
	});

	//新品上市(上),图片滚动
	$(".New-arrival .wrap-slide.top").slideScroll({
		speed: 2000
	});

	//新品上市(下),图片滚动
	$(".New-arrival .wrap-slide.btm").slideScroll({
		speed: 2000
	});

	//限时优惠(上),图片滚动
	$(".Personal-tailor .wrap-slide.top").slideScroll({
		speed: 2000
	});

	//限时优惠(下),,图片滚动
	$(".Personal-tailor .wrap-slide.btm").slideScroll({
		speed: 2000
	});

});

window.onload = function() {
	//banner slide
	$(".slide-banner").slideFade();
};