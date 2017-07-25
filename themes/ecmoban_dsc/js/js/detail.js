$(function() {

	//放大镜的小图片，点击后加一个边框,
	function addActive() {

		var $img = $(".section-1 .small-pic li img");

		$img.on("click",function() {

			var $this = $(this);

			$this.addClass("active").parent().siblings().children("img").removeClass("active");

		});

	};

	//调用
	addActive(); 

	//配送地址的仓库
	function chooseWarehouse(selector) {

		var $this = $(selector),
			$show_val = $this.children("span"),
			$slide_div = $this.children("div"),
			$click_me = $slide_div.find("span");

		//鼠标悬浮，给下拉菜单效果
		$this.on({

			mouseenter:function() {

				if(!$slide_div.is(":animated")) {

					$slide_div.slideDown();

				}

			},
			mouseleave:function() {

				if(!$slide_div.is(":animated")) {

					$slide_div.slideUp();

				};

			}

		});

		//点击下拉菜单的选项时，改变主要显示框的值
		$click_me.on("click",function() {

			var $this = $(this),
				val = $this.text(); //获取点击的菜单项的值

			//将获得的值赋给主要显示框	
			$show_val.text(val);	

			//选中值后，自动关闭下拉菜单(使前端的交互更加友好)
			$slide_div.hide();

		});


	};

	//调用
	chooseWarehouse(".section-1 .warehouse");

	//数量增加和减少
	function operation(selector) {

		var $this = $(selector),
			$material = $(".section-1 .material"),
			$material_span = $material.find("span"),
			$ipt = $this.children(".result"),
			$span = $this.children("span"),
			$reduce = $this.find(".reduce"),
			$plus = $this.find(".plus"),
			$del = $(".section-1 .product-detail del"),
			$ins = $(".section-1 .product-detail ins"),
			del_val = $del.text(),
			ins_val = $ins.text(),
			total = parseInt($(".section-1 .total").text());

		//定义转化字符串函数
		function replaceStr(str) {

			return parseInt(str.replace("¥",""));

		};

		$span.on("click",function() {

			var $that = $(this),
				$result = $ipt.val();

			//点击后，判断点击的是加还是减
			if($that.data("control") == "reduce") {

				if($result > 1) {$result--}

			}else {

				if($result < total) {$result++;}

			};

			//点击相应按钮后改变输入框的值
			$ipt.val($result);			

			//统计市场价
			$del.html("&yen;" + replaceStr(del_val)*parseInt($result) + ".00");

			//统计商城价
			$ins.html("&yen;" + replaceStr(ins_val)*parseInt($result) + ".00");

		});

		//给输入框绑定键盘输入事件和失去焦点事件
		$ipt.on({

			keyup:function() {

				var $this = $(this),
					this_val = $this.val();

				if($this.val().indexOf("0") == 0) { //当输入的第一个数字是 0，将其替换为 1

					$this.val("1");

				}else {

					$this.val(this_val.replace(/\D|^0/g,''));	//当输入的不是 >0 的数字或其他字符时,将其替换为空
				}

			},
			blur:function() {

				var $this = $(this),
					val = $this.val();

				if(val > total) { //如果输入的数字大于库存，将其值改变为库存最大数量(防止客户恶意输入)

					$this.val(total);

				}else if(val == null || val == "") { //如果输入的是 空，则将值重置为 1

					$this.val("1");

				};

				//统计市场价
				$del.html("&yen;" + replaceStr(del_val)*replaceStr($ipt.val()) + ".00");

				//统计商城价
				$ins.html("&yen;" + replaceStr(ins_val)*replaceStr($ipt.val()) + ".00");

			}			

		});

		//选择材质，更改价格
		$material_span.on("click",function() {

			var $this = $(this);

			$this.addClass("active").siblings().removeClass("active");

		});

	};

	//调用
	operation(".section-1 .JS-count");

	//锚点平滑滚动调用
	$('.section-2 .tab-nav li a').anchorScroll();

	//给元素赋值高度,(由于定位造成的高度塌陷)
	$(".section-2 .right").getHeight();

	//锚点效果调用
	$(".section-2 .right .tab-nav").navFixed();

});