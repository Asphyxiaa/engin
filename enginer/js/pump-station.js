var token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMSIsIm5hbWUiOiJsaWoiLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6IjVjNzNkMmNmLTZkZDUtNDg5MS1iMDBiLTA4NTJjZmQxNWVjNCIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3d3dy5hc3BuZXRib2lsZXJwbGF0ZS5jb20vaWRlbnRpdHkvY2xhaW1zL3RlbmFudElkIjoiMSIsImp0aSI6ImE3ZjQ4YTA5LTlhZDAtNDFiZS04YmU0LTc0ODM3MDVjZWIxZSIsImlhdCI6MTUwOTQ5ODg5NywibmJmIjoxNTA5NDk4ODk3LCJleHAiOjE1MDk1ODUyOTcsImlzcyI6IkJaSFBybyIsImF1ZCI6IkJaSFBybyJ9.9LO6tXTKb3YoJhV-L2GgIXJxBu8EMDFB9W6PHCLPtKo";


var cebian=$(document).height()-280;
$("#ztree").css("height",cebian);

//$('body').mLoading("show");
//$('body').mLoading("hide");

//pdf高
var iframeH=$(document).outerHeight();
$("#pdf").height(iframeH-200+"px");

window.onload=function(){
	$(".dispatching-principle").trigger("click");
}
  $(".btn-primary").bind('click', function (event) {
        $.cookie('Abp.AuthToken', null, { expires: 1, path: '/' });
        window.location.href = "http://120.76.241.72:8060";
    });
  var initUserName = function () {
      $.ajax({
          headers: {
              'Authorization': 'Bearer ' + token,
          },
          async: false,
          type: 'GET',
          dataType: "json",
          url: apiUrl + "/Session/GetCurrentLoginInformations",
          error: function (XMLHttpRequest, textStatus, errorThrown) {
              //错误访问所需执行的操作
              //alert("初始化用户名称失败");
          },
          success: function (data) {
              // //正确访问所需执行的操作
              
                  $('.dropdown-dark').contents().find("#username").text(data.result.user.surname + data.result.user.name);

          }
      });
  }
  var initUserPic = function () {
      $.ajax({
          headers: {
              'Authorization': 'Bearer ' + token,
          },
          async: false,
          type: 'GET',
          dataType: "json",
          url: apiUrl + "/Profile/GetProfilePicture",
          error: function (XMLHttpRequest, textStatus, errorThrown) {
              //错误访问所需执行的操作
              //alert("初始化用户头像失败");
          },
          success: function (data) {
              // //正确访问所需执行的操作

                  $('.dropdown-dark').contents().find("#userpic").attr('src', 'data:image/jpeg;base64,' + data.result.profilePicture);

          }
      });
  }
  initUserPic();
  initUserName();

//调度
$(".dispatching-principle").click(function(){
	$("#pdf").parent().removeClass("pdf");
	$("#pdf").attr("width","100%");
	$("#pdf").height(iframeH-200+"px");
	$(".run").hide();
	$(".state").hide();
	$(".generator").hide();
	$(this).parent().addClass("ztreelic");
	$(this).parent().siblings().removeClass("ztreelic");
})
//通知
$(".run-notice").click(function(){	
	$("#pdf").parent().addClass("pdf");
	$("#pdf").attr("width",0);
	$("#pdf").height(0);
	$(".run").show();
	$(".state").hide();
	$(".generator").hide();
	$(this).parent().addClass("ztreelic");
	$(this).parent().siblings().removeClass("ztreelic");
})
//指令
$(".operation-instruction").click(function(){
	$("#pdf").parent().addClass("pdf");
	$("#pdf").attr("width",0);
	$("#pdf").height(0);
	$(".run").hide();
	$(".state").show();
	$(".generator").hide();
	$(this).parent().addClass("ztreelic");
	$(this).parent().siblings().removeClass("ztreelic");
})
//机组
$(".generator-operation").click(function(){
	$("#pdf").parent().addClass("pdf");
	$("#pdf").attr("width",0);
	$("#pdf").height(0);
	$(".run").hide();
	$(".state").hide();
	$(".generator").show();
	$(this).parent().addClass("ztreelic");
	$(this).parent().siblings().removeClass("ztreelic");
})


