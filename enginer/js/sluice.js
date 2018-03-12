var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwibmFtZSI6ImFkbWluIiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiJkNGJhYWE2ZS0xZTMxLTc0YzQtMWE5MC0zOWUxNDg0NDJhODciLCJyb2xlIjoiQWRtaW4iLCJodHRwOi8vd3d3LmFzcG5ldGJvaWxlcnBsYXRlLmNvbS9pZGVudGl0eS9jbGFpbXMvdGVuYW50SWQiOiIxIiwianRpIjoiYzQzODMyNjQtMjVhMC00MTFkLTg5NDEtYTAyMGNhNGExZjI1IiwiaWF0IjoxNTA2MDU5MjU1LCJuYmYiOjE1MDYwNTkyNTUsImV4cCI6MTUwNjE0NTY1NSwiaXNzIjoiQlpIUHJvIiwiYXVkIjoiQlpIUHJvIn0.6yplPvE1ncd53cTioHSLzn-TXAirm1KGH0G_8_5FexE";
var _width = $(window).width();
jQuery(document).ready(function () {
    var startTime;
    if (!token) { //如果cookies不存在

        window.location.href = "http://120.76.241.72:8092";
        return;
    }
    var endTime;
    var CheckId;
    

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
                $('#head').load(function () {
                    $('#head').contents().find("#username").text(data.result.user.surname + data.result.user.name);
                })
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
                $('#head').load(function () {
                    $('#head').contents().find("#userpic").attr('src', 'data:image/jpeg;base64,' + data.result.profilePicture);
                })
            }
        });
    }
    /*-树图开始-*/
    var ztreeData = [];
    //加载
    $.ajax({
	 	headers: {
	 		'Authorization': 'Bearer ' + token,
	 	},
	 	type: 'get',
	 	url: apiUrl + "/ProjectMonitor/GetVideos",
		success: function(json) {
			var json = json.result.items;
			load(json);
			for(var a=0;a<json.length;a++){
				if(json[a].parentId==null){
					var bt=json[a].id;
					var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
					var node = treeObj.getNodeByParam("id", bt);
					treeObj.selectNode(node);//展开
					treeObj.expandAll(true);
					setting.callback.onClick = defaultclick(bt);
				}
			}
		},	
		error: function() {
			console.log("没有获取到数据");
		}
	});
	
	var setting = {
		view: {
			nameIsHTML: true
		},
		data: {
			simpleData: {
				enable: true
			}
		},
		callback: {
			onClick: zTreeOnClick
		},
		treeNodeKey: "id", //在isSimpleData格式下，当前节点id属性    
		treeNodeParentKey: "pId", //在isSimpleData格式下，当前节点的父节点id属性    
		showLine: true, //是否显示节点间的连线    
		checkable: true
	};

	
	
	function load(data){
		for(i = 0; i < data.length; i++) {
			ztreeData.push({
				name: data[i].videoName,
				id: data[i].id,
                pId: data[i].parentId,
			})
			$.fn.zTree.init($("#treeDemo"), setting, ztreeData);
		}
	}

    setTimeout(initUserPic(), 1000);
    initUserName(); //data:image/jpeg;base64,
//  initChart();

    var apiUrl = "http://120.76.241.72:8092/api/services/app";
    var serverUrl = "http://120.76.241.72:8070/app/main";

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
});

