$(function() {

	//头部图片轮播
	$(".slide-banner").slideFade();	

	//假分页
	$(".tab-nav>a").on("click",function(){
		var $this = $(this),
			index = $this.index();

			$this.addClass("active").siblings().removeClass("active").parent().siblings(".show-list").children().eq(index).fadeIn().siblings().fadeOut();
	});
});