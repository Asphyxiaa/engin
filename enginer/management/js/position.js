var _width = $(window).width();
jQuery(document).ready(function () {
    
//  $('body').mLoading("show");
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

    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        type: 'get',
        url: apiUrl + "/OrganizationUnit/GetOrganizationUnits",
        success: function(data) {
            var content = data.result.items;
            for( i = 0; i< content.length; i++){
                if( content[i].parentId != null ){                 
                    var Oid = content[i].id;
                    var displayName= content[i].displayName
                    var parentId = content[i].parentId;
                    ztreeData.push({
                        name:displayName,
                        id: Oid*10000,
                        pId: 0,
                    });
                    $.ajax({
                        headers:{
                            'Authorization': 'Bearer ' + token,
                        },
                        type:'get',
                        async:false,
                        data:{
                           "SupplementId":parentId,
                           "Sorting": 0,
                           "MaxResultCount":1000
                        },
                        url:apiUrl + "/ProjectInfo/GetProInfoSluiceSupplementPosts",
                        success:function(data) {
                           var con=data.result.items;
                           for(a = 0; a<con.length; a++){

                              var organizationId=con[a].organizationId;
                              var posId=con[a].id;

                              var name = con[a].postName;
                              if( Oid == organizationId ){  
                                    ztreeData.push({
                                        name:name,
                                        id:posId,
                                        pId:Oid*10000,
                                    });
                                }
                                else{
                                  continue;                                    
                                }  

                                $.fn.zTree.init($("#treeDemo"), setting, ztreeData);
                                var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                                var nodes = treeObj.getNodes();  
                                var childNodes =treeObj.transformToArray (nodes[0]);     
                                var childNodes1 = treeObj.transformToArray(childNodes[1]);        
                                var node = treeObj.getNodeByParam("id" ,childNodes1[0].id);
                                treeObj.selectNode(node);
                                treeObj.setting.callback.onClick(null ,treeObj.setting.treeId, node);
                                treeObj.expandAll(true);
                            }         
                        },
                        error:function(){

                        }
                    });
                }
            }
		},	
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("没有获取到数据");
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

    function zTreeOnClick(event, treeId, treeNode){
        if( treeNode == null){
            alert('没有获取到数据');
        }
        else{
             var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
             if( treeNode.isParent) {
                treeObj.expandNode(treeNode);
                return false;
             }
             else{
                $.ajax({
                    headers: {
                    'Authorization': 'Bearer ' + token,
                    },
                    type: 'get',
                    data:{
                        "PostId":treeNode.id
                    },
                    url: apiUrl + "/ProjectInfo/GetProInfoSluiceSupplementPostMatterUser",
                    success: function(data) {
                    	$('body').mLoading("hide");
                       var post = data.result.post;
                       var matters = data.result.matters;
                       var users = data.result.users;
                       if( post != null){                  
                            var postName = post.postName;
                            var postTypeId = post.postTypeId;
                            var entCond = post.entryConditions;
                            var onDuty = post.onDutyPersonCount;
                            var personnelAndPost = post.personnelAndPost;
                            var isProperty = post.isProperty;
                            var postRes = post.postResponsibilities;

                            if( isProperty == true){
                                $('#Is_Property_Manage').text('是');
                            }else{
                                $('#Is_Property_Manage').text('否');
                            }

                            $('#Post_Name').text(postName);
                            $('#Post_Type_Name').text(postTypeId);
                            $('#Entry_Condition').text(entCond);
                            $('#Post_Members').text(onDuty);
                            $('#Part_Time_Job').text(personnelAndPost);
                            $('#Duty').text(postRes);

                            if( matters.length > 0){
                                $('#dataTable tbody').text('');
                                for( i=0; i< matters.length;i++){
                                    var matterName = matters[i].matterName;
                                    var affairs = matters[i].affairs;
                                    var matterContent = matters[i].matterContent;
                                    var msg= '<tr data-index="'+ i +'" class=" ">'+
                                                '<td style="text-align: center; vertical-align: middle; ">'+ matterName +'</td>'+
                                                '<td style="text-align: center; vertical-align: middle; ">'+ affairs +'</td>'+
                                                '<td style="text-align: center; vertical-align: middle; ">'+
                                                    '<span title="'+ matterContent +'">'+ matterContent +'</span>'+
                                                '</td>'+
                                            '</tr>';
                                    $('#dataTable tbody').append(msg);        
                                }
                            }
                            else{
                                $('#dataTable tbody').text('暂无信息');
                            }

                            if( users.length > 0){
                                $('.userinfo').text('');
                                for( x=0; x<users.length; x++){
                                    var userName = users[x].userName;
                                    var profilePictureId = users[x].profilePictureId;
                                    var cont = '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">'+
                                                    '<div class="mt-card-item"><img id="img_' + x + '">'+
                                                        '<div class="mt-card-content">'+
                                                            '<h3 class="mt-card-name">'+ userName +'</h3>'+
                                                        '</div>'+
                                                    '</div>'+
                                                '</div>';
                                    $('.userinfo').append(cont);
                                    getPhoto(profilePictureId,"img_" +x);
                                }
                            }
                            else{
                                $('.userinfo').text('暂无信息');
                            }
                        }
                        else{      
                            $('#Post_Name').text('--');
                            $('#Post_Type_Name').text('--');
                            $('#Entry_Condition').text('--');
                            $('#Post_Members').text('--');
                            $('#Part_Time_Job').text('--');
                            $('#Duty').text('--');
                            $('#Is_Property_Manage').text('--');
                            $('.userinfo').text('暂无信息');
                            $('#dataTable tbody').text('暂无信息');
                        }
                    },
                    error:function() {

                    }
                });
            }
        }
    }

    initUserName(); 
    initUserPic();

    var getPhoto = function (guid, imgid) {
        if( guid != null){            
            $.ajax({
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
                async: false,
                type: 'GET',
                dataType: "json",
                data: {
                    "profilePictureId": guid
                },
                url: apiUrl + "/Profile/GetProfilePictureById",
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //错误访问所需执行的操作
                    //alert("初始化用户头像失败");
                },
                success: function (data) {
                    $("#" + imgid).attr('src', 'data:image/jpeg;base64,' + data.result.profilePicture);
                }
            });
        }
        else{
            $("#" + imgid).attr('src', 'img/NoImg.png');
        }
    }
});

