var lastLiHtml=$('.slider-img li:last').html();//返回最后一个li的html值
var firstLiHtml=$('.slider-img li:first').html();//返回第一个li的html值

$("<li>").html(lastLiHtml).prependTo(".slider-img");//$("<li>");创建一个li标签;prependTo将调用此方法的对象插入到参数对象的第一个；克隆最后一个li到ul最前面
$("<li>").html(firstLiHtml).appendTo(".slider-img");//prependTo将调用此方法的对象插入到参数对象的最后一个；克隆第一个li到ul最后面
var width=$('.slider').width();//表示得到slider节点的宽度
$('.slider-img').css({left:-width+"px"});



$('.slider').mouseenter(function(){
	$(".slider-left,.slider-right").show();//让两个节点显示
});
$('.slider').mouseleave(function(){
	$(".slider-left,.slider-right").hide();//让两个节点隐藏
});

$(".slider-btn i").click(function(){
	var pos=$(this).index();//$(this)表示驱动click事件的节点对象;$(this)表示点击的i节点;index()可以返回调用此方法的节点在兄弟节点中的位置
	var width=$('.slider').width();//表示得到slider节点的宽度

	pos++;//等价pos=pos+1;//往后挪一位
	$('.slider-img').animate({left:-pos*width+"px"},200);//ul做动画效果

	$(this).addClass("current").siblings(".current").removeClass("current");//当前对象添加样式current，然后找到他的兄弟节点选择器是.current的将他的current样式移除
});

$('.slider-right').click(function(){
	var oldPos=$(".slider-btn .current").index();//得到节点有选择器.current的位置
	var lastPos=$(".slider-btn i:last").index();//$(".slider-btn i").last().index();//最后一个i的位置
	//console.log(oldPos)
	var width=$('.slider').width();//表示得到slider节点的宽度

	var pos=oldPos+1;
	pos++;//往后挪一位

	var btnPos;//表示按钮所应该在位置
	if(pos==lastPos+2){//零界点最后一个移动到第一个时
		btnPos=0;
		$('.slider-img').animate({left:-pos*width+"px"},200,function(){
			$('.slider-img').css({left:-width+"px"});
		});//ul做动画效果
	}
	else{
		btnPos=pos-1;
		$('.slider-img').animate({left:-pos*width+"px"},200);//ul做动画效果
	}
	
	$(".slider-btn i").eq(btnPos).addClass("current").siblings(".current").removeClass("current");//对应位置i节点添加样式current，然后找到他的兄弟节点选择器是.current的将他的current样式移除
});

$('.slider-left').click(function(){
	var oldPos=$(".slider-btn .current").index();//得到节点有选择器.current的位置
	var lastPos=$(".slider-btn i:last").index();//$(".slider-btn i").last().index();//最后一个i的位置
	//console.log(oldPos)
	var width=$('.slider').width();//表示得到slider节点的宽度

	var pos=oldPos-1;
	pos++;//往后挪一位

	var btnPos;//表示按钮所应该在位置
	if(pos==0){//零界点第一个移动到最后一个时
		btnPos=lastPos;
		$('.slider-img').animate({left:-pos*width+"px"},200,function(){
			$('.slider-img').css({left:-(lastPos+1)*width+"px"});
		});//ul做动画效果
	}
	else{
		btnPos=pos-1
		$('.slider-img').animate({left:-pos*width+"px"},200);//ul做动画效果
	}

	
	$(".slider-btn i").eq(pos-1).addClass("current").siblings(".current").removeClass("current");//对应位置i节点添加样式current，然后找到他的兄弟节点选择器是.current的将他的current样式移除
});