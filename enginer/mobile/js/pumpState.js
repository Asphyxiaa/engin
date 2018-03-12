
var minH=$(document).height();
$(".con").css("min-height",minH-170);


//头部
$.ajax({
	headers: {
		'Authorization': 'Bearer ' + token,
	},
	type: 'GET',
	dataType: "json",
	data:{
		ProjectId:11,
	},
	url: apiUrl + "/ProjectMonitor/GetProjectMonitorGateRealTime",
	success: function(data) {
		var con = data.result;
		var open=data.result.openedGateResults;
		var close=data.result.closedGateResults;
//		console.log(open);
		var newtdatass=new Date(con.tm).Format("yyyy-MM-dd hh:mm:ss");
		$(".time").html(newtdatass);
		$(".openhole span").html(con.openedGateCount);
		$(".closehole span").html(con.closedGateCount);
		
		//开
		for (var i=0;i<open.length;i++) {
//			console.log(newtdatass);
			var fuhao='';
			fuhao=open[i].proMonitorGateInfo.gateName.replace(/#/,"-");
			$("#tab1 .list").append(`
				<div class="weui-cell">
					<div class="weui-cell__bd">
					    <p accident="${open[i].accident}" controlMethod="${open[i].controlMethod}" gateName="${fuhao}" malfunction="${open[i].malfunction}" 
					    gStatus="${open[i].gStatus}" gatePosition=${open[i].gatePosition} >
					    	${open[i].proMonitorGateInfo.gateName}
					    </p>
					</div>
					<div class="weui-cell__ft">打开</div>
				</div>`);
			$("#tab1 .list .weui-cell p").eq(i).click(function(){
				accident=$(this).attr("accident");
				controlMethod=$(this).attr("controlMethod");
				gateName=$(this).attr("gateName");
				malfunction=$(this).attr("malfunction");
				gStatus=$(this).attr("gStatus");
				gatePosition=$(this).attr("gatePosition");
				self.location="open-details.html?accident="+accident+"&controlMethod="+controlMethod+"&malfunction="+malfunction+"&gStatus="+gStatus+"&gatePosition="+gatePosition+"&gateName="+gateName+"&nowtime="+newtdatass+"   ";
			})	
		}
		//关
		for (let j=0;j<close.length;j++) {
			$("#tab2 .list").append(`				
				<div class="weui-cell">
					<div class="weui-cell__bd">
					    <p>${close[j].proMonitorGateInfo.gateName}</p>
					</div>
					<div class="weui-cell__ft">关闭</div>
				</div>`);			
		}
	}
});





Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}