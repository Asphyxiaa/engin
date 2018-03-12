//var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwibmFtZSI6ImFkbWluIiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiJkNGJhYWE2ZS0xZTMxLTc0YzQtMWE5MC0zOWUxNDg0NDJhODciLCJyb2xlIjoiQWRtaW4iLCJodHRwOi8vd3d3LmFzcG5ldGJvaWxlcnBsYXRlLmNvbS9pZGVudGl0eS9jbGFpbXMvdGVuYW50SWQiOiIxIiwianRpIjoiNWM2NDM5MzUtMDBkYi00YjUxLWEwZjktMDllNTZhNGFhMTEyIiwiaWF0IjoxNTA2MzAxNTQzLCJuYmYiOjE1MDYzMDE1NDMsImV4cCI6MTUwNjM4Nzk0MywiaXNzIjoiQlpIUHJvIiwiYXVkIjoiQlpIUHJvIn0.fwAb3iqrG3NsNU_XC1MyGTQjJ7RZduKKajuem5y3-u8";
var _width = $(window).width();
jQuery(document).ready(function () {
    // var startTime;
    //    if (!token) { //如果cookies不存在

    //     window.location.href = "http://120.76.241.72:8092";
    //     return;
    // }
    // var endTime;
    // var CheckId;


    if(_width<1400){
       	$('#calendar').fullCalendar({
	        header:false,
	        navLinks: false, // can click day/week names to navigate views
	        editable: true,
	        selectable: true,
	        eventLimit: true, // allow "more" link when too many events
	        loading: function (bool) {
	            $('#loading').toggle(bool);
	        },
	        events: [
	            {
	                title: '已巡检',
	                start: '2017-09-11',
	                className:"text-success fa fa-circle dian",
	            },
	            {
	                title: '未巡检',
	                start: '2017-09-12',
	                className:"text-faild fa fa-circle dian",
	            }
	        ],
	        eventClick:function(event){
	        	window.open("http://www.baidu.com","_blank")
	        },
	        select: function (startDate, endDate) {
	            console.log('select', startDate.format(), endDate.format());
	        }
	    });
    }else{
    	$('#calendar').fullCalendar({
	        header:false,
	        navLinks: false, // can click day/week names to navigate views
	        editable: true,
	        selectable: true,
	        eventLimit: true, // allow "more" link when too many events
	        loading: function (bool) {
	            $('#loading').toggle(bool);
	        },
	        events: [
	            {
	                title: '已巡检',
	                start: '2017-09-11',
	                className:"text-success c1",
	            },
	             {
	                title: '未巡检',
	                start: '2017-09-12',
	                className:"text-success c2",
	            }
	        ],
	        eventClick:function(event){
	        	window.open("http://www.baidu.com","_blank")
	        },
           //dayClick: function (date) {
           //},
              function (startDate, endDate) {
	            console.log('select', startDate.format(), endDate.format());
	        }
	    });
    }

    // var getCheckId = function () {
    //     $.ajax({
    //         headers: {
    //             'Authorization': 'Bearer ' + token,
    //         },
    //         async: false,
    //         type: 'GET',
    //         dataType: "json",
    //         url: apiUrl + "/ProjectCheck/GetLatestCheckId",
    //         error: function (XMLHttpRequest, textStatus, errorThrown) {
    //             //错误访问所需执行的操作
    //             //alert("获取CheckId失败");
    //         },
    //         success: function (data) {
    //             //正确访问所需执行的操作
    //             CheckId = data.result.id;
    //         }
    //     });
    // }
    // var initCheck = function () {
    //     $.ajax({
    //         headers: {
    //             'Authorization': 'Bearer ' + token,
    //         },
    //         type: 'GET',
    //         dataType: "json",
    //         url: apiUrl + "/Project3D/GetIndexTotal",
    //         error: function (XMLHttpRequest, textStatus, errorThrown) {
    //             //错误访问所需执行的操作
    //             alert("初始化巡检信息失败");
    //         },
    //         success: function (data) {
    //             //正确访问所需执行的操作
    //             //水位信息与闸门信息时间
    //             let waterTm = data.result.water.tm;
    //             waterTm = new Date(waterTm);
    //             let gateTm = data.result.gate.tm;
    //             gateTm = new Date(gateTm);
    //             if(_width < 1400){
    //                 waterTm = waterTm.Format("hh:mm:ss");
    //                 gateTm = gateTm.Format("hh:mm:ss");
    //             }else if(_width <1610){
    //                 waterTm = waterTm.Format("MM-dd hh:mm:ss");
    //                 gateTm = gateTm.Format("MM-dd hh:mm:ss");
    //             }else{
    //                 waterTm = waterTm.Format("yyyy-MM-dd hh:mm:ss");
    //                 gateTm = gateTm.Format("yyyy-MM-dd hh:mm:ss");
    //             }
    //             $('#CheckLabe2').text("(" + waterTm + ")");
    //             $('#CheckLabe3').text("(" + gateTm + ")");
    //             //待办任务


    //             //  消息
    //             $('.message').text(''); //清空历史任务,防止叠加
    //             let content = data.result.toDoTask;
    //             let j, k = 0;
    //             if (content.length > 0) {
    //                 if (content.length >= 4) {
    //                     j = 4;
    //                 } else {
    //                     j = content.length;
    //                 }
    //                 for (let i = 0; i < j; i++) {
    //                     k++;
    //                     let uploadTime = content[i].uploadTime;
    //                     uploadTime = new Date(uploadTime);
    //                     uploadTime = uploadTime.Format("MM-dd hh:mm:ss");
    //                     let problemDescription = content[i].problemDescription;
    //                     problemDescription = wordlimit(problemDescription, 10);

    //                     var photoGuid = content[i].profilePictureId;
                        
    //                     //获取到图片的guid，然后请求图片接口/api/services/app/Profile/GetProfilePictureById
    //                     //然后根据返回的图片basse64编码赋值到对应的img里面

    //                     var msg = '<li class="message"><a href="javascript:;" onclick="openWeb(6)"><span class="photo"><img id ="img_' + i + '" class="img-circle" alt=""></span><span class="subject"><span class="from">' + content[i].uploadPerson + '</span><span class="time">' + uploadTime + '</span></span><span class="message">' + problemDescription + ' </span></a></li>';
    //                     $('.dropdown-menu-list').append(msg);

    //                     getPhoto(photoGuid, "img_" + i);
    //                 }
    //                 $('.badge-danger').text('');
    //                 $('.badge-danger').append(j);
    //             } else {
    //                 $('.dropdown-menu').text('当前无消息');
    //                 $('.badge-danger').text('');
    //                 $('.badge-danger').append(0);
    //             }

    //             //横向自动滚动条
    //             $('#noCheck').text(data.result.dailyCheck.noCheck);
    //             //巡查信息

    //             $('#damageCount').html("<a href='javascript:;' onclick='openWeb(1)' class='dangerCount'>" + data.result.dailyCheck.damageCount + "</a>");
    //             //水位信息
    //             $('#outWaterResult').text(data.result.water.outWater);
    //             $('#inWaterResult').text(data.result.water.inWater);
    //             //闸门信息
    //             $('#openedGateCount').text(data.result.gate.openCount);
    //             $('#closedGateCount').text(data.result.gate.closeCount);
    //             $('#totalCount').text(data.result.gate.totalCount);
    //         }
    //     });
    // }
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
    var autoSlider = function () {
        $('.slider-right').click();
    }
    // getCheckId();
    // initCheck();
    initUserPic();
    initUserName();
    $(".btn-primary").bind('click', function (event) {
        $.cookie('Abp.AuthToken', null, { expires: 1, path: '/' });
        window.location.href = "http://120.76.241.72:8092";
    });

    // var timer1 = window.setInterval(initCheck, 60000);

    // window.setInterval(autoSlider, 600000);

    var monthFirst = getCurrentMonthFirst();
    var monthLast = getCurrentMonthLast();

    $('#CheckLabel').text("(" + monthFirst + ")");

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
         }else{
             $("#" + imgid).attr('src', 'img/NoImg.png');
         }
    }

    // var getInfo = function(){ //潮汐预报
    //     $.ajax({
    //          headers: {
    //             'Authorization': 'Bearer ' + token,
    //         },
    //         async: false,
    //         type: 'GET',
    //         dataType: "json",
    //         url: apiUrl + "/ProjectInfo/GetProjectInfo",
    //         error: function (XMLHttpRequest, textStatus, errorThrown) {
    //             //错误访问所需执行的操作
    //             //alert("初始化用户头像失败");
    //         },
    //         success: function (data) {
    //             $('#getToDoTasksTable tr[id!=loading]').text(''); //清空历史信息,防止叠加
    //             let content = data.result.items;
    //             for( i= 0; i<content.length; i++){ 
    //                 let tideInfo = content[i].tideInfo.content;
    //             $('#loading').remove();
    //             var msg = '<tr><td class="content">' + tideInfo + '</td></tr>';
    //             $('#getToDoTasksTable tbody').append(msg);   
    //             }
    //         }
    //     });
    // }
    // getInfo();

    var getMenu = function(){ //菜单信息
        $.ajax({
             headers: {
                'Authorization': 'Bearer ' + token,
            },
            async: false,
            type: 'GET',
            dataType: "json",
           url: apiUrl + "/ProjectConfig/GetProjectMenus",
           error: function( XMLHttpRequest, textStatus, errorThrown) {
                
           },
           success: function(data) {
                $('#row').text(''); //清空历史报表,防止叠加
                let content = data.result.items;
                for( i = 0; i<content.length; i++){
                    let menuName = content[i].menuName;
                    let menuIcon = content[i].menuIcon;
                    let btnClass = content[i].btnClass;
                    let id = content[i].id;
                    var menu = '<div class="col-sm-2" id="'+ id +'" style="padding:0;"><button type="button" class="'+ btnClass +'" data-toggle="modal" data-target="#demo_modal_'+ i +'_blue-steel"><i class="'+ menuIcon +'" aria-hidden="true" style="margin-right: 1px;"></i>&nbsp;'+menuName+'</button></div>';
                    var modal = '<div id="demo_modal_'+ i +'_blue-steel" class="modal fade" style="display:none;"><div class="modal-dialog modal-lg"><div class="modal-content c-square"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button><h5 class="modal-title bold uppercase font-blue-steel">'+ menuName +'</h5></div><div class="col-md-2  col-xs-6" style="margin-top: 10px;"><div class="color-demo tooltips" data-original-title=""><ul class="nav nav-tabs uppercase bold"></ul><div id="tab-content"></div></div></div><div class="modal-footer"></div></div></div></div>';
                    $('#row').append(menu);
                    $('#row').append(modal);
                }
           }
        });
    }
    getMenu();

    $('.col-sm-2').click(function(){  //二级菜单
        var id = $(this).attr('id');
        $.ajax({
             headers: {
                'Authorization': 'Bearer ' + token,
             },
             async: false,
             type: 'GET',
             dataType: "json",
             data:{
                'ParentId':id
             },
             url: apiUrl + "/ProjectConfig/GetProjectMenus",
             error: function (XMLHttpRequest, textStatus, errorThrown) {
                //错误访问所需执行的操作
                //alert("初始化用户头像失败");
             },
             success: function (data) {
                //正确访问所需执行的操作
                $('.nav-tabs').text(''); //清空历史报表,防止叠加
                let content = data.result.items;
                for( i = 0; i<content.length; i++){
                    let menuName = content[i].menuName;
                    var nav = '<li id="active'+content[i].id +'"><a href="#blue-steel_tab_content" data-toggle="tab">'+ menuName +'</a></li>';
                    $('.nav-tabs').append(nav);
                }
             }
        });
        $('.nav-tabs li').click(function(){   // 三级菜单
           var Id = $(this).attr('id');
           var menuId =Id.substring(6);
            $.ajax({
                 headers: {
                    'Authorization': 'Bearer ' + token,
                 },
                 async: false,
                 type: 'GET',
                 dataType: "json",
                 data:{
                    'ParentId':menuId
                 },
                 url: apiUrl + "/ProjectConfig/GetProjectMenus",
                 error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //错误访问所需执行的操作
                    //alert("初始化用户头像失败");
                 },
                 success: function (data) {
                    //正确访问所需执行的操作
                    $('#tab-content').text(''); //清空历史报表,防止叠加
                    let content = data.result.items;
                    if( content.length == 0){
                       $('.nav-tabs li a').attr({"data-toggle":"  ", "href":"javascript:;"});
                    }else{
                        for( i= 0; i< content.length; i++) {
                            let menuName = content[i].menuName;
                            let menuIcon = content[i].menuIcon;
                            if( menuIcon == null){
                                var cont ='<div class="col-md-6 active" id="blue-steel_tab_content" style="width:33%"><div class="mt-widget-2" style="background:#659be0;border-radius: 6px;"><div class="mt-body" style="padding-top:5px;"><h5 class="mt-body-title" style="margin-top:4px; color:white;font-size:14px;font-weight:400;"><i class="" aria-hidden="true" style="margin-right: 1px;"></i>&nbsp;'+ menuName +'</h5></div></div></div></div>'; 
                            }else{
                                var cont ='<div class="col-md-6 active" id="blue-steel_tab_content" style="width:33%"><div class="mt-widget-2" style="background:#659be0;border-radius: 6px;"><div class="mt-body" style="padding-top:5px;"><h5 class="mt-body-title" style="margin-top:4px; color:white;font-size:14px;font-weight:400;"><i class="'+ menuIcon +'" aria-hidden="true" style="margin-right: 1px;"></i>&nbsp;'+ menuName +'</h5></div></div></div></div>';
                            }
                            $('#tab-content').append(cont);
                        }
                    }
                 }
            });
        });
        $('.nav-tabs li a:first').trigger('click');  //默认点击
    });

    

    var dropdownMenu = function () {  //下拉信息
        $.ajax({
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            async: false,
            type: 'GET',
            dataType: "json",
            data:{
               "MaxResultCount":1000,
               "SkipCount":0
            },
            url: apiUrl + "/ProjectInfo/GetProInfos",
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //错误访问所需执行的操作
                //alert("获取CheckId失败");
            },
            success: function (data) {
                //正确访问所需执行的操作
                $('.actions .btn-group #dropdown-menu').text('');
                $('.actions .btn-group #sel').text('');
                let content = data.result.items;
                for( i=0; i < content.length; i++ ) {
                    // let id = content[i].id;
                    let proName = content[i].proName;
                    var menulist ='<li><a href="javascript:;">'+ proName +'</a></li>';
                    $('.actions .btn-group #dropdown-menu').append(menulist);
                }
                    let firstmenu = content[0].proName;
                    $('.actions .btn-group #sel').append(firstmenu + '<i class="fa fa-angle-down"></i>');
            }
        });
    }
    dropdownMenu();
});
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

function openWeb(index) {
    if (index == 0) {
        window.open(serverUrl + '/running-view', '_blank');
    } else if (index == 1) {
        window.open(serverUrl + '/damage-info', '_blank');
    } else if (index == 3) {
        window.open('Surveillance.html', '_blank');
    } else if (index == 4) {
        window.open('map.html', '_blank');
    } else if (index == 5) {
        window.open(serverUrl + '/gates', '_blank');
    } else if (index == 6) {
        window.open(serverUrl + '/my-tasks', '_blank');
    } else if (index == 7) {
        window.open('3D.html', '_blank');
    } else if (index == 8) {
        window.open(serverUrl + '/fire-fighting', '_blank');
    }else if (index == 9){
        window.open('control.html', '_blank');
    } else if (index == 11) {
        window.open(serverUrl + '/lowProfile-electricity', '_blank');
    }else if (index == 12) {
        window.open(serverUrl + '/diesel-generators', '_blank');
    }else if (index == 13) {
        window.open(serverUrl + '/transformer', '_blank');
    }else if (index == 14) {
        window.open(serverUrl + '/steel-gates', '_blank');        
    }else if (index == 15) {
        window.open(serverUrl + '/gate-power', '_blank');        
    }else if (index == 16) {
        window.open(serverUrl + '/high-voltage', '_blank');
    }else if (index == 17) {
        window.open(serverUrl + '/lighting-system', '_blank');
    }else if (index == 18) {
        window.open(serverUrl + '/gantry-crane', '_blank');
    }else if (index == 19) {
        window.open(serverUrl + '/pump-house', '_blank');
    }else if (index == 20) {
        window.open(serverUrl + '/hydraulic-hoist', '_blank');
    }else if (index == 21) {
        window.open(serverUrl + '/oil-treatment', '_blank');
    }else if (index == 22) {
        window.open(serverUrl + '/automatic-control1', '_blank');
    }else if (index == 23) {
        window.open(serverUrl + '/automatic-control2', '_blank');
    }else if (index == 24) {
        window.open(serverUrl + '/fire-fighting', '_blank');
    }else if (index == 25) {
        window.open(serverUrl + '/hydraulic-hoist-equipment', '_blank');
    }
}

function wordlimit(content, wordLength) {
    var str = content;
    if (content.length > wordLength) {
        str = str.substr(0, wordLength) + '...';
    }
    return str;
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}


getCurrentMonthFirst = function () {
    var date_ = new Date();
    var year = date_.getFullYear();
    var month = date_.getMonth() + 1;
    if(_width < 1410){
        date_ = month + '月';
    }else{
        date_ = year + '年' + month + '月'; //当月第一天  
    }
        return date_;
}
getCurrentMonthLast = function () {
    var date_ = new Date();
    var year = date_.getFullYear();
    var month = date_.getMonth() + 1;
    var day = new Date(year, month, 0);
    if(_width < 1610){
        date_ =  month + '月' + day.getDate() + '日'; //当月最后一天 
    }else{
        date_ = year + '年' + month + '月' + day.getDate() + '日'; //当月最后一天 
    }
    return date_;
}

