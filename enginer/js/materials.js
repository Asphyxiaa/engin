$(".stock").click(function(){
	$(".zuo").show();
	$(".con").show();
	$(".warehousing-admin").hide();
	$(".admin").hide();
	$(".tab-box").parent().addClass("tab");
	$(this).parent().addClass("active");
	$(this).parent().siblings().removeClass("active");
})


$(".warehousing").click(function(){
	$(".zuo").hide();
	$(".con").hide();
	$(".warehousing-admin").show();	
	$(".admin").show();
	$(".tab-box").parent().addClass("tab");
	$(this).parent().addClass("active");
	$(this).parent().siblings().removeClass("active");
})



//$('.pgwSlideshow').pgwSlideshow({
//	ransitionEffect: "fading",
//	adaptiveDuration: 2000, //间隔
//	displayControls: false, //左右控制
//});

//$(".btn-search").click(function(){
//	console.log($("#start").val());
//})	
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


    lightbox.option({
      'resizeDuration':500,
      'wrapAround': false,
      'imageFadeDuration':500,
    })


//table分页
initTable();
function initTable(){
	 $('#table-materials').bootstrapTable('destroy'); 
	 
	 $('#table-materials').bootstrapTable({
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
		 		title: '物资仓库',
		 		width:"4%",
		 	},
		 	{
		 		field: 'userName',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '物资名称',
		 		width:"4%",
		 	},
		 	{
		 		field: 'mobile',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '出入库操作',
		 		width:"4%",
		 	},
		 	{
		 		field: 'mobile',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '出入库日期',
		 		width:"4%",
		 		formatter: function (value, row, index) {
                    if (!IsEmpty(value)) {
                        return value.substr(0, 10);
                    } else {
                        return "--";
                    }
                }
		 	},
		 	{
		 		field: 'mobile',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '数量',
		 		width:"4%",
		 	},
		 	{
		 		field: 'mobile',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '单位	',
		 		width:"4%",
		 	},
		 	{
		 		field: 'mobile',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '经办人',
		 		width:"4%",
		 	},
		 	{
		 		field: 'mobile',
		 		align: 'center',
		 		valign: 'middle',
		 		title: '事由',
		 		width:"4%",
		 		formatter: function (value, row, index) {
                     if (!IsEmpty(value)) {
                         return '<span title="' + value + '">' + CutStr(value, 20) + '</span>';
                     } else {
                         return "--";
                     }
                 }
		 	},
		 	
		 ],
	});
}


//function GetData(params){
//	$.ajax({
//		headers: {
//			'Authorization': 'Bearer ' + token,
//		},
//		url:apiUrl + 'http://120.76.241.72:8092/api/services/app/ProjectInfo/GetProInfoSluiceSupplementInspect',
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
