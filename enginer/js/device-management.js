var cebian=$(document).height()-280;
$("#ztree").css("height",cebian);

window.onload=function(){
	initTable(see.eq(0).attr("id"));
	see.eq(0).parent().addClass("ztreelic");
}
  $(".btn-primary").bind('click', function (event) {
        $.cookie('Abp.AuthToken', null, { expires: 1, path: '/' });
        window.location.href = "http://120.76.241.72:8060";
    });

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
var li=$("#ztree li");

var see=$("#ztree .check");


//查看
seeclick(see);
function seeclick(see){
	for (var i=0;i<see.length;i++) {
		see.eq(i).click(function(){
			var id=$(this).attr('id');
			var pid=$(this).attr("pid");
			$(this).parent().addClass("ztreelic");
			$(this).parent().siblings().removeClass("ztreelic");
			initTable(id);
		})
	}
}


//initTable();
//table分页
function initTable(id){
	 $('#table-device').bootstrapTable('destroy'); 
	 
	 $('#table-device').bootstrapTable({
		 ajax: function (params) {
			GetData(params,id);
		},
		 striped: true,  //表格显示条纹  
		 pagination:false, //启动分页  
	     pageSize: 10,  //每页显示的记录数  
	     pageNumber:1,
	     sidePagination: "server",
		 columns: [
		 	{
		 		field: 'proName',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '工程名称	',
		 		width:"5%",
		 	},
		 	{
		 		field: 'equipmentName',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '设备名称',
		 		width:"5%",
		 	},
		 	{
		 		field: 'equipmentCount',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '数量',
		 		width:"5%",
		 	},
		 	{
		 		field: 'equipmentUnit',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '单位',
		 		width:"5%",
		 	},
		 	{
		 		field: 'modelParameter',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '型号及参数',
		 		width:"5%",
		 	},
		 	{
		 		field: 'level',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '等级',
		 		width:"5%",
		 	},
		 	{
		 		field: 'putDate',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '投运时间',
		 		width:"5%",
		 		formatter:function(value, row, index){
		 			if (value == null || value == '') {
		 				return "-";
		 			} else{
		 				var putdate=new Date(value).Format("yyyy-MM-dd hh:mm:ss");
		 				return putdate;
		 			}
		 			
		 		}
		 	},
		 	{
		 		field: 'isSupervise',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '是否需要监管',
		 		width:"5%",
		 		formatter: function(value, row, index) {
                    var html = "--";
                    if (value) {
                        html = "是";
                    } else  {
                        html = "否";
                    }
                    return html;
                }
		 	},
		 	{
		 		field: 'isValid',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '是否有效',
		 		width:"5%",
		 		formatter: function (value, row, index) {
                    var html = "--";
                    if (value) {
                        html = "是";
                    } else  {
                        html = "否";
                    }
                    return html;
                } 
		 	},
		 	{
		 		field: 'isUpload',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '上报状态',
		 		width:"5%",
		 		formatter: function (value, row, index) {
                   var html = "--";
                    if (value) {
                        html = "已上报";
                    } else  {
                        html = "未上报";
                    }
                    return html;
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
		url:apiUrl + '/ProjectInfo/GetProInfoEquipmentManagements',
		type: "GET",
		dataType: "json",
		data:{
			MaxResultCount:params.data.limit,
			SkipCount:params.data.offset,
			projectId:id,
		},
		success: function(data) {
//			console.log(data);
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