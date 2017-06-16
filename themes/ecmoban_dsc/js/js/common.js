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
				if(index < li.length ) {
					index++;
					ul.animate({"margin-top": - li_h*index + "px"},ops.duration)
				}else {
					ul.animate({"margin-top": - li_h*(li.length + 1) + "px"},ops.duration,function() {
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

				//移除盒子的绑定时间，否则定时器会继续运行
				$this.off("mouseenter mouseleave");

				//淡出盒子
				$this.fadeOut(300);

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
				if(!pic_li.is(":animated")) {action();}

			});

			//点击右按钮
			right_btn.on("click",function() {

				//判断是否有动画正在运行，如果无，则执行动画函数，此举是为了防止用户恶意点击
				if(!pic_li.is(":animated")) {

					(index>0)? index--:index=len-1;

					pic_li.eq(index).fadeIn(ops.duration).siblings().fadeOut(ops.duration);

					point_li.eq(index).addClass("active").siblings().removeClass("active");		

				}		

			});

			//鼠标悬浮在小圆点上时，进行切换
			point_li.on("mouseenter",function() {

				//判断是否有动画正在运行，如果无，则执行动画函数，此举是为了防止用户恶意点击
				if(!pic_li.is("animated")) {

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
			duration: 500,
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



})(jQuery,window,document);