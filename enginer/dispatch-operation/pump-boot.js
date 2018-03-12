var defaultid='';
if (window.location.search=="") {
//	defaultid=see.eq(0).attr('id');
	console.log();
} else{
	defaultid=GetQueryString("Id");
}
//console.log(defaultid);

function GetQueryString(Id){
     var reg = new RegExp("(^|&)"+ Id +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}


$.ajax({
	headers: {
		'Authorization': 'Bearer ' + token,
	},
	url: apiUrl + '/ProjectTask/GetProInfoPumpOperationInstructionForEdit',
	type: "GET",
	dataType: "json",
	data: {
		Id:defaultid
	},
	success: function(data) {
		console.log(data);
	}
});

