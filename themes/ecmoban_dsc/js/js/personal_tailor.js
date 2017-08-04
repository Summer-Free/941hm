$(function() {

	//限制文本域的字数为150
	$("#say").on("input propertychange",function() {
		var say = $(this).val(),
			tip = $("#say + span"),
			len = say.length;
		if(len > 150) {
			$(this).val(say.substring(0,150));
			len = 150;
			tip.text(len + "/150");
		}else {
			tip.text(len + "/150");
		}
	});

	$('.group-6 button').on("click",function(e) {

		var series_arr = [], //系列的选中值
			say = $("#say"), //文本域的值
			area = $("#area"), //面积
			name_val = $("#name").val(),  //用户名
			phone_val = $("#phone").val(), //手机号
			province_val = $(".province option:selected").data("title"), //省
			city_val = $(".city option:selected").data("title"), //市
			district_val = $(".district option:selected").data("title"), //县(区)
			error = '<p class="color-ff0000"><span class="error">*</span>为必填项,请填写完整</p>',
			div = $('.group-6');

			//阻止默认事件
			e.preventDefault();	

			//将所有选中的值，放入数组
			$("input[name='series']:checked").each(function() {
				series_arr.push($(this).val());
			});

			//判断必填项是否填写
			if(series_arr.length && name_val && phone_val && province_val && city_val && district_val) {
				
				//必填项填写完整后，删除错误提示信息
				div.find("p").remove();

				//提交成功后，加载提交成功页面
				$(".wrap-content").load("themes/ecmoban_dsc/personal_tailor_ok.dwt");

			}else {
				//每次点击提交之后,删除错误提示信息(否则点一次就会添加一条)
				div.find("p").remove();

				//必填项填写不完整，抛出错误信息
				div.prepend(error);
			}

	});

});