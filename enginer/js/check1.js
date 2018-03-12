$('body').mLoading("show");
//setTimeout(function(){
//   $('body').mLoading("hide");
//},2000);

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

var cebian=$(document).height()-280;
$("#ztree").css("height",cebian);
$(".patrol-list").css("height",cebian+107);
$(".fn-panel-body").height(cebian+93);
$("#locus iframe").height(cebian+50);

//
var _width = $(window).width();
if (_width<1610&&_width>1410) {
	$(".patrol-list").css("left",258);
	$(".fn-panel-body").css("left",450);
}
else if(_width<1400&&_width>1310){
	$(".patrol-list").css("left",215);
	$(".fn-panel-body").css({
		"left":405,
		"top":144,
	});
}
else if(_width<1300&&_width>1210){
	$(".patrol-list").css("left",205);
	$(".fn-panel-body").css({
		"left":395,
		"top":144,
	});
	
}
else if(_width<1210){
	$(".patrol-list").css("left",245);
	$(".fn-panel-body").css({
		"left":435,
		"top":144,
	});
}


//切换
$(".locus").click(function(){
	$("#locus").show();
	$("#ledger").hide();
	$("#trouble").hide();
	$("#filled").hide();
	$(this).parent().addClass('active');
	$(this).parent().siblings().removeClass("active");
})
$(".ledger").click(function(){
	$("#locus").hide();
	$("#ledger").show();
	$("#trouble").hide();
	$("#filled").hide();
	$(this).parent().addClass('active');
	$(this).parent().siblings().removeClass("active");
})
$(".trouble").click(function(){
	$("#locus").hide();
	$("#ledger").hide();
	$("#trouble").show();
	$("#filled").hide();
	$(this).parent().addClass('active');
	$(this).parent().siblings().removeClass("active");
})
$(".filled").click(function(){
	$("#locus").hide();
	$("#ledger").hide();
	$("#trouble").hide();
	$("#filled").show();
	$(this).parent().addClass('active');
	$(this).parent().siblings().removeClass("active");
})

  $(".btn-primary").bind('click', function (event) {
        $.cookie('Abp.AuthToken', null, { expires: 1, path: '/' });
        window.location.href = "http://120.76.241.72:8060";
    });



//工程类型列表
$.ajax({
	headers: {
		'Authorization': 'Bearer ' + token,
	},
	async: false,
	type: 'GET',
	dataType: "json",
	url: apiUrl + "/Projectinfo/GetProTypes",
	success: function(data) {
		var con=data.result.items;
		for (var i=0;i<con.length;i++) {
			$("#usertype:last-child").append('<option value='+con[i].id+'>'+con[i].typeName+'</option>');			
		}
	}
});

//选项
$("#usertype").on("changed.bs.select",function(){	
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		type: 'GET',
		traditional:true,
		data:{
			ProjectTypeId:$(this).val(),
			MaxResultCount:1000,
			SkipCount:0
		},
		url: apiUrl + "/ProjectInfo/GetProInfos",
		success: function(data) {
			var con=data.result.items;
			$("#ztree").empty();
			for (var i=0;i<con.length;i++) {
				$("#ztree").append('<li class="ztreeli"><span class="lie">'+con[i].proName+'</span><a class="check" id="'+con[i].id+'" pid="'+con[i].projectTypeId+'" style="float: right;">查看</a></li>');			
			}
			var see=$(".check");
			seeclick(see);
		}
	});
})
//工程信息列表
$.ajax({
	headers: {
		'Authorization': 'Bearer ' + token,
	},
	async: false,
	type: 'GET',
	dataType: "json",
	data:{
		MaxResultCount:1000,
		SkipCount:0
	},
	url: apiUrl + "/Projectinfo/GetProInfos",
	success: function(data) {
		var con=data.result.items;
		for (var i=0;i<con.length;i++) {
			$("#ztree:last-child").append('<li class="ztreeli"><span class="lie">'+con[i].proName+'</span>	<a class="check" id="'+con[i].id+'" pid="'+con[i].projectTypeId+'" style="float: right;">查看</a></li>');		
		}	
	}
});


var see=$("#ztree .check");
/*默认*/
$.ajax({
	headers: {
		'Authorization': 'Bearer ' + token,
	},
	type: 'GET',
	dataType: "json",
	url: apiUrl +"/Projectinfo/GetProInfoForEdit",
	data: {
		Id: see.eq(0).attr("id"),
	},
	success: function(data) {
		$(".ztreeli").eq(0).addClass("ztreelic");
		rili(see.eq(0).attr("id"));
	}	
});


