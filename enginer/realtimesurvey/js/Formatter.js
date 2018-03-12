/*Newtonsoft序列化Json日期处理*/
/*作者:taoyb*/
/*时间:2013-5-9*/
var Formatter = {
    LongDateTime: function (value) {
        if (value == undefined || value == null) {
            return "--";
        }
        value = value.replace(/T/g, " ").replace(/-/g, '/').split('.')[0];
        var obj = new Date(value);
        if (obj.getFullYear() < 1900) {
            return "--";
        }
        return obj.Format("yyyy-MM-dd hh:mm");
    },
    LongDateTimeSecond: function (value) {
        if (value == undefined || value == null) {
            return "--";
        }
        value = value.replace(/T/g, " ").replace(/-/g, '/').split('.')[0];
        var obj = new Date(value);
        if (obj.getFullYear() < 1900) {
            return "";
        }
        return obj.Format("yyyy-MM-dd hh:mm:ss");
    },
    ShortDateTime: function (value) {
        if (value == undefined || value == null) {
            return "--";
        }
        value = value.replace(/T/g, " ").replace(/-/g, '/').split('.')[0];
        var obj = new Date(value);
        if (obj.getFullYear() < 1900) {
            return "";
        }
        return obj.Format("MM-dd hh:mm");
    },
    Date: function (value) {
        if (value == undefined || value == null) {
            return "--";
        }
        value = value.replace(/T/g, " ").replace(/-/g, '/').split('.')[0];
        var obj = new Date(value);
        if (obj.getFullYear() < 1900) {
            return "--";
        }
        return obj.Format("yyyy-MM-dd");
    },
    DateDay: function (value) {
        if (value == undefined || value == null) {
            return "--";
        }
        value = value.replace(/T/g, " ").replace(/-/g, '/').split('.')[0];
        var obj = new Date(value);
        if (obj.getFullYear() < 1900) {
            return "--";
        }
        return obj.Format("yyyy-MM");
    },
    DateChinese: function (value) {
        if (value == undefined || value == null) {
            return "--";
        }
        value = value.replace(/T/g, " ").replace(/-/g, '/').split('.')[0];
        var obj = new Date(value);
        if (obj.getFullYear() < 1900) {
            return "";
        }
        return obj.Format("yyyy年MM月");
    },
    DateChinese2: function (value) {
        if (value == undefined || value == null) {
            return "--";
        }
        value = value.replace(/T/g, " ").replace(/-/g, '/').split('.')[0];
        var obj = new Date(value);
        if (obj.getFullYear() < 1900) {
            return "";
        }
        return obj.Format("yyyy年MM月dd日");
    },
    Time: function (value) {
        if (value == undefined || value == null) {
            return "--";
        }
        value = value.replace(/T/g, " ").replace(/-/g, '/').split('.')[0];
        var obj = new Date(value);
        if (obj.getFullYear() < 1900) {
            return "";
        }
        return obj.Format("hh:mm:ss");
    },
    Year: function (value) {
        if (value == undefined || value == null) {
            return "--";
        }
        value = value.replace(/T/g, " ").replace(/-/g, '/').split('.')[0];
        var obj = new Date(value);
        if (obj.getFullYear() < 1900) {
            return "";
        }
        return obj.Format("yyyy");
    }
};

Date.prototype.Format = function (fmt) { //author: meizz 
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