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

//闸
$(".sz").click(function(){
	$("#Pump").show();
	$(".pump-group").hide();
	$(".pump-group_beng").hide();
	$(".sz").parent().addClass("active");
	$(".zm").parent().removeClass("active");
})

function group() {
	$("#Pump").hide();
	$(".pump-group").show();
	$(".pump-group_beng").hide();
	$(".zm").parent().addClass("active");
	$(".sz").parent().removeClass("active");

}
//泵
$(".bg").click(function(){
	$("#Pump").show();
	$(".pump-group_beng").hide();
	$(".pump-group").hide();
	$(".bg").parent().addClass("active");
	$(".bz").parent().removeClass("active");
})

function group_beng() {
	$("#Pump").hide();
	$(".pump-group_beng").show();
	$(".pump-group").hide();
	$(".bz").parent().addClass("active");
	$(".bg").parent().removeClass("active");
}


var cebian=$(document).height()-230;
$("#ztree").css("height",cebian);

var iframeH=$(document).outerHeight();




//信息
$(".engineerion-information").click(function(){
	if($(this).attr("isp")==1){
		$("#Pump_Info_beng").show();
		$("#Pump_Info").hide();
		$(".bg").parent().addClass("active");	 
		$(".bz").parent().removeClass("active");
	}else{
		$("#Pump_Info_beng").hide();
		$("#Pump_Info").show();
		$(".sz").parent().addClass("active");
		$(".zm").parent().removeClass("active");
	}
	$("#Pump").show();
	$("#form1 a").show();	
	$("#projectName").html(proName+"工程参数");
	$("#pdf").height(0);
	$("#pdf1").height(0);
	$("#pdf2").height(0);
	$("#tab_face").hide();
	$("#tab_blue").parent().addClass("tab");
	$("#tab_blue").hide();
	$(".limts").hide();
	$(".reg").hide();
	$(".safe").hide();	
	$(this).parent().addClass("active");
	$(this).parent().siblings().removeClass("active");
	
	$("#projectName").siblings().attr("href","http://120.76.241.72:8060/app/main/project-information");

})
//权限
$(".demarcation-limits").click(function(){
	$("#Pump_Info").hide();
	$("#Pump_Info_beng").hide();
	$(".pump-group_beng").hide();
	$("#form1 a").show();	
	$("#projectName").html(proName+$(".demarcation-limits").html())	
	$("#Pump").hide();
	$(".pump-group").hide();
	
	$("#tab_face").hide();
	$("#pdf").attr("width","100%");
	$("#pdf1").attr("width",0);
	$("#pdf2").attr("width",0);	
	$("#pdf").height(iframeH-200+"px");
	$("#pdf1").height(0);
	$("#pdf2").height(0);
	$("#tab_blue").parent().addClass("tab");
	$("#tab_blue").hide();
	$(".limts").show();
	$(".reg").hide();
	$(".safe").hide();
	$(this).parent().addClass("active");
	$(this).parent().siblings().removeClass("active");
	
	$("#projectName").siblings().attr("href","http://120.76.241.72:8060/app/main/designate-limit");
})
//登记
$(".registration").click(function(){
	$("#Pump_Info").hide();
	$("#Pump_Info_beng").hide();
	$(".pump-group_beng").hide();	
	$("#projectName").html(proName+$(".registration").html());	
	$("#Pump").hide();
	$("#form1 a").show();
	$(".pump-group").hide();
	$(".limts").hide();
	$(".reg").show();
	$(".safe").hide();
	$("#tab_face").hide();
	$("#pdf").attr("width",0);
	$("#pdf1").attr("width","100%");
	$("#pdf2").attr("width",0);
	$("#pdf").height(0);
	$("#pdf1").height(iframeH-200+"px");
	$("#pdf2").height(0);
	$("#tab_blue").parent().addClass("tab");
	$("#tab_blue").hide();
	$(this).parent().addClass("active");
	$(this).parent().siblings().removeClass("active");
	
	$("#projectName").siblings().attr("href","http://120.76.241.72:8060/app/main/register-check");
})
//安全
$(".safety-identification").click(function(){
	$("#Pump_Info").hide();
	$("#Pump_Info_beng").hide();
	$(".pump-group_beng").hide();	
	$("#projectName").html(proName+$(".safety-identification").html());	
	$("#Pump").hide();
	$("#form1 a").show();
	$(".pump-group").hide();
	$(".limts").hide();
	$(".reg").hide();	
	$(".safe").show();
	$("#tab_face").hide();
	$("#pdf").attr("width",0);
	$("#pdf1").attr("width",0);
	$("#pdf2").attr("width","100%");
	$("#pdf").height(0);
	$("#pdf1").height(0);
	$("#pdf2").height(iframeH-200+"px");
	$("#tab_blue").parent().addClass("tab");
	$("#tab_blue").hide();
	$(this).parent().addClass("active");
	$(this).parent().siblings().removeClass("active");
	
	$("#projectName").siblings().attr("href","http://120.76.241.72:8060/app/main/safety-assessment");
})
//图纸
$(".blueprint").click(function(){		
	$("#projectName").siblings().attr("href","http://120.76.241.72:8060/app/main/engineering-dawing");
	
	$("#Pump_Info").hide();
	$("#Pump_Info_beng").hide();
	$(".pump-group_beng").hide();
	$("#projectName").html(proName+$(".blueprint").html());	
	$("#Pump").hide();
	$("#form1 a").show();
	$(".pump-group").hide();
	$(".limts-reg").hide();
	$(".safe").hide();
	$("#pdf").height(0);
	$("#pdf1").height(0);
	$("#pdf2").height(0);
	$("#tab_face").hide();
	$("#tab_blue").parent().removeClass("tab");
	$("#tab_blue").show();
	$(this).parent().addClass("active");
	$(this).parent().siblings().removeClass("active");
	$("#tab_blue li").eq(0).trigger("click");
	$("#tab_blue li").eq(0).addClass("active");
	
	
});
//面貌
$(".engineering-face").click(function(){
	$("#projectName").siblings().attr("href","http://120.76.241.72:8060/app/main/project-face");
	
	$("#Pump_Info").hide();
	$("#Pump_Info_beng").hide();
	$(".pump-group_beng").hide();	
	$("#projectName").html(proName+$(".engineering-face").html());	
	$("#Pump").hide();
	$(".limts-reg").hide();
	$("#form1 a").show();
	$(".safe").hide();
	$(".pump-group").hide();
	$("#tab_blue").parent().removeClass("tab");
	$("#tab_blue").hide();	
	$("#tab_face").show();
	$("#pdf").height(0);
	$("#pdf1").height(0);
	$("#pdf2").height(0);
	$(this).parent().addClass("active");
	$(this).parent().siblings().removeClass("active");	
	$("#tab_face li").eq(0).trigger("click");
	$("#tab_face li").eq(0).addClass("active");
})



