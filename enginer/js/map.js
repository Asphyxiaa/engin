jQuery(document).ready(function() {

  $('body').mLoading("show");
  // 百度地图API功能
  var map = new BMap.Map("allmap");
  var point = new BMap.Point(120.502467, 30.102365);
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
  map.setCurrentCity("柯桥区"); //由于有3D图，需要设置城市哦
  map.addControl(overView); //添加默认缩略地图控件
  map.addControl(overViewOpen); //右下角，打开
  map.addControl(top_left_navigation);
  map.enableScrollWheelZoom(true);

  // 复杂的自定义覆盖物
  function ComplexCustomOverlay(point, text) {
    this._point = point;
    this._text = text;
  }
  ComplexCustomOverlay.prototype = new BMap.Overlay();
  ComplexCustomOverlay.prototype.initialize = function(map) {
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

  ComplexCustomOverlay.prototype.draw = function() {
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x - 5 + "px";
    this._div.style.top = pixel.y - 54 + "px";
  }

  // 自定义覆盖物添加事件方法
  ComplexCustomOverlay.prototype.addEventListener = function(event, fun) {
    this._div['on' + event] = fun;
  }

  //判断复选框的选择状态
  //复选框
  var checkAttr = [];
  var pos = [];
  var startDate;

  $.ajax({
    headers: {
      'Authorization': 'Bearer ' + token,
    },
    async: false,
    type: 'GET',
    dataType: "json",
    url: apiUrl + "/ProjectInfo/GetProTypes",
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      //错误访问所需执行的操作
      //alert("初始化用户头像失败");
    },
    success: function(data) {
      var content = data.result.items;
      $('.mt-checkbox-inline').text(' ');
      for (var i = 0; i < content.length; i++) {
        var typeName = content[i].typeName;
        var typeId = parseInt(content[i].id);
        var con = '<label class="mt-checkbox" style="margin-left:10px;">' +
          '<input id="checkbox_' + typeId + '" class="checkbox"  type="checkbox" >' + typeName +
          '<span></span>' +
          '</label>';
        $('.mt-checkbox-inline').append(con);
        checkAttr.push(typeId);
      }

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
      ///默认当天时间
      $("#date_start_waterhis").val(date.getFullYear() + "-" + month + "-" + day);
      startDate = $("#date_start_waterhis").val();
      getBoundary();
      getData(checkAttr, startDate); //默认第一次进来
    }
  });
  var ply;

  function getBoundary() {
    var bdary = new BMap.Boundary();
    bdary.get("绍兴柯桥区", function(rs) { //获取行政区域
      map.clearOverlays(); //清除地图覆盖物       
      var count = rs.boundaries.length; //行政区域的点有多少个
      if (count === 0) {
        alert('未能获取当前输入行政区域');
        return;
      }
      var pointArray = [];
      for (var i = 0; i < count; i++) {
        ply = new BMap.Polygon(rs.boundaries[i], {
          strokeWeight: 2,
          strokeColor: "#ff0000"
        }); //建立多边形覆盖物
        map.addOverlay(ply); //添加覆盖物
        pointArray = pointArray.concat(ply.getPath());
      }
      map.centerAndZoom(new BMap.Point(120.50580573503,30.108819277852),15);
      //map.setViewport(pointArray); //调整视野                
    });
  }

  var myData;
  var polyline;
  var polylineRoad = { ///轨迹点和线的集合
    markers: [],
    lines: []
  };
  var infoWindowPanel = [];
  var proPoint = [];
  var polygon;
  var rectangle;
  var options;
  var proMarkerInfo = { //标注和覆盖物的集合
    promaker: [],
    proMyComp: []
  };
  var maker;
  var myCompOverlay;

  var drawPos = {
    point: [],
    time: []
  };
  var drawlinepol;
  var car;
  var driveline = { //动态巡查
    dri: []
  };
  var index = 0;
  var label; //信息标签
  var centerPoint; //中间点
  var timer; //定时器
  var playBtn;
  var resetBtn;

  playBtn = document.getElementById("play");
  resetBtn = document.getElementById("reset");

  function getData(checkAttr, selDate) {
    $.ajax({
      headers: {
        'Authorization': 'Bearer ' + token,
      },
      type: 'GET',
      dataType: "json",
      data: {
        "InspectDate": selDate
      },
      traditional: true,
      url: apiUrl + "/Project3D/GetProInfoStatus",
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        //错误访问所需执行的操作
        alert("数据请求失败!");
      },
      success: function(data) {
        $('body').mLoading("hide");
        $('.xctab').mLoading("hide");

        myData = data.result.items;
        ///先判断左边的三个选择框是否选中。

        ///判断巡查路线是否选中
        if ($('.checked_road').is(":checked")) {
          delInspectLines(); //删除路线
          delProinfodiv(); //删除标注

          ///有没有工程
          tableInspectSetData(myData[options.val()].trails);
        }
        if ($('.checked_range').is(":checked")) {
          addCoords(myData);
        }

        if ($('.checked_file').is(":checked")) {
          addProjectFaces(myData);
        }
        ///加载表格数据
        tableSetData(myData);
      }
    });
  }


  $('.checked_road').on('click', function() { //巡查路线
    if ($('.checked_road').is(":checked")) {
      dropdown(myData);
      addInspectLines(myData[options.val()].trails);
      $('.xunjain').show();
      $('.xunjain a').trigger('click');

      $('#dataTable1 .xctab').text('');
      if (myData.length > 0) {
        index = 0;
        playBtn.disabled = true;
        $('#play').css('color', '#888');
        tableInspectSetData(myData[options.val()].trails);
      }
      // reset();
    } else {
      delInspectLines();
      $('#dataTable1 .xctab').text('');
      $('.xunjain').hide();
      $('.pro a').trigger('click');
    }
  });

  $('.checked_range').on('click', function() { //工程范围
    if ($('.checked_range').is(":checked")) {
      addCoords(myData);
    }
  });

  $('.checked_file').on("click", function() { //工程面貌
    if ($('.checked_file').is(":checked")) {
      addProjectFaces(myData);
    }
  });

  $('.checked_area').on("click", function() { //行政区域
    if($('.checked_area').is(":checked")){
      map.addOverlay(ply);
      map.centerAndZoom(new BMap.Point(120.50580573503,30.108819277852),15);
    }else{
      map.removeOverlay(ply);
    }
  });

  ///巡查表格填充
  function tableInspectSetData(data) {

    $('#dataTable1 .xctab').text('');
    var tip = '<tr><td colspan="3" style="text-align: center; vertical-align: middle; width: 340px;">当天无数据</td></tr>';
    $('#dataTable1 .xctab').append(tip);
    delInspectLines();
    if (data.length > 0) {
      //添加巡检信息
      $('#dataTable1 .xctab').text('');
      for (var i = 0; i < data.length; i++) {
        var longitude = data[i].longitude;
        var latitude = data[i].latitude;
        var long = longitude.toFixed(5);
        var lati = latitude.toFixed(5);
        var inspectTime = new Date(data[i].inspectTime);
        inspectTime = inspectTime.Format("yyyy-MM-dd hh:mm:ss");
        var aa = '<tr>' +
          '<td class="pro-time" style="text-align: center; vertical-align: middle; width: 100px;">' + inspectTime +
          '<td class="projd_' + i + '" style="text-align: center; vertical-align: middle; width: 120px;">' + long + '</td>' +
          '<td class="prowd_' + i + '" style="text-align: center; vertical-align: middle; width: 120px;">' + lati + '</td>' +
          '</tr>';
        $('#dataTable1 .xctab').append(aa);
      }
      addInspectLines(myData[options.val()].trails);
    }
  }


  xcinfo = function() { //轨迹查询
    delInfopro();
    $('#dataTable1 .xctab').text('');
    $('.xctab').mLoading("show");
    startDate = $("#date_start_waterhis").val();
    drawPos = {
      point: [],
      time: []
    };
    getData(checkAttr, startDate);
    index = 0;
    $('#play').css('color', '#888');
    playBtn.disabled = true;
    // reset();
  }

  ///增加工程范围
  function addCoords(data) {
    for (var i = 0; i < data.length; i++) {
      var proProtectCoord = data[i].proProtectCoord; //保护范围
      var opts = {
        width: 200,
        height: 100,
        title: '信息窗口'
      };
      if (proProtectCoord != null) {
        var arrProProtect = proProtectCoord.split(" ");
        var pro_sContent = "保护范围";
        var pro_infoWindow = new BMapLib.SearchInfoWindow(map, pro_sContent, {
          title: "信息窗口",
          searchTypes: []
        });
        var ProCoord = [];
        for (var k = 0; k < arrProProtect.length; k++) {
          var arrProProtectSplit = arrProProtect[k].split(",");
          var ProCoordpoint = new BMap.Point(arrProProtectSplit[0], arrProProtectSplit[1]);
          ProCoord.push(ProCoordpoint);
        }
        rectangle = new BMap.Polygon(ProCoord, {
          strokeColor: "red",
          fillColor: "#ffffff",
          fillOpacity: 0.3,
          strokeWeight: 2,
          strokeOpacity: 0.2
        }); //创建多边形1
      }

      var proManageCoord = data[i].proManageCoord; //管理范围
      var opts = {
        width: 200,
        height: 100,
        title: '信息窗口'
      };
      if (proManageCoord != null) {
        var arrProMana = proManageCoord.split(" ");
        var man_sContent = "管理范围";
        var man_infoWindow = new BMapLib.SearchInfoWindow(map, man_sContent, {
          title: "信息窗口",
          searchTypes: []
        });
        var ManCoord = [];
        for (var k = 0; k < arrProMana.length; k++) {
          var arrProManaSplit = arrProMana[k].split(",");
          var ManCoordpoint = new BMap.Point(arrProManaSplit[0], arrProManaSplit[1]);
          ManCoord.push(ManCoordpoint);
        }
        polygon = new BMap.Polygon(ManCoord, {
          strokeColor: "blue",
          fillColor: "#ffffff",
          fillOpacity: 0.3,
          strokeWeight: 2,
          strokeOpacity: 0.2
        }); //创建多边形2
      }
      if ($('.checked_range').is(":checked")) {
        map.addOverlay(rectangle);
        map.addOverlay(polygon);
        polrecclick(polygon, rectangle, pro_infoWindow, man_infoWindow);
      }
      addpolrec(polygon, rectangle, pro_infoWindow, man_infoWindow);
    }
  }

  ///增加工程面貌
  function addProjectFaces(data) {
    for (var i = 0; i < data.length; i++) {
      var projectFace = data[i].projectFace;
      if (projectFace.length > 0) {
        for (var k = 0; k < projectFace.length; k++) {
          var profilePictureName = projectFace[k].profilePictureName;
          if (profilePictureName == null) {
            profilePictureName = ' ';
          }
          var a = k + i * 10;
          var profileGuid = projectFace[k].profilePictureId;
          var file_imgId = "img_" + k;
          var pro_lng = projectFace[k].longitude;
          var pro_lat = projectFace[k].latitude;
          var opts_file = {
            width: 330,
            height: 230
          }
          if (pro_lng != null && pro_lat != null) {
            var profilePoint = new BMap.Point(pro_lng, pro_lat);
            var profileMarker = new BMap.Marker(profilePoint);
            var profile_myCompOverlay = new ComplexCustomOverlay(profilePoint, profilePictureName);
            if ($('.checked_file').is(":checked")) { //面貌勾选判断
              map.addOverlay(profileMarker);
              map.addOverlay(profile_myCompOverlay);
              addClickHandlerFile(profile_myCompOverlay, profilePoint, opts_file, profileMarker, k, profilePictureName, file_imgId, profileGuid, a);
            }
            profacecli(profile_myCompOverlay, profilePoint, opts_file, profileMarker, k, profilePictureName, file_imgId, profileGuid, a);
          }
        }
      }
    }
  }

  ///增加巡查路线
  function addInspectLines(data) {
    drawPos = {
      point: [],
      time: []
    };
    var trails = data;
    if (trails.length > 0) {
      $('.xctab').mLoading("hide");
      $('#dataTable1 tbody').text(' ');
      for (var h = 0; h < trails.length; h++) {
        var longitude = trails[h].longitude;
        var latitude = trails[h].latitude;
        var makergg = new BMap.Point(longitude, latitude);
        var long = longitude.toFixed(5);
        var lati = latitude.toFixed(5);
        var inspectTime = trails[h].inspectTime;
        inspectTime = new Date(inspectTime);
        inspectTime = inspectTime.Format("yyyy-MM-dd hh:mm:ss");
        var point_road = new BMap.Point(longitude, latitude);

        pos.push(point_road);
        drawPos.point.push(point_road);
        drawPos.time.push(inspectTime);
        if (h == 0) {
          var roadIcon = new BMap.Icon("img/baidu.png", new BMap.Size(22, 22), {
            imageOffset: new BMap.Size(0, 0)
          });
        } else if (h == trails.length - 1) {
          var roadIcon = new BMap.Icon("img/baidu.png", new BMap.Size(22, 22), {
            imageOffset: new BMap.Size(0, -25)
          });
        } else {
          var roadIcon = new BMap.Icon("img/marker8.png", new BMap.Size(8, 8));
        }

        var maker_road = new BMap.Marker(point_road, {
          icon: roadIcon
        });

        map.addOverlay(maker_road);
        polylineRoad.markers.push(maker_road);

        //添加巡检信息
        var aa = '<tr>' +
          '<td class="pro-time" style="text-align: center; vertical-align: middle; width: 100px;">' + inspectTime +
          '<td class="projd_' + h + '" style="text-align: center; vertical-align: middle; width: 120px;">' + long + '</td>' +
          '<td class="prowd_' + h + '" style="text-align: center; vertical-align: middle; width: 120px;">' + lati + '</td>' +
          '</tr>';
        $('#dataTable1 .xctab').append(aa);
        addmakerRoad(point_road, inspectTime, maker_road, h);
      }

      polyline = new BMap.Polyline(pos, {
        strokeColor: "blue",
        strokeWeight: 6,
        strokeOpacity: 0.5
      });
      map.addOverlay(polyline);
      polylineRoad.lines.push(polyline);
      pos = [];

      centerPoint = new BMap.Point((drawPos.point[0].lng + drawPos.point[drawPos.point.length - 1].lng) / 2,
        (drawPos.point[0].lat + drawPos.point[drawPos.point.length - 1].lat) / 2)
      map.panTo(centerPoint);
      map.centerAndZoom(centerPoint, 17); // 缩放级别
      label = new BMap.Label("", { //显示信息标签
        offset: new BMap.Size(-40, -50)
      });
      car = new BMap.Marker(drawPos.point[0]);

      map.addOverlay(car);

      playBtn.disabled = false;
      resetBtn.disabled = false;
      $('#play').css('color', '#000');
    }
  }


  play = function() { //播放
    car.setLabel(label);

    if (playBtn.disabled == false) {
      $('#play').css('color', '#888');
    }
    map.centerAndZoom(drawPos.point[0], 17);
    if (myData[options.val()].trails.length != 0) {
      playBtn.disabled = true;

      var drawPo = drawPos.point[index];
      var drawTime = drawPos.time[index];
      if (index > 0) {
        drawlinepol = new BMap.Polyline([drawPos.point[index - 1], drawPo], {
          strokeColor: "red",
          strokeWeight: 1,
          strokeOpacity: 1
        });
        map.addOverlay(drawlinepol);
        driveline.dri.push(drawlinepol);
      }
      if (drawPos.time.length > 0) {
        label.setContent("时间:" + drawTime + "<br/>经度: " + drawPo.lng + "<br/>纬度: " + drawPo.lat);
      }
      car.setPosition(drawPo);
      index++;

      if (index < drawPos.point.length) {

        timer = setTimeout(function() {
          play(index);
        }, 1000);
      } else {
        playBtn.disabled = true;
        map.panTo(drawPos.point[drawPos.point.length - 1]);
      }
    }
  }

  reset = function() { //重置
    if (drawPos.time.length > 0) {
      label.setContent("时间:" + drawPos.time[0] + "<br/>经度: " + drawPos.point[0].lng + "<br/>纬度: " + drawPos.point[0].lat);
    }
    playBtn.disabled = false;
    $('#play').css('color', '#000');
    if (timer) {
      window.clearTimeout(timer);
    }
    index = 0;
    car.setPosition(drawPos.point[0]);
    map.panTo(drawPos.point[0]);
    for (var i = 0; i < driveline.dri.length; i++) {
      map.removeOverlay(driveline.dri[i]);
    }
  }

  //增加下拉列表
  function dropdown(data) {
    $('#sel').text('');
    for (var i = 0; i < data.length; i++) {
      let proName = data[i].proName;
      var menulist = '<option value="' + i + '">' + proName + '</option>';
      $('#sel').append(menulist);
    }
    options = $('#sel');
  }

  //删除巡查
  function delInspectLines() {
    ///先删除线
    for (var i = 0; i < polylineRoad.lines.length; i++) {
      map.removeOverlay(polylineRoad.lines[i]);
    }

    ///后删除点
    for (var i = 0; i < polylineRoad.markers.length; i++) {
      map.removeOverlay(polylineRoad.markers[i]);
    }

    map.removeOverlay(car);

    for (var i = 0; i < driveline.dri.length; i++) {
      map.removeOverlay(driveline.dri[i]);
    }
  }

  //删除地图上的标注
  function delProinfodiv() {
    for (var i = 0; i < proMarkerInfo.promaker.length; i++) {
      map.removeOverlay(proMarkerInfo.promaker[i]);
    }

    for (var i = 0; i < proMarkerInfo.proMyComp.length; i++) {
      map.removeOverlay(proMarkerInfo.proMyComp[i]);
    }
  }

  //删除打开信息框
  function delInfopro() {
    infoWindowPanel = [];
  }

  ///表格数据填充
  function tableSetData(content) {
    $('#dataTable tbody').text('');
    delProinfodiv();
    for (var i = 0; i < content.length; i++) {
      var proName = content[i].proName;
      var checkedTypeId = content[i].checkedStatusId;
      var checkedType, myIcon;
      switch (checkedTypeId) {
        case 1:
          checkedType = "正常";
          myIcon = new BMap.Icon("img/green.png", new BMap.Size(48, 80));
          break;
        case 2:
          checkedType = "有隐患";
          myIcon = new BMap.Icon("img/red.png", new BMap.Size(48, 80));
          break;
        case 4:
          checkedType = "未巡查";
          myIcon = new BMap.Icon("img/blue.png", new BMap.Size(48, 80));
          break;
      }

      var longitude = content[i].longitude;
      var latitude = content[i].latitude;
      var id = content[i].id;
      var proInformation = content[i].proInformation == null ? '' : proInformation;
      var photoGuid = content[i].profilePictureId;
      var makergg = new BMap.Point(longitude, latitude);
      proPoint.push(makergg);
      maker = new BMap.Marker(makergg, {
        icon: myIcon
      });
      myCompOverlay = new ComplexCustomOverlay(makergg, proName);
      map.addOverlay(myCompOverlay);
      map.addOverlay(maker);
      proMarkerInfo.promaker.push(maker);
      proMarkerInfo.proMyComp.push(myCompOverlay);
      showInfoWindow(maker, content[i], makergg);
      ////加点
      //右侧面板 
      var h = i + 1;
      var msg = "<tr>" +
        "<td class='pro-number' style='text-align: center; vertical-align: middle; width: 69px;'>" + h +
        "<td class='proname_" + i + "' style='text-align: center; vertical-align: middle; width: 228px;'>" + proName + "</td>" + '<td class="prostatus_' + i + '" style="text-align: center; vertical-align: middle; width: 100px;">' + checkedType + '</td>' +
        '</tr>';
      $('#dataTable tbody').append(msg);
      addClickHandler(i, makergg, content, 'proname_' + i);
    }
  }

  // 点击工程跳转对应的坐标
  function addClickHandler(i, makergg, content, name) {
    $('.' + name).click(function(e) {
      map.centerAndZoom(makergg, 17);
      getPhoto(content[i].profilePictureId, e, makergg, content[i], name, i);
      $(this).parent().addClass('selhighlight');
      $(this).parent().siblings().removeClass('selhighlight');
    });
  }

  //// 信息框的值
  function showInfoWindow(marker, data, makergg) {
    var photoGuid = data.profilePictureId;
    marker.addEventListener("click", function(e) {
      getPhoto(photoGuid, e, makergg, data, 'proname_', data.id);
    });
  }

  //获取弹出层的图片
  var getPhoto = function(guid, e, makergg, pdata, type, index) {
    if (guid != null) {
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
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          //错误访问所需执行的操作
          //alert("初始化用户头像失败");
        },
        success: function(data) {
          var imgsrc;
          if (data.result.profilePicture == "") {
            imgsrc = 'img/timg.jpg';
          } else {
            imgsrc = 'data:image/jpeg;base64,' + data.result.profilePicture;
          }
          var proinfo = openInfoDiv(pdata, imgsrc);

          openInfo(proinfo, e, makergg);
        }
      });
    } else {
      var width = 0,
        height = 0;
      var proinfo;

      if (type.substring(0, 7) == 'proname') {
        var imgsrc = 'img/timg.jpg';
        proinfo = openInfoDiv(pdata, imgsrc);
      } else {
        var inspectTime = new Date(pdata[index].inspectTime);
        inspectTime = inspectTime.Format("yyyy-MM-dd hh:mm:ss");
        proinfo = inspectTime;
        map.centerAndZoom(makergg, 17);
      }

      openInfo(proinfo, e, makergg);
    }
  }

  ///弹出层div
  function openInfoDiv(data, imgsrc) {
    var proName = data.proName;
    var type = data.proInfoType.typeName;
    var longitude = data.longitude == null ? '' : data.longitude;
    var latitude = data.latitude == null ? '' : data.latitude;
    var proInformation = data.proInformation == null ? '' : data.proInformation;

    var proinfo = '<div style="line-height:20px;padding:2px;height:156px">' +
      '<img style="float:left;margin-right:20px; border:1px solid black;" src="' + imgsrc + '" width="139" height="104"/>' +
      '工程名称：' + proName +
      '<br/>工程类型：' + type +
      '<br/>工程经度：' + longitude +
      '<br/>工程纬度：' + latitude +
      '<br/>工程简介：' + proInformation +
      '</div>' +

      '<div class="bont threeD-map">' +
      '<a target="_blank" class="info_bon" href="javascript:;">' +
      '<i class="fa fa-map-marker"></i>三维图' +
      '</a>' +
      '</div>' +
      '<div class="bont map">' +
      '<a target="_blank" class="info_bon" href="javascript:;">' +
      '<i class="fa fa-map"></i>全景图' +
      '</a>' +
      '</div>' +
      '<div class="bont proinfo">' +
      '<a target="_blank" class="info_bon" href="engineering/engineerion-information.html?proid=' + data.id + '">' +
      '<i class="fa fa-file-o"></i>工程信息' +
      '</a>' +
      '</div>' +
      '<div class="bont user">' +
      '<a target="_blank" class="info_bon" href="http://120.76.241.72:8060/app/main/manager">' +
      '<i class="fa fa-user-circle"></i>巡查人员' +
      '</a>' +
      '</div>' +
      '<div class="bont warninfo">' +
      '<a target="_blank" class="info_bon" href="http://120.76.241.72:8060/app/main/damage-info">' +
      '<i class="fa fa-warning"></i>隐患记录' +
      '</a>' +
      '</div>';
    return proinfo;
  }

  ///弹出层
  function openInfo(proinfo, e, makergg) {
    var infoWindow_pro = new BMapLib.SearchInfoWindow(map, proinfo, {
      title: "工程信息",
      width: 400,
      height: 190,
      enableAutopan: true,
      searchTypes: []
    }); // 创建信息窗口对象
    infoWindowPanel.push(infoWindow_pro);
    infoWindow_pro.open(makergg);
  }

  ///展开后边的功能框
  window.onload = function() {
    $('.map-right-panel').removeClass('hide');
    $('.checkbox').prop("checked", true);
  }

  showPanel = function() {
    $('.map-right-panel').removeClass('hide');
  }
  hidePanel = function() {
    $('.map-right-panel').addClass('hide');
  }

  ////设置checkbox点击事件
  $('.checkbox').on("click", function() {
    //获取全部的数据
    //点击哪个删除哪个
    var Id = $(this).attr('id');
    var menuId = Id.substring(9);
    if ($('#' + Id).is(":checked")) {
      newMenuId = parseInt(menuId);
      checkAttr.push(newMenuId);
    } else {
      newMenuId = parseInt(menuId);
      checkAttr.splice($.inArray(newMenuId, checkAttr), 1);
    }

    if (checkAttr.length == 0) {
      $('#dataTable tbody').text(' ');
      var tip = '<tr><td colspan="3" style="text-align: center; vertical-align: middle; width: 340px;">请选择工程类型</td></tr>'
      $('#dataTable tbody').append(tip);
    } else {
      $('body').mLoading("show");
      getData(checkAttr, startDate);
    }
    map.clearOverlays();
  });


  function addClickHandlerFile(profile_myCompOverlay, profilePoint, opts_file, profileMarker, k, profilePictureName, file_imgId, profileGuid, a) {
    var profileinfo = '<div style="line-height:20px;padding:2px;">' +
      '<a class="fileImg_' + a + '" target="_blank" href="fileImg.html?name=fileImg_' + a + '&fileGuid=' + profileGuid + '">' +
      '<img class="example-image" style="float:left;margin:4px; border:1px solid black;" id ="' + file_imgId + '"  width="320" height="197"/>' +
      '</a>' +
      '</div>';
    profile_myCompOverlay.addEventListener("click", function(e) {
      openfileinfo(profileinfo, e, profilePoint, profilePictureName);
      getPhoto1(profileGuid, file_imgId);
    });
    profileMarker.addEventListener("click", function(e) {
      openfileinfo(profileinfo, e, profilePoint, profilePictureName);
      getPhoto1(profileGuid, file_imgId);
    });
  }

  function openfileinfo(profileinfo, e, profilePoint, profilePictureName) {
    var infoWindow_profile = new BMapLib.SearchInfoWindow(map, profileinfo, {
      title: profilePictureName,
      searchTypes: []
    });
    infoWindowPanel.push(infoWindow_profile);
    infoWindow_profile.open(profilePoint);

    $('.checked_file').on("click", function() { //工程面貌
      if ($('.checked_file').is(":checked")) {} else {
        infoWindow_profile.close();
      }
    });
  }

  var getPhoto1 = function(guid, imgId) {
    if (guid != null) {
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
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          //错误访问所需执行的操作
          //alert("初始化用户头像失败");
        },
        success: function(data) {
          if (data.result.profilePicture == "") {
            $("#" + imgId).attr('src', 'img/timg.jpg');
          } else {
            $("#" + imgId).attr('src', 'data:image/jpeg;base64,' + data.result.profilePicture);
          }
        }
      });
    } else {
      $("#" + imgId).attr('src', 'img/timg.jpg');
    }
  }


  var initUserName = function() {
    $.ajax({
      headers: {
        'Authorization': 'Bearer ' + token,
      },
      async: false,
      type: 'GET',
      dataType: "json",
      url: apiUrl + "/Session/GetCurrentLoginInformations",
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        //错误访问所需执行的操作
        //alert("初始化用户名称失败");
      },
      success: function(data) {
        // //正确访问所需执行的操作

        $('.dropdown-dark').contents().find("#username").text(data.result.user.surname + data.result.user.name);

      }
    });
  }
  var initUserPic = function() {
    $.ajax({
      headers: {
        'Authorization': 'Bearer ' + token,
      },
      async: false,
      type: 'GET',
      dataType: "json",
      url: apiUrl + "/Profile/GetProfilePicture",
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        //错误访问所需执行的操作
        //alert("初始化用户头像失败");
      },
      success: function(data) {
        // //正确访问所需执行的操作

        $('.dropdown-dark').contents().find("#userpic").attr('src', 'data:image/jpeg;base64,' + data.result.profilePicture);

      }
    });
  }
  initUserPic();
  initUserName();

  //点击工程列
  // $('.on').click(function() {
  //   $('#proTyprList').toggle();
  // });


  function addpolrec(polygon, rectangle, pro_infoWindow, man_infoWindow) {

    $('.checked_range').on('click', function() {

      if ($('.checked_range').is(":checked")) {
        map.addOverlay(rectangle);
        map.addOverlay(polygon);
        polrecclick(polygon, rectangle, pro_infoWindow, man_infoWindow);
      } else {
        map.removeOverlay(polygon);
        map.removeOverlay(rectangle);
        man_infoWindow.close();
        pro_infoWindow.close();
      }
    });
  }

  function profacecli(profile_myCompOverlay, profilePoint, opts_file, profileMarker, k, profilePictureName, file_imgId, profileGuid, a) { //工程面貌函数
    $('.checked_file').on("click", function() {
      if ($('.checked_file').is(":checked")) {
        map.addOverlay(profileMarker);
        map.addOverlay(profile_myCompOverlay);
        addClickHandlerFile(profile_myCompOverlay, profilePoint, opts_file, profileMarker, k, profilePictureName, file_imgId, profileGuid, a);
      } else {
        map.removeOverlay(profileMarker);
        map.removeOverlay(profile_myCompOverlay);
      }
    });
  }

  function polrecclick(polygon, rectangle, pro_infoWindow, man_infoWindow) {
    polygon.addEventListener("click", function(e) {
      var point1 = new BMap.Point(e.point.lng, e.point.lat);
      pro_infoWindow.open(point1);
    });

    rectangle.addEventListener("click", function(e) {
      var point1 = new BMap.Point(e.point.lng, e.point.lat);
      man_infoWindow.open(point1);
    });
  }

  ///1、默认进来执行inxc函数方法（前面先默认当天时间）
  ///2、默认进来只加点，加右边表格数据，
  ///3、当执行巡查路线操作的时候，要判断是否选中。如果选中，那我们就读默认进来的轨迹数据，然后再叠加marker点
  ///4、如果再点巡查路径（取消操作），先清除地图上的marker点，pos为空，然后再清除table，然后再关闭table。
  ///5、如果选择时间的话，点查询，先清除地图上的markers，pos为空，然后再请求数据，然后再赋值，叠加。


  function addmakerRoad(point_road, inspectTime, maker_road, h) {
    var maker_roadops = {
      width: 70,
      height: 10
    }

    var road_info = new BMap.InfoWindow(inspectTime, maker_roadops);

    $('.checked_road').on('click', function() {
      if ($('.checked_road').is(":checked")) {} else {
        map.closeInfoWindow(road_info, point_road);
      }
    });

    $('.projd_' + h).click(function(e) {
      map.panTo(point_road);
      map.centerAndZoom(point_road, 18);
      map.openInfoWindow(road_info, point_road);
      $(this).parent().addClass('selhighlight');
      $(this).parent().siblings().removeClass('selhighlight');
    });
  }

  Date.prototype.Format = function(fmt) {
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