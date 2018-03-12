/*
*   JQuery 1.9.1
*   leiyu 2014-7-28
*   修改前请先备份
//*/
$(function () {
//  /*===================菜单 JS 动作=====================*/
    var menus = $(".t_c_bottom ul>li:first").siblings().addBack();
    var thisMenu = $("#thisMenu");
    var mt = 161;//默认距离
    var mNow = 0;//获取当前的li
    for (var i = 0; i < menus.length; i++) {
        if (menus.eq(i).hasClass("thisli"))
            mNow = i;
    }
    //给定 thisli 默认位置
    thisMenu.css({ left: (mNow * 104 + mt) + "px" });
    menus.hover(function () {
        MenuMove($(this), ($(this).index() * 104 + mt), 1)
    }, function () {
        MenuMove($(this), (mNow * 104 + mt), 0)
    });
    var MenuAuto;
    function MenuMove(tn, lefts, move) {
        var ti = tn.index();
        var nodes = menus.eq(ti).children(".Nodes");
        nodes.stop();
        clearTimeout(MenuAuto);
        var _h = nodes.children("ul").height() + 23;//8个像素是上、下圆角图片高度 15个像素是 div 的 padding 值
        if (move === 1) {
            thisMenu.stop();
            thisMenu.animate({ left: lefts + "px" }, 165)
            nodes.css({ height: "0px" }).animate({ height: _h + "px" }, 300);
        }
        else if (move === 0) {
            nodes.css({ height: _h + "px" }).animate({ height: "0px" }, 300);
            MenuAuto = setTimeout(function () {
                thisMenu.animate({ left: lefts + "px" }, 300)
            }, 1250);
        }
    }
})

//var token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwibmFtZSI6ImFkbWluIiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiJkNGJhYWE2ZS0xZTMxLTc0YzQtMWE5MC0zOWUxNDg0NDJhODciLCJyb2xlIjoiQWRtaW4iLCJodHRwOi8vd3d3LmFzcG5ldGJvaWxlcnBsYXRlLmNvbS9pZGVudGl0eS9jbGFpbXMvdGVuYW50SWQiOiIxIiwianRpIjoiOWEzMzUxYTgtNTFkYy00OTllLWE3ZjYtZjhlYzUyYjE5MmJjIiwiaWF0IjoxNTA2NTc3Nzk1LCJuYmYiOjE1MDY1Nzc3OTUsImV4cCI6MTUwNjY2NDE5NSwiaXNzIjoiQlpIUHJvIiwiYXVkIjoiQlpIUHJvIn0.vyANzW2znmDdhqfkXNakEPb_zfUXVOGj5hQc8ySNPCE";
//
////
//$.ajax({
//	headers: {
//		'Authorization': 'Bearer ' + token,
//	},
//	url: "http://120.76.241.72:8092/api/services/app/ProjectConfig/GetProjectMenus",
//	type: 'get',
//	data:{
//		ParentId:0,
//	},
//	success:function(data) {
//		var con=data.result.items;
////		console.log(con);
//		var list = [];
//		for(var i = 0; i < con.length; i++) {
//			var parentId = con[i].parentId == null ? 0 : con[i].parentId;
//			list.push({
//				"parentId": parentId,
//				"menuIcon": con[i].menuIcon,
//				"menuName": con[i].menuName,
//				"id": con[i].id,
//				"routeUrl":con[i].routeUrl,
//			});
//		}
//		getTrees(list, 0);
//		console.log(list);
//		var showlist = $('#nav');
//		showall(list, showlist);
//	}
//});
//	
//function getTrees(list, parentId) {
//	var items = {};
//	for(var i = 0; i < list.length; i++) {
//		var key = list[i].parentId;
//		if(items[key]) {
//			items[key].push(list[i]);
//		} else {
//			items[key] = [];
//			items[key].push(list[i]);
//		}
//	}
//	return formatTree(items, parentId);
//}
//
//function formatTree(items, parentId) {
//	var result = [];
//	if(!items[parentId]) {
//		return result;
//	}
//	for(var t of items[parentId]) {
//		t.children = formatTree(items, t.id)
//		result.push(t);
//	}
//	return result;
//}




//function showall(menu_list, parent) {
//	$.each(menu_list, function(index, val) {
//		if(val.children.length > 0) {
//			var li = $("<li></li>");
//			li.append('<a href="#"><em>'+val.menuName+'</em></a>').append('<div class="Nodes"><ul></ul></div>').appendTo(parent);
////			$("<li></li>").append('<li><a href="#">' + val.menuName + '</a></li>').appendTo(parent);
////			console.log($(".Nodes ul"))
//			showchild(val.children, $(".Nodes ul"));
//		}
//	});
//}
//
//function showchild(val,parent){	
//	console.log(val);
//	$("<li></li>").append('<a href="#">' +val.menuName + '</a>').appendTo(parent);
//}












