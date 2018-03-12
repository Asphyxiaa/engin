var a = 0;
var timeid = setInterval(function() {
	$(".el"+a).animate({'height':'300px'},3000,'easeOutElastic');
	a++;
	if(a==10){
		clearInterval(timeid);
		return; 
	}
}, 400);		

for(var i=0;i<10;i++){
	if (i % 4 == 0) {
        $(".elk").append('<div class="row" style="margin:0px;padding:0px;"></div>');
    }
	$(".row:last-child").append('<div class="el'+i+' mo "><div class="title">管理<span>方案:12</span></div><div class="title-con"><div class="con"><div class="con1">奥斯卡会计师的回复可见氨基酸的很快就按时间括号的话</div><div class="con2">奥斯卡</div></div><div class="con" style="color:rgb(172,172,172)";><div class="con1" style="font-size: 0.7rem;">奥斯卡会计师的回复可见氨基酸的很快就按时间括号的话</div><div class="date">2017-08-05</div></div></div>');
}

 
function run(){
	$('.guanli').show();
	$(".guanli").animate({top:"10%"},300);
	$('.elk').hide();
	$('.zuzhi').animate({top: '-50%'},300,function() {
    $('.zuzhi').hide();
    });
}
function or(){
	$('.zuzhi').show();
	$(".zuzhi").animate({top:"10%"},300);
	$('.elk').hide();
	$('.guanli').animate({top: '-50%'},300,function() {
    $('.guanli').hide();
    });
}

function guanrun() {
    $('.guanli').animate({top: '-50%'},300,function() {
    $('.guanli').hide();
    });
    $('.elk').show();
}
function guanor() {
    $('.zuzhi').animate({top: '-50%'},300,function() {
    $('.zuzhi').hide();
    });
    $('.elk').show();
}





