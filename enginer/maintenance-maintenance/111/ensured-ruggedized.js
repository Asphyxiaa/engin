var cebian=$(document).height()-230;
$("#ztree").css("height",cebian);


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
		url: "http://120.76.241.72:8092/api/services/app/ProjectInfo/GetProInfos",
		success: function(data) {
			var con=data.result.items;
			$("#ztree").empty();
			for (var i=0;i<con.length;i++) {
				$("#ztree").append('<li class="ztreeli"><span class="lie">'+con[i].proName+'</span><a class="check" id="'+con[i].id+'" pid="'+con[i].projectTypeId+'" style="float: right;">查看</a></li>');			
			}
//			var see=$(".check");
//			seeclick(see);
		}
	});
})



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