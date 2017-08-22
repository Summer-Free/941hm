$(function() {

	//头部图片轮播
	$(".section-slide").slideFade();	

	//假分页
	$(".tab-nav>a").on("click",function() {
		var $this = $(this),
			index = $this.index();

			if(index === 1) {
				var li_arr = $(".section-2 .content ul").eq(index).find("li");
				 
				li_arr.sort(function (a, b) {
					var sort1 = $(a).data('sort') * 1;
					var sort2 = $(b).data('sort') * 1;

					return sort1 - sort2;
				});
				 
				li_arr.detach().appendTo($(".section-2 .content ul").eq(index));
			};

			$this.addClass("active").siblings().removeClass("active").parent().siblings().children().eq(index).fadeIn().siblings().fadeOut();
	});

});