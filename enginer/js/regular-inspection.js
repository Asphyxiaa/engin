var cebian=$(document).height()-280;
$("#ztree").css("height",cebian);

$('body').mLoading("show");

window.onload = function() {
    $(".qian").parent().addClass("ztreelic");
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

$.ajax({
	headers: {
		'Authorization': 'Bearer ' + token,
	},
	type: 'GET',
	dataType: "json",
	url: apiUrl + "/Projectinfo/GetProInfoSluiceSupplement",
	success: function(data) {
		var con = data.result.items;
		initTableqian(con[0].id);
		initTablezhong(con[0].id);
		initTablehou(con[0].id);
		initTableyears(con[0].id);
	}
});


//前
$(".qian").click(function(){
	$("#qian").show();
	$("#zhong").hide();
	$("#hou").hide();
	$("#years").hide();
	$(this).parent().addClass("ztreelic");
	$(this).parent().siblings().removeClass("ztreelic");
})
//中
$(".zhong").click(function(){
	$("#qian").hide();
	$("#zhong").show();
	$("#hou").hide();
	$("#years").hide();
	$(this).parent().addClass("ztreelic");
	$(this).parent().siblings().removeClass("ztreelic");
})
//后
$(".hou").click(function(){
	$("#qian").hide();
	$("#zhong").hide();
	$("#hou").show();
	$("#years").hide();
	$(this).parent().addClass("ztreelic");
	$(this).parent().siblings().removeClass("ztreelic");
})
//年度
$(".years").click(function(){
	$("#qian").hide();
	$("#zhong").hide();
	$("#hou").hide();
	$("#years").show();
	$(this).parent().addClass("ztreelic");
	$(this).parent().siblings().removeClass("ztreelic");
})


//table分页--前
function initTableqian(id){
	 $('#table-qian').bootstrapTable('destroy'); 
	 
	 $('#table-qian').bootstrapTable({
		 ajax: function (params) {
			GetDataqian(params,id);
		},
		 striped: true,  //表格显示条纹  
		 pagination:true, //启动分页  
	     pageSize: 10,  //每页显示的记录数  
	     pageNumber:1,
	     sidePagination: "server",
		 columns: [
		 	{
		 		field: 'year',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '年份',
		 		width:"5%",
		 	},
		 	{
		 		field: 'checkItem',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '检查事项',
		 		width:"5%",
		 	},
		 	{
		 		field: 'checkStatus',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '检查状态',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if (value == "true") {
		 				return "已检查";
		 			} else{
		 				return "未检查";
		 			}	 			
		 		}
		 	},
		 	{
		 		field: 'checkPersonAndWork',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '人员落实及分工情况',
		 		width:"5%",
		 	},
		 	{
		 		field: 'toolReadyResult',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '工具准备情况',
		 		width:"5%",
		 	},
		 	{
		 		field: 'other',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '其它	',
		 		width:"5%",
		 	},
		 	{
		 		field: 'reportPerson',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '记录人',
		 		width:"5%",
		 	},
		 	{
		 		field: 'reportDate',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '记录日期',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if (value == null || value == '') {
		 				return "-";
		 			} else{
		 				var reportdate=new Date(value).Format("yyyy-MM-dd hh:mm:ss");
		 				return reportdate;
		 			}
		 			
		 		}
		 	},
		 	{
		 		field: 'fileName',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '附件名称',
		 		width:"5%",
		 	},
		 	{
		 		field: 'profileId',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '查看文件',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if (value == null || value == '') {
		 				return;
		 			} else{
		 				return seefile(value, row, index);
		 			}
		 		}
		 	},
		 ],
	});
}
function GetDataqian(params,id){
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		url: apiUrl + "/ProjectCheck/GetProCheckConcernedChecks",
		type: "GET",
		dataType: "json",
		data:{
			MaxResultCount:params.data.limit,
			SkipCount:params.data.offset,
			ManageUnitId:id,
		},
		success: function(data) {
			$('body').mLoading("hide");
			params.success({
				total: data.result.totalCount,
				rows: data.result.items
			});
		}
	});
}

