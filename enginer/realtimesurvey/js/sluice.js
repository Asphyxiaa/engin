//var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwibmFtZSI6ImFkbWluIiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiJkNGJhYWE2ZS0xZTMxLTc0YzQtMWE5MC0zOWUxNDg0NDJhODciLCJyb2xlIjoiQWRtaW4iLCJodHRwOi8vd3d3LmFzcG5ldGJvaWxlcnBsYXRlLmNvbS9pZGVudGl0eS9jbGFpbXMvdGVuYW50SWQiOiIxIiwianRpIjoiYzQzODMyNjQtMjVhMC00MTFkLTg5NDEtYTAyMGNhNGExZjI1IiwiaWF0IjoxNTA2MDU5MjU1LCJuYmYiOjE1MDYwNTkyNTUsImV4cCI6MTUwNjE0NTY1NSwiaXNzIjoiQlpIUHJvIiwiYXVkIjoiQlpIUHJvIn0.6yplPvE1ncd53cTioHSLzn-TXAirm1KGH0G_8_5FexE";
var _width = $(window).width();
jQuery(document).ready(function () {
    // var startTime;
    // if (!token) { //如果cookies不存在

    //     window.location.href = "http://120.76.241.72:8092";
    //     return;
    // }
    // var endTime;
    // var CheckId;
    

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
                $('.dropdown-user').contents().find("#username").text(data.result.user.surname + data.result.user.name);

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
               $('.dropdown-user').contents().find("#userpic").attr('src', 'data:image/jpeg;base64,' + data.result.profilePicture);
            }
        });
    }

    $(".btn-primary").bind('click', function (event) {
        $.cookie('Abp.AuthToken', null, { expires: 1, path: '/' });
        window.location.href = "http://120.76.241.72:8060";
    });

    /*-树图开始-*/
    var ztreeData = [];
    //一级
    $.ajax({
	 	headers: {
	 		'Authorization': 'Bearer ' + token,
	 	},
	 	type: 'get',
	 	url: apiUrl + "/ProjectInfo/GetProGroups",
		success: function(data) {
            $('#treeDemo').text('');
			var content = data.result.items;
            for( i = 0; i< content.length; i++){
            	var id = content[i].id;
            	var groupName = content[i].groupName;

            	ztreeData.push({
					name: content[i].groupName,
					id: content[i].id,
	                pId: 0,
				});
				$.fn.zTree.init($("#treeDemo"), setting, ztreeData);
                var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                var node = treeObj.getNodeByParam("id" , 11);
                treeObj.selectNode(node);
                treeObj.expandAll(true);
            }
		},	
		error: function() {
			console.log("没有获取到数据");
		}
	});
    //二级
    var MaxResultCount = 1000;
    var SkipCount = 0;
    var typeId = 1;
	$.ajax({
		headers: {
	 		'Authorization': 'Bearer ' + token,
	 	},
	 	type: 'get',
	 	data:{
          "projectTypeId": typeId,
          "MaxResultCount": MaxResultCount,
          "SkipCount" : SkipCount
	 	},
	 	url: apiUrl + "/ProjectInfo/GetProInfos",
		success: function(json) {
			$('.line').text(' ');
			var json = json.result.items;
			for ( i = 0; i< json.length; i++){
				var id = json[i].id;
				var a= i+1;
				ztreeData.push({
					name: json[i].proName,
					id: json[i].id,
	                pId: a,
				});
				$.fn.zTree.init($("#treeDemo"), setting, ztreeData);
                var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                var node = treeObj.getNodeByParam("id" , json[0].id);
                treeObj.selectNode(node);
                treeObj.setting.callback.onClick(null ,treeObj.setting.treeDemoid, node );//默认点击
                treeObj.expandAll(true);
			}

		},	
		error: function() {
		}
	});
    //初始化	
	var setting = {
		view: {
			dblClickExpand: true,
			showLine: true,
			selectedMulti: false
		},
		data: {
			simpleData: {
				enable:true,
				idKey: "id",
				pIdKey: "pId",
				rootPId: 0
			}
		},
		callback: {
			onClick: zTreeOnClick
		}
	};
    function zTreeOnClick(event, treeId, treeNode) {
     	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
         if( treeNode.isParent) {
            treeObj.expandNode(treeNode);
            return false;
         }else{
            $('.item-info').text(treeNode.name);
         }
    }

    initUserName(); //data:image/jpeg;base64
    initUserPic();

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
});

