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
    initUserName();
    initUserPic();
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
                // var node = treeObj.getNodeByParam("id" , 18);
                // treeObj.selectNode(node);
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
    var typeId= 2;
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
				var groupId = json[i].groupId;
				ztreeData.push({
					name: json[i].proName,
					id: json[i].id,
	                pId: json[i].groupId,
				});
				$.fn.zTree.init($("#treeDemo"), setting, ztreeData);
                var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                var node = treeObj.getNodeByParam("id" , json[0].id);
                treeObj.selectNode(node);
                treeObj.expandAll(true);
                treeObj.setting.callback.onClick(null ,treeObj.setting.treeDemoid, node );//默认点击
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
            Query();
         }
    }



    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    function create(){
        $.ajax({
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            async:false,
            type: 'get',
            url: apiUrl + "/ProjectMonitor/GetProjectMonitorWaterDataById?StartTime=2017-09-20&EndTime=2017-09-21&ProjectId=15",
            success:function(data){

                // var waterSeries = 0; //0;水位线

                // var nm ="整点水位过程线图";
                // var tempYaxies = [];
                // var tempSeries = [];           
     
                // var waterArr = []; //实时水位数据


                //表格
                var waterInfos = data.result.waterInfos;
                $('.infolist').text('');
                $('.table-hover tbody').text('');

                var rows="";
                for( i=0;i<waterInfos.length;i++){
                    var stnm= waterInfos[i].stnm;
                    var width = 100/waterInfos.length;
                    $('.watline').attr('colspan',waterInfos.length);
                    var cont= '<th style="text-align:center; vertical-align: middle; width:'+ width +'%"  data-field="" tabindex="0"><div class="th-inner">'+ stnm +'</div></th>';
                    $('.infolist').append(cont);
            
                    var waterDatas = waterInfos[i].waterDatas;

                    rows=waterInfos[i].waterDatas.length;
                };

                 var tds="";
                for(i=0;i<rows;i++){
                    tds+="<tr>";
                    var tm = waterInfos[0].waterDatas[i].tm;
                    tm = new Date(tm);
                    tm = tm.Format("yyyy-MM-dd");
                      tds+="<td>"+tm+"</td>";
                      for(j=0;j<waterInfos.length;j++)
                      {
                        tds+="<td>"+  waterInfos[j].waterDatas[i].z+"</td>";
                        // waterArr.push([tm, waterInfos[j].waterDatas[i].z]);
                      }
                     tds+="</tr>";
                }
                $('.table-hover tbody').append(tds);

                //曲线图
                var series = new Array();
                for(j=0;j<waterInfos.length; j++){
                    var stnm = waterInfos[j].stnm;
                    console.log(stnm);
                }

                
                //设置水位纵坐标
                // tempYaxies.push({
                //     title:{
                //         text:'水位(m)'
                //     },
                //     labels:{
                //         format:'{value}m'
                //     },
                //     id:'WaterYAxies',
                //     opposite:false,
                //     gridLineColor: '#e0e0e0',
                //     gridLineDashStyle: 'ShortDot',
                //     gridLineWidth: 1,
                //     tickInterval: 0.5,
                //     showEmpty: true
                // });

                // var waterIndex = tempSeries.length;
                //  //实时水位线
                // tempSeries.push({
                //     name:'实时水位',
                //     type:'line',
                //     yAxis:waterSeries,
                //     data:[],
                //     marker:{
                //         enabled:false
                //     },
                //     dataGrouping:{
                //         enabled:false
                //     }
                // });



                    
                    // for(j= 0; j< waterDatas.length; j++) {
                    //     let tm= waterDatas[j].tm;

                    //       ///  先拼一行的
                    //     //  var line = '<tr data-index="'+ j +'" class="li_'+ j +'"></tr>';
                    //     //  var msg = '<td id="'+ i +'" class="time_'+ j +'" style="text-align:center;vertical-align: middle;">aaa</td>';
                    //     // console.log(msg);
                    //     // $('.li_'+j).append(msg);
                    //     var msg= '<tr data-index="'+ j +'" class="li_'+ j +'"><td class="time_'+ j +'" style="text-align: center; vertical-align: middle;">2017/9/27 15:40:01</td><td class="waterline_'+ j +'" style="text-align: center; vertical-align: middle;">48.40</td><td class="waterline" style="text-align: center; vertical-align: middle;">48.40</td><td class="waterline" style="text-align: center; vertical-align: middle;">48.40</td></tr>';
                    //     $('.table-hover tbody').append(msg);
                    //     // tm = new Date(tm);
                    //     // tm = tm.Format("yyyy-MM-dd hh:mm:ss");
                    //     // let waterId = waterDatas[j].waterId;
                    //     // var msg='<tr data-index="'+ j +'" class="li_'+ j +'"></tr>';
                    //     // $('.table-hover tbody').append(msg);
                    //     // var time = '<td class="time_'+ j +'" style="text-align: center; vertical-align: middle;">'+ tm +'</td>';
                    //     // $('.li_'+j).append(time);
                    // }
            },
            error:function(){

            }
        });
    }
    
    $(function () {
        var date = new Date();
        var month = (date.getMonth() + 1);
        if (month.toString().length < 2) {
            month = "0" + month;
        }
        var day = date.getDate();
        if (day.toString().length < 2) {
            day = "0" + day;
        }
        var hour = date.getHours();
        if (hour.toString().length < 2) {
            hour = "0" + hour;
        }
        //var ii = date.getMinutes();
        //if (ii.toString().length < 2) {
        //    ii = "0" + ii;
        //}
        //var ss = date.getSeconds();
        //if (ss.toString().length < 2) {
        //    ss = "0" + ss;
        //}
        $("#date_end_waterhis").val(date.getFullYear() + "-" + month + "-" + day + " " + hour + ":00:00");
        date.setDate(date.getDate() - 1); // 最近1天
        month = (date.getMonth() + 1);
        if (month.toString().length < 2) {
            month = "0" + month;
        }
        day = date.getDate();
        if (day.toString().length < 2) {
            day = "0" + day;
        }
        $("#date_start_waterhis").val(date.getFullYear() + "-" + month + "-" + day + " " + hour + ":00:00");

        timelineSet("timeline");//时间选择装载
        // $("#search_stnm_waterhis").bind("keydown", searchStationNode);

        //时间选择装载
        function timelineSet(id) {
            var obj = $("#" + id);
            var node = obj.find(".node-list li");
            var timeline_w = obj.width();
            var node_num = node.length;
            var node_w = timeline_w / node_num;
            obj.find(".timeline-basic").width(timeline_w - node_w);
            node.width(node_w);
            node.click(function () {
                node.removeClass("active");
                $(this).addClass("active");

                if ($(this).attr("data-value") != "更多") {
                    var hour = parseInt($(this).attr("data-value"));
                    var dateNow = new Date();

                    var month = dateNow.getMonth() + 1;
                    if (month.toString().length < 2) {
                        month = "0" + month;
                    }

                    var day = dateNow.getDate();
                    if (day.toString().length < 2) {
                        day = "0" + day;
                    }

                    var thour = dateNow.getHours();
                    if (thour.toString().length < 2) {
                        thour = "0" + thour;
                    }
                    var tbx_endDate = format("%1-%2-%3 %4:00:00", dateNow.getFullYear(), month, day, thour);
                    $("#date_end_waterhis").val(tbx_endDate);

                    var dateNow2 = new Date(Date.parse(tbx_endDate.replace(/-/g, "/")) - hour * 60 * 60 * 1000);
                    var month2 = dateNow2.getMonth() + 1;
                    if (month2.toString().length < 2) {
                        month2 = "0" + month2;
                    }

                    var day2 = dateNow2.getDate();
                    if (day2.toString().length < 2) {
                        day2 = "0" + day2;
                    }

                    var thour2 = dateNow2.getHours();
                    if (thour2.toString().length < 2) {
                        thour2 = "0" + thour2;
                    }
                    //var tii2 = dateNow2.getMinutes();
                    //if (tii2.toString().length < 2) {
                    //    tii2 = "0" + tii2;
                    //}
                    //var tss2 = dateNow2.getSeconds();
                    //if (tss2.toString().length < 2) {
                    //    tss2 = "0" + tss2;
                    //}
                    var tbx_startDate = format("%1-%2-%3 %4:00:00", dateNow2.getFullYear(), month2, day2, thour2);
                    $("#date_start_waterhis").val(tbx_startDate);
                    $("#div_returnToTime").hide();
                    initChart();//装载图表
                }
                else {
                    $("#time").hide();
                    $("#date").show();
                    $("#div_returnToTime").show();
                }
            })
        }

        //导出
        $("#btnExport").click(function () {
            var chart = $('#chart').highcharts();
            if (chart)
                chart.exportChart();
        });
    });
 
    function  initChart() {
        var startDate = $("#date_start_waterhis").val();
        var endDate = $("#date_end_waterhis").val();
        console.log(startDate, endDate);
        if (startDate > endDate) {
            hint("查询开始时间不能大于结束时间！");
            // showEmpty();
            return;
        }
        var bbtime = new Date(Date.parse(startDate.replace(/-/g, "/")));
        var eetime = new Date(Date.parse(endDate.replace(/-/g, "/")));
        var timeSpan = eetime - bbtime;
        timeSpan = timeSpan / (24 * 3600 * 1000);
        
        if (timeSpan > 30) {
            hint("间隔时间不能大于30天");
            // showEmpty();
            return;
        }

        Highcharts.setOptions({
            lang:{
                rangeSelectorZoom:''
            }
        })
        var chart = new Highcharts.Chart({
            chart: {
              renderTo: 'chart'
            },
            credits:{
                enabled:false
            },
            title : {
                text : '水位线图'
            },
            navigator:{
              enabled:false
            },
            event :{
               load : function(){
                   var series = this.series;
                   setInterval(function(){

                   })
               }
            },
            xAxis: {
                type:'datetime',
                categories: ['2017-09-20 00:00:00', '2017-09-20 01:00:00', '2017-09-20 02:00:00', '2017-09-20 03:00:00', '2017-09-20 04:00:00', '2017-09-20 05:00:00']
            },
            yAxis:{
                title:{
                    text:'水位(m)'
                },
                labels:{
                    format:'{value}m'
                }
            },
            series :
            // create()
                 [{
                    name : '枢纽闸进水位',
                    data : [3.95,3.97,3.97,3.97,3.97,3.97],
                },{
                    name:'枢纽闸出水位',
                    data:[4.07,4.09,4.09,4.09,4.09,4.09],
                },{
                    name:'枢纽闸下游水位',
                    data:[3.95,3.95,3.95,3.97,3.95,3.95],
                }]
        });
    };
    initChart();
    
    function Query() {
       initChart();
    }

   //  Date.prototype.Format = function (fmt) {
   //      var o = {
   //          "M+": this.getMonth() + 1, //月份 
   //          "d+": this.getDate(), //日 
   //          "h+": this.getHours(), //小时 
   //          "m+": this.getMinutes(), //分 
   //          "s+": this.getSeconds(), //秒 
   //          "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
   //          "S": this.getMilliseconds() //毫秒 
   //      };
   //      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
   //      for (var k in o)
   //          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
   //      return fmt;
   // }
});