//table分页---run
initTablerun();
function initTablerun(){
	 $('#table-run').bootstrapTable('destroy'); 
	 
	 $('#table-run').bootstrapTable({
		 ajax: function (params) {
			GetDatarun(params);
		},
		 striped: true,  //表格显示条纹  
		 pagination: true, //启动分页  
	     pageSize: 10,  //每页显示的记录数  
	     pageNumber:1,
	     sidePagination: "server",
		 columns: [
			{
		 		field: 'proName',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '调度文件名称',
		 		width:"5%",
		 	},
		 	{
		 		field: 'runOrderCode',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '运行指令编号',
		 		width:"5%",
		 	},
		 	{
		 		field: 'runContent',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '运行指令内容',
		 		width:"5%",
		 	},
		 	
		 	{
		 		field: 'runNotificationCode',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '运行通知编号',
		 		width:"5%",
		 	},
		 	{
		 		field: 'runNotificationTime',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '通知开机时间',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if (value == null || value == '') {
		 				return "-";
		 			} else{
		 				var runnotificationtime=new Date(value).Format("yyyy-MM-dd hh:mm:ss");
		 				return runnotificationtime;
		 			}		 			
		 		}
		 	},
		 	{
		 		field: 'flow',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '流量（m³/s）',
		 		width:"5%",
		 	},
		 	{
		 		field: 'dutyMonitorId',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '运行值班长',
		 		width:"5%",
		 	},
		 	{
		 		field: 'guardianshipPersonId',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '监护员',
		 		width:"5%",
		 	},
		 	{
		 		field: 'operatePersonId',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '操作员',
		 		width:"5%",
		 	},
		 	{
		 		field: 'isEarlyWarning',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '是否启示预警系统',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if(value == true){
		 				return "是";
		 			}else{
		 				return "否";
		 			}
		 		}
		 	},		 	
		 	{
		 		field: 'earlyWarningStartTime',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '预警开始时间',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if (value == null || value == '') {
		 				return "-";
		 			} else{
		 				var runnotificationtime=new Date(value).Format("yyyy-MM-dd hh:mm:ss");
		 				return runnotificationtime;
		 			}		 			
		 		}
		 	},
		 	{
		 		field: 'earlyWarningEndTime',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '预警结束时间',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if (value == null || value == '') {
		 				return "-";
		 			} else{
		 				var runnotificationtime=new Date(value).Format("yyyy-MM-dd hh:mm:ss");
		 				return runnotificationtime;
		 			}		 			
		 		}
		 	},
		 	{
		 		field: 'isPumpOpenNormal',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '开机是否正常',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if(value == true){
		 				return "是";
		 			}else{
		 				return "否";
		 			}
		 		}
		 	},
		 	{
		 		field: 'runOrderTime',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '开机指令时间',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if (value == null || value == '') {
		 				return "-";
		 			} else{
		 				var runnotificationtime=new Date(value).Format("yyyy-MM-dd hh:mm:ss");
		 				return runnotificationtime;
		 			}		 			
		 		}
		 	},
		 	{
		 		field: 'lowPowerSupplyTime',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '低压配电柜电源投入时间',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if (value == null || value == '') {
		 				return "-";
		 			} else{
		 				var runnotificationtime=new Date(value).Format("yyyy-MM-dd hh:mm:ss");
		 				return runnotificationtime;
		 			}		 			
		 		}
		 	},
		 	{
		 		field: 'capacitorPowerSupplyTime',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '合电容补偿柜电源时间',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if (value == null || value == '') {
		 				return "-";
		 			} else{
		 				var runnotificationtime=new Date(value).Format("yyyy-MM-dd hh:mm:ss");
		 				return runnotificationtime;
		 			}		 			
		 		}
		 	},		
		 	{
		 		field: 'capacitorCompensationSupplyTime',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '合软启动柜电源时间',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if (value == null || value == '') {
		 				return "-";
		 			} else{
		 				var runnotificationtime=new Date(value).Format("yyyy-MM-dd hh:mm:ss");
		 				return runnotificationtime;
		 			}		 			
		 		}
		 	},
		 	{
		 		field: 'carWorkingPositionTime',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '电动机开关小车摇至工作位置时间',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if (value == null || value == '') {
		 				return "-";
		 			} else{
		 				var runnotificationtime=new Date(value).Format("yyyy-MM-dd hh:mm:ss");
		 				return runnotificationtime;
		 			}		 			
		 		}
		 	},
		 	{
		 		field: 'hostComputerControlModeEnumId',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '上位机控制模式',
		 		width:"5%",
		 	},
		 	{
		 		field: 'bootTime',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '开机操作时间',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if (value == null || value == '') {
		 				return "-";
		 			} else{
		 				var runnotificationtime=new Date(value).Format("yyyy-MM-dd hh:mm:ss");
		 				return runnotificationtime;
		 			}		 			
		 		}
		 	},
		 	{
		 		field: 'pumpOpenAbnormalPersonId',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '开机问题情况处理人',
		 		width:"5%",
		 	},
		 	{
		 		field: 'pumpOpenProblemHandle',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '问题情况',
		 		width:"5%",
		 	},
		 	{
		 		field: 'pumpOpenStartTime',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '开机时间',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if (value == null || value == '') {
		 				return "-";
		 			} else{
		 				var runnotificationtime=new Date(value).Format("yyyy-MM-dd hh:mm:ss");
		 				return runnotificationtime;
		 			}		 			
		 		}
		 	},
		 	{
		 		field: 'isPumpStopNormal',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '关机是否正常',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if(value == true){
		 				return "是";
		 			}else{
		 				return "否";
		 			}
		 		}
		 	},
		 	{
		 		field: 'pumpOpenStopTime',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '关机时间',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if (value == null || value == '') {
		 				return "-";
		 			} else{
		 				var runnotificationtime=new Date(value).Format("yyyy-MM-dd hh:mm:ss");
		 				return runnotificationtime;
		 			}		 			
		 		}
		 	},
		 	{
		 		field: 'capacitorPowerSupplyTime',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '合电容补偿柜电源时间',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if (value == null || value == '') {
		 				return "-";
		 			} else{
		 				var runnotificationtime=new Date(value).Format("yyyy-MM-dd hh:mm:ss");
		 				return runnotificationtime;
		 			}		 			
		 		}
		 	},
   			{
		 		field: 'id',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '操作',
		 		width:"1%",
		 		formatter:function(value, row, index){
		 			var html="";
		 			html +="<a href='../dispatch-operation/pump-boot.html?Id="+value+"' target='_blank'>开机</a>"
		 			html +="<a href='../dispatch-operation/pump-shutdown.html?Id="+value+"' target='_blank'>关机</a>"
		 			return html;	
		 		}
		 	},
		 ],
	});
}

