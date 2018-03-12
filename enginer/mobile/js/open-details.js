var minH=window.innerHeight;
//alert(minH);
if (minH<600) {
	$(".mid").css("min-height",minH);
	$(".weui-cells").css("font-size","15px")
} else{
	$(".mid").css("min-height",minH-120);
}


$(".ic").click(function(){
	self.location="pumpState.html";
})

//获取地址链接
var gate='';

var control='';

var acc='';

var mal='';

var Status='';

var Position='';

var times='';

if (window.location.search=="") {
	alert("暂无数据")
} else{
	gate=GetQueryString("gateName");
	control=GetQueryString("controlMethod");
	acc=GetQueryString("accident");	
	mal=GetQueryString("malfunction");
	Status=GetQueryString("gStatus");
	Position=GetQueryString("gatePosition");
	times=GetQueryString("nowtime");
}
function GetQueryString(Id){
     var reg = new RegExp("(^|&)"+ Id +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  decodeURI(r[2]); return null;
}

//console.log(gate);	
var gateg='';
gateg=gate.replace(/-/,"#");
$(".zhaname").html(gateg);
$(".controlMethod").html(control);
$(".accident").html(acc);
$(".malfunction").html(mal);
if(Status == "Open"){
	$(".gStatus").html("开启");
}else{
	$(".gStatus").html("关闭");
}
$(".gatePosition").html(Position);
$(".time").html(times);

