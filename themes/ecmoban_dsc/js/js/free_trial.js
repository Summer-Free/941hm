$(function() {

	//头部图片轮播
	$(".slide-banner").slideFade();

	//休闲餐桌/复古沙发/文艺书桌 切换
	function tabjs(ulClass,contentClass) {

		var $tab_ul = $(ulClass),
			$tab_content = $(contentClass),
			$tab_li = $tab_ul.find("li"),
			$tab_item = $tab_content.find(".item");

		$tab_li.on("click",function() {

			var $this = $(this),
				index = $this.index();

				$this.addClass("active").siblings().removeClass("active")
				.parents("h2").siblings().children().eq(index).
				fadeIn(1000).siblings().fadeOut(1000);

		});

	};

	//调用  2017-07-25注释
	// tabjs(".js-tab",".js-content");

});