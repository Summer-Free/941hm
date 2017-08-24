$(function() {

	//切换
	function tabNav(el) {

		$(el).on("click",function() {
			var $this = $(this),
				index = $this.index();

				$this.addClass("active")
				.siblings().removeClass("active")
				.parents(".head").siblings().children().eq(index).fadeIn()
				.siblings().fadeOut();
		});

	};	

	//调用
	tabNav(".section-1 .tab-nav li");
	
});

window.onload= function() {
	$(".common-temp .content").height($(".common-temp .wrap-video").height() + 46);
	$(".section-1 .tab-nav li").on("click",function() {
		var index = $(this).index(),
			childHeight = $(".common-temp .content").children().eq(index).height();
			$(".common-temp .content").height(childHeight + 46);
	});
};