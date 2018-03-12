//默认情况
$.ajax({
	headers: {
		'Authorization': 'Bearer ' + token,
	},
	type: 'GET',
	dataType: "json",
	url: apiUrl + "/ProjectInfo/GetProjectInfoView",
	success: function(data) {
		var con = data.result.items;
		var arr=[];
		for(let i = 0; i < con.length; i++) {
			arr.push({
				title: con[i].proName,
				value: con[i].id
			})
			for(let j=0;j<con[i].profilePictureIds.length;j++){
				$.ajax({
					headers: {
						'Authorization': 'Bearer ' + token,	
					},
					type:"get",	
					async: false,
					url:apiUrl+ "/Profile/GetProfilePictureById",
					data:{
						profilePictureId:con[i].profilePictureIds[j],
					},
					success:function(json){
						var cons=json.result;
						$(".swiper-wrapper:last-child").append(`
							<div class="swiper-slide">
								<img style="width:100%;" src=data:image/jpg;base64,${cons.profilePicture} alt="">
							</div>
							`);	
					}					
				})
			}
			$(".swiper-container").swiper({
				loop: true,
				autoplay: 3000
			});
		}		
		selecttype(arr);
		$("#job").attr("value",arr[0].title);
		$(".article").html(con[0].proInformation);	
	}
});

//手动选择
function selecttype(arr){
	$("#job").select({
		title: "选择工程",
		items:arr,
		onChange: function(d) {
			var id=this.data.values;
			//==========
			$.ajax({
				headers: {
					'Authorization': 'Bearer ' + token,
				},
				type: 'GET',
				dataType: "json",
				data:{
					ProjectId:id,
				},
				url: apiUrl + "/ProjectInfo/GetProjectInfoView",
				success: function(data) {
					var con = data.result.items;
					var arr=[];
					for(let i = 0; i < con.length; i++) {
						arr.push({
							title: con[i].proName,
							value: con[i].id
						})
						for(let j=0;j<con[i].profilePictureIds.length;j++){
							$.ajax({
								headers: {
									'Authorization': 'Bearer ' + token,	
								},
								type:"get",	
								async: false,
								url:apiUrl+ "/Profile/GetProfilePictureById",
								data:{
									profilePictureId:con[i].profilePictureIds[j],
								},
								success:function(json){
									var cons=json.result;
									$(".swiper-wrapper:last-child").append(`
										<div class="swiper-slide">
											<img style="width:100%;" src=data:image/jpg;base64,${cons.profilePicture} alt="">
										</div>
										`);	
								}					
							})
						}
						$(".swiper-container").swiper({
							loop: true,
							autoplay: 3000
						});
						$(".article").html(con[i].proInformation);	
					}		
					selecttype(arr);				
				}
			});
			//==========
		},
		onClose: function() {
		},
		onOpen: function() {
		},
	});
}







//[
//        {
//          title: "iPhone 3GS",
//          value: "001",
//        },
//        {
//          title: "iPhone 5",
//          value: "002",
//        },
//        {
//          title: "iPhone 5S",
//          value: "003",
//        },
//        {
//          title: "iPhone 6",
//          value: "004",
//        },
//        {
//          title: "iPhone 6S",
//          value: "005",
//        },
//        {
//          title: "iPhone 6P",
//          value: "006",
//        },
//        {
//          title: "iPhone 6SP",
//          value: "007",
//        },
//        {
//          title: "iPhone SE",
//          value: "008",
//        },
//        {
//          title: "iPhone 7",
//          value: "009"
//        }
//      ],