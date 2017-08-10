;(function($,window,document,undefined) {

	//向上滚动方法
	$.fn.slideTop = function(options) {
		var base = {
			duration: 300, //动画持续时间
			speed: 3000 //自动滚动间隔
		};
		var ops = $.extend(base,options);
		var $this = $(this),	
			ul = $this.find(".JS-slide-top"),
			li = ul.find("li"),
			close = $this.find(".close"),
			li_h = ul.find("li").outerHeight(true),
			index = 0,
			timer = "",
			action = function() {
				var m_l = parseInt(ul.css("margin-top"));
				if(index < li.length-1 ) {
					index++;
					ul.animate({"margin-top": - li_h*index + "px"},ops.duration)
				}else {
					ul.animate({"margin-top": - li_h*(li.length) + "px"},ops.duration,function() {
						ul.css("margin-top",0)
					});
					index = 0;
				};

			};

			//克隆元素，制造无缝滚动
			ul.append(li.clone());

			//设置自动播放
			timer = setInterval(action,ops.speed);

			$this.on({

				//鼠标悬浮，停止滚动
				mouseenter:function() {
					clearInterval(timer);
				},
				//鼠标移开，继续自动滚动
				mouseleave:function() {
					clearInterval(timer);
					timer = setInterval(action,ops.speed);
				}

			});

			//点击关闭
			close.on("click",function() {

				//移除盒子的绑定时事件，否则定时器会继续运行
				$this.off("mouseenter mouseleave");

				//淡出盒子
				$this.slideUp(300);

			});
	};


	//图片轮播,fadeIn/fadeOut
	$.fn.slideFade = function(options) {

		var base = {
			duration:500,
			speed: 4000,
			autoPlay: true
		};
		var ops = $.extend(base,options);
		var $this = $(this),
			left_btn = $this.find(".left-btn"),
			right_btn = $this.find(".right-btn"),
			ul = $this.find(".content"),
			pic_li = $this.find(".content > li"),
			point_li = $this.find(".point li"),
			len = pic_li.length,
			timer = "",
			index = 0,
			action = function() {

				(index<len-1)? index++:index=0;

				pic_li.eq(index).fadeIn(ops.duration).siblings().fadeOut(ops.duration);

				point_li.eq(index).addClass("active").siblings().removeClass("active");

			};

			//如果autoPlay=true,自动播放
			if(ops.autoPlay) {

				timer = setInterval(action,ops.speed);

			};

			//点击左按钮
			left_btn.on("click",function() {

				//判断是否有动画正在运行，如果无，则执行动画函数，此举是为了防止用户恶意点击
				if(!pic_li.is(":animated")) {

					(index>0)? index--:index=len-1;

					pic_li.eq(index).fadeIn(ops.duration).siblings().fadeOut(ops.duration);

					point_li.eq(index).addClass("active").siblings().removeClass("active");		

				}

			});

			//点击右按钮
			right_btn.on("click",function() {

				//判断是否有动画正在运行，如果无，则执行动画函数，此举是为了防止用户恶意点击
				if(!pic_li.is(":animated")) {action();}

			});

			//鼠标悬浮在小圆点上时，进行切换
			point_li.on("mouseenter",function() {

				//判断是否有动画正在运行，如果无，则执行动画函数，此举是为了防止用户恶意点击
				if(!pic_li.is(":animated")) {

					var $this_li = $(this),
						index_li = $this_li.index();

						pic_li.eq(index_li).fadeIn(ops.duration).siblings().fadeOut(ops.duration);

						point_li.eq(index_li).addClass("active").siblings().removeClass("active");	

				}

			});

			//鼠标悬停在父盒子上时停止自动播放,离开时重新自动播放
			$this.on({

				mouseenter:function() {

					clearInterval(timer);

				},
				mouseleave:function() {

					clearInterval(timer);

					timer = setInterval(action,ops.speed);

				}

			});

	};


	//图片滚动,left/right
	$.fn.slideScroll = function(options) {

		var init = {
			duration: 300,
			speed: 3000,
			autoPlay: true
		};

		var ops = $.extend(init,options);

		var $this = $(this),
			$ul = $this.find(".content"),
			$li = $ul.find("li"),
			$li_width = $li.outerWidth(true),
			$l_btn = $this.find(".left-btn"),
			$r_btn = $this.find(".right-btn"),
			len = $li.length,
			index = 0,
			timer = "",
			action = function() {

				if(index < len - 1) {

					index++;

					$ul.animate({left:-$li_width*index + "px"},ops.duration);

				}else {

					index = 0;

					$ul.animate({left:-$li_width*len + "px"},ops.duration,function() {

						$ul.css("left",index);

					});

				}

			};

			//克隆元素
			$ul.append($li.clone());

			//判断是否自动播放
			if(ops.autoPlay) {
				
				timer = setInterval(action,ops.speed);

			};

			//鼠标悬停在父盒子上时停止自动播放,离开时重新自动播放
			$this.on({

				mouseenter:function() {

					clearInterval(timer);

				},
				mouseleave:function() {

					clearInterval(timer);

					timer = setInterval(action,ops.speed);

				}

			});

			//点击左按钮
			$l_btn.on("click",function() {

				if(!$ul.is(":animated")) {
					
					action();

				}

			});	

			//点击右按钮
			$r_btn.on("click",function() {

				if(!$ul.is(":animated")) {

					if(index > 0) {

						index--;

						$ul.animate({left:-$li_width*index + "px"},ops.duration);

					}else {

						index = len - 1;

						$ul.css("left",-$li_width*len + "px");

						$ul.animate({left:-$li_width*index + "px"},ops.duration);

					};

				};

			});	
	};


	//模仿select
	$.fn.MimicSelectionBox = function() {

		var $this = $(this),
			$select = $this.children("div"),
			$submenu = $select.siblings("ul")
			$li = $submenu.find("li");

		//鼠标悬浮元素，弹出下拉菜单，离开时，收起
		$this.on({

			mouseenter:function() {

				if($submenu.css("display") == "none") {

					$select.addClass("down").siblings().fadeIn();

				};

			},
			mouseleave:function() {

				if($submenu.css("display") == "block") {

					$select.removeClass("down").siblings().fadeOut();

				};

			}

		});

		//点击下拉菜单中的值，改变select框的值
		$li.on("click",function() {

			var $this = $(this),
				value = $this.text();

				$select.text(value);

				$submenu.fadeOut().siblings().removeClass("down");			

		});

	};

	//省市联动菜单 函数
	$.fn.linkMenu = function(select1,select2) {

		var $this = $(this),
			$select1 = $(this).find(select1),
		    $select2 = $(this).find(select2),
			data = [
						{
							province: "北京市",
							city: ["东城区","西城区","崇文区","宣武区","朝阳区","丰台区","石景山区","海淀区","门头沟区","房山区","通州区","顺义区","昌平区","大兴区","平谷区","怀柔区","密云县","延庆县"]
						},
						{
							province: "天津市",
							city: ["和平区","河东区","河西区","南开区","河北区","红桥区","塘沽区","汉沽区","大港区","东丽区","西青区","津南区","北辰区","武清区","宝坻区","宁河县","静海县","蓟县"]
						},
						{
							province: "河北省",
							city: ["石家庄市","唐山市","秦皇岛市","邯郸市","邢台市","保定市","张家口市","承德市","沧州市","廊坊市","衡水市"]
						},
						{
							province: "山西省",
							city: ["太原市","大同市","阳泉市","长治市","晋城市","朔州市","晋中市","运城市","忻州市","临汾市","吕梁市"]
						},
						{
							province: "内蒙古自治区",
							city: ["呼和浩特市","包头市","乌海市","赤峰市","通辽市","鄂尔多斯市","呼伦贝尔市","巴彦淖尔市","乌兰察布市","兴安盟","锡林郭勒盟","阿拉善盟"]
						},
						{
							province: "辽宁省",
							city: ["沈阳市","大连市","鞍山市","抚顺市","本溪市","丹东市","锦州市","营口市","阜新市","辽阳市","盘锦市","铁岭市","朝阳市","葫芦岛市"]
						},
						{
							province: "吉林省",
							city: ["长春市","吉林市","四平市","辽源市","通化市","白山市","松原市","白城市","延边朝鲜族自治州"]
						},
						{
							province: "黑龙江省",
							city: ["哈尔滨市","齐齐哈尔市","鸡西市","鹤岗市","双鸭山市","大庆市","伊春市","佳木斯市","七台河市","牡丹江市","黑河市","绥化市","大兴安岭地区"]
						},
						{
							province: "江苏省",
							city: ["南京市","无锡市","徐州市","常州市","苏州市","南通市","连云港市","淮安市","盐城市","扬州市","镇江市","泰州市","宿迁市"]
						},
						{
							province: "浙江省",
							city: ["杭州市","宁波市","温州市","嘉兴市","湖州市","绍兴市","金华市","衢州市","舟山市","台州市","丽水市"]
						},
						{
							province: "安徽省",
							city: ["合肥市","芜湖市","蚌埠市","淮南市","马鞍山市","淮北市","铜陵市","安庆市","黄山市","滁州市","阜阳市","宿州市","六安市","亳州市","池州市","宣城市"]
						},
						{
							province: "福建省",
							city: ["福州市","厦门市","莆田市","三明市","泉州市","漳州市","南平市","龙岩市","宁德市"]
						},
						{
							province: "江西省",
							city: ["南昌市","景德镇市","萍乡市","九江市","新余市","鹰潭市","赣州市","吉安市","宜春市","抚州市","上饶市"]
						},
						{
							province: "山东省",
							city: ["济南市","青岛市","淄博市","枣庄市","东营市","烟台市","潍坊市","济宁市","泰安市","威海市","日照市","莱芜市","临沂市","德州市","聊城市","滨州市","菏泽市"]
						},
						{
							province: "河南省",
							city: ["郑州市","开封市","洛阳市","平顶山市","安阳市","鹤壁市","新乡市","焦作市","濮阳市","许昌市","漯河市","三门峡市","南阳市","商丘市","信阳市","周口市","驻马店市"]
						},
						{
							province: "湖北省",
							city: ["武汉市","黄石市","十堰市","宜昌市","襄阳市","鄂州市","荆门市","孝感市","荆州市","黄冈市","咸宁市","随州市","恩施土家族苗族自治州"]
						},
						{
							province: "湖南省",
							city: ["长沙市","株洲市","湘潭市","衡阳市","邵阳市","岳阳市","常德市","张家界市","益阳市","郴州市","永州市","怀化市","娄底市","湘西土家族苗族自治州"]
						},
						{
							province: "广东省",
							city: ["广州市","韶关市","深圳市","珠海市","汕头市","佛山市","江门市","湛江市","茂名市","肇庆市","惠州市","梅州市","汕尾市","河源市","阳江市","清远市","东莞市","中山市","潮州市","揭阳市","云浮市"]
						},
						{
							province: "广西壮族自治区",
							city: ["南宁市","柳州市","桂林市","梧州市","北海市","防城港市","钦州市","贵港市","玉林市","百色市","贺州市","河池市","来宾市","崇左市"]
						},
						{
							province: "海南省",
							city: ["海口市","三亚市"]
						},
						{
							province: "四川省",
							city: ["成都市","自贡市","攀枝花市","泸州市","德阳市","绵阳市","广元市","遂宁市","内江市","乐山市","南充市","眉山市","宜宾市","广安市","达州市","雅安市","巴中市","资阳市","阿坝藏族羌族自治州","甘孜藏族自治州","凉山彝族自治州"]
						},
						{
							province: "贵州省",
							city: ["贵阳市","六盘水市","遵义市","安顺市","毕节市","铜仁市","黔西南布依族苗族自治州","黔东南苗族侗族自治州","黔南布依族苗族自治州"]
						},
						{
							province: "云南省",
							city: ["昆明市","曲靖市","玉溪市","保山市","昭通市","丽江市","普洱市","临沧市","楚雄彝族自治州","红河哈尼族彝族自治州","文山壮族苗族自治州","西双版纳傣族自治州","大理白族自治州","德宏傣族景颇族自治州","怒江傈僳族自治州","迪庆藏族自治州"]
						},
						{
							province: "西藏自治区",
							city: ["拉萨市","昌都地区","山南地区","日喀则地区","那曲地区","阿里地区","林芝地区"]
						},
						{
							province: "陕西省",
							city: ["西安市","铜川市","宝鸡市","咸阳市","渭南市","延安市","汉中市","榆林市","安康市","商洛市"]
						},
						{
							province: "甘肃省",
							city: ["兰州市","嘉峪关市","金昌市","白银市","天水市","武威市","张掖市","平凉市","酒泉市","庆阳市","定西市","陇南市","临夏回族自治州","甘南藏族自治州"]
						},
						{
							province: "青海省",
							city: ["西宁市","海东地区","海北藏族自治州","黄南藏族自治州","海南藏族自治州","果洛藏族自治州","玉树藏族自治州","海西蒙古族藏族自治州"]
						},
						{
							province: "宁夏回族自治区",
							city: ["银川市","石嘴山市","吴忠市","固原市","中卫市"]
						},
						{
							province: "新疆维吾尔自治区",
							city: ["乌鲁木齐市","克拉玛依市","吐鲁番地区","哈密地区","昌吉回族自治州","博尔塔拉蒙古自治州","巴音郭楞蒙古自治州","阿克苏地区","克孜勒苏柯尔克孜自治州","喀什地区","和田地区","伊犁哈萨克自治州","塔城地区","阿勒泰地区"]
						},
						{
							province: "上海市",
							city: [ "黄浦区","虹口区","杨浦区","闸北区","普陀区","长宁区","静安区","徐汇区","浦东新区","闵行区","奉贤区","金山区","松江区","青浦区","嘉定区","宝山区","崇明县"]
						},
						{
							province: "重庆市",
							city: ["万州区","涪陵区","渝中区","大渡口区","江北区","沙坪坝区","九龙坡区","南岸区","渝北区","永川区","璧山区","大足区","北碚区","綦江区","江津区","合川区","巴南区","黔江区","长寿区","南川区","铜梁区","潼南区","荣昌区"]
						}

					];

			//将省市从JSON中取出，展示到前端元素		
			$.each(data,function(idx,pro) {

				$select1.append("<option data-value='"+ idx + "'>" + pro.province + "</option>")
				
			});


			$select1.on("change",function() {

				var $this = $(this),
					index = $this.find("option:selected").data("value"); //选中值的对应value属性值
					
					if(index !== "null") {

						var cityArry = data[index].city;

						//每次选中一个值后，都将下一级的select清空
						$select2.html("<option data-value='null'>请选择市</option>");		

						//将对应的市区级数据，展示到前端
						$.each(cityArry,function(idx,city) {

							$select2.append("<option>" + city + "</option>")

						});

					}else {

						//如果选择的是无效省份，将下一级的select清空
						$select2.html("<option data-value='null'>请选择市</option>");	

					};

			});

	};

	//锚点导航相关效果
	$.fn.navFixed = function() {

		var $this = $(this),
			$li = $this.children(),
			$div = $this.siblings().children(),
			this_top = $this.offset().top,
			div_id = "";

		$(window).scroll(function() {

			var window_top = $(window).scrollTop();

			//当页面滚动到锚点导航时,让导航固定在顶部
			(window_top > this_top)?$this.css("position","fixed"):$this.css("position","absolute");

			//当页面滚动的距离大于元素与页面顶部的距离时，获取当前元素的 id
			$.each($div,function(index,div) {

				var div_top = $(div).offset().top;

				if(window_top >= div_top - 80) {

					div_id = $($div[index]).attr("id");

				};

			});

			//找到锚点的href属性等于 上面获取的 id的元素，并添加类名
			$.each($li,function(index,li) {

				var href = $(li).find("a").attr("href").split("#");

				if(href[href.length - 1] == div_id) {

					$($li[index]).addClass("current").siblings().removeClass("current");

				};

			});

		});
	};

	//锚点平滑滚动
	$.fn.anchorScroll = function() {

		var $this = $(this);

		$this.on("click",function() {

		    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

		      var $target = $(this.hash),
		      	  $this_a = $(this),
		      	  $li = $this_a.parent(),
		      	  $col_a = $this;

		      $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');

		        if ($target.length) {

			        var targetOffset = $target.offset().top - 80; //锚点定位在元素上方80PX处

			        $('html,body').animate({scrollTop: targetOffset},500,function() {

			        	if($this_a.index() < $col_a.length) {

							$li.addClass("current").siblings().removeClass("current");

			        	};

			        });

			        return false;

		        };

		    };
		});
	};

	//给元素赋值高度,(由于定位造成的高度塌陷)
	$.fn.getHeight = function() {

		var	$this = $(this),
			$div = $this.children(".content").height() + 30;

		$this.height($div); //30 是距离底部的高度
	};

	//弹窗弹出和点击关闭按钮关闭
	$.fn.dialogShow = function(options) {

		var base = {
						dialog: "",    //弹窗选择器
						closeBtn: ""   //关闭按钮选择器
					},
			ops = $.extend(base,options),
			$dialog = $(ops.dialog),
			$close = $(ops.closeBtn),
			$this = $(this);

		$dialog.show();

		$close.on("click",function() {
			$dialog.hide();
		});

	};

	//倒计时函数
	$.fn.countDown = function(options) {

		var base = {
						startTime: "", //开始时间 不设置则从现在开始
						endTime: "",   //结束时间
						tian: false,   //是否显示天
						miao: true,    //是否显示秒
						tianZ: "",     //天后面需要加的字段
						shiZ: "",      //时后面需要加的字段
						fenZ: "",      //分后面需要加的字段
						miaoZ: "",     //秒后面需要加的字段
					},
			ops = $.extend(base,options),
			$this = $(this),
			timer = "",
			action = function() {

				var date = new Date(), //获取当前时间戳
					cur_date = new Date(ops.startTime).getTime() || date.getTime(),
					E_date = new Date(ops.endTime).getTime(),
					result_time = E_date - cur_date, //获取结束时间和当前时间的剩余时间
					d = "",
					h = "",
					m = "",
					s = "";

					h = Math.floor(result_time/(1000*60*60));
					m = Math.floor(result_time/(1000*60)) - h*60;
					s = Math.floor(result_time/1000)- h*60*60 - m*60;

					//当时间是个位数时，在前面添加 0，（为了美观）
					h = h < 10 ? "0"+h:h; 
					m = m < 10 ? "0"+m:m;
					s = s < 10 ? "0"+s:s;

					if(ops.tian) {

						d = Math.floor(result_time/(1000*60*60*24));
						h = Math.floor(result_time/(1000*60*60)) - d*24;

						if(ops.miao) {

							$this.text(d + ops.tianZ + h + ops.shiZ + m + ops.fenZ + s + ops.miaoZ);
						}else {
							$this.text(d + ops.tianZ + h + ops.shiZ + m + ops.fenZ);
						}

					};

					if(ops.miao) {

						if(ops.tian) {

							d = Math.floor(result_time/(1000*60*60*24));
							h = Math.floor(result_time/(1000*60*60)) - d*24;

							$this.text(d + ops.tianZ + h + ops.shiZ + m + ops.fenZ + s + ops.miaoZ);
						}else {
							$this.text(h + ops.shiZ + m + ops.fenZ + s + ops.miaoZ);
						}

					};

			};

			//开启定时器，
			timer = setInterval(action,1000);

	};

})(jQuery,window,document);