function GetDatarun(params,year){
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		url: apiUrl+ '/ProjectTask/GetPumpOperationInstructions',
		type: "GET",
		dataType: "json",
		data:{
			MaxResultCount:params.data.limit,
			SkipCount:params.data.offset,
			Year:2017,
		},
		success: function(data) {
			console.log(data);
			params.success({
				total: data.result.totalCount,
				rows: data.result.items
			});
		}
	});
}



//table分页---state
initTablestate();
function initTablestate(){
	 $('#table-state').bootstrapTable('destroy'); 
	 
	 $('#table-state').bootstrapTable({
//		 method: "get",
//		 url:"http://120.76.241.72:8092/api/services/app/ProjectInfo/GetProInfoSluiceSupplementInspect",
//		 ajax: function (params) {
//			GetData(params,"Daily");
//		},
		 striped: true,  //表格显示条纹  
		 pagination: true, //启动分页  
	     pageSize: 10,  //每页显示的记录数  
	     pageNumber:1,
	     sidePagination: "server",
		 columns: [
		 	{
		 		field: 'proName',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '工程名称',
		 		width:"5%",
		 	},
		 	{
		 		field: 'userName',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '操作指令编号',
		 		width:"5%",
		 	},
		 	{
		 		field: 'mobile',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '运行通知编号',
		 		width:"5%",
		 	},
		 	{
		 		field: 'mobile',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '开始操作时间',
		 		width:"5%",
		 	},
		 	{
		 		field: 'mobile',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '动作',
		 		width:"5%",
		 	},
		 	{
		 		field: 'mobile',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '流量（m³/s）',
		 		width:"5%",
		 	},
		 	{
		 		field: 'mobile',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '监护人',
		 		width:"5%",
		 	},
		 	{
		 		field: 'mobile',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '下达状态',
		 		width:"5%",
		 	},
		 	{
		 		field: 'mobile',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '完成时间',
		 		width:"5%",
		 	},
		 ],
	});
}

