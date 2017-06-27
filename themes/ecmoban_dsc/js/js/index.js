$(function() {

	//top bar
	$(".slide-top-bar").slideTop();

	//banner slide
	$(".slide-banner").slideFade();

	//每日秒杀,图片滚动
	$(".slide-mrms").slideScroll({
		speed: 1500
	});

	//新品上市,图片滚动
	$(".New-arrival .wrap-slide").slideScroll({
		speed: 2000
	});

	//限时优惠,图片滚动
	$(".Personal-tailor .wrap-slide ").slideScroll({
		speed: 2000
	});


});