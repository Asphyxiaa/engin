
var minH=window.innerHeight;
$(".con").css("min-height",minH-130);	

//头部水位
$.ajax({
	headers: {
		'Authorization': 'Bearer ' + token,
	},
	type: 'GET',
	dataType: "json",
	data:{
		ProjectId:11,
	},
	url: apiUrl + "/ProjectMonitor/GetProjectMonitorWaterRealTime",
	success: function(data) {
		var con = data.result;
//		console.log(con);
		var newtdatass=new Date(con.tm).Format("yyyy-MM-dd hh:mm:ss");
		$(".time").html(newtdatass);
		$(".openhole span").html(con.inWaterResult.z);
		$(".closehole span").html(con.outWaterResult.z);		
	}
});
//=================今日========================
//获取当前时间
var date=new Date;
var year=date.getFullYear(); 
var month=date.getMonth()+1;
month =(month<10 ? "0"+month:month); 
var day=date.getDate();
var hours=date.getHours();
var min=date.getMinutes();
min =(min<10 ? "0"+min:min);
var sec=date.getSeconds();
sec =(sec<10 ? "0"+sec:sec);
var nowtime=(year+"-"+month+"-"+day+" "+hours+":"+min+":"+sec);

var mydate = (year+"-"+month+"-"+day+" "+"08"+":"+"00"+":"+"00");

var Start='';
var End='';

if(hours>8){
	var nextday=date.getDate()+1;
	var nexttime=(year+"-"+month+"-"+nextday+" "+"08"+":"+"00"+":"+"00");
	Start=mydate;
	End=nexttime;
//	console.log(Start,End);
	island(Start,End);
}else{
	var lastday=date.getDate()-1;
	var lasttime=(year+"-"+month+"-"+lastday+" "+"08"+":"+"00"+":"+"00");
	Start=lasttime;
	End=mydate;
//	console.log(Start,End);
	island(Start,End);
}

function island(Start,End){
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		type: 'GET',
		dataType: "json",
		data:{
			StartTime:Start,
			EndTime:End,
			ProjectId:11,
		},
		url: apiUrl + "/ProjectMonitor/GetProjectMonitorWaterData",
		success: function(data) {
			var inland = data.result.inWaterResults;
			var outside= data.result.outWaterResults
//			console.log(data);
			//内
			var timeinland=[];
			var zinland=[];
			//外
			var timeoutside=[];
			var zoutside=[];
			//内
			for (let i=0;i<inland.length;i++) {
				var tms=new Date(inland[i].tm).Format("MM-dd hh:mm");
				timeinland.push(tms);
			}
			for (let j=0;j<inland.length;j++) {
				zinland.push(inland[j].z);
			}
			//外
			for (let i=0;i<outside.length;i++) {
				var tms=new Date(outside[i].tm).Format("MM-dd hh:mm");
				timeoutside.push(tms);
			}
			for (let j=0;j<outside.length;j++) {
				zoutside.push(outside[j].z);
			}
			ecinland(timeinland,zinland);
			ecoutside(timeoutside,zoutside)
		}
	});
}


