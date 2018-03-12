var cebian=$(document).height()-280;
$("#ztree").css("height",cebian);

$('body').mLoading("show");

$('body').mLoading("hide");

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
	$(this).parent().addClass("ztreelic");
	$(this).parent().siblings().removeClass("ztreelic");
})


//table分页---run
initTablerun();
function initTablerun(){
	 $('#table-run').bootstrapTable('destroy'); 
	 
	 $('#table-run').bootstrapTable({
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
		 		title: '运行通知编号',
		 		width:"5%",
		 	},
		 	{
		 		field: 'mobile',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '计划开始执行时间',
		 		width:"5%",
		 	},
		 	{
		 		field: 'mobile',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '运行模式',
		 		width:"5%",
		 	},
		 	{
		 		field: 'mobile',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '度量方式',
		 		width:"5%",
		 	},
		 	{
		 		field: 'mobile',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '开度',
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
		 		title: '执行状态',
		 		width:"5%",
		 	},
		 	{
		 		field: 'mobile',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '完成时间',
		 		width:"5%",
		 	},
		 	{
		 		field: 'mobile',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '操作',
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



//table分页---state
initTablestate();
function initTablestate(){
	 $('#table-state').bootstrapTable('destroy'); 
	 
	 $('#table-state').bootstrapTable({
//		 ajax: function (params) {
//			GetData(params,"Daily");
//		},
		 striped: true,  //表格显示条纹  
		 pagination: true, //启动分页  
	     pageSize: 10,  //每页显示的记录数  
	     pageNumber:1,
	     sidePagination: "server",
//	     search:true,
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