//查看
seeclick(see);
function seeclick(see){
	for (var i=0;i<see.length;i++) {
		see.eq(i).click(function(){
			var id=$(this).attr('id');
			$(this).parent().addClass("ztreelic");
			$(this).parent().siblings().removeClass("ztreelic");
			$("#maincontent").show();
			$("#map").hide();
			$("#fn-panel-list").hide();
			$("#locus").hide();
			rili(id);			
		})
	}
}


//日历
function rili(id){
	$('#calendar').fullCalendar('destroy');
	$('#calendar').fullCalendar({
		header: {
	        left: 'prev,next today',
	        center: 'title',
	       	right: 'month'
	    },
	    title: {
	        month: 'YYYY年MM月',
	        week: 'YYYY年MM月DD日'
	    },
	    buttonText: {	
	        prev: '上一月',
	       	next: '下一月'
	    },
		editable: true,
		selectable: true,
		height:665,
		eventLimit: true,
		loading: function(bool) {
			$('#loading').toggle(bool);
		},
		events: function(start, end, timezone, callback){
				var year = end.format("YYYY");
	            var month = parseInt(end.format("MM")) - 1;
	            if (month == 0) {
	                month = 12;
	                year = parseInt(end.format("YYYY")) - 1;
	            }
	            else {
	                if (month.toString().length < 2) {
	                    month = "0" + month;
	                }
	            }
	
	            var day = getDaysInMonth(year, month);//根据年月获得当月天数
	            if (day.toString().length < 2) {
	                day = "0" + day;
	            }
	            var startdate = year + "-" + month + "-01";
	            var enddate = year + "-" + month + "-" + day;
			var events = [];
			$.ajax({
				headers: {
					'Authorization': 'Bearer ' + token,
				},
				type:"get",
				url:apiUrl+"/ProjectReport/GetReportStatusByProjectId",
				data:{
					ProjectId:id,
					StartDate:startdate,
					EndDate:enddate			
				},
				success:function(data){
					$('body').mLoading("hide");
					if (data.result==null) {
						console.log();
					} else{
						var conss=data.result.items;
						$.each(conss,function(i){
							var colors="";
							if(conss[i].pStatus=="未巡查"){
								colors="eventfont-nocheck posi"
							}else if(conss[i].pStatus=="已巡查,正常"){
								colors="eventfont-normal posi"
							}else if(conss[i].pStatus=="巡查中"){
								colors="eventfont-check posi"
							}else{
								colors="eventfont-danger posi"
							}					
							events.push({
								title:conss[i].pStatus,
								start:conss[i].inspectTime,
								className:colors
							})
						})
					}
					callback(events);
					var num=0;
					var num1=0;
					var numspan=$("#show_detail span")
					for (var i=0;i<numspan.length;i++) {
						if (i==0) {
							var days=new Date(year,month,0).getDate();
							numspan.eq(0).html(days);
						} else if(i==1){
							if(data.result==null){
								console.log();
							}else{
								var con1=data.result.items;
								$.each(con1,function(j){
									if(con1[j].pStatus=="已巡查,有隐患"||con1[j].pStatus=="已巡查,正常"){
										num++;
									}
								})
							}												
							numspan.eq(1).html(num);
							numspan.eq(2).html(num);
						}else if(i==3){
							if(data.result==null){
								console.log();
							}else{
								var con2=data.result.items;
								$.each(con2,function(k){
									if(con2[k].pStatus=="已巡查,有隐患"){
										num1++;
									}
								})
							}							
							numspan.eq(3).html(num1);
							numspan.eq(4).html(num1);
						}
					}				
				}				
			});
			
		},
		eventClick: function(event) {
			var tempStart = $.fullCalendar.formatDate(event.start, "YYYY-MM-DD");
//			console.log(tempStart);
			//人员
			inspectnames(id,tempStart);
			//本次
			initTablenow(id,tempStart);
			//历史
			initTablehistory(id,tempStart);
			$(".day").html(tempStart);
			$("#checkday_html").html(tempStart);
			$("#maincontent").hide();
			$("#map").show();
			$("#fn-panel-list").show();
			$("#locus").show();
		},
	});
}


function getDaysInMonth(year, month) {
    month = parseInt(month);
    var temp = new Date(year, month, 0);
    return temp.getDate();
}

//返回
function BackUrl(){
	$("#map").hide();
	$("#fn-panel-list").hide();
	$("#maincontent").show();
	$(".fc-today-button").trigger("click");
}

