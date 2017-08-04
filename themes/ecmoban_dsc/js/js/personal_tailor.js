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

	$('#send').on("click",function(e) {

		var series_arr = [], //系列的选中值
			say = $("#say"), //文本域的值
			area = $("#area"), //面积
			name_val = $("#name").val(),  //用户名
			phone_val = $("#phone").val(), //手机号
			province_val = $(".province option:selected").data("title"), //省
			city_val = $(".city option:selected").data("title"), //市
			district_val = $(".district option:selected").data("title"), //县(区)
			error = '<p class="color-ff0000"><span class="error">*</span><i>为必填项,请填写完整</i></p>',
			div = $('.group-6'),
			reg = /^[\u4e00-\u9fa5]{2,4}$/i;

			//阻止默认事件
			e.preventDefault();	
			//将所有选中的值，放入数组
			$("input[name='chose[]']:checked").each(function() {
				series_arr.push($(this).val());
			});

			//每次点击提交之后,删除错误提示信息(否则点一次就会添加一条)
			div.find("p").remove();

			if(!series_arr.length)
			{
				//必填项填写不完整，抛出错误信息
				div.prepend(error);
				$(".group-6 i").text("请选择您要定制的家具系列");
				return false;
			}
			else if(!reg.test(name_val))
			{
				//必填项填写不完整，抛出错误信息
				div.prepend(error);
				$(".group-6 i").text("请输入姓名(2-4个汉字)");
				return false;
			}
			else if(!(/^1[34578]\d{9}$/.test(phone_val)))
			{
				//必填项填写不完整，抛出错误信息
				div.prepend(error);
				$(".group-6 i").text("手机号码有误，请重填");
				return false;
			}
			else if(!province_val) {
				div.prepend(error);
				$(".group-6 i").text("请选择省");
				return false;
			}
			else if(!city_val) {
				div.prepend(error);
				$(".group-6 i").text("请选择市");
				return false;
			}
			else if(!district_val) {
				div.prepend(error);
				$(".group-6 i").text("请选择县（区）");
				return false;
			};

			var params = $("#form_info").serialize();

            $.ajax( {  
                type : "POST",  
                url : "personal_tailor.php",  
                data : params,  
                success : function() {  
                    $(".wrap-content").load("themes/ecmoban_dsc/personal_tailor_ok.html");  
                }  
            }); 

	});

});