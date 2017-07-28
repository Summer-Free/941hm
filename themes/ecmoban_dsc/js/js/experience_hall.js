$(function() {

	//头部图片轮播
	$(".section-1").slideFade();	

	//点击筛选条件，当前条件变色
	$(".filter-box .condition li").on("click",function() {

		var $this = $(this);

		$this.addClass("active").siblings().removeClass("active");

	});

	//调用函数，选择省/市，自动给出下一级区域列表
	$("#address").linkMenu("#province","#city");



});