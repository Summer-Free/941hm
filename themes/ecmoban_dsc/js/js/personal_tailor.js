$(function() {
	var uploadImg = 0,
		global_name,
		global_tel,
		global_url;
	$("#dialog-form .step-1 .submit-1").on("click",function(e) {
		var name = $("#name").val(),
			tel = $("#tel").val(),
			name_reg = /^[\u4e00-\u9fa5]{2,4}$/i,
			tel_reg = /^1[34578]\d{9}$/,
			$step_1 = $("#dialog-form .step-1"),
			$step_2 = $("#dialog-form .step-2");
			if(!name_reg.test(name)) {
				$("#name").prev().find(".error").remove();
				$("#name").prev().append("<span class='error'>请输入2-4个汉字！</span>");
			}else {
				$("#name").prev().find(".error").remove();
			};
			if(!tel_reg.test(tel)) {
				$("#tel").prev().find(".error").remove();
				$("#tel").prev().append("<span class='error'>手机号码有误</span>");
				return false;
			}else {
				$("#tel").prev().find(".error").remove();
			};
			global_name = name;
			global_tel = tel;
			e.preventDefault();
			$step_1.hide();
			$step_2.show();
	});

	$("#dialog-form .step-2 .submit-2").on("click",function(e) {
		var contact = $("#contact").val(),
			$step_2 = $("#dialog-form .step-2"),
			$step_3 = $("#dialog-form .step-3"),
			$form = $("#dialog-form form");
		if(uploadImg === 0) {
			$("#file_upload_1").prev().find(".error").remove();
			$("#file_upload_1").prev().append("<span class='error'>请上传图片</span>");
		}else {
			$("#file_upload_1").prev().find(".error").remove();
		};
		if(contact.length < 5) {
			$("#contact").prev().find(".error").remove();
			$("#contact").prev().append("<span class='error'>长度不能少于4个字符</span>");
			return false;
		}else {
			$("#contact").prev().find(".error").remove();
		};
		var conn = contact;
		e.preventDefault();
		$.ajax({
			type:"GET",
            url:"uploadify.php?name="+global_name+'&tel='+global_tel+'&contact='+conn+'&url='+global_url,
            dataType:"TEXT",
            success:function(data)
            {   
                //alert(data);
                $step_2.hide();
				$step_3.show();
            }
		})
		

		// $form.submit();

	});

	$("#dialog-form .close").on("click",function() {
		$("#dialog-form").hide();
		$(document.body).css("overflow","auto")
	});

	$(".sec-4 a").on("click",function(e) {
		e.preventDefault();
		$("#dialog-form").show();
		$(document.body).css("overflow","hidden")
	});

	//上传图片
    $("#file_upload_1").uploadify({
        "swf"      : "uploadify.swf",    //选择文件按钮
        "uploader" : "uploadify.php",    //处理文件上传的php文件
        "auto"     : true,
        "buttonText" : "",
        "buttonImage": "themes/ecmoban_dsc/iamges/20170517/qwdz-pic11.jpg",
        "width": "346",
        "height": "56",
        "fileObjName": "images",
        "fileSizeLimit": "5MB",
        "fileTypeExts": "*.jpg;*.jpeg;*.png;*.gif;",
        "fileTypeDesc": "选择图片",
        "method": "post",
        "removeCompleted": false,
        "requeueErrors": true,
        "uploadLimit": 1,
        'multi': false,
        "onUploadSuccess" : function(fileObj, data, response) { 
        	global_url = data;
        	$("#file_upload_1").height(0);      
        	uploadImg++;    
        },
        'onFallback':function(){  
            alert("您未安装FLASH控件，无法上传图片！请安装FLASH控件后再试。");  
        } 
    });

});