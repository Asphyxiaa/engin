
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

/*工程图*/
$.ajax({
	headers: {
		'Authorization': 'Bearer ' + token,
	},
	type: 'GET',
	url: apiUrl + "/Projectinfo/GetProTypes",
	dataType: "json",
	success: function(data) {
		$('body').mLoading("hide");
		var files = data.result.items;
		var name = [];
		var nameval = [];
		var nv = [];
		for(var i = 0; i < files.length; i++) {
			name.push(files[i].typeName);
			$.ajax({
				headers: {
					'Authorization': 'Bearer ' + token,
				},
				async: false,
				type: 'GET',
				url: apiUrl + "/Projectinfo/GetProInfos",
				dataType: "json",
				data: {
					ProjectTypeId: files[i].id,
					MaxResultCount: 1000,
					SkipCount: 0
				},
				success: function(json) {
					var con = json.result.items;
					nameval.push(con.length);
					nv.push({
						name: name[i],
						value: nameval[i]
					})
					ecgongcheng(name, nv);
				}
			})
		}
	}
})

function ecgongcheng(arrname, nv) {
	var myChart = echarts.init(document.getElementById('ec-gong'));
	// 指定图表的配置项和数据
	var option = {
		tooltip: {
			trigger: 'axis',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			orient: 'horizontal',
			x: 'center',
			y: 'bottom',
			data: arrname
		},
		calculable: true,
		series: [{
			name: '访问来源',
			type: 'pie',
			radius: ['50%', '70%'],
			hoverAnimation: false,
			itemStyle: {
				normal: {
					label: {
						show: true
					},
					labelLine: {
						show: true
					}
				},
				emphasis: {
					label: {
						show: true,
						position: 'center',
						formatter: '{c}座',
						textStyle: {
							fontSize: '20',
							fontWeight: 'bold'
						}
					}
				}
			},
			data: nv,
			color: ['red', 'green'],
		}]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}

/*人员图*/

$.ajax({
	headers: {
		'Authorization': 'Bearer ' + token,
	},
	type: 'GET',
	url: apiUrl + "/Projectinfo/GetProEnums",
	dataType: "json",
	data: {
		ModuleType: "ProInfoManager",
		ModuleSubType: "Education"
	},
	success: function(data) {
		var files = data.result.items;
		var names=[];
		for (var i=0;i<files.length;i++) {
			names.push(files[i].enumValue);
		}
		datas(data,names);
	}
})

var dataSS = [];

function datas(enumData,names) {
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		type: 'GET',
		url: apiUrl + "/Projectinfo/GetProInfoManagers",
		dataType: "json",
		data: {
			SupplementId: 1,
			MaxResultCount: 1000,
			SkipCount: 0
		},
		success: function(json) {
			var con = json.result.items;
			var enumJSON = enumData.result.items;
			var count = 0;
			for(var i = 0; i < enumJSON.length; i++) {
				count = 0;
				var name = enumJSON[i].enumValue;
				var enumTypeCode = enumJSON[i].enumTypeCode;
				for(var j = 0; j < con.length; j++) {
					var educationEnumId = con[j].educationEnumId;
					if(enumTypeCode == educationEnumId) {
						count++;
					}
				}
				dataSS.push({
					name: name,
					value: count
				});
				
			}
			people(names,dataSS)
//			console.log(name,dataSS)
		}
	});	
}

