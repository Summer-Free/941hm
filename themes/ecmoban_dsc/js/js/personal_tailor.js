$(function() {
	$(".group-1>div input").on("click",function() {

		if($(this).attr("id") == "qwdz") {
			$("#qwdz2").prop('checked',true)
		};

		if($(this).attr("id") == "other") {
			$("#other2").prop('checked',true)
		};

	});

	$('.group-6 button').on("click",function(e) {
		var series_val = $('.group-1>div :radio:checked').val(), //系列的选中值
			type_val = $('.group-2>div :radio:checked').val(),   //类型的选中值
			name_val = $("#name").val(),  //用户名
			phone_val = $("#phone").val(), //手机号
			province_val = $(".province option:selected").data("title"), //省
			city_val = $(".city option:selected").data("title"), //市
			district_val = $(".district option:selected").data("title"), //县(区)
			error = '<p class="color-ff0000"><span class="error">*</span>为必填项,请填写完整</p>',
			div = $('.group-6');

			e.preventDefault();

			if(series_val && type_val && name_val && phone_val && province_val && city_val && district_val) {
				div.find("p").remove();
				alert("提交成功");

				$(".group-1>div input").prop("checked",false);
				$(".group-2>div input").prop("checked",false);
				$("#name").val("");
				$("#phone").val("");

				$(".wrap-content").load("themes/ecmoban_dsc/personal_tailor_ok.html");

			}else {
				div.find("p").remove();
				div.prepend(error);
			}

	});
});