//巡查情况人员
function inspectnames(id,todaytime){
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		type: 'GET',
		dataType: "json",
		url: apiUrl + "/ProjectReport/GetReportInspectProjectView",
		data:{
			ProjectId:id,
			InspectDate:todaytime,
		},
		success: function(data) {
			
			var con=data.result.inspectNames;
			$("#checkcount_html").html(data.result.inspectCount);			
			$("#title_ppnm").html(data.result.inspectType);
			for (var i=0;i<con.length;i++) {
				$("#daily_check_table tbody tr").html("");
				var newstartTime = new Date(con[i].startTime).Format("yyyy-MM-dd hh:mm");
				var newendTime = new Date(con[i].endTime).Format("yyyy-MM-dd hh:mm");
				$("#daily_check_table tbody tr").append('<td><div class="success-bg"><h5><span>姓名:'+con[i].userName+'</span><br><span class="phone">联系方式：'+con[i].mobile+'</span></h5><p>开始时间:'+newstartTime+'</p><p>结束时间：'+newendTime+'</p><p style="text-align: center;"><span userid="'+con[i].userId+'" check="'+data.result.checkId+'" class="span-nowarning">已确认</span></p></div></td>')
				var determine=$(".span-nowarning");	
//				console.log(determine); 
				for (var i=0;i<determine.length;i++) {
					determine.eq(i).click(function(){
						$(this).parent().parent().parent().addClass("active");
						$(this).parent().parent().parent().siblings().removeClass("active");
						var a=$(this).attr("userid");
						var b=$(this).attr("check");
						$("#locus iframe").attr("src",'../patrolTrack.html?userId='+a+'&checkId='+b+'')
					})
				}
				determine.eq(0).trigger("click");
			}
		}
	});
}









//table分页----本次问题
function initTablenow(id,tempStart){
	 $('#table-now').bootstrapTable('destroy'); 
	 
	 $('#table-now').bootstrapTable({
		 method: "get",
		 url: apiUrl + "/ProjectReport/GetReportInspectProjectView",
		 ajax: function (params) {
			GetDatas(params,id,tempStart);
		},
		 striped: true,  //表格显示条纹  
		 pagination:false, //启动分页  
	     sidePagination: "server",
		 columns: [
//		 	{
//		 		field: 'proName',
//		 		align: 'center',
//		 		valign: 'middle',
//		 		title: '序号',
//		 		width:"4%",
//		 		formatter: function (value, row, index) {
//	                return (pageSize * (pageNumber - 1) + index + 1);
//	            },
//		 	},
		 	{
		 		field: 'positionName',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '部位名称',
		 		width:"4%",
		 	},
		 	{
		 		field: 'problemDescription',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '问题描述',
		 		width:"4%",
		 		formatter: ContentFormatter,
		 	},
		 	{
		 		field: 'mobile',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '处理状态',
		 		width:"4%",
		 	},
		 	{
		 		field: 'mobile',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '当前状态',
		 		width:"4%",
			}, 	
		 	{
		 		field: 'findTime',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '发现时间',
		 		width:"4%",
		 		formatter: timeFormatter,
		 	},
		 	{
            field: 'mobile',
            title: '问题上报情况',
            align: 'center',
            valign: 'middle',
            width: '4%',
            formatter: FormatterReport,           
       		},
		 ],
	});
}



//表格格式时间
function timeFormatter(value, row, index) {
	var time2 = new Date(value).Format("yyyy-MM-dd hh:mm:ss");  
    return time2;
}

function GetDatas(params,id,tempStart){
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		url: apiUrl + "/ProjectReport/GetReportInspectProjectView",
		type: "GET",
		dataType: "json",
		data:{
			MaxResultCount:params.data.limit,
			SkipCount:params.data.offset,
			ProjectId:id,
			InspectDate:tempStart
		},
		success: function(data) {
			params.success({
				total: data.result.totalCount,
				rows: data.result.inspectDamages
			});
		}
	});
} 	

/*问题描述格式化*/
function ContentFormatter(value) {
    if (value == undefined || value == "" || value == null) {
        return "";
    } else {
        var spantxt = "";
        var titlenm = "";
        if (value.length > 15) {
            spantxt = value.substring(0, 15) + "...";
            titlenm = '<span title="' + value + '">' + spantxt + '</span>';
        } else {
            titlenm = value;
        }
        return titlenm;
    }
}

/*问题上报情况格式化*/
function FormatterReport(value, row, index) {
    if (value == undefined || value == null) {
        return "--";
    } else {
        if (!IsEmpty(row.Deal_Mode) && row.Deal_Mode.toString().indexOf("隐患上报") < 0 && row.Deal_Mode.toString().indexOf("不是隐患") < 0 && row.Deal_Mode.toString().indexOf("流程发起") < 0) {
            if (value == "1") {
                return '<span class="span-iswarning">隐患问题已上报</span>';
            }
            else if (value == "2") {
                return '<span class="span-nowarning">隐患处理情况已上报</span>';
            }
            else {
                return '<span class="span-isdanger">隐患问题未上报</span>';
            }
        }
        else {
            return "--";
        }
    }
}