/*有无内容*/
function hascon(v,r) {
    if (v == undefined || null == v ) {
        return r;
    } else {
        return v;
    }
};

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

//类型选项
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
		url:apiUrl +  "/ProjectInfo/GetProInfos",
		success: function(data) {
			var con=data.result.items;
			$("#ztree").empty();
			for (var i=0;i<con.length;i++) {
				$("#ztree").append('<li class="ztreeli"><span class="lie">'+con[i].proName+'</span><a class="check" id="'+con[i].id+'" pid="'+con[i].projectTypeId+'" style="float: right;">查看</a></li>');			
			}
			var see=$("#ztree li");
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
var see=$("#ztree li");


//获取地址链接
var defaultid='';
if (window.location.search=="") {
	defaultid=see.eq(0).attr('id');
} else{
	defaultid=GetQueryString("proid");
}
function GetQueryString(Id){
     var reg = new RegExp("(^|&)"+ Id +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}



/*默认*/
var proName='';
$.ajax({
	headers: {
		'Authorization': 'Bearer ' + token,
	},
	type: 'GET',
	dataType: "json",
	url: apiUrl +"/Projectinfo/GetProInfoForEdit",
	data: {
		Id: defaultid,
	},
	success: function(data) {
		var con = data.result;
		$('body').mLoading("hide");
		proName=con.proName;
		var pid='';
		$("#projectName").html(proName+"工程参数");
		for (var a=0;a<see.length;a++) {
			if (see.eq(a).children("a").attr('id')==defaultid) {
				$(".ztreeli").eq(a).addClass("ztreelic");
				pid=see.eq(a).children("a").attr('pid');
			} 
		}		
		if(pid == 1) {
			$("#baseInfo").hide();
			$("#baseInfo_beng").show();
			$('.proname').html(hascon(con.proName, "---"));
			$('.longitude').html(hascon(con.longitude,"---"));
			$('.latitude').html(hascon(con.latitude,"---"));
		} else {
			$("#baseInfo").show();
			$("#baseInfo_beng").hide();
			$('.proname').html(hascon(con.proName, "---"));
			$('.adcd').html(hascon(con.adcd, "---"));
			$('.typecode').html(hascon(con.proInfoType, "---"));
			$('.typename').html(hascon(con.proInfoType, "---"));
			$('.typeid').html(hascon(con.proInfoType, "---"));
			$('.promation').html(hascon(con.proInformation, "---"));
			$('.procoord').html(hascon(con.proCoord, "---"));
			$('.longitude').html(hascon(con.longitude, "---"));
			$('.latitude').html(hascon(con.latitude, "---"));
			if(con.profilePictureId == null){
				$('.propic').html("---");
			}else{
				$('.propic').html("查看图片");
				waterpic(con.profilePictureId);
			}
		}
		
		if(pid==1){
			characteristic_beng(defaultid,pid);
		}else{
			characteristic_shui(defaultid,pid);
		}	
		
		management(defaultid,pid);
		limit(defaultid,pid);
		reg(defaultid,pid);
		safety(defaultid,pid);
		blue(defaultid,pid);
		face(defaultid,pid);
		pginformation(defaultid,pid);
		gateinformation(defaultid,pid);
	}	
});


//查看
seeclick(see);
function seeclick(see){
	for (var i=0;i<see.length;i++) {
		see.eq(i).click(function(){
			$('body').mLoading("show");
			var id=$(this).children("a").attr('id');
			var pid=$(this).children("a").attr('pid')
			$(".engineerion-information").attr("isp",pid);
			$(this).addClass("ztreelic");
			$(this).siblings().removeClass("ztreelic");

			if(pid==1){
				$(".bg").parent().addClass("active");
				$(".bz").parent().removeClass("active");
				$("#Pump_Info_beng li a").eq(0).trigger("click");
			}else{
				$(".sz").parent().addClass("active");
				$(".zm").parent().removeClass("active");
				$("#Pump_Info li a").eq(0).trigger("click");
			}
			$(".engineerion-information").trigger("click");
			
			$("#pdf").attr("width","100%");
			$("#pdf1").attr("width","100%");
			$("#pdf2").attr("width","100%");
			
			//基本
			$.ajax({
				headers: {
					'Authorization': 'Bearer ' + token,
				},
				type: 'GET',
				dataType: "json",
				url:apiUrl +"/Projectinfo/GetProInfoForEdit",
				data:{
					Id:id,
				},
				success: function(data) {
					var con=data.result;
//					console.log(con);
					$('body').mLoading("hide");
					proName=con.proName;
					$("#projectName").html(proName+"工程参数");
					if(pid==1){
						$("#baseInfo").hide();
						$("#baseInfo_beng").show();	
						$("#Pump_Info_beng").show();
						$("#Pump_Info").hide();
						$('.proname').html(hascon(con.proName,"---"));
						$('.longitude').html(hascon(con.longitude,"---"));
						$('.latitude').html(hascon(con.latitude,"---"));					
					}else{
						$("#baseInfo").show();
						$("#baseInfo_beng").hide();	
						$("#Pump_Info_beng").hide();
						$("#Pump_Info").show();
						$('.proname').html(hascon(con.proName,"---"));
						$('.adcd').html(hascon(con.adcd,"---"));
						$('.typecode').html(hascon(con.proInfoType,"---"));
						$('.typename').html(hascon(con.proInfoType,"---"));
						$('.typeid').html(hascon(con.proInfoType,"---"));
						$('.promation').html(hascon(con.proInformation,"---"));
						$('.procoord').html(hascon(con.proCoord,"---"));
						$('.longitude').html(hascon(con.longitude,"---"));
						$('.latitude').html(hascon(con.latitude,"---"));
						
						if(con.profilePictureId == null){
							$('.propic').html("---");
						}else{
							$('.propic').html("查看图片");
							waterpic(con.profilePictureId);
						}	
					}									
				}
			});
			//特性
			if($(this).children("a").attr("pid")==1){
				characteristic_beng(id,pid);
			}else{
				characteristic_shui(id,pid);
			}
			
			
			
			//管理
			management(id,pid);
			//限权
			limit(id,pid);
			//登记
			reg(id,pid);
			//安全
			safety(id,pid);	
			blue(id,pid);
			face(id,pid);
			
			pginformation(id);
			gateinformation(id);
		})
	}
}

//特性-水闸
function characteristic_shui(id,pid){
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		type: 'GET',
		dataType: "json",
		url: apiUrl +"/Projectinfo/GetProInfoSluiceBaseByProjectId",
		data: {
			ProjectId: id,
		},
		success: function(data) {
			var con=data.result;
//			console.log(con);
			if(con==null){
				$(".projectInfo").show();
				$("#projectInfo").hide();
				$("#projectInfo_beng").hide();
			} else {
				$("#projectInfo").show();
				$(".projectInfo").hide();
				$("#projectInfo_beng").hide();
				$('.village_Name').html(hascon(con.village_Name, "---"));
				$('.river_Name').html(hascon(con.river_Name, "---"));
				$('.river_Code').html(hascon(con.river_Code, "---"));
				$('.river_Level').html(hascon(con.river_Level, "---"));
				$('.basin_Name').html(hascon(con.basin_Name, "---"));				
				if(con.is_Complete==true){
					$('.is_Complete').html("是");
				}else{
					$('.is_Complete').html("否");
				}				
				$('.finish_Time').html(hascon(con.finish_Time, "---"));
				$('.sluice_Type').html(hascon(con.sluice_Type, "---"));
				if(con.is_Gate_Station_Project== true ){
					$('.is_Gate_Station_Project').html("是");
				}else{
					$('.is_Gate_Station_Project').html("否");
				}
				$('.is_Set_Brake_Engineering').html(hascon(con.is_Set_Brake_Engineering, "---"));
				$('.is_Traffic').html(hascon(con.is_Traffic, "---"));
				$('.reference_WL_Station_Name').html(hascon(con.reference_WL_Station_Name, "---"));
				$('.reference_WL_Station_Code').html(hascon(con.reference_WL_Station_Code, "---"));
				$('.reference_WL_Station_Warning_Level').html(hascon(con.reference_WL_Station_Warning_Level, "---"));
				$('.reference_WL_Station_Critical_Level').html(hascon(con.reference_WL_Station_Critical_Level, "---"));
				$('.engineering_Level').html(hascon(con.engineering_Level, "---"));
				$('.engineering_Scale').html(hascon(con.engineering_Scale, "---"));
				$('.elevation_System').html(hascon(con.elevation_System, "---"));
				$('.sluice_Hole_Total_Width').html(hascon(con.sluice_Hole_Total_Width, "---"));			
				$('.sluice_Hole_Number').html(hascon(con.sluice_Hole_Number, "---"));
				$('.gate_Type').html(hascon(con.gate_Type, "---"));
				$('.gate_Size').html(hascon(con.gate_Size, "---"));
				$('.hoist_Type').html(hascon(con.hoist_Type, "---"));
				$('.max_Flow').html(hascon(con.max_Flow, "---"));
				$('.sluice_Floor_Elevation').html(hascon(con.sluice_Floor_Elevation, "---"));
				$('.design_Sluice_Upstream_Level').html(hascon(con.design_Sluice_Upstream_Level, "---"));
				$('.check_Sluice_Upstream_Level').html(hascon(con.check_Sluice_Upstream_Level, "---"));				
				$('.biggest_Water_Level_Difference').html(hascon(con.biggest_Water_Level_Difference, "---"));
				$('.normal_Impoundage_Level').html(hascon(con.normal_Impoundage_Level, "---"));
				$('.meiyuflood_Period_Water_Level').html(hascon(con.meiyuflood_Period_Water_Level, "---"));
				$('.typhoon_Period_Water_Level').html(hascon(con.typhoon_Period_Water_Level, "---"));
				$('.has_Emergency_Power').html(hascon(con.has_Emergency_Power, "---"));
				
				//
				var newtime=new Date(con.completion_Time).Format("yyyy-MM-dd");				
				$('.completion_Time').html(hascon(newtime, "---"));
			}
		}
	});
}
//特性-泵站

