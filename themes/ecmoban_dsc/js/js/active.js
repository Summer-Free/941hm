$(function() {

	//点击领取优惠券
	$(".coupon-list li").on("click",function() {
		var $this = $(this);
		var id = $(this).find(".btm").attr("value");
		if({$smarty.session.user_id}<=0){
			alert ({$smarty.session.user_id});
		}
		$.post('coupons.php?act=coupons_receive',{'cou_id':id},function(data){
			if(data.status=='ok'){
				$this.find(".btm").text("领取成功");
			}
		},'json')
		
	});
});