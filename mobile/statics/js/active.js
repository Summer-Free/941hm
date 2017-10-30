$(function() {

	//点击牌面，弹出弹窗
	// $(".sec-2 li div").on("click",function() {
	// 	var $dialog = $(".dialog-getTel");

	// 	$dialog.show();
	// });

	//点击关闭按钮，关闭弹窗
	$(".dialog .close").on("click",function() {
		var $this = $(this);

		$this.parents(".dialog").hide();
	});

	//点击获取验证码
	// $(".dialog-getTel .getCode button").on("click",function(e) {
	// 	var time = 60,
	// 		timer,
	// 		$this = $(this),
	// 		action = function() {
	// 			time--;
	// 			if(time > 0) {
	// 				$this.text(time + "秒后可重新获取");
	// 			}else {
	// 				$this.text("获取验证码").prop("disabled",false);
	// 				clearInterval(timer);
	// 			}
	// 		};
	// 	e.preventDefault();
	// 	$this.prop("disabled",true);
	// 	timer = setInterval(action,1000);
	// });

	// $(".dialog-getTel a").on("click",function() {
	// 	var tel = $("#tel").val(),
	// 		code = $("#code").val(),
	// 		$dialog = $(".dialog-getTel");

	// 		if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(tel))) {
	// 			$("#tel+span").remove();
	// 			$("#tel").after("<span class='error'>您的号码有误</span>");
	// 		}else {
	// 			$("#tel+span").remove();
	// 		};

	// 		if(code == "") {
	// 			$(".getCode+span").remove();
	// 			$(".getCode").after("<span class='error'>您的验证码有误</span>");
	// 			$(".dialog-getTel a").css("margin-top",".5rem");
	// 		}else {
	// 			$(".getCode+span").remove();
	// 			$(".dialog-getTel a").css("margin-top","2rem");
	// 		};

	// 		$dialog.hide();
	// });






	//点击牌面，弹出弹窗
	$(".sec-2 li div").on("click",function() {
		var $dialog = $(".dialog-Winning");

		$dialog.show();
	});

	$(".dialog-Winning a").on("click",function() {
		var $dialog = $(".dialog-Winning");

		$dialog.hide();
	});
});