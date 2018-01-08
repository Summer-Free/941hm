$(function() {
	
	//点击立即入驻,页面滚动到底部表单
	$("a[href=#form_info]").anchorScroll();
})
$(function() {
    //提交表单相关函数
    $("#submit").click(function(e) {
        var name=$("#name").val(),
            tel=$("#tel").val(),
            address=$("#address").val(),
            brand_name = $("#brand_name").val(),
            type = $("#type").val(),
            profile = $("#profile").val(),
            reg = /^[\u4e00-\u9fa5]{2,4}$/i;
            if (!reg.test(name))
            {
                $("#name").parent().find(".error").remove();
                $("#name").parent().append("<span class='error'>请输入2-4个汉字！</span>");
                return false;
            }else {
                $("#name").parent().find(".error").remove();
            };
            if (!(/^1[34578]\d{9}$/.test(tel)))
            {
                $("#tel").parent().find(".error").remove();
                $("#tel").parent().append("<span class='error'>手机号码有误</span>");
                return false;
            }else {
                $("#tel").parent().find(".error").remove();
            };
            if (!address)
            {
                $("#address").parent().find(".error").remove();
                $("#address").parent().append("<span class='error'>地址不能为空</span>");
                return false;
            }else {
                $("#address").parent().find(".error").remove();
            };
            if (!brand_name)
            {
                $("#brand_name").parent().find(".error").remove();
                $("#brand_name").parent().append("<span class='error'>品牌名不能为空</span>")
                return false;
            }else {
                $("#brand_name").parent().find(".error").remove();
            };
            if (!type)
            {
                $("#type").parent().find(".error").remove();
                $("#type").parent().append("<span class='error'>行业类型不能为空</span>")
                return false;
            }else {
                $("#type").parent().find(".error").remove();
            };
            if (!profile)
            {
                $("#profile").parent().find(".error").remove();
                $("#profile").parent().append("<span class='error'>品牌简介不能为空</span>")
                return false;
            }else {
                $("#profile").parent().find(".error").remove();
            };
            // $('#form_info').submit(function(){
            //     alert("表单提交成功!");
            // });
            $.ajax({
                url:"manufacturers_settled.php",
                type:"POST",
                dataType:"json",//传输格式
                data:{name: name,tel: tel,address: address,brand_name:brand_name,type:type,profile:profile},
                success: function(res) {//callback
                    if(res.id==1){
                        /*console.log(res.id);
                        console.log(res.info);*/
                        $("#tip_con_p").append(res.info);
                        $(".tip").show();
                    }
                    else if(res.id==2){
                        /*console.log(res.id);
                        console.log(res.info);*/
                        $("#tip_con_p").append(res.info);
                        $(".tip").show();
                    }
                }
            });
    });
});
/*function random(){
	Math.floor(Math.random()*6 + 2);
}
console.log(random);*/