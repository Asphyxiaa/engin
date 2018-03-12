//正则表达式获取地址栏参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}

//写cookies 
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";;
    document.cookie.path = "/";
}
//读取cookies 
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
//删除cookies 
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

//获取JSON长度
function JSONLength(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
}

//提示函数
function hint(msg, type, tm) {
    if ($(".msgbox-layer")) {
        $(".msgbox-layer").parent().remove();
    }
    var template = '<div class="msgbox-backgrop"><div class="msgbox-layer ';
    var timeout = tm || 2000;
    switch (type) {
        case 1://成功
            template += 'msgbox-success"><i class="glyphicon glyphicon-ok-sign"></i>';
            break;
        case 2://警告
            template += 'msgbox-warning"><i class="glyphicon glyphicon-exclamation-sign"></i>';
            break;
        case 3://危险
            template += 'msgbox-danger"><i class="glyphicon glyphicon-remove-sign"></i>';
            break;
        case 4://加载中
            template += 'msgbox-loading"><img class="loading" src="/Images/loading.gif" />';
            break;
        default://默认为一般信息
            template += '"><i class="glyphicon glyphicon-info-sign"></i>';
            break;
    }
    template += msg + '</div></div>';
    $("body").append(template);
    $(".msgbox-layer").parent().fadeIn(300);
    if (type != 4) {
        var t = setTimeout(function () {
            $(".msgbox-layer").parent().fadeIn(300).stop(500).fadeOut(300);
        }, timeout);
    }
    else {
        $(".msgbox-layer").parent().fadeIn(300);
    }
}
function hinthide() {
    $(".msgbox-layer").parent().fadeOut(300);
}

//确认函数
function affirm(msg, okFun, cancelFun) {
    if ($(".msgbox-layer")) {
        $(".msgbox-layer").parent().remove();
    }
    var template = '<div class="msgbox-backgrop"><div class="msgbox-layer msgbox-confirm msgbox-danger"><i class="glyphicon glyphicon-exclamation-sign"></i>';
    template += msg + '<p class="text-center"><a href="#" class="btn btn-primary" role="button">确定</a> <a href="#" class="btn btn-default" role="button">取消</a></p></div></div>';
    $("body").append(template);
    $(".msgbox-layer").parent().fadeIn(300);
    $('.msgbox-layer .btn-primary').on('click', function () {
        if (okFun)
            okFun();
        $(".msgbox-layer").parent().fadeOut(300);
        return true;
    });
    $('.msgbox-layer .btn-default').on('click', function () {
        if (cancelFun)
            cancelFun();
        $(".msgbox-layer").parent().fadeOut(300);
        return false;
    });
}

//关闭弹窗
function closeWin() {
    frameElement.api.close();
}

//检查字符串/对象是否为空
function IsEmpty(str) {
    if (str != undefined && str != "undefined" && str != "" && "null" != str && str != {} && str != [] && null != str && str != "--") {
        return false;
    } else {
        return true;
    }
}

//验证输入
function ValidateInput(array) {
    for (var i = 0; i < array.length; i++) {
        var obj = $("#" + array[i]);
        if (IsEmpty(obj.val())) {
            hint("请将信息填写完整");
            obj.focus();
            obj.select();
            return false;
        }
    }
    return true;
}
//获取当前时间前后某一天，参数0为当天
function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期，可以为负 
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;//获取当前月份的日期
    var d = dd.getDate();
    if (m <= 9 & d <= 9)
        return y + "-0" + m + "-0" + d;
    else if (m <= 9 & d > 9)
        return y + "-0" + m + "-" + d;
    else if (m > 9 & d <= 9)
        return y + "-" + m + "-0" + d;
    else
        return y + "-" + m + "-" + d;
}

//获取当前时间前后某一天，参数0为当天，精确到秒
function GetDateTimeStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期，可以为负 
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;//获取当前月份的日期
    var d = dd.getDate();

    var th = dd.getHours() > 9 ? dd.getHours() : "0" + dd.getHours();
    var tm = dd.getMinutes() > 9 ? dd.getMinutes() : "0" + dd.getMinutes();
    var ts = dd.getSeconds() > 9 ? dd.getSeconds() : "0" + dd.getSeconds();

    var timeStr = th + ":" + tm +":"+ts;

    if (m <= 9 & d <= 9)
        return y + "-0" + m + "-0" + d + " " + timeStr;
    else if (m <= 9 & d > 9)
        return y + "-0" + m + "-" + d + " " + timeStr;
    else if (m > 9 & d <= 9)
        return y + "-" + m + "-0" + d + " " + timeStr;
    else
        return y + "-" + m + "-" + d + " " + timeStr;

}

