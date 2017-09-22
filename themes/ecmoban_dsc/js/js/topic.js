$(function() {
	(function(){
		var $li = $(".sec-1 li");

		$li.on("click",function() {
			var $this = $(this);
			$this.css("background","url(themes/ecmoban_dsc/iamges/20170517/topic-4.png) no-repeat").find("span").remove();
		});
	}())
});