var cebian=$(document).height()-280;
$("#ztree").css("height",cebian);

$('body').mLoading("show");

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
		initTable(con[0].id);
	}
});

//表格
//table分页
initTable();
function initTable(id){
	 $('#table-danger').bootstrapTable('destroy'); 
	 
	 $('#table-danger').bootstrapTable({
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
		 		field: 'proName',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '工程名称',
		 		width:"3%",
		 	},
		 	{
		 		field: 'dangerousManagementName',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '险情名称',
		 		width:"3%",
		 	},
		 	{
		 		field: 'dangerousManagementDescription',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '险情描述',
		 		width:"3%",
		 	},
		 	{
		 		field: 'findTime',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '发现时间',
		 		width:"3%",
		 		formatter:function(value, row, index){
		 			if (value==null||value==' ') {
		 				return "-";
		 			} else{
		 				var findtime = new Date(value).Format("yyyy-MM-dd hh:mm:ss");
		 				return findtime;
		 			}
		 			
		 		},
		 	},
		 	{
		 		field: 'disposeOfStatus',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '处置状态',
		 		width:"3%",
			},
			{
		 		field: 'fileName',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '附件名称',
		 		width:"3%",
			}, 
		 			 	
		 ],
	});
}

function GetData(params,id){
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		url: apiUrl + '/ProjectCheck/GetProCheckDangerousManagements',
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

  $(".btn-primary").bind('click', function (event) {
        $.cookie('Abp.AuthToken', null, { expires: 1, path: '/' });
        window.location.href = "http://120.76.241.72:8060";
    });