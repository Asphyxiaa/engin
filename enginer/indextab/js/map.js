jQuery(document).ready(function () {

  $('body').mLoading("show");
  setTimeout(function(){
     $('body').mLoading("hide");
  },7000);


  // 百度地图API功能
  var map = new BMap.Map("allmap");
  var point = new BMap.Point(120.502467,30.102365);
  map.centerAndZoom(point, 15);
  map.addControl(new BMap.NavigationControl());
  map.disableDoubleClickZoom(); //禁用双击放大

  var mapType1 = new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]});
  var mapType2 = new BMap.MapTypeControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT});
  var top_left_navigation = new BMap.NavigationControl();  //左上角，

  var overView = new BMap.OverviewMapControl();
  var overViewOpen = new BMap.OverviewMapControl({isOpen:true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT});
  //添加地图类型和缩略图

  map.addControl(mapType1);          //2D图，卫星图
  map.addControl(mapType2);          //左上角，默认地图控件
  map.setCurrentCity("柯桥区");        //由于有3D图，需要设置城市哦
  map.addControl(overView);          //添加默认缩略地图控件
  map.addControl(overViewOpen);      //右下角，打开
  map.addControl(top_left_navigation);     
  map.enableScrollWheelZoom(true); 

  // 复杂的自定义覆盖物
  function ComplexCustomOverlay(point, text){
    this._point = point;
    this._text = text;
  }
  ComplexCustomOverlay.prototype = new BMap.Overlay();
  ComplexCustomOverlay.prototype.initialize = function(map){
    this._map = map;
    var div = this._div = document.createElement("div");
    div.style.position = "absolute";
    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    div.style.backgroundColor = "#EE5D5B";
    div.style.border = "1px solid #BC3B3A";
    div.style.color = "white";
    div.style.height = "18px";
    div.style.padding = "2px";
    div.style.lineHeight = "18px";
    div.style.whiteSpace = "nowrap";
    div.style.MozUserSelect = "none";
    div.style.fontSize = "12px",
    div.style.boxSizing = "content-box",
    div.style.opacity = "0.8"
    var span = this._span = document.createElement("span");
    div.appendChild(span);
    span.appendChild(document.createTextNode(this._text));      
    var that = this;

    var arrow = this._arrow = document.createElement("div");
    arrow.style.background = "url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat";
    arrow.style.position = "absolute";
    arrow.style.width = "11px";
    arrow.style.height = "10px";
    arrow.style.top = "22px";
    arrow.style.left = "10px";
    arrow.style.overflow = "hidden";
    div.appendChild(arrow);

    map.getPanes().labelPane.appendChild(div);
    
    return div;
  }

  ComplexCustomOverlay.prototype.draw = function(){
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x - 5 + "px";
    this._div.style.top  = pixel.y - 54 + "px";
  }

  // 自定义覆盖物添加事件方法
  ComplexCustomOverlay.prototype.addEventListener = function (event, fun) {
      this._div['on' + event] = fun;
  }
  
  //判断复选框的选择状态
     //复选框
    var checkAttr = [];

    $.ajax({
      headers: {
        'Authorization': 'Bearer ' + token,
      },
      async: false,
      type: 'GET',
      dataType: "json",
      url: apiUrl + "/ProjectInfo/GetProTypes",
      error: function (XMLHttpRequest, textStatus, errorThrown) {
          //错误访问所需执行的操作
          //alert("初始化用户头像失败");
      },
      success: function (data) {
         var content =  data.result.items;
         $('.mt-checkbox-inline').text(' ');
         for( var i = 0; i< content.length; i++)
         {
           var typeName = content[i].typeName;
           var typeId = parseInt(content[i].id);
           var con = '<label class="mt-checkbox" style="margin-left:10px;">'+
                          '<input id="checkbox_'+ typeId +'" class="checkbox"  type="checkbox" >'+ typeName+
                          '<span></span>'+
                      '</label>';
            $('.mt-checkbox-inline').append(con);
            checkAttr.push(typeId);
          }
      }
    });

  var  Info = function(checkAttr){

    // debugger;
    $.ajax({
          headers: {
              'Authorization': 'Bearer ' + token,
          },
          type: 'GET',
          dataType: "json",
          data:{
            "projectTypeId":checkAttr,
            "MaxResultCount":1000,
            "SkipCount":0
          },
          traditional: true,
          url: apiUrl + "/ProjectInfo/GetProInfos",
          error: function (XMLHttpRequest, textStatus, errorThrown) {
              //错误访问所需执行的操作
              alert("初始化巡检信息失败");
          },
          success: function (data) {  
            var content = data.result.items;
             asnyAddData(content,content.length);               
          }
    });
  }
  Info();
  
  var offsetIndex=0;
  var convertorIndex=1;
  var offsetPoints=[];
  var pointArr=[];
   
  function asnyAddData(infodata,count)
  {  
      if(offsetIndex<count)
      {
           var longitude = infodata[offsetIndex].longitude;
           var latitude = infodata[offsetIndex].latitude;
           var ggPoint = new BMap.Point(longitude,latitude);
           pointArr.push(ggPoint);
           convertorCount=Math.ceil(infodata.length/10);

           if(offsetIndex == 10*convertorIndex-1  || (convertorIndex==convertorCount && offsetIndex==count-1))
           {
              setTimeout(function(){  
                  var convertor = new BMap.Convertor();               
                  convertor.translate(pointArr, 1, 5, translateCallback)
              }, 1000);

               translateCallback = function (data){
                  if(data.status === 0) 
                  {
                     for(var i=0;i<data.points.length;i++)
                     {
                      offsetPoints.push(data.points[i]);
                     }
                     offsetIndex++;
                     convertorIndex++;

                     pointArr=[];                    
                      if(offsetIndex==count)
                      {
                        addMarkers(infodata,offsetPoints);
                        offsetIndex = 0;
                        convertorIndex=1;
                        offsetPoints=[];
                        pointArr=[];
                      }
                      else
                      {
                        asnyAddData(infodata,count);
                      }
                  }
              }
           }
           else
           {
             offsetIndex++;
             asnyAddData(infodata,count);
           }          
      }     
  }

// //设置marker图标为水滴
// var vectorMarker = new BMap.Marker(new BMap.Point(point.lng,point.lat), {
//   // 指定Marker的icon属性为Symbol
//   icon: new BMap.Symbol(BMap_Symbol_SHAPE_POINT, {
//     scale: 2,//图标缩放大小
//     fillColor: "blue",//填充颜色
//     fillOpacity: 0.8//填充透明度
//   })
// });


  function addMarkers(content,offsetPoints)
  {
   // debugger
   if(content.length > 0)
    {
      var pos = []; 
      $('#dataTable tbody').text(' ');
      for(var i=0; i<content.length; i++)
      {
        var proName = content[i].proName;
        var longitude = offsetPoints[i].lng;
        var latitude = offsetPoints[i].lat;
        var typeId= content[i].projectTypeId;
        var id = content[i].id;
        var type = ' ';
        if(typeId == 1){
            type = "泵站";
        }else if(typeId == 2){
            type ="闸站";
        }
        var proInformation = content[i].proInformation;
        if( proInformation == null){
          proInformation = ' ';
        }else{
          proInformation = proInformation;
        }
        var photoGuid = content[i].profilePictureId;  
        var makergg = new BMap.Point(longitude,latitude); 
        var imgId = "img_" + i;
        
        var myIcon = new BMap.Icon("img/green.png",new BMap.Size(50,80));
        var maker1 = new BMap.Marker(makergg, {icon: myIcon});
        var myCompOverlay = new ComplexCustomOverlay(makergg, proName);
        var opts_pro={
          width:420,
          height:230
        }
        
        map.addOverlay(myCompOverlay); 
        map.addOverlay(maker1);
        //右侧面板 
        var k = i+ 1;
        var msg = '<tr>'+
                    '<td class="pro-number" style="text-align: center; vertical-align: middle; width: 60px;">'+ k+
                     '<td class="proname_'+ i +'" style="text-align: center; vertical-align: middle; width: 180px;">'+ proName + '</td>'+
                     '<td class="prostatus_'+ i +'" style="text-align: center; vertical-align: middle; width: 100px;">正常</td>'+
                  '</tr>';
                  
        $('#dataTable tbody').append(msg);
        addClickHandler(myCompOverlay , makergg, opts_pro, maker1, i, proName,  imgId, type, longitude, latitude, proInformation, id, photoGuid );
      }
    }
  }
  

  function addClickHandler(myCompOverlay , makergg, opts_pro, maker1, i, proName,  imgId, type, longitude, latitude, proInformation, id, photoGuid ){

    var proinfo = '<h4 style="margin:0 0 5px 0;padding:0.2em 0">'+ proName +'</h4>' + 
          '<img style="float:left;margin:4px; border:1px solid black;" id ="'+ imgId +'"  width="139" height="104"/>' + 
          '<div class="tab-content">'+
           '<div class="tab-pane active" id="tab_1_1">'+
            '<div class="scroller" data-always-visible="1" data-rail-visible1="0" data-handle-color="#D7DCE2">'+
              '<ul class="pro_feeds">'+
                '<li>'+
                  '<div class="pro_col1">'+
                    '<div class="cont">'+
                      '<div class="cont-col1">'+
                        '<div class="desc">工程名称:</div>'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                  '<div class="pro_col2">'+
                  '<div class="date" style="font-style: normal;color: black">'+
                    '<span id="inWaterResult" class="load">'+ proName +'</span>'+
                    '</div>'+
                  '</div>'+
                '</li>'+
                '<li>'+
                  '<div class="pro_col1">'+
                    '<div class="cont">'+
                      '<div class="cont-col1">'+
                        '<div class="desc">工程类型:</div>'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                   '<div class="pro_col2">'+
                  '<div class="date" style="font-style: normal;color: black">'+
                    '<span id="inWaterResult" class="load">'+ type +'</span>'+
                    '</div>'+
                  '</div>'+
                '</li>'+
                '<li>'+
                  '<div class="pro_col1">'+
                    '<div class="cont">'+
                      '<div class="cont-col1">'+
                        '<div class="desc">工程经度:</div>'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                   '<div class="pro_col2">'+
                  '<div class="date" style="font-style: normal;color: black">'+
                    '<span id="inWaterResult" class="load">'+ longitude +'</span>'+
                    '</div>'+
                  '</div>'+
                '</li>'+
                '<li>'+
                  '<div class="pro_col1">'+
                    '<div class="cont">'+
                      '<div class="cont-col1">'+
                        '<div class="desc">工程纬度:</div>'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                   '<div class="pro_col2">'+
                  '<div class="date" style="font-style: normal;color: black">'+
                    '<span id="inWaterResult" class="load">'+ latitude +'</span>'+
                    '</div>'+
                  '</div>'+
                '</li>'+
                '<li>'+
                  '<div class="pro_col1">'+
                    '<div class="cont">'+
                      '<div class="cont-col1">'+
                        '<div class="desc">工程简介:</div>'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                   '<div class="col2_info">'+
                  '<div class="date" style="font-style: normal;color: black">'+
                    '<span id="inWaterResult" class="load">'+ proInformation +'</span>'+
                    '</div>'+
                  '</div>'+
                '</li>'+
              '</ul>'+
                '<div class="bont threeD-map">'+
                    '<a href="javascript:;">'+
                      '<i class="fa fa-map-marker"></i>三维图'+
                    '</a>'+
                '</div>'+
                '<div class="bont map">'+
                    '<a href="javascript:;">'+
                      '<i class="fa fa-map"></i>全景图'+
                    '</a>'+
                '</div>'+
                '<div class="bont proinfo">'+
                    '<a href="javascript:;?proid='+ id +'">'+
                      '<i class="fa fa-file-o"></i>工程信息'+
                    '</a>'+
                '</div>'+
                '<div class="bont user">'+
                    '<a href="javascript:;">'+
                      '<i class="fa fa-user-circle"></i>巡查人员'+
                    '</a>'+
                '</div>'+
                '<div class="bont warninfo">'+
                    '<a href="javascript:;">'+
                      '<i class="fa fa-warning"></i>隐患记录'+
                    '</a>'+
                '</div>'+
            '</div>'+
          '</div>'+
      '</div>' + 
    '</div>';

    myCompOverlay.addEventListener("click",function(e){     
      openInfo(proinfo,e ,makergg,opts_pro);
      getPhoto(photoGuid, imgId);
    });
    maker1.addEventListener("click",function(e){
      openInfo(proinfo,e ,makergg,opts_pro);
      getPhoto(photoGuid, imgId);
    });

   $('.proname_'+i).click(function(e){ // 点击工程跳转对应的坐标
        map.panTo(makergg);
        openInfo(proinfo,e ,makergg,opts_pro);
        getPhoto(photoGuid, imgId);
        $(this).parent().addClass('selhighlight');
        $(this).parent().siblings().removeClass('selhighlight');
    });
   $('.prostatus_'+i).click(function(e){
      map.panTo(makergg);
      openInfo(proinfo,e ,makergg,opts_pro);
      getPhoto(photoGuid, imgId);
      $(this).parent().addClass('selhighlight');
      $(this).parent().siblings().removeClass('selhighlight');
   });
  }

  function openInfo(proinfo, e ,makergg,opts_pro){
    var p = e.target;
    var infoWindow_pro = new BMap.InfoWindow(proinfo,opts_pro);  // 创建信息窗口对象 
    map.openInfoWindow(infoWindow_pro , makergg);

  }

 
    
  var polygon = new BMap.Polygon([               
    new BMap.Point(120.480467,30.082365),
    new BMap.Point(120.492467,30.1164365),
    new BMap.Point(120.502467,30.114365),
    new BMap.Point(120.514467,30.118365),
    new BMap.Point(120.528467,30.110365)
    ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.3});  //创建多边形1
    map.addOverlay(polygon);
    polygon.addEventListener("click",overlay_style);

  var rectangle = new BMap.Polygon([
    new BMap.Point(120.488467,30.074365),
    new BMap.Point(120.502467,30.083365),
    new BMap.Point(120.520467,30.105365),
    new BMap.Point(120.524467,30.123365),
    new BMap.Point(120.512467,30.118365)    
    ],{strokeColor:"blue", strokeWeight:2, strokeOpacity:0.3}); //创建多边形2
    map.addOverlay(rectangle);
    rectangle.addEventListener("click",overlay_style);

  var sContent = "某某街道";
  var opts = {
    width:200,
    height:100,
    title:'信息窗口'
  };
  var infoWindow = new BMap.InfoWindow(sContent,opts);

  function overlay_style(e){
    var point1 = new BMap.Point(e.point.lng,e.point.lat);
    map.openInfoWindow(infoWindow,point1);
  };

  var getPhoto = function (guid, imgId) {  
     if( guid != null)
     {                  
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
              if(data.result.profilePicture == ""){
                $("#" + imgId).attr('src','img/timg.jpg');
              }else{
              $("#" + imgId).attr('src', 'data:image/jpeg;base64,' + data.result.profilePicture);
              }
            }
        });        
     }
     else
     {  
       $("#" + imgId).attr('src','img/timg.jpg');
     }
  }

  showPanel = function(){
     $('.map-right-panel').removeClass('hide');
  }
  hidePanel = function(){
    $('.map-right-panel').addClass('hide');
  }
  
  window.onload = function(){
    $('.map-right-panel').removeClass('hide');
  }
 
  $('.checkbox').prop("checked", true);
  
  $('.checkbox').on("click", function(){


    
    //获取全部的数据
    //点击哪个删除哪个


    var Id = $(this).attr('id');
    var menuId =Id.substring(9);
    if($('#'+Id).is(":checked")){ 
        newMenuId = parseInt(menuId);
        checkAttr.push(newMenuId);
    }else{
        newMenuId = parseInt(menuId);
        checkAttr.splice($.inArray(newMenuId,checkAttr),1);
    }

    if(checkAttr.length == 0){
        $('#dataTable tbody').text(' ');
        var tip='<tr><td colspan="3" style="text-align: center; vertical-align: middle; width: 340px;">请选择工程类型</td></tr>'
        $('#dataTable tbody').append(tip);
    }else{
         $('body').mLoading("show");
         setTimeout(function(){
            $('body').mLoading("hide");
         },7000);
        Info(checkAttr);
    }
    map.clearOverlays();    
  });


});
   
