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
//树图列表
$.ajax({
	headers: {
		'Authorization': 'Bearer ' + token,
	},
	url:apiUrl + "/OrganizationUnit/GetOrganizationUnits",
	type: 'get',
	success: function(con) {
		$('body').mLoading("hide");
		var list = [];
		for(var i = 0; i < con.result.items.length; i++) {
			var parentId = con.result.items[i].parentId == null ? 0 : con.result.items[i].parentId;
			list.push({
				"parentId": parentId,
				"code": con.result.items[i].code,
				"displayName": con.result.items[i].displayName,
				"memberCount": con.result.items[i].memberCount,
				"id": con.result.items[i].id
			});
		}
//		console.log(list);
		getTrees(list, 0);
		var showlist = $("<ul id='org' style='display:none'></ul>");
		showall(list, showlist);
		$("#chart").append(showlist);
		$("#org").jOrgChart({
			chartElement: '#chart', //指定在某个dom生成jorgchart
			dragAndDrop: false //设置是否可拖动
		});
	}
});
	
function getTrees(list, parentId) {
	var items = {};
	for(var i = 0; i < list.length; i++) {
		var key = list[i].parentId;
		if(items[key]) {
			items[key].push(list[i]);
		} else {
			items[key] = [];
			items[key].push(list[i]);
		}
	}
	return formatTree(items, parentId);
}

function formatTree(items, parentId) {
	var result = [];
	if(!items[parentId]) {
		return result;
	}
	for(var t of items[parentId]) {
		t.children = formatTree(items, t.id)
		result.push(t);
	}
	return result;
}

function showall(menu_list, parent) {
	$.each(menu_list, function(index, val) {
		if(val.children.length > 0) {
			var li = $("<li></li>");
			li.append('<div class="table"><span class="mid">' + val.displayName + '</span></div>').append("<ul></ul>").appendTo(parent);
			//递归显示
			showall(val.children, $(li).children().eq(1));
		} else {
			$("<li></li>").append('<div class="table"><span class="mid">' + val.displayName + '</span></div>').appendTo(parent);
		}
	});
}

function hascon(v,r) {
    if (v == undefined || null == v ) {
        return r;
    } else {
        return v;
    }
};

$.ajax({
	headers: {
		'Authorization': 'Bearer ' + token,
	},
	type: 'GET',
	dataType: "json",
	url: apiUrl + "/Projectinfo/GetProInfoSluiceSupplement",
	success: function(data) {
		var con=data.result.items;
//		console.log(con[0].department_In_Charge	);
		$("#duty").html(hascon(con[0].department_Duty,"--"));
	}
});