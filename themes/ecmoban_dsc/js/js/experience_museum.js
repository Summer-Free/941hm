$(function() {

	//头部轮播
	$(".slide-banner").slideFade();	

	//切换效果(假分页)
	$(".tab-nav>a").on("click",function() {
		var $this = $(this),
			index = $this.index();

			$this.addClass("active").siblings().removeClass("active").parent().siblings().children().eq(index).fadeIn().siblings().fadeOut();
	});
});