$(function() {

	//当前页面高亮显示
	function navHighlight() {

		var navItem = $("#header .main-nav>li>a"),
			curHref = location.href;

			navItem.each(function() {

				var item_href = $(this).attr("href");

				if(curHref.indexOf(item_href) !== -1) {
					$(this).parent().addClass("active")
					.siblings().removeClass("active");
				}
				else if(curHref == "http://www.941hm.com/" || "http://localhost/941hm/") {
					navItem.find("[href='index.php']").parent()
						.addClass("active")
						.siblings()
						.removeClass("active");
				}
				else {
					$(this).parent().removeClass("active");
				};

			});

	};

	//调用
	navHighlight();

	//添加了 类名为 showMsg 的元素将会触发弹窗
	$(".showMsg").on("click",function(e) {

		e.preventDefault();

		$("#showMsg").remove();

		var dialog = "<div id='showMsg' style='z-index: 9999;position: fixed;top: 50%;left: 50%;margin: -33.5px 0 0 -161px;width: 322px;height: 67px;line-height: 67px;text-align: center;background-color: #fff;'>我们正在全力开发中,敬请期待!</div>",
			timer = "",
			action = function() {
				$("#showMsg").animate({ opacity: 1},1500);
				$("#showMsg").animate({ opacity: 0},500,function() {
					$(this).remove();
					clearInterval(timer);
				});
			};

		$(document.body).append(dialog);
		
		action();

	});

});