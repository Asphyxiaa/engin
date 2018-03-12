$('body').mLoading("show");

var cebian=$(document).height()-280;
$("#ztree").css("height",cebian);

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
		$(".typhoonInspection").parent().addClass("ztreelic");
		initTabletyphoon(con[0].id);
		initTablecasual(con[0].id);
	}
});

//1
$(".typhoonInspection").click(function(){
	$("#typhoonInspection").show();
	$("#casualInspection").hide();
	$(this).parent().addClass("ztreelic");
	$(this).parent().siblings().removeClass("ztreelic");
})
//2
$(".casualInspection").click(function(){
	$("#typhoonInspection").hide();
	$("#casualInspection").show();
	$(this).parent().addClass("ztreelic");
	$(this).parent().siblings().removeClass("ztreelic");
})



//table分页--1
function initTabletyphoon(id){
	 $('#table-typhoon').bootstrapTable('destroy'); 
	 
	 $('#table-typhoon').bootstrapTable({
		 ajax: function (params) {
			GetDatatyphoon(params,id);
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
		 		field: 'typhoonNumber',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '台风编号',
		 		width:"5%",
		 	},
		 	{
		 		field: 'checkDate',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '检查日期',
		 		width:"2%",
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
		 		field: 'weather',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '天气',
		 		width:"5%",
		 	},
		 	{
		 		field: 'beforeEarthwork01',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '护岸填土',
		 		width:"5%",
		 	},
		 	{
		 		field: 'beforeEarthwork02',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '上下游连接段',
		 		width:"5%",
		 	},
		 	{
		 		field: 'beforeConcrete01',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '闸站',
		 		width:"5%",
		 	},
		 	{
		 		field: 'beforeConcrete02',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '接连段建筑物',
		 		width:"5%",	 		
		 	},
		 	
		 	{
		 		field: 'beforeHouse01',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '闸站房屋',
		 		width:"5%",	 		
		 	},	
		 	{
		 		field: 'beforeHouse02',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '排水设施',
		 		width:"5%",	 		
		 	},	
		 	{
		 		field: 'materialComplete',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '防汛物资完备性',
		 		width:"5%",	 		
		 	},	
		 	{
		 		field: 'typhoonBeforeProblem',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '检查存在问题',
		 		width:"5%",	 		
		 	},	
		 	{
		 		field: 'typhoonBeforeSuggestion',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '处理建议',
		 		width:"5%",	 		
		 	},	
		 	{
		 		field: 'principalPerson',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '负责人',
		 		width:"5%",	 		
		 	},	
		 	{
		 		field: 'typhoonAfterCheckDate',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '检查日期',
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
		 		field: 'afterEarthwork01',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '护岸填土',
		 		width:"5%",	 		
		 	},	
		 	{
		 		field: 'afterEarthwork02',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '上下游连接段',
		 		width:"5%",	 		
		 	},	
		 	{
		 		field: 'afterConcrete01',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '闸站',
		 		width:"5%",	 		
		 	},	
		 	{
		 		field: 'afterConcrete02',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '接连段建筑物',
		 		width:"5%",	 		
		 	},	
		 	{
		 		field: 'afterHouse01',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '闸站房屋',
		 		width:"5%",	 		
		 	},	
		 	{
		 		field: 'afterHouse02',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '排水设施',
		 		width:"5%",	 		
		 	},	
		 	
		 	{
		 		field: 'managementFacilities',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '管理设施',
		 		width:"5%",	 		
		 	},
		 	{
		 		field: 'other',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '其他',
		 		width:"5%",	 		
		 	},
		 	{
		 		field: 'damageResult',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '台风损坏情况处理建议',
		 		width:"5%",	 		
		 	},
		 	{
		 		field: 'afterCheckPersons',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '检查人员',
		 		width:"5%",	 		
		 	},
		 	{
		 		field: 'lafterCheckPersonIds',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '检查人员组',
		 		width:"5%",	 		
		 	},
		 	{
		 		field: 'afterPrincipalPerson',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '负责人',
		 		width:"5%",	 		
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
		 		},
		 	},
		 ],
	});
}
function GetDatatyphoon(params,id){
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		url: apiUrl + "/ProjectCheck/GetProCheckTyphoons",
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
			$('body').mLoading("hide");
			params.success({
				total: data.result.totalCount,
				rows: data.result.items
			});
		}
	});
}

//table分页--2
function initTablecasual(id){
	 $('#table-casual').bootstrapTable('destroy'); 
	 
	 $('#table-casual').bootstrapTable({
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
		 		field: 'checkStatus',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '审核事项',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if (value == 'true') {
		 				return "已审核";
		 			} else{
		 				return "未审核";
		 			}		 			
		 		}
		 	},
		 	{
		 		field: 'checkPerson',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '检查人',
		 		width:"5%",
		 	},
		 	{
		 		field: 'checkDate',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '检查日期',
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
		 		},
		 	},
		 ],
	});
}
function GetData(params,id){
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		url: apiUrl + "/ProjectCheck/GetProCheckCasualInspections",
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