function characteristic_beng(id,pid){
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		type: 'GET',
		dataType: "json",
		url: apiUrl +"/Projectinfo/GetProInfoPumpBaseByProjectId",
		data: {
			ProjectId: id,
		},
		success: function(data) {
			var con=data.result;
			if(con==null){
				$(".projectInfo").show();
				$("#projectInfo").hide();
				$("#projectInfo_beng").hide();
			}else{
				$("#projectInfo").hide();
				$(".projectInfo").hide();
				$("#projectInfo_beng").show();
				$('.village_Name').html(hascon(con.village_Name, "---"));
				$('.river_Name').html(hascon(con.river_Name, "---"));
				$('.river_Code').html(hascon(con.river_Code, "---"));				
				if(con.is_Complete== true ){
					$('.is_Complete').html("是");
				}else{
					$('.is_Complete').html("否");
				}
				$('.pumpStationType').html(hascon(con.pumpStationType, "---"));
				if(con.is_Gate_Station_Project== true ){
					$('.is_Gate_Station_Projects').html("是");
				}else{
					$('.is_Gate_Station_Projects').html("否");
				}
				$('.project_Task').html(hascon(con.project_Task, "---"));
				$('.pump_Reference_WL_Station_Code').html(hascon(con.pump_Reference_WL_Station_Code, "---"));
				$('.pump_Reference_WL_Station_Name').html(hascon(con.pump_Reference_WL_Station_Name, "---"));
				$(".pump_Reference_WL_Station_Warning_Level").html(hascon(con.pump_Reference_WL_Station_Warning_Level, "---"));
				$('.pump_Reference_WL_Station_Critical_Level').html(hascon(con.pump_Reference_WL_Station_Critical_Level, "---"));
				$('.projectLevel').html(hascon(con.projectLevel, "---"));
				$('.river_Water_Level').html(hascon(con.river_Water_Level, "---"));
				$('.pump_Count').html(hascon(con.pump_Count, "---"));
				$('.pump_Design_Flow').html(hascon(con.pump_Design_Flow, "---"));
				$('.installed_Flow').html(hascon(con.installed_Flow, "---"));
				$('.pump_Design_Head').html(hascon(con.pump_Design_Head, "---"));
				$('.motor_Number').html(hascon(con.motor_Number, "---"));
				$('.motor_Power').html(hascon(con.motor_Power, "---"));
				
				var newtime=new Date(con.completion_Time).Format("yyyy年MM月");
				$('.completion_Time').html(hascon(newtime, "---"));
				
				var startingtime=new Date(con.starting_Time).Format("yyyy年MM月");
				$('.starting_Time').html(hascon(startingtime, "---"));
				
				var finishtime=new Date(con.finish_Time).Format("yyyy年MM月");
				$('.finish_Time').html(hascon(finishtime, "---"));
				
			
			} 
		}
	});
}


