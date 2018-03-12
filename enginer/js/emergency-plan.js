$('body').mLoading("show");
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

//汛期
$(".flood-situation").click(function(){
	$(".flood").show();
	$(".plan").hide();
	$(".table-emergency").show();
	$(".table-plan").hide();
	$(this).parent().addClass("active");
	$(this).parent().siblings().removeClass("active");
})

//预案管理
$(".plan-management").click(function(){
	$(".flood").hide();
	$(".plan").show();	
	$(".table-emergency").hide();
	$(".table-plan").show();
	$(this).parent().addClass("active");
	$(this).parent().siblings().removeClass("active");
})

var cebian=$(document).height()-280;
$("#ztree").css("height",cebian);

//
$.ajax({
	headers: {
		'Authorization': 'Bearer ' + token,
	},
	type: 'GET',
	dataType: "json",
	url: apiUrl + "/Projectinfo/GetProInfoSluiceSupplement",
	success: function(data) {
		var con = data.result.items;
		floodseasons(con[0].id);
		initTable(con[0].id);
	}
});

//汛情
function floodseasons(id){
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		type: 'GET',
		dataType: "json",
		url: apiUrl + "/ProjectCheck/GetProCheckEmergencyFloodSeasons",
		data: {
			ManageUnitId: id,
			MaxResultCount: 1000,
			SkipCount: 0
		},
		success: function(json) {
			$('body').mLoading("hide");
			var cons = json.result.items;
			if(json.result == null) {
				$("#General_Flood_Analysis").html("");
				$("#General_Flood_Measures").html("");
				$("#Large_Flood_Analysis").html("");
				$("#Large_Flood_Measures").html("");
				$("#Major_Flood_Analysis").html("");
				$("#Major_Flood_Measures").html("");
				$("#Ul1_Flood_Analysis").html("");
				$("#Ul1_Flood_Measures").html("");
			} else {
				for(var i = 0; i < cons.length; i++) {
					if(cons[i].floodSeasonLevelEnum == "一般（Ⅳ级）汛情") {
						$("#General_Flood_Analysis").html(cons[i].floodSeasonAnalysis);
						$("#General_Flood_Measures").html('<span>相应措施</span>' + cons[i].floodSeasonMeasures);
					} else if(cons[i].floodSeasonLevelEnum == "较大（Ⅲ级）汛情") {
						$("#Large_Flood_Analysis").html(cons[i].floodSeasonAnalysis);
						$("#Large_Flood_Measures").html('<span>相应措施</span>' + cons[i].floodSeasonMeasures);
					} else if(cons[i].floodSeasonLevelEnum == "重大（Ⅱ级）汛情") {
						$("#Major_Flood_Analysis").html(cons[i].floodSeasonAnalysis);
						$("#Major_Flood_Measures").html('<span>相应措施</span>' + cons[i].floodSeasonMeasures);
					} else {
						$("#Ul1_Flood_Analysis").html(cons[i].floodSeasonAnalysis);
						$("#Ul1_Flood_Measures").html('<span>相应措施</span>' + cons[i].floodSeasonMeasures);
					}
				}
			}
		}
	});
}




//table分页--预案管理
function initTable(id){
	 $('#table-plan').bootstrapTable('destroy'); 
	 
	 $('#table-plan').bootstrapTable({
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
		 		title: '年度',
		 		width:"5%",
		 	},
		 	{
		 		field: 'fileName',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '应急预案文件名称',
		 		width:"5%",
		 	},
		 	{
		 		field: 'profileId',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '应急预案文件',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if (value == null || value == '') {
		 				return;
		 			} else{
		 				return seefile(value, row, index);
		 			}
		 		}
		 	},
		 	{
		 		field: 'approvalFileName',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '应急预案文件名称',
		 		width:"5%",
		 	},
		 	{
		 		field: 'proApprovalfileId',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '应急预案批文',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if (value == null || value == '') {		 				
		 				return ;
		 			} else{
		 				return seefile(value, row, index);
		 			}
		 		}
		 	},
		 	{
		 		field: 'emergencyPlanType',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '应急预案类型',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if (value == null || value == '') {
		 				return "---"
		 			} else{
		 				return value;
		 			}
		 		}
		 	},	
		 	
		 ],
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
			if (data.result==null) {
				console.log();
			} else{
				e = '<a  href="http://120.76.241.72/keqpdf/' + data.result.profileUrl + '" target="_blank" >查看文件</i></a>'
			}		
		}
	});
	return e;
}


function GetData(params,id){
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		url: apiUrl + "/ProjectCheck/GetProCheckEmergencyPlans",	
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

