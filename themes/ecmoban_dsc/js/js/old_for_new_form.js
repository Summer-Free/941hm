$(function() {

	//其他后面的input字段长度限制
	function iptLen(el) {
		$(el).on("blur",function() {
			var val = $(this).val();

			if(val.length > 10) {
				$(this).val(val.slice(0,10));
				alert("最多只能输入10个字符");
			}
		});
	};

	//两处调用
	iptLen("#other-val");
	iptLen("#other-val-1");

	//定义提交函数
	function submitForm() {

		var series = "",  //材质
			objective = ""; //目的

		//获取材质选项的值,如果其他后面的input有值，则取input的输入值,无值则取其他	
		$("input[name='material']").on("change",function() {

			series = $(this).val();

			if($(this).attr("id") == "other") {
				
				if($.trim($("#other-val").val())) {
					series = $.trim($("#other-val").val());
				};
			};

		});

		//获取出售旧物目的的值,如果其他后面的input有值，则取input的输入值,无值则取其他
		$("input[name='objective']").on("change",function() {

			objective = $(this).val();

			if($(this).attr("id") == "other-1") {
				
				if($.trim($("#other-val-1").val())) {
					objective = $.trim($("#other-val-1").val());
				};
			};
		});
		
		$('.description button').on("click",function(e){
			var name_val = $("#name").val(),  //用户名
				phone_val = $("#phone").val(), //手机号
				sprice = $("#sprice").val(),
				province_val = $(".province option:selected").data("title"), //省
				city_val = $(".city option:selected").data("title"), //市
				district_val = $(".district option:selected").data("title"), //县(区)
				error = '<p class="color-ff0000" style="text-align:center;"><span class="error">*</span><i>为必填项,请填写完整</i></p>',
				div = $('.group-7'),
				reg = /^[\u4e00-\u9fa5]{2,4}$/i;

				//阻止默认事件
				e.preventDefault();	

				//每次点击提交之后,删除错误提示信息(否则点一次就会添加一条)
				div.find("p").remove();

				if(!series)
				{
					//必填项填写不完整，抛出错误信息
					div.prepend(error);
					div.find("i").text("请选择您旧物的木材材质");
					return false;
				}
				else if(!(/(^[1-9]\d*$)/.test(sprice))) {
					//必填项填写不完整，抛出错误信息
					div.prepend(error);
					div.find("i").text("请正确填写您的理想估价（大于0的正整数）");
					return false;
				}
				else if(!objective) {
					//必填项填写不完整，抛出错误信息
					div.prepend(error);
					div.find("i").text("请选择您出售旧物的目的");
					return false;
				}
				else if(!reg.test(name_val))
				{
					//必填项填写不完整，抛出错误信息
					div.prepend(error);
					div.find("i").text("请输入姓名(2-4个汉字)");
					return false;
				}
				else if(!(/^1[34578]\d{9}$/.test(phone_val)))
				{
					//必填项填写不完整，抛出错误信息
					div.prepend(error);
					div.find("i").text("手机号码有误，请重填");
					return false;
				}
				else if(!province_val) {
					div.prepend(error);
					div.find("i").text("请选择省");
					return false;
				}
				else if(!city_val) {
					div.prepend(error);
					div.find("i").text("请选择市");
					return false;
				}
				else if(!district_val) {
					div.prepend(error);
					div.find("i").text("请选择县（区）");
					return false;
				};
	            $.ajax({  
	                type : "GET",  
	                url : "old_for_new_form_check.php?username="+name_val+"&phone="+phone_val+"&province="+province_val+"&city="+city_val+"&district="+district_val+"&series="+series+"&sprice="+sprice+"&objective="+objective,
	                dataType:"TEXT",  
	                success : function(msg) {  
	                     if(msg ==1){
                     		$("#content").load("themes/ecmoban_dsc/awaiting_audit.dwt");
							$(".form-status ul li").eq(1).addClass("active").siblings().removeClass("active");
	                     }
	                }
	            }); 

		});
	};

	//调用
	submitForm();

});