//管理
function management(id,pid){
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		type: 'GET',
		dataType: "json",
		url: apiUrl +"/Projectinfo/GetProInfoSluiceSupplementByProjectId",
		data: {
			ProjectId: id,
		},
		success: function(data) {
			var con=data.result;
//			console.log(con);
			if(con == null) {
				$("#management").hide();
				$(".management").show();
			} else {
				$(".management").hide();
				$("#management").show();
				$('.manage_Unit_Name').html(hascon(con.manage_Unit_Name, "---"));
				$('.manage_Unit_Property').html(hascon(con.manage_Unit_Property_Name, "---"));
				$('.manage_Unit_Address').html(hascon(con.manage_Unit_Address, "---"));
				$('.manage_Unit_Phone').html(hascon(con.manage_Unit_Phone, "---"));
				$('.manage_Unit_Fax').html(hascon(con.manage_Unit_Fax, "---"));				
				$('.manage_Unit_Duty_Phone').html(hascon(con.manage_Unit_Duty_Phone, "---"));
				$('.manage_Unit_Post_Count').html(hascon(con.manage_Unit_Post_Count, "---"));
				$('.manage_Unit_Work_Staff_Count').html(hascon(con.manage_Unit_Work_Staff_Count, "---"));
				$('.manage_Unit_Charge_Person_Name').html(hascon(con.manage_Unit_Charge_Person_Name, "---"));
				$('.manage_Unit_Charge_Person_Phone').html(hascon(con.manage_Unit_Charge_Person_Phone, "---"));
				$('.manage_Unit_Charge_Person_Mobile').html(hascon(con.manage_Unit_Charge_Person_Mobile, "---"));
				$('.uplevel_Water_Gov_Department').html(hascon(con.uplevel_Water_Gov_Department, "---"));
				$('.department_In_Charge').html(hascon(con.department_In_Charge, "---"));								
			}
		}
	});
}
//限权
function limit(id,pid){
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		type: 'GET',
		dataType: "json",
		data: {
			ProjectId: id,
		},
		url: apiUrl + "/Projectinfo/GetProInfoDesignateLimit",
		success:function(data){
			var con=data.result;
//			console.log(con);
			if(con==null){
				$(".limts .fileName").html("---");
				$(".limts .registerDate").html("---");
				$(".limts .creationTime").html("---");
				$("#pdf").attr("src","../img/1111.pdf");
			}else{
				var newtime=new Date(con.registerDate).Format("yyyy-MM-dd");
				$(".limts .fileName").html(con.fileName);
				$(".limts .registerDate").html(newtime);
				$(".limts .creationTime").html(newtime);
				$("#pdf").attr("src",imgUrl+''+con.profileUrl);
			}
		}
	})
}
//登记
function reg(id,pid){
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		type: 'GET',
		dataType: "json",
		data: {
			ProjectId: id,
		},
		url: apiUrl + "/Projectinfo/GetProInfoRegisterCheck",
		success:function(data){
			var con=data.result;
//			console.log(con);
			if(con==null){
				$(".reg .fileName").html("---");
				$(".reg .registerDate").html("---");
				$(".reg .creationTime").html("---");
				$("#pdf1").attr("src","../img/1111.pdf");
			}else{
				var newtime=new Date(con.registerDate).Format("yyyy-MM-dd");
				$(".reg .fileName").html(con.fileName);
				$(".reg .registerDate").html(newtime);
				$(".reg .creationTime").html(newtime);
				$("#pdf1").attr("src",imgUrl+''+con.profileUrl);
			}		
		}
	})
}