//table分页--中
function initTablezhong(id){
	 $('#table-zhong').bootstrapTable('destroy'); 
	 
	 $('#table-zhong').bootstrapTable({
		 ajax: function (params) {
			GetDatazhong(params,id);
		},
		 striped: true,  //表格显示条纹  
		 pagination:true, //启动分页  
	     pageSize: 10,  //每页显示的记录数  
	     pageNumber:1,
	     sidePagination: "server",
		 columns: [
		 	{
		 		field: 'year',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '年份',
		 		width:"5%",
		 	},
		 	{
		 		field: 'checkItem',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '检查事项',
		 		width:"5%",
		 	},
		 	{
		 		field: 'checkStatus',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '检查状态',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if (value == "true") {
		 				return "已检查";
		 			} else{
		 				return "未检查";
		 			}	 			
		 		}
		 	},
		 	{
		 		field: 'checkPersonAndWork',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '人员落实及分工情况',
		 		width:"5%",
		 	},
		 	{
		 		field: 'toolReadyResult',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '工具准备情况',
		 		width:"5%",
		 	},
		 	{
		 		field: 'other',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '其它	',
		 		width:"5%",
		 	},
		 	{
		 		field: 'reportPerson',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '记录人',
		 		width:"5%",
		 	},
		 	{
		 		field: 'reportDate',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '记录日期',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if (value == null || value == '') {
		 				return "-";
		 			} else{
		 				var reportdate=new Date(value).Format("yyyy-MM-dd hh:mm:ss");
		 				return reportdate;
		 			}
		 			
		 		}
		 	},
		 	{
		 		field: 'fileName',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '附件名称',
		 		width:"5%",
		 	},
		 	{
		 		field: 'profileId',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '查看文件',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if (value == null || value == '') {
		 				return;
		 			} else{
		 				return seefile(value, row, index);
		 			}
		 		}
		 	},
		 ],
	});
}
function GetDatazhong(params,id){
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		url: apiUrl + "/ProjectCheck/GetProCheckSinChecks",
		type: "GET",
		dataType: "json",
		data:{
			MaxResultCount:params.data.limit,
			SkipCount:params.data.offset,
			ManageUnitId:id,
		},
		success: function(data) {
			params.success({
				total: data.result.totalCount,
				rows: data.result.items
			});
		}
	});
}
//
////table分页--后
function initTablehou(id){
	 $('#table-hou').bootstrapTable('destroy'); 
	 
	 $('#table-hou').bootstrapTable({
		 ajax: function (params) {
			GetDatahou(params,id);
		},
		 striped: true,  //表格显示条纹  
		 pagination:true, //启动分页  
	     pageSize: 10,  //每页显示的记录数  
	     pageNumber:1,
	     sidePagination: "server",
		 columns: [
		 	{
		 		field: 'year',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '年份',
		 		width:"5%",
		 	},
		 	{
		 		field: 'checkItem',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '检查事项',
		 		width:"5%",
		 	},
		 	{
		 		field: 'checkStatus',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '检查状态',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if (value == "true") {
		 				return "已检查";
		 			} else{
		 				return "未检查";
		 			}	 			
		 		}
		 	},
		 	{
		 		field: 'checkPersonAndWork',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '人员落实及分工情况',
		 		width:"5%",
		 	},
		 	{
		 		field: 'toolReadyResult',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '工具准备情况',
		 		width:"5%",
		 	},
		 	{
		 		field: 'other',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '其它	',
		 		width:"5%",
		 	},
		 	{
		 		field: 'reportPerson',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '记录人',
		 		width:"5%",
		 	},
		 	{
		 		field: 'reportDate',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '记录日期',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if (value == null || value == '') {
		 				return "-";
		 			} else{
		 				var reportdate=new Date(value).Format("yyyy-MM-dd hh:mm:ss");
		 				return reportdate;
		 			}
		 			
		 		}
		 	},
		 	{
		 		field: 'fileName',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '附件名称',
		 		width:"5%",
		 	},
		 	{
		 		field: 'profileId',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '查看文件',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if (value == null || value == '') {
		 				return;
		 			} else{
		 				return seefile(value, row, index);
		 			}
		 		}
		 	},
		 ],
	});
}
function GetDatahou(params,id){
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		url: apiUrl + "/ProjectCheck/GetProCheckAfterSinChecks",
		type: "GET",
		dataType: "json",
		data:{
			MaxResultCount:params.data.limit,
			SkipCount:params.data.offset,
			ManageUnitId:id,
		},
		success: function(data) {
			params.success({
				total: data.result.totalCount,
				rows: data.result.items
			});
		}
	});
}


