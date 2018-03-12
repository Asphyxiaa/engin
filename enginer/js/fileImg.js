jQuery(document).ready(function () {
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
  
  var fileGuid = proUrl["fileGuid"];
  var imgId = proUrl["name"];

  var fileGetPhoto = function (fileGuid, imgId) {  
     if( fileGuid != null)
     {                  
       $.ajax({
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            async: false,
            type: 'GET',
            dataType: "json",
            data: {
                "profilePictureId": fileGuid
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

  var con = '<img id="'+ imgId +'" width="100%" height="100%">';
  $('body').append(con);
  fileGetPhoto(fileGuid, imgId);
});