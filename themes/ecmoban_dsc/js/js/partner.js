$(function() {
	
	//调用函数，选择省/市，自动给出下一级区域列表
	$("#form_info").linkMenu("#province","#city");

	//点击立即入驻，页面滚动到底部表单
	$("a[href=#form_info]").anchorScroll();
});