//table分页--年度
function initTableyears(id){
	 $('#table-years').bootstrapTable('destroy'); 
	 
	 $('#table-years').bootstrapTable({
		 ajax: function (params) {
			GetData(params,id);
		},
		 striped: true,  //表格显示条纹  
		 pagination:true, //启动分页  
	     pageSize: 10,  //每页显示的记录数  
	     pageNumber:1,
	     sidePagination: "server",
		 columns: [
		 	{
		 		field: 'year',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '年份',
		 		width:"5%",
		 	},
		 	{
		 		field: 'verifyItem',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '审核事项',
		 		width:"5%",
		 	},
		 	{
		 		field: 'departmentSuggestion',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '部门审核意见',
		 		width:"5%",
		 	},
		 	{
		 		field: 'departmentSuggestionDate',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '部门审核意见时间 ',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if (value == null || value == '') {
		 				return "-";
		 			} else{
		 				var departmentsuggestiondate=new Date(value).Format("yyyy-MM-dd hh:mm:ss");
		 				return departmentsuggestiondate;
		 			}
		 			
		 		}
		 	},
		 	{
		 		field: 'reviewDepartmentSuggestion',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '会审部门审核意见',
		 		width:"5%",
		 	},
		 	{
		 		field: 'reviewDepartmentSuggestionDate',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '会审部门审核意见时间',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if (value == null || value == '') {
		 				return "-";
		 			} else{
		 				var reviewdepartmentsuggestiondate=new Date(value).Format("yyyy-MM-dd hh:mm:ss");
		 				return reviewdepartmentsuggestiondate;
		 			}
		 			
		 		}
		 	},
		 	{
		 		field: 'bureauLeaderSuggestion',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '局领导审核意见',
		 		width:"5%",
		 	},
		 	{
		 		field: 'bureauLeaderSuggestionDate',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '局领导审核意见时间',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if (value == null || value == '') {
		 				return "-";
		 			} else{
		 				var bureauleadersuggestiondate=new Date(value).Format("yyyy-MM-dd hh:mm:ss");
		 				return bureauleadersuggestiondate;
		 			}
		 			
		 		}
		 	},
		 	{
		 		field: 'amendment',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '修改意见',
		 		width:"5%",
		 	},
		 	{
		 		field: 'organizationPerson',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '编制人',
		 		width:"5%",
		 	},
		 	{
		 		field: 'auditorPerson',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '审核人',
		 		width:"5%",
		 	},{
		 		field: 'fileName',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '附件名称',
		 		width:"5%",
		 	},{
		 		field: 'profileId',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '查看文件',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if (value == null || value == '') {
		 				return;
		 			} else{
		 				return seefile(value, row, index);
		 			}
		 		}
		 	},
		 ],
	});
}
function GetData(params,id){
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		url: apiUrl + "/ProjectCheck/GetProCheckAnnualInspectionVerifys",
		type: "GET",
		dataType: "json",
		data:{
			MaxResultCount:params.data.limit,
			SkipCount:params.data.offset,
			ManageUnitId:id,
			MaxResultCount:1000,
			SkipCount:0
		},
		success: function(data) {
			params.success({
				total: data.result.totalCount,
				rows: data.result.items
			});
		}
	});
}

function seefile(value, row, index){
	var e = "";
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		type: 'GET',
		dataType: "json",
		async: false,
		data: {
			Id: value
		},
		url: apiUrl + "/ProjectInfo/GetPDFByGuid",
		success: function(data) {
			e = '<a  href="http://120.76.241.72/keqpdf/' + data.result.profileUrl + '" target="_blank" >查看文件</i></a>'
		}
	});
	return e;
}



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