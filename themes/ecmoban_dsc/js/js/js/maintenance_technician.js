$(function() {

	//头部图片轮播
	$(".slide-banner").slideFade();	

	//自定义下拉框调用
	$('.JS-filter-box').MimicSelectionBox();

	//维修、保养切换
	$(".section-1 .tab-nav span").on("click",function() {
		var $this = $(this),
			$ul = $(".section-2 ul"),
			index = $this.index(),
			this_ul = $ul.eq(index);

			$this.addClass("active").siblings().removeClass("active");
			this_ul.fadeIn(500).siblings().fadeOut(100);
	});

});