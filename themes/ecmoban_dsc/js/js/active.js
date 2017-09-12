$(function() {

	//点击领取优惠券
	$(".coupon-list li").on("click",function() {
		var $this = $(this);
		$this.find(".btm").text("领取成功");
	});
});