//table分页----历史问题
function initTablehistory(id,tempStart){
	 $('#table-history').bootstrapTable('destroy'); 
	 
	 $('#table-history').bootstrapTable({
		 method: "get",
		 url: apiUrl + "/ProjectReport/GetReportInspectProjectView",
		 ajax: function (params) {
			GetData(params,id,tempStart);
		},
		 striped: true,  //表格显示条纹  
		 pagination:false, //启动分页  
	     sidePagination: "server",
		 columns: [
//		 	{
//		 		field: 'proName',
//		 		align: 'center',
//		 		valign: 'middle',
//		 		title: '序号',
//		 		width:"4%",
//		 		formatter: function (value, row, index) {
//	                return (pageSize * (pageNumber - 1) + index + 1);
//	            },
//		 	},
		 	{
		 		field: 'positionName',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '部位名称',
		 		width:"4%",
		 	},
		 	{
		 		field: 'findTime',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '发现时间',
		 		width:"4%",
		 		formatter:timeFormatter ,
		 	},
		 	{
		 		field: 'problemDescription',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '问题描述',	 		
		 		width:"4%",
		 		formatter: ContentFormatter,
		 	},
		 	{
		 		field: 'mobile',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '本次巡查情况',
		 		width:"4%",
//		 		formatter: DealChangeFormatter,
			}, 	
		 	{
		 		field: 'mobile',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '照片/录音',
		 		width:"4%",
		 		formatter: function (value, row, index) {
	                return '<a href="#" title="照片/录音" onclick="FileView(\'' + row.Follow_Code + '\',\'Patrol_Problem_Follow_History\')" style="cursor: pointer;"><i class="icon-dc-file" ></i></a>';
	            },
		 	},
		 ],
	});
}
function GetData(params,id,tempStart){
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		url: apiUrl + "/ProjectReport/GetReportInspectProjectView",
		type: "GET",
		dataType: "json",
		data:{
			MaxResultCount:params.data.limit,
			SkipCount:params.data.offset,
			ProjectId:id,
			InspectDate:tempStart
		},
		success: function(data) {
//			console.log(data);
			params.success({
				total: data.result.totalCount,
				rows: data.result.inspectHisDamages
			});
		}
	});
}

/*本次巡查变化格式化*/
//function DealChangeFormatter(value) {
//  if (IsEmpty(value)) {
//      return "无变化";
//  } else {
//      return "有变化";
//  }
//}



//table分页----本次巡查列表
initTablelie();
function initTablelie(){
	 $('#table-lie').bootstrapTable('destroy'); 
	 
	 $('#table-lie').bootstrapTable({
//		 method: "get",
//		 url:"http://120.76.241.72:8092/api/services/app/ProjectInfo/GetProInfoSluiceSupplementInspect",
//		 ajax: function (params) {
//			GetData(params,"Daily");
//		},
		 striped: true,  //表格显示条纹  
		 pagination:true, //启动分页  
	     pageSize: 10,  //每页显示的记录数  
	     pageNumber:1,
	     sidePagination: "server",
		 columns: [
		 	{
		 		field: 'proName',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '点位名称',
		 		width:"4%",
		 	},
		 	{
		 		field: 'userName',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '填写项名称',
		 		width:"4%",
		 		formatter: ContentFormatter,
		 	},
		 	{
		 		field: 'mobile',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '填写项值',
		 		width:"4%",	 		
		 	},
		 	{
		 		field: 'mobile',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '填写项单位',
		 		width:"4%",
		 	},
		 	{
		 		field: 'mobile',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '填写项类型',
		 		width:"4%",
		 		formatter: FillItemFormatter,
			}, 	
		 ],
	});
}
 
/*填写项类型格式化*/
function FillItemFormatter(value, row, index) {
    if (value == undefined || value == "" || value == null) {
        return "";
    } else {
        if (value.toString().indexOf("boolean") >= 0) {
            value = "布尔值";
        }
        else if (value.toString().indexOf("number") >= 0) {
            value = "数字";
        }
        else if (value.toString().indexOf("text") >= 0) {
            value = "文本";
        }
        else if (value.toString().indexOf("time") >= 0) {
            value = "时间";
        }
        return value;
    }
}





//标准时间格式化
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