//function GetData(params){
//	$.ajax({
//		headers: {
//			'Authorization': 'Bearer ' + token,
//		},
//		url: 'http://120.76.241.72:8092/api/services/app/ProjectInfo/GetProInfoSluiceSupplementInspect',
//		type: "GET",
//		dataType: "json",
//		data:{
//			MaxResultCount:params.data.limit,
//			SkipCount:params.data.offset
//		},
//		success: function(data) {
//			params.success({
//				total: data.result.totalCount,
//				rows: data.result.items
//			});
//		}
//	});
//}

LoadInfoList();
//机组运行
function LoadInfoList() {
	var pageSize = 10;
	var pageNumber = 1;

	var colum = [{
			field: 'nhsw',
			title: '内河',
			align: 'center',
			formatter: cellNum2Formatter,
			valign: 'middle'
		},
		{
			field: 'wjsw',
			title: '外江',
			align: 'center',
			formatter: cellNum2Formatter,
			valign: 'middle'
		},
		{
			field: 'wd1',
			title: '定子温1',
			align: 'center',
			formatter: cellNum2Formatter,
			valign: 'middle'
		},
		{
			field: 'wd2',
			title: '定子温2',
			align: 'center',
			formatter: cellNum2Formatter,
			valign: 'middle'
		},
		{
			field: 'wd3',
			title: '定子温3',
			align: 'center',
			formatter: cellNum2Formatter,
			valign: 'middle'
		},
		{
			field: 'wd4',
			title: '上导油温',
			align: 'center',
			formatter: cellNum2Formatter,
			valign: 'middle'
		},
		{
			field: 'wd5',
			title: '上导瓦温1',
			align: 'center',
			formatter: cellNum2Formatter,
			valign: 'middle'
		},
		{
			field: 'wd6',
			title: '上导瓦温2',
			align: 'center',
			formatter: cellNum2Formatter,
			valign: 'middle'
		},
		{
			field: 'wd7',
			title: '下导油温',
			align: 'center',
			formatter: cellNum2Formatter,
			valign: 'middle'
		},
		{
			field: 'wd8',
			title: '上推瓦温1',
			align: 'center',
			formatter: cellNum2Formatter,
			valign: 'middle'
		},
		{
			field: 'wd9',
			title: '上推瓦温2',
			align: 'center',
			formatter: cellNum2Formatter,
			valign: 'middle'
		},
		{
			field: 'wd10',
			title: '下瓦温1',
			align: 'center',
			formatter: cellNum2Formatter,
			valign: 'middle'
		},
		{
			field: 'wd11',
			title: '下瓦温2',
			align: 'center',
			formatter: cellNum2Formatter,
			valign: 'middle'
		},
		{
			field: 'asd',
			title: '1#电机水压',
			align: 'center',
			valign: 'middle'
		},
		{
			field: 'asd',
			title: '1#水泵上机架水压',
			align: 'center',
			valign: 'middle'
		},
		{
			field: 'as',
			title: '1#水泵下机架水压',
			align: 'center',
			valign: 'middle'
		},
	];

	var obj = {};
	var j = colum.length;

	var columns = [];

//	$.ajax({
//		type: "post",
//		url: "../../../DataHandler/Archives/ElectronicDataHandler.ashx",
//		data: {
//			optype: "GetListPumpStationUnitFilledInfo",
//			code: itemList.join(",")
//		},
//		dataType: "json",
//		async: false,
//		success: function(data) {
//			if(data != null && data.status == 0) {
//				var json = JSON.parse(data.message);
//				if(json.length > 0) {
//					for(var i = 0; i < json.length; i++) {
//						obj["align"] = "center";
//						obj["valign"] = "middle";
//						obj["field"] = "Filled_Code_" + json[i].Filled_Code;
//						var titlenm = json[i].Filled_Column;
//						if(titlenm.length > 12) {
//							var spantxt = titlenm.substring(0, 12) + "...";
//							titlenm = '<span title="' + titlenm + '">' + spantxt + '</span>';
//						}
//						obj["title"] = titlenm;
//						colum.splice(j, 0, obj);
//						obj = {};
//						j++;
//					}
//				}
//			}
//		}
//	});

	if(colum.length > 13) {
		columns = [
			[{
					field: '',
					title: '序号',
					align: 'center',
					valign: 'middle',
					width: '50',
					rowspan: 2,
					formatter: function(value, row, index) {
						return(pageSize * (pageNumber - 1) + index + 1);
						
					}
				},
				{
					field: 'Record_Time',
					title: '记录时间',
					align: 'center',
					width: '100',
					rowspan: 2,
//					formatter: Formatter.Time,
					valign: 'middle'
				},
				{
					field: '',
					title: '水位(m)',
					align: 'center',
					width: '200',
					colspan: 2,
					valign: 'middle'
				},
				{
					field: 'gl',
					title: '有功功率(KW)',
					width: '150',
					align: 'center',
					rowspan: 2,
					valign: 'middle'
				},
				{
					field: 'adl',
					title: '定子电流(A)',
					width: '100',
					align: 'center',
					rowspan: 2,
					valign: 'middle'
				},
				{
					field: 'abdy',
					title: '定子电压(V)',
					width: '100',
					align: 'center',
					rowspan: 2,
					valign: 'middle'
				},
				{
					field: 'glys',
					title: '功率因素',
					width: '100',
					align: 'center',
					rowspan: 2,
					valign: 'middle'
				},
				{
					field: 'lcdl',
					title: '励磁电流(A)',
					width: '100',
					align: 'center',
					rowspan: 2,
					valign: 'middle'
				},
				{
					field: 'lcdy',
					title: '励磁电压(V)',
					width: '100',
					align: 'center',
					rowspan: 2,
					valign: 'middle'
				},
				{
					field: '',
					title: '电动机温度(℃)',
					align: 'center',
					width: '1100',
					colspan: 11,
					valign: 'middle'
				},
				{
					field: '',
					title: '电机层(Mpa)',
					align: 'center',
					width: 150 * (colum.length - 13),
					colspan: (colum.length - 13),
					valign: 'middle'
				}
			],
			colum
		];
	} else {
		columns = [
			[{
					field: '',
					title: '序号',
					align: 'center',
					valign: 'middle',
					width: '50',
					rowspan: 2,
					formatter: function(value, row, index) {
						return(pageSize * (pageNumber - 1) + index + 1);
					}
				},
				{
					field: 'Record_Time',
					title: '记录时间',
					align: 'center',
					width: '100',
					rowspan: 2,
//					formatter: Formatter.Time,
					valign: 'middle'
				},
				{
					field: '',
					title: '水位(m)',
					align: 'center',
					width: '200',
					colspan: 2,
					valign: 'middle'
				},
				{
					field: 'gl',
					title: '有功功率(KW)',
					width: '150',
					align: 'center',
					rowspan: 2,
					valign: 'middle'
				},
				{
					field: 'adl',
					title: '定子电流(A)',
					width: '100',
					align: 'center',
					rowspan: 2,
					valign: 'middle'
				},
				{
					field: 'abdy',
					title: '定子电压(V)',
					width: '100',
					align: 'center',
					rowspan: 2,
					valign: 'middle'
				},
				{
					field: 'glys',
					title: '功率因素',
					width: '100',
					align: 'center',
					rowspan: 2,
					valign: 'middle'
				},
				{
					field: 'lcdl',
					title: '励磁电流(A)',
					width: '100',
					align: 'center',
					rowspan: 2,
					valign: 'middle'
				},
				{
					field: 'lcdy',
					title: '励磁电压(V)',
					width: '100',
					align: 'center',
					rowspan: 2,
					valign: 'middle'
				},
				{
					field: '',
					title: '电动机温度(℃)',
					align: 'center',
					width: '1100',
					colspan: 11,
					valign: 'middle'
				}
			],
			[{
					field: 'nhsw',
					title: '内河',
					align: 'center',
					formatter: cellNum2Formatter,
					valign: 'middle'
				},
				{
					field: 'wjsw',
					title: '外江',
					align: 'center',
					formatter: cellNum2Formatter,
					valign: 'middle'
				},
				{
					field: 'wd1',
					title: '定子温1',
					align: 'center',
					formatter: cellNum2Formatter,
					valign: 'middle'
				},
				{
					field: 'wd2',
					title: '定子温2',
					align: 'center',
					formatter: cellNum2Formatter,
					valign: 'middle'
				},
				{
					field: 'wd3',
					title: '定子温3',
					align: 'center',
					formatter: cellNum2Formatter,
					valign: 'middle'
				},
				{
					field: 'wd4',
					title: '上导油温',
					align: 'center',
					formatter: cellNum2Formatter,
					valign: 'middle'
				},
				{
					field: 'wd5',
					title: '上导瓦温1',
					align: 'center',
					formatter: cellNum2Formatter,
					valign: 'middle'
				},
				{
					field: 'wd6',
					title: '上导瓦温2',
					align: 'center',
					formatter: cellNum2Formatter,
					valign: 'middle'
				},
				{
					field: 'wd7',
					title: '下导油温',
					align: 'center',
					formatter: cellNum2Formatter,
					valign: 'middle'
				},
				{
					field: 'wd8',
					title: '上推瓦温1',
					align: 'center',
					formatter: cellNum2Formatter,
					valign: 'middle'
				},
				{
					field: 'wd9',
					title: '上推瓦温2',
					align: 'center',
					formatter: cellNum2Formatter,
					valign: 'middle'
				},
				{
					field: 'wd10',
					title: '下瓦温1',
					align: 'center',
					formatter: cellNum2Formatter,
					valign: 'middle'
				},
				{
					field: 'wd11',
					title: '下瓦温2',
					align: 'center',
					formatter: cellNum2Formatter,
					valign: 'middle'
				},				
			]
		];
	}
	$('#table').bootstrapTable('destroy').bootstrapTable({
		dataType: "json",
		pagination: false,
		queryParamsType: "normal",
		queryParams: queryParams_List,
		sidePagination: "server",
		contentType: "application/x-www-form-urlencoded",
		columns: columns
	});
	$("#table").on('click-row.bs.table', function(e, row, element) {
		$('.selhighlight').removeClass('selhighlight'); //去除之前选中的行的，选中样式
		$(element).addClass('selhighlight'); //添加当前选中的  样式用于区别
	});
}