//显示月份
function GetMonthStr(addMonth) {
    var dd = new Date();
    dd.setMonth(dd.getMonth() + 1 + addMonth);//获取addMonth后的某月，可以为负 
    var year = dd.getFullYear();
    var month = dd.getMonth();
    var time = "";
    if (month < 10)
    { time = year + "-0" + month; }
    else {
        time = year + "-" + month;
    }
    return time;
}
//显示当前年前后某一年，参数0为当年
function GetYearStr(addYear) {
    var dd = new Date();
    dd.setYear(dd.getFullYear() + addYear);//获取addYear后的某年，可以为负 
    return dd.getFullYear();
}
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

//截取字符串
function CutStr(str, len) {
    if (!IsEmpty(str)) {
        var strlen = str.length;
        if (len < strlen) {
            str = str.substr(0, len - 2) + "...";
        }
        return str;
    } else {
        return "--";
    }
    
}

//是否为字符串
function isString(str) {
    return (typeof str == 'string') && str.constructor == String;
}

//是否为数组
function isArray(obj) {
    return (typeof obj == 'object') && obj.constructor == Array;
}

//图片上传预览，IE是用了滤镜
function previewImage(file, maxWidth, maxHeight) {
    var MAXWIDTH = maxWidth ? maxWidth : 100;
    var MAXHEIGHT = maxHeight ? maxHeight : 100;
    var cparent = $(file).parent(".img-zone");
    var img = document.createElement("img");

    if (file.files && file.files[0]) {
        img.onload = function () {
            cparent.children("img").attr("src", img.src);
        };
        var reader = new FileReader();
        reader.onload = function (evt) { img.src = evt.target.result; };
        reader.readAsDataURL(file.files[0]);
    }
    else {//兼容IE
        var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
        file.select();
        var src = document.selection.createRange().text;
        img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
    }
}


//多图片上传预览
function previewMulti(file) {
    var MAXWIDTH = 60;
    var MAXHEIGHT = 60;
    var cparent = $(file).parent(".img-editable");
    var ccontent = $("<div class='img-block'></div>");
    var btn = cparent.find(".upload-img");
    ccontent.insertBefore(btn);
    var img = document.createElement("img");;
    ccontent.append(img);
    var aa = document.createElement("a");
    var ii = document.createElement("i");
    ii.setAttribute('class', 'icon-dc-close');
    aa.append(ii);
    ccontent.append(aa);

    if (file.files && file.files[0]) {
        img.onload = function () {
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            img.width = rect.width;
            img.height = rect.height;
            //img.style.marginLeft = rect.left+'px';
            img.style.marginTop = rect.top + 'px';
        };
        var reader = new FileReader();
        reader.onload = function (evt) { img.src = evt.target.result; };
        reader.readAsDataURL(file.files[0]);
    }
    else {//兼容IE
        var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
        file.select();
        var src = document.selection.createRange().text;
        img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
        var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
        status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
        ccontent.innerHTML = "<div class='img-block' style='width:" + rect.width + "px;height:" + rect.height + "px;margin-top:" + rect.top + "px;" + sFilter + src + "\"'></div>";
    }
}

//计算图片缩小后位置
function clacImgZoomParam(maxWidth, maxHeight, width, height) {
    var param = { top: 0, left: 0, width: width, height: height };
    if (width > maxWidth || height > maxHeight) {
        var rateWidth = width / maxWidth;
        var rateHeight = height / maxHeight;

        if (rateWidth > rateHeight) {
            param.width = maxWidth;
            param.height = Math.round(height / rateWidth);
        } else {
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }

    param.left = Math.round((maxWidth - param.width) / 2);
    param.top = Math.round((maxHeight - param.height) / 2);
    return param;
}

//限制输入字符
function limitInput(field,limit) {
    var str = $("#" + field).val();
    if (str.length > limit) {
        hint("已超过最大输入限制！");
        $("#" + field).val(str.substr(0, limit));
    }
}

//值为空时替换null.undefined 值
function replaceEmpty(value,restr) {
    if (value == undefined || null == value ) {
        return restr;
    } else {
        return value;
    }
}