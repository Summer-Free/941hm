$(function() {

	//头部图片轮播
	$(".section-1").slideFade();	

	//给元素赋值高度(定位造成的高度塌陷)
	$(".section-2 .wrap").getHeight();
	$(".section-2 .wrap").height($(".section-2 .wrap").height() - 30);

	//假分页,点击 第二页时，对元素进行排序
	$(".tab-nav>a").on("click",function() {
		var $this = $(this),
			index = $this.index();

			if(index === 1) {
				var li_arr = $(".section-2 .wrap ul").eq(index).find("li");
				 
				li_arr.sort(function (a, b) {
					var sort1 = $(a).data('sort') * 1;
					var sort2 = $(b).data('sort') * 1;

					return sort1 - sort2;
				});
				 
				li_arr.detach().appendTo($(".section-2 .wrap ul").eq(index));
			};

			$this.addClass("active").siblings().removeClass("active").parent().siblings().children().eq(index).fadeIn().siblings().fadeOut();
	});

});