function people(peoplename, peopledata) {
	var myChart = echarts.init(document.getElementById('ec-ren'));

	// 指定图表的配置项和数据
	var option = {
		tooltip: {
			trigger: 'axis',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			orient: 'horizontal',
			x: 'center',
			y: 'bottom',
			data: peoplename
		},
		calculable: true,
		series: [{
			name: '访问来源',
			type: 'pie',
			radius: ['50%', '70%'],
			hoverAnimation: false,
			itemStyle: {
				normal: {
					label: {
						show: true
					},
					labelLine: {
						show: true
					}
				},
				emphasis: {
					label: {
						show: true,
						position: 'center',
						formatter: '{c}人',
						textStyle: {
							fontSize: '20',
							fontWeight: 'bold'
						}
					}
				}
			},
			data: peopledata,
			color: ['red', 'orange', 'greenyellow', 'green', 'purple', 'blue', 'cyan'],
		}]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}

/*有无内容*/
function hascon(v, r) {
	if(v == undefined || null == v) {
		return r;
	} else {
		return v;
	}
};

//管理单位
$.ajax({
	headers: {
		'Authorization': 'Bearer ' + token,
	},
	type: 'GET',
	dataType: "json",
	url: apiUrl + "/Projectinfo/GetProInfoSluiceSupplement",
	success: function(data) {
		var con = data.result.items;
//				console.log(con[0]);
		for(var i = 0; i < con.length; i++) {
			$(".manage_Unit_Name").html(hascon(con[i].manage_Unit_Name, "---"));			
			$(".manage_Unit_Property_Name").html(hascon(con[i].manage_Unit_Property_Name,"---"));			
			$(".manage_Unit_Address").html(hascon(con[i].manage_Unit_Address, "---"));
			$(".manage_Unit_Phone").html(hascon(con[i].manage_Unit_Phone, "---"));
			$(".manage_Unit_Fax").html(hascon(con[i].manage_Unit_Fax, "---"));
			$(".manage_Unit_Duty_Phone").html(hascon(con[i].manage_Unit_Duty_Phone, "---"));
			$(".manage_Unit_Post_Count").html(hascon(con[i].manage_Unit_Post_Count, "---"));
			$(".manage_Unit_Work_Staff_Count").html(hascon(con[i].manage_Unit_Work_Staff_Count, "---"));
			$(".manage_Unit_Charge_Person_Name").html(hascon(con[i].manage_Unit_Charge_Person_Name, "---"));
			$(".manage_Unit_Charge_Person_Phone").html(hascon(con[i].manage_Unit_Charge_Person_Phone, "---"));
			$(".manage_Unit_Charge_Person_Mobile").html(hascon(con[i].manage_Unit_Charge_Person_Mobile, "---"));
			$(".uplevel_Water_Gov_Department").html(hascon(con[i].uplevel_Water_Gov_Department, "---"));
			$(".department_In_Charge").html(hascon(con[i].department_In_Charge, "---"));
			$(".flood_Season_Phone").html(hascon(con[i].flood_Season_Phone, "---"));
			$(".supervisor_Department").html(hascon(con[i].supervisor_Department, "---"));
			$(".superintendent_Water_Department").html(hascon(con[i].superintendent_Water_Department, "---"));
			$(".principal_Person").html(hascon(con[i].principal_Person, "---"));
			$(".principal_Person_Phone").html(hascon(con[i].principal_Person_Phone, "---"));
			$(".principal_Person_Mobile").html(hascon(con[i].principal_Person_Mobile, "---"));
			$(".technical_Director_Phone").html(hascon(con[i].technical_Director_Phone, "---"));
			$(".technical_Director_Mobile").html(hascon(con[i].technical_Director_Mobile, "---"));
			$(".manage_Unit_Work_Count").html(hascon(con[i].manage_Unit_Work_Count, "---"));			
			$(".manage_Establishment_Count").html(hascon(con[i].manage_Establishment_Count, "---"));
//			$(".responsible_FileId").html(hascon(con[i].responsible_FileId, "---"));
			$("#unit_Introduction").html(hascon(con[i].unit_Introduction, "---"));
			//格式时间
			var newtime=new Date(con[i].lately_Upload_Time).Format("yyyy-MM-dd");
			$(".lately_Upload_Time").html(hascon(newtime, "---"));
			//文件	
			
			$(".responsible_FileId").attr("filed",con[i].responsible_FileId);			
			$(".unit_Approval_FileId").attr("filed", con[i].unit_Approval_FileId);
			$(".principal_Person_FileId").attr("filed", con[i].principal_Person_FileId);
			$(".technical_Director_FileId").attr("filed", con[i].technical_Director_FileId);
			pichead(con[i].default_ProfilePictureId);
			safeid(con[i].safety_ResponsibilityId);
			
		}
	}
});

//查看文件
var filea = $(".form-well .form-group a");
for(let i = 0; i < filea.length; i++) {
	filea.eq(i).click(function() {
//		console.log($(this));
		$.ajax({
			headers: {
				'Authorization': 'Bearer ' + token,
			},
			type: 'GET',
			url: apiUrl + "/Projectinfo/GetPDFByGuid",
			dataType: "json",
			data: {
				Id: $(this).attr("filed"),
			},
			success: function(data) {
//				console.log(filea.eq(i).attr("href","imgUrl +data.result.profileUrl"));
//				console.log();
				var con = data.result;
				if(con == null) {
					alert("暂无数据")
				} else {
//					window.open(imgUrl + con.profileUrl);
					$(this).attr("href",imgUrl + con.profileUrl);
//					filea.eq(i).attr("href",''+imgUrl+''+con.profileUrl+'');
				}
			}
		})
	})
}

//图片
function pichead(id) {
	if(id == null) {
		$("#Manage_Unit_Image").attr("src", "../img/timg.jpg");
	} else {
		$.ajax({
			headers: {
				'Authorization': 'Bearer ' + token,
			},
			type: 'GET',
			url: apiUrl + "/Profile/GetProfilePictureById",
			dataType: "json",
			data: {
				profilePictureId: id,
			},
			success: function(data) {
				var files = data.result;
				var pic = document.getElementById("Manage_Unit_Image");
				pic.src = 'data:image/png;base64,' + files.profilePicture + '';
			}
		})
	}
}

//安全责任人
function safeid(id){
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		type: 'GET',
			url: apiUrl + "/Projectinfo/GetProSafetyResponsibilityForEdit",
			dataType: "json",
			data: {
				Id: id,
			},
			success: function(data) {
				var con=data.result;
//				for (var i=0;i<con.length;i++) {
					$(".headTotalGovernmentPerson").html(hascon(con.headTotalGovernmentPerson, "---"));				
					$(".headTotalGovernmentPersonPost").html(hascon(con.headTotalGovernmentPersonPost, "---"));
					$(".headChargeGovernmentPerson").html(hascon(con.headChargeGovernmentPerson, "---"));
					$(".headChargeGovernmentPersonPost").html(hascon(con.headChargeGovernmentPersonPost, "---"));
					$(".supervisorDepartmentPerson").html(hascon(con.supervisorDepartmentPerson, "---"));
					$(".supervisorDepartmentPersonPost").html(hascon(con.supervisorDepartmentPersonPost, "---"));
					$(".supervisorDepartmentUnit").html(hascon(con.supervisorDepartmentUnit, "---"));
					$(".supervisorDepartmentDutyPhone").html(hascon(con.supervisorDepartmentDutyPhone, "---"));
					
					$(".floodSupervisorPerson").html(hascon(con.floodSupervisorPerson, "---"));
					$(".floodSupervisorPersonPost").html(hascon(con.floodSupervisorPersonPost, "---"));
//				}			
			}
		})
}


//table分页
initTable();
function initTable(){
	 $('#table-unit').bootstrapTable('destroy'); 
	 
	 $('#table-unit').bootstrapTable({
		 ajax: function (params) {
			GetData(params,"Daily");
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
		 		title: '工程名称',
		 		width:"5%",
		 	},
		 	{
		 		field: 'userName',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '巡查员',
		 		width:"5%",
		 	},
		 	{
		 		field: 'mobile',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '手机',
		 		width:"5%",
		 	},		
		 ],
	});
}

function GetData(params){
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		url: apiUrl + '/ProjectInfo/GetProInfoSluiceSupplementInspect',
		type: "GET",
		dataType: "json",
		data:{
			MaxResultCount:params.data.limit,
			SkipCount:params.data.offset
		},
		success: function(data) {
			params.success({
				total: data.result.totalCount,
				rows: data.result.items
			});
		}
	});
}

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