//安全
function safety(id,pid){
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		type: 'GET',
		dataType: "json",
		data: {
			ProjectId: id,
		},
		url: apiUrl + "/Projectinfo/GetProInfoSafetyAssessment",
		success:function(data){
			var con=data.result;
//			console.log(con);
			if(con==null){
				$(".safe .fileName").html("---");
				$(".safe .creationtime").html("---");
				$(".safe .assessmentDate").html("---");
				$(".safe .assessmentUnitName").html("---");
				$(".safe .assessmentResult").html("---");
				$("#pdf2").attr("src","../img/1111.pdf");
			}else{
				var newsafetime=new Date(con.creationTime).Format("yyyy-MM-dd");
				
				var newtimeass=new Date(con.assessmentDate).Format("yyyy-MM-dd");
				$(".safe .fileName").html(con.fileName);
				$(".safe .creationtime").html(newsafetime);
				$("#pdf2").attr("src",imgUrl+''+con.profileUrl);
				$(".safe .assessmentDate").html(newtimeass);
				$(".safe .assessmentUnitName").html(con.assessmentUnitName);
				$(".safe .assessmentResult").html(con.assessmentResult);
			}		
		}
	})
}
var html="";
//枚举图纸
function blue(id,pid){
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		type: 'GET',
		async: false,
		data: {
			ModuleType: 'ProInfo',
			ModuleSubType: 'EngineeringDawings',
		},
		url: apiUrl + "/Projectinfo/GetProEnums",
		success: function(data) {
			var con = data.result.items;
//			console.log(con);
			$("#tab_blue").empty();
			for(var i = 0; i < con.length; i++) {			
				$("#tab_blue").append('<li fileid="'+con[i].enumTypeCode+'"><a>' + con[i].enumValue + '</a></li>');
			}
			
			var lis=$("#tab_blue li");			
			for(var k=0;k<lis.length;k++){
				lis.eq(k).click(function(){
					$("#pictureBox").empty();						
					$(this).siblings().removeClass("active");	
					$(this).addClass("active"); 	
					$.ajax({
						headers: {
							'Authorization': 'Bearer ' + token,
						},
						type:"get",		
						async: false,
						url: apiUrl + "/Projectinfo/GetProInfoEngineeringDawing",
						data:{
							ProjectId:id,
							FileTypeEnumId:$(this).attr("fileid")
						},
						success:function(data){
							var content = data.result.imgs;
							for (var q=0;q<content.length;q++) {
								$.ajax({
									headers: {
										'Authorization': 'Bearer ' + token,	
									},
									type:"get",	
									async: false,
									url:apiUrl +  "/Profile/GetProfilePictureById",
									data:{
										profilePictureId:content[q].positionPictureId,
									},
									success:function(json){
										var cons=json.result;
										$("#pictureBox").append('<li><img src="data:image/jpg;base64,'+cons.profilePicture+'" alt=""></li>');										
									}
								})								
							}
						}
					});
					$('.pgwSlideshow').pgwSlideshow({
						ransitionEffect: "fading",
						adaptiveDuration: 2000, //间隔
						displayControls: false, //左右控制
					});
				})			
			}								
		}		
	})
}

	
//枚举面貌
function face(id,pid){
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		type: 'GET',
		async: false,
		data: {
			ModuleType: 'ProInfo',
			ModuleSubType: 'ProjectFace',
		},
		url: apiUrl + "/Projectinfo/GetProEnums",
		success: function(data) {
			var con = data.result.items;
//			console.log(con);
			$("#tab_face").empty();
			for(var i = 0; i < con.length; i++) {			
				$("#tab_face").append('<li fileid="'+con[i].enumTypeCode+'"><a>' + con[i].enumValue + '</a></li>');
			}
			
			var lis=$("#tab_face li");			
			for(var k=0;k<lis.length;k++){
				lis.eq(k).click(function(){
					
					$("#pictureBox").empty();			
					$(this).siblings().removeClass("active");	
					$(this).addClass("active"); 
					$.ajax({
						headers: {
							'Authorization': 'Bearer ' + token,
						},
						type:"get",		
						async: false,
						url: apiUrl + "/Projectinfo/GetProInfoProjectFace",
						data:{
							ProjectId:id,
							FileTypeEnumId:$(this).attr("fileid")
						},
						success:function(data){
							var content = data.result.items;
							for (var q=0;q<content.length;q++) {
								$.ajax({
									headers: {
										'Authorization': 'Bearer ' + token,	
									},
									type:"get",	
									async: false,
									url:apiUrl+ "/Profile/GetProfilePictureById",
									data:{
										profilePictureId:content[q].profilePictureId,
									},
									success:function(json){
										var cons=json.result;
										$("#pictureBox").append('<li><img src="data:image/jpg;base64,'+cons.profilePicture+'" alt=""></li>');
									}
								})								
							}							
						}
					});
					$('.pgwSlideshow').pgwSlideshow({
						ransitionEffect: "fading",
						adaptiveDuration: 2000, //间隔
						displayControls: false, //左右控制
					});
				})			
			}
								
		}
		
	})
}

//泵组信息
function pginformation(id){
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		type: 'GET',
		dataType: "json",
		data:{
			ProjectId:id,
		},
		url: apiUrl + "/Projectinfo/GetProInfoPumpBasePumpByProjectId",
		success: function(data) {
			var con=data.result.items;
			$(".hbeng").siblings().empty();
			if(con.length==0){
				$(".kong_beng").show();
				$(".pump-group_beng table").hide();
			}else{
				$(".kong_beng").hide();
				$(".pump-group_beng table").show();
				for(var i=0;i<con.length;i++){
					$(".pump-group_beng table").append('<tr><td>'+con[i].pumpName+'</td><td>'+con[i].designFlow+'</td><td>'+con[i].installedFlow+'</td><td>'+con[i].installedPower+'</td><td>'+con[i].designHead+'</td></tr>')
				}
			}			
		}
	});
}
//闸门信息
function gateinformation(id){
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		type: 'GET',
		dataType: "json",
		data:{
			ProjectId:id,
		},
		url: apiUrl + "/Projectinfo/GetProInfoSluiceBaseGateByProjectId",
		success: function(data) {
			var con=data.result.items;
			$(".hzha").siblings().empty();			
			if(con.length==0){
				$(".kong").show();
				$(".pump-group table").hide();
			}else{
				$(".kong_beng").hide();
				$(".pump-group table").show();
				for(var i=0;i<con.length;i++){
					$(".pump-group table").append('<tr><td>'+con[i].gateName+'</td><td>'+con[i].gateType+'</td><td>'+con[i].gateHoistType+'</td><td>'+con[i].gateWidth+'</td><td>'+con[i].gateHeight+'</td><td>'+con[i].maxGateFlow+'</td></tr>')
				}
			}					
		}
	});
}


//水闸图片查看
function waterpic(id){
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		type: "get",
		url: apiUrl + "/Profile/GetProfilePictureById",
		data: {
			profilePictureId: id,
		},
		success: function(json) {
			var cons = json.result;
			$(".propic").attr("href",'data:image/jpg;base64,' + cons.profilePicture + ' ');
		}
	})
}


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


$(".btn-primary").bind('click', function (event) {
        $.cookie('Abp.AuthToken', null, { expires: 1, path: '/' });
        window.location.href = "http://120.76.241.72:8060";
    });