/*列表参数*/
function queryParams_List(params) {
	return {
		optype: 'GetListPumpStationUnitRunRecordPageInfo',
		time: $('#run_Check_Day').val(),
		code: $('#unit_Code').find("option:selected").val(),
		ctype: spcialPointCode,
		name: itemList.join(",")
	};
}

function cellNum2Formatter(value, row, index) {		
	if(value != null && value != undefined && value != "") {
		value = parseFloat(value);
		return value.toFixed(2);
	}
	return "--";
}




//日期
var dates=new Date();
months = dates.getMonth() + 1;
days = dates.getDate();
$("#check_Time").html(dates.getFullYear() + "-" + months + "-" + days);


$("input[type='button']").click(function() {
	$(this).addClass("on").siblings().removeClass("on");
	var isOn = $("input[value='自定义']").is(".on");
	date = new Date();
	
	month = date.getMonth() + 1;
	day = date.getDate();
	if(month.toString().length < 2) {
		month = "0" + month;
	}
	if(day.toString().length < 2) {
		day = "0" + day;
	}
	if(isOn) {
		$(this).parent().next().removeClass("hide").show();
	} else {
		if($(this)[0].value == "今天") {
			date = date.getTime();
		} else if($(this)[0].value == "前一天") {
			date = date.getTime() - 1000 * 60 * 60 * 24 * 1;
		}

		tmpdate = new Date(date);
		tmpmonth = tmpdate.getMonth() + 1;
		tmpday = tmpdate.getDate();
		if(tmpmonth.toString().length < 2) {
			tmpmonth = "0" + tmpmonth;
		}
		if(tmpday.toString().length < 2) {
			tmpday = "0" + tmpday;
		}
		$("#run_Check_Day").val(tmpdate.getFullYear() + "-" + tmpmonth + "-" + tmpday);
		$(this).parent().next().hide();
	}
	var show_time = $("#run_Check_Day").val();
	$("#check_Time").html(show_time);
});




//标准时间格式化
//var newstartTime = new Date(con[i].startTime).Format("yyyy-MM-dd hh:mm");
Date.prototype.Format = function (fmt) { //author: meizz 
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