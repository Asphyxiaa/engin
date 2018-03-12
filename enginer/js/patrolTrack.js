jQuery(document).ready(function() {

  $('body').mLoading("show");
  setTimeout(function() {
    $('body').mLoading("hide");
  }, 70000);


  // 百度地图API功能
  var map = new BMap.Map("allmap");
  var point = new BMap.Point(120.1503804986,30.2764148092);
  map.centerAndZoom(point, 15);
  map.addControl(new BMap.NavigationControl());
  map.disableDoubleClickZoom(); //禁用双击放大

  var mapType1 = new BMap.MapTypeControl({
    mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
  });
  var mapType2 = new BMap.MapTypeControl({
    anchor: BMAP_ANCHOR_BOTTOM_RIGHT
  });
  var top_left_navigation = new BMap.NavigationControl(); //左上角，

  var overView = new BMap.OverviewMapControl();
  var overViewOpen = new BMap.OverviewMapControl({
    isOpen: true,
    anchor: BMAP_ANCHOR_BOTTOM_RIGHT
  });
  //添加地图类型和缩略图

  map.addControl(mapType1); //2D图，卫星图
  map.addControl(mapType2); //左上角，默认地图控件
  map.setCurrentCity("杭州市"); //由于有3D图，需要设置城市哦
  map.addControl(overView); //添加默认缩略地图控件
  map.addControl(overViewOpen); //右下角，打开
  map.addControl(top_left_navigation);
  map.enableScrollWheelZoom(true);
  
  // window.setTimeout(function(){
  //   console.log(window.location.href);
  // },2000);
  function getQueryStringArgs(qs) {
    var qs = window.location.search.length > 0 ? window.location.search.substring(1) : "";
    var args = {};
    var items = qs.split("&");
    for (var i = 0; i < items.length; i++) {
      var item = items[i].split("=");
      var name = decodeURIComponent(item[0]);
      var value = decodeURIComponent(item[1]);
      args[name] = value;
    }
    return args;
  }
  var proUrl = window.location.search;
  proUrl = getQueryStringArgs();
  var checkId =  proUrl["checkId"];
  var userId = proUrl["userId"];
  var Info = function(checkId,userId) {

    $.ajax({
      headers: {
        'Authorization': 'Bearer ' + token,
      },
      type: 'GET',
      dataType: "json",
      data: {
        "CheckId": checkId,
        "UserId": userId
      },
      traditional: true,
      url: apiUrl + "/ProjectCheck/GetProCheckDailyTrails",
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        //错误访问所需执行的操作
        alert("初始化巡检信息失败");
      },
      success: function(data) {
        var content = data.result.items;
        if (content.length > 0) {
          addMarkers(content);
        }else{
          alert("暂无信息");
          $('body').mLoading("hide");
          var tip='<tr><td colspan="3" style="text-align: center; vertical-align: middle; width: 340px;">暂无信息</td></tr>'
        $('#dataTable tbody').append(tip);
        }
      }
    });
  }
  Info();

  function addMarkers(content){
    var pos = [];
    $('#dataTable tbody').text(' ');
    for (var i = 0; i < content.length; i++) {
      var longitude = content[i].longitude;
      var latitude = content[i].latitude;
      var id = content[i].id;

      var makergg = new BMap.Point(longitude, latitude);
      pos.push(makergg);

      var maker1 = new BMap.Marker(makergg);

      map.addOverlay(maker1);
      //右侧面板 
      var k = i + 1;
      var msg = '<tr>' +
        '<td class="pro-number" style="text-align: center; vertical-align: middle; width: 60px;">' + k +
        '<td class="proname_' + i + '" style="text-align: center; vertical-align: middle; width: 180px;">aaa</td>' +
        '<td class="prostatus_' + i + '" style="text-align: center; vertical-align: middle; width: 100px;">正常</td>' +
        '</tr>';

      $('#dataTable tbody').append(msg);
    }
    drawLine(pos);
  }

  function drawLine(pos) {
    for (var i = 0; i < pos.length; i++) {
      var pointSta = new BMap.Point(pos[i].lng, pos[i].lat);
      var pointEnd = new BMap.Point(pos[i + 1].lng, pos[i + 1].lat);
      var polygon = new BMap.Polygon([pointSta, pointEnd], {
        strokeColor: "blue",
        strokeWeight: 2,
        strokeOpacity: 0.5
      });
      map.addOverlay(polygon);
    }
  }

  showPanel = function() {
    $('.map-right-panel').removeClass('hide');
  }
  hidePanel = function() {
    $('.map-right-panel').addClass('hide');
  }

  window.onload = function() {
    $('.map-right-panel').removeClass('hide');
  }
});