/*======内河=========*/
function ecinland(timeinland, zinland) {
	var myChart = echarts.init(document.getElementById('echarts-inland'));
	
	var option = {
	    tooltip: {
	        trigger: 'axis'
	    },  
	    xAxis:  {       
	        type: 'category',
	        boundaryGap: false,
	        splitLine:{
	            show:true,
	            lineStyle:{
	                type:'dotted'
	            }
	        },
	        name:"小时",
		    nameLocation:"end",
			data:timeinland,
	    },
	    yAxis: {
	        type: 'value',
	        name:"水位（m）",
		    nameLocation:"end",
	        axisLabel: {
	            formatter: '{value}',
	            textStyle:{
	                color:'black',
	                fontSize:15
	            }
	        },
//	        min:0,
	    },
	    series: [
	        {
	            name:'节制闸',
	            type:'line',
	            symbol:'circle',
	            label:{
	                normal:{
	                    show:false,
	                    formatter: '{c}',
	                    fontSize:15
	                }
	            },
	            symbolSize:5,//点的大小
				data:zinland,
	        },
	    ]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}

/*======外江=========*/
function ecoutside(timeoutside, zoutside) {
	var myChart = echarts.init(document.getElementById('echarts-outside'));
	
	var option = {
	    tooltip: {
	        trigger: 'axis'
	    },  
	    xAxis:  {       
	        type: 'category',
	        boundaryGap: false,
	        splitLine:{
	            show:true,
	            lineStyle:{
	                type:'dotted'
	            }
	        },
	        name:"小时",
		    nameLocation:"end",
			data:timeoutside
	    },
	    yAxis: {
	        type: 'value',
	        name:"水位（m）",
		    nameLocation:"end",
	        axisLabel: {
	            formatter: '{value}',
	            textStyle:{
	                color:'black',
	                fontSize:15
	            }
	        },
	    },
	    series: [
	        {
	            name:'节制闸',
	            type:'line',
	            symbol:'circle',
	            label:{
	                normal:{
	                    show:false,
	                    formatter: '{c}%',
	                    fontSize:15
	                }
	            },
	            symbolSize:5,//点的大小
				data:zoutside
	        },
	    ]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}

/*=================近3日===============================================*/
var threeStart='';
var threeEnd='';

var threeday=date.getDate()-3;
threeStart=(year+"-"+month+"-"+threeday+" "+hours+":"+min+":"+sec);
threeEnd=nowtime;
//console.log(threeStart,threeEnd);
threeisland(threeStart,threeEnd);

function threeisland(threeStart,threeEnd){
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		type: 'GET',
		dataType: "json",
		data:{
			StartTime:threeStart,
			EndTime:threeEnd,
			ProjectId:11,
		},
		url: apiUrl + "/ProjectMonitor/GetProjectMonitorWaterData",
		success: function(data) {
			var threeinland = data.result.inWaterResults;
			var threeoutside= data.result.outWaterResults
//			console.log(data);
			//内
			var threetimeinland=[];
			var threezinland=[];
			//外
			var threetimeoutside=[];
			var threezoutside=[];
			//内
			for (let i=0;i<threeinland.length;i++) {
				var tms=new Date(threeinland[i].tm).Format("MM-dd hh:mm");
				threetimeinland.push(tms);
			}
			for (let j=0;j<threeinland.length;j++) {
				threezinland.push(threeinland[j].z);
			}
			//外
			for (let i=0;i<threeoutside.length;i++) {
				var tms=new Date(threeoutside[i].tm).Format("MM-dd hh:mm");
				threetimeoutside.push(tms);
			}
			for (let j=0;j<threeoutside.length;j++) {
				threezoutside.push(threeoutside[j].z);
			}
			ecthreeinland(threetimeinland,threezinland);
			ecthreeoutside(threetimeoutside,threezoutside);
		}
	});
}

/*======内河=========*/
function ecthreeinland(threetimeinland,threezinland){
	var mainContainer = document.getElementById('threeinland');
    var resizeMainContainer = function () {
        mainContainer.style.width = window.innerWidth+'px';
        mainContainer.style.height = 300+'px';
    };
    //设置div容器高宽
    resizeMainContainer();
    // 初始化图表
    var myChart = echarts.init(mainContainer);
	var option = {
	    tooltip: {
	        trigger: 'axis'
	    },  	
	    xAxis:  {       
	        type: 'category',
	        boundaryGap: false,
	        splitLine:{
	            show:false,
	            lineStyle:{
	                type:'dotted'
	            }
	        },
	        name:"日期",
		    nameLocation:"end",
			data:threetimeinland
	    },
	    yAxis: {
	        type: 'value',
	        name:"水位（m）",
		    nameLocation:"end",
	        axisLabel: {
	            formatter: '{value}',
	            textStyle:{
	                color:'black',
	                fontSize:15
	            }
	        },
	    },
	    series: [
	        {
	            name:'节制闸',
	            type:'line',
	            symbol:'circle',
	            label:{
	                normal:{
	                    show:false,
	                    formatter: '{c}',
	                    fontSize:15
	                }
	            },
	            symbolSize:5,//点的大小
				data:threezinland
	        },
	    ]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}	


/*======外江=========*/
function ecthreeoutside(threetimeoutside,threezoutside){
	var mainContainer = document.getElementById('threeoutside');
    var resizeMainContainer = function () {
        mainContainer.style.width = window.innerWidth+'px';
        mainContainer.style.height = 300+'px';
    };
    //设置div容器高宽
    resizeMainContainer();
    // 初始化图表
    var myChart = echarts.init(mainContainer);
	var option = {
	    tooltip: {
	        trigger: 'axis'
	    },  	
	    xAxis:  {       
	        type: 'category',
	        boundaryGap: false,
	        splitLine:{
	            show:true,
	            lineStyle:{
	                type:'dotted'
	            }
	        },
	        name:"日期",
		    nameLocation:"end",
			data:threetimeoutside
	    },
	    yAxis: {
	        type: 'value',
	        name:"水位（m）",
		    nameLocation:"end",
	        axisLabel: {
	            formatter: '{value}',
	            textStyle:{
	                color:'black',
	                fontSize:15
	            }
	        },
	    },
	    series: [
	        {
	            name:'节制闸',
	            type:'line',
	            symbol:'circle',
	            label:{
	                normal:{
	                    show:false,
	                    formatter: '{c}',
	                    fontSize:15
	                }
	            },
	            symbolSize:5,//点的大小
				data:threezoutside
	        },
	    ]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}	


/*=================近7日==================================================*/
var sevenStart='';
var sevenEnd='';

var sevenday=date.getDate()-7;
sevenStart=(year+"-"+month+"-"+sevenday+" "+hours+":"+min+":"+sec);
sevenEnd=nowtime;
//console.log(sevenStart,sevenEnd);
sevenisland(sevenStart,sevenEnd);

function sevenisland(sevenStart,sevenEnd){
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		type: 'GET',
		dataType: "json",
		data:{
			StartTime:sevenStart,
			EndTime:sevenEnd,
			ProjectId:11,
		},
		url: apiUrl + "/ProjectMonitor/GetProjectMonitorWaterData",
		success: function(data) {
			var seveninland = data.result.inWaterResults;
			var sevenoutside= data.result.outWaterResults
//			console.log(data);
			//内
			var seventimeinland=[];
			var sevenzinland=[];
			//外
			var seventimeoutside=[];
			var sevenzoutside=[];
			//内
			for (let i=0;i<seveninland.length;i++) {
				var tms=new Date(seveninland[i].tm).Format("MM-dd hh:mm");
				seventimeinland.push(tms);
			}
			for (let j=0;j<seveninland.length;j++) {
				sevenzinland.push(seveninland[j].z);
			}
			//外
			for (let i=0;i<sevenoutside.length;i++) {
				var tms=new Date(sevenoutside[i].tm).Format("MM-dd hh:mm");
				seventimeoutside.push(tms);
			}
			for (let j=0;j<sevenoutside.length;j++) {
				sevenzoutside.push(sevenoutside[j].z);
			}
			ecseveninland(seventimeinland,sevenzinland);
			ecsevenoutside(seventimeoutside,sevenzoutside);
		}
	});
}

 /*======内河=========*/
function ecseveninland(seventimeinland,sevenzinland){
	var mainContainer = document.getElementById('seveninland');
    var resizeMainContainer = function () {
        mainContainer.style.width = window.innerWidth+'px';
        mainContainer.style.height = 300+'px';
    };
    //设置div容器高宽
    resizeMainContainer();
    // 初始化图表
    var myChart = echarts.init(mainContainer);
	var option = {
	    tooltip: {
	        trigger: 'axis'
	    },  	
	    xAxis:  {       
	        type: 'category',
	        boundaryGap: false,
	        splitLine:{
	            show:true,
	            lineStyle:{
	                type:'dotted'
	            }
	        },
	        name:"日期",
		    nameLocation:"end",
			data:seventimeinland,
	    },
	    yAxis: {
	        type: 'value',
	        name:"水位（m）",
		    nameLocation:"end",
	        axisLabel: {
	            formatter: '{value}',
	            textStyle:{
	                color:'black',
	                fontSize:15
	            }
	        },
	        min:0,
	    },
	    series: [
	        {
	            name:'节制闸',
	            type:'line',
	            symbol:'circle',
	            label:{
	                normal:{
	                    show:false,
	                    formatter: '{c}m',
	                    fontSize:15
	                }
	            },
	            symbolSize:5,//点的大小
				data:sevenzinland
	        },
	    ]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}	


/*======外江=========*/
function ecsevenoutside(seventimeoutside,sevenzoutside){
	var mainContainer = document.getElementById('sevenoutside');
    //用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
    var resizeMainContainer = function () {
        mainContainer.style.width = window.innerWidth+'px';
        mainContainer.style.height = 300+'px';
    };
    //设置div容器高宽
    resizeMainContainer();
    // 初始化图表
    var myChart = echarts.init(mainContainer);
	var option = {
	    tooltip: {
	        trigger: 'axis'
	    },  	
	    xAxis:  {       
	        type: 'category',
	        boundaryGap: false,
	        splitLine:{
	            show:true,
	            lineStyle:{
	                type:'dotted'
	            }
	        },
	        name:"日期",
		    nameLocation:"end",
			data:seventimeoutside,
	    },
	    yAxis: {
	        type: 'value',
	        name:"水位（m）",
		    nameLocation:"end",
	        axisLabel: {
	            formatter: '{value}',
	            textStyle:{
	                color:'black',
	                fontSize:15
	            }
	        },
	    },
	    series: [
	        {
	            name:'节制闸',
	            type:'line',
	            symbol:'circle',
	            label:{
	                normal:{
	                    show:false,
	                    formatter: '{c}',
	                    fontSize:15
	                }
	            },
	            symbolSize:5,//点的大小
				data:sevenzoutside,
	        },
	    ]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}	




/*=================外部引用======================*/
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