



//组织管理
$(".nav-organization").hover(function() {
	$(this).find(".pulldown").show();
//	$(".pulldown-nav").addClass("hover");
}, function() {
	$(this).find(".pulldown").hide();
//	$(".pulldown-nav").removeClass("hover");
});

//应急管理
$(".nav-emergency").hover(function() {
	$(this).find(".pulldown").show();
}, function() {
	$(this).find(".pulldown").hide();
});

//设备管理
$(".nav-equipment").hover(function() {
	$(this).find(".pulldown").show();
}, function() {
	$(this).find(".pulldown").hide();
});
//监控监测
$(".nav-monitor").hover(function() {
	$(this).find(".pulldown").show();
}, function() {
	$(this).find(".pulldown").hide();
});
//工程检查
$(".nav-check").hover(function() {
	$(this).find(".pulldown").show();
}, function() {
	$(this).find(".pulldown").hide();
});
//维修养护
$(".nav-service").hover(function() {
	$(this).find(".pulldown").show();
}, function() {
	$(this).find(".pulldown").hide();
});
//维修管理
$(".nav-maintain").hover(function() {
	$(this).find(".pulldown").show();
}, function() {
	$(this).find(".pulldown").hide();
});
//调度运行
$(".nav-scheduling").hover(function() {
	$(this).find(".pulldown").show();
}, function() {
	$(this).find(".pulldown").hide();
});




var a=$(document).width();
if (a<1200) {
	$(".service").css("left","460px");
	$(".maintain").css("left","600px");
}



//var li = $(".navs .li");
//for(var i = 0; i < li.length; i++) {
//	if(i <= 1) {
//		li.eq(i).click(function() {
//			console.log($(this));
//			$(this).addClass("red");
//			$(this).siblings().removeClass("red");
//			$(this).siblings().find(".pulldown-nav").removeClass("red");
//			$(this).siblings().find(".pulldown").find(".li").removeClass("red");
////			$("#ifname").attr("src", $(this).attr("data-href"));
//		})
//	} else {
//		li.eq(i).click(function() {
//			li.eq(0).removeClass("red");
//			li.eq(1).removeClass("red");
//			$(this).addClass("red");
//			$(this).parent().parent().parent().find(".pulldown-nav").addClass("red");
//			$(this).siblings().removeClass("red");
//			$(this).parent().parent().parent().siblings().find(".pulldown").find(".li").removeClass("red");
//			$(this).parent().parent().parent().siblings().find(".pulldown-nav").removeClass("red");
////			$("#ifname").attr("src", $(this).attr("data-href"));
//		})
//	}
//}
