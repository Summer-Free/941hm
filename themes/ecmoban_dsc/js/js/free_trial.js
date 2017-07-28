$(function() {

	//头部图片轮播
	$(".slide-banner").slideFade();

	//进入页面后，跳到指定位置
	function anchorJump(id) {
		location.href = location.href + id;
	};

	//调用
	anchorJump("#jumpHere");

});