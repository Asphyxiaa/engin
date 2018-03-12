var _width = $(window).width();
jQuery(document).ready(function () {


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
                if(data.result.user != null){
                    $('.dropdown-dark').contents().find("#username").text(data.result.user.surname + data.result.user.name);
                }
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
    $(".btn-primary").bind('click', function (event) {
        $.cookie('Abp.AuthToken', null, { expires: 1, path: '/' });
        window.location.href = "http://120.76.241.72:8060";
    });

    /*-树图开始-*/
   // var ztreeData = [];

    
    var MaxResultCount = 1000;
    var SkipCount = 0;
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        type: 'get',
        data:{
          "MaxResultCount": MaxResultCount,
          "SkipCount" : SkipCount
        },
        url: apiUrl + "/ProjectInfo/GetProInfos",
        success: function(json) {
            $('.line').text(' ');
            var proJson = json.result.items;

            var json=[];
            var firstId=0;

            for ( i = 0; i< proJson.length; i++)
            {
                var id = proJson[i].id;
                var groupId = proJson[i].groupId;
                json.push({
                    name: proJson[i].proName,
                    id: id,
                    pId: groupId,
                });
            }

            $.ajax({
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
                type: 'get',
                url: apiUrl + "/ProjectInfo/GetProGroups",
                success: function(data) {
                  
                    var groupJson = data.result.items;

                    for( i = 0; i< groupJson.length; i++){

                        json.push({
                            name: groupJson[i].groupName,
                            id: groupJson[i].id,
                            pId: 0,
                        });                 
                    }

                    $.fn.zTree.init($("#treeDemo"), setting, json);
                    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");

                    treeObj.expandAll(true);  
                    var nodes = treeObj.getNodes();  
                    var childNodes =treeObj.transformToArray (nodes[0]);     
                    var childNodes1 = treeObj.transformToArray(childNodes[1]);      
                    var node = treeObj.getNodeByParam("id" , childNodes1[0].id);
                    treeObj.selectNode(node);
                    treeObj.setting.callback.onClick(null ,treeObj.setting.treeId, node );//默认点击
                },  
                error: function() {
                    console.log("没有获取到数据");
                }
            });
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

    if(hour > 08){
        $("#date_end_waterhis").val(date.getFullYear() + "-" + month + "-" + day + " " + "08:00:00");
        date.setDate(date.getDate() - 1); // 最近1天
        month = (date.getMonth() + 1);
        if (month.toString().length < 2) {
            month = "0" + month;
        }
        day = date.getDate();
        if (day.toString().length < 2) {
            day = "0" + day;
        }
        $("#date_start_waterhis").val(date.getFullYear() + "-" + month + "-" + day + " " + "08:00:00");
    }
    else{
       $("#date_end_waterhis").val(date.getFullYear() + "-" + month + "-" + day + " "+ hour + "00:00");
        date.setDate(date.getDate() - 1); // 最近1天
        month = (date.getMonth() + 1);
        if (month.toString().length < 2) {
            month = "0" + month;
        }
        day = date.getDate();
        if (day.toString().length < 2) {
            day = "0" + day;
        }
        $("#date_start_waterhis").val(date.getFullYear() + "-" + month + "-" + day + " "+ hour + "00:00");  
    }


    //导出
    $("#btnExport").click(function () {
        var chart = $('#chart').highcharts();
        if (chart)
        chart.exportChart();
    });


    /*加载测站历史水位过程*/
    function initChart(name,projectId) {
 
        var startDate = $("#date_start_waterhis").val();
        var endDate = $("#date_end_waterhis").val();
        if (startDate > endDate) {
            hint("查询开始时间不能大于结束时间！");
            return;
        }
        var bbtime = new Date(Date.parse(startDate.replace(/-/g, "/")));
        var eetime = new Date(Date.parse(endDate.replace(/-/g, "/")));
        var timeSpan = eetime - bbtime;
        timeSpan = timeSpan / (24 * 3600 * 1000);
        
        if (timeSpan > 30) {
            hint("间隔时间不能大于30天");
            return;
        }
        //获取日历的日期
        var starttime = new Date(startDate);
        var endtime = new Date(endDate);
        starttime = starttime.Format('yyyy-MM-dd');
        endtime = endtime.Format('yyyy-MM-dd');

        $.ajax({
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            type: 'get',
            data:{
              "StartTime":starttime,
              "EndTime":endtime,
              "ProjectId":projectId
            },
            url: apiUrl + "/ProjectMonitor/GetProjectMonitorWaterDataById",
            success:function(data){
                //表格
                var waterInfos = data.result.waterInfos;
                $('.infolist').text('');
                $('.table-hover tbody').text('');

                var rows="";

                var xData=[];
                var yData=[];

                for(var i=0;i<waterInfos.length;i++){

                    stnm= waterInfos[i].stnm;
                    var waterDatas=waterInfos[i].waterDatas;
                    var _yData=[];

                    for(var j=0;j<waterDatas.length;j++)
                    {
                        if(i==0)
                        {
                         var tm = new Date(waterDatas[j].tm);
                         tm = tm.Format("yyyy-MM-dd hh:mm:ss");
                         xData.push(tm);
                        }
                        _yData.push(waterDatas[j].z);
                    }
                    yData.push({name:stnm,data:_yData});
                }
                loadChart(xData,yData,name);     

                for(var i=0;i<waterInfos.length;i++){

                    stnm= waterInfos[i].stnm;

                    var width = 100/waterInfos.length;
                    $('.watline').attr('colspan',waterInfos.length);
                    var cont= '<th style="text-align:center; vertical-align: middle; width:'+ width +'%"  data-field="" tabindex="0"><div class="th-inner">'+ stnm +'</div></th>';
                    $('.infolist').append(cont);
            
                    var waterDatas = waterInfos[i].waterDatas;

                    rows=waterInfos[i].waterDatas.length;
                };

                var tds="";
                if( rows !=0){
                    for(var i=0;i<rows;i++){
                        tds+="<tr>";
                        var tm = waterInfos[0].waterDatas[i].tm;
                        tm = new Date(tm);
                        tm = tm.Format("yyyy-MM-dd hh:mm:ss");

                        tds+="<td>"+tm+"</td>";
                        for(var j=0;j<waterInfos.length;j++)
                        {
                           tds+="<td>"+  waterInfos[j].waterDatas[i].z+"</td>";                      
                        }
                        tds+="</tr>";
                    }
                }
                else{
                    tds = " 暂无数据";
                }   
                $('.table-hover tbody').append(tds);               
            },
            error:function(){

            }
        });
    }

    function loadChart(xData,yData,proname)
    {   
        var options  = $('#chart').highcharts({
            chart: {
              renderTo: 'chart'
            },
            credits:{
                enabled:false
            },
            title : {
                text:proname+'水位过程图'
            },
            navigator:{
              enabled:false
            },
            xAxis: {
                type:'datetime',
                categories: xData
            },
            yAxis:{
                title:{
                    text:'水位(m)'
                },
                labels:{
                    format:'{value}m'
                }
            },
            lang:{
                rangeSelectorZoom:'',
                noData:'暂无数据'
            },
            noData:{
                style:{
                    fontSize:'16px'
                }
            },
            series :yData
                //  [{
                //     name : '枢纽闸进水位',
                //     data : [3.95,3.97,3.97,3.97,3.97,3.97],
                // },{
                //     name:'枢纽闸出水位',
                //     data:[4.07,4.09,4.09,4.09,4.09,4.09],
                // },{
                //     name:'枢纽闸下游水位',
                //     data:[3.95,3.95,3.95,3.97,3.95,3.95],
                // }]
        });
    }
  

    function zTreeOnClick(event, treeId, treeNode) {
        var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
        if(treeNode.isParent) {
            treeObj.expandNode(treeNode);
            return false;
        }
        else{
            $('.item-info').text(treeNode.name);
            initChart(treeNode.name,treeNode.id);
        }       
    }
    

    //查询
    Query = function(){
        var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
        var treeNode = treeObj.getSelectedNodes(); //获取被选中的节点数据集合
        initChart(treeNode[0].name,treeNode[0].id);
    }

    

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
});