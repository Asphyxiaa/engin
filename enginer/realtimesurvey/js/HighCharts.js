var exportflag = false;//默认为可用，当设置为false时，图表的打印及导出功能失效
//初始化图形控件
function ResetStockToDefault(id) {
    Highcharts.setOptions({
        lang: {
            contextButtonTitle: "功能菜单",
            downloadJPEG: "保存为jpeg格式",
            downloadPDF: "保存为pdf格式",
            downloadPNG: "保存为png格式",
            downloadSVG: "保存为svg格式",
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            shortMonths: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一', '十二'],
            printChart: "打印图片",
            rangeSelectorFrom: "从",
            rangeSelectorTo: "至",
            rangeSelectorZoom: "缩放等级",
            resetZoom: "缩放",
            resetZoomTitle: "缩放",
            weekdays: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        },

        colors: ['#1C86EE', '#20B2AA', '#FFD700', '#FF0000', '#24CBE5', '#64E572', '#FF9655',
    '#FFF263', '#6AF9C4']

    });
    $('#chart').highcharts('StockChart', {
        chart: {
            //zoomType: 'xy',
            //spacingRight: 20
            alignTicks: false,
            //height: picHeight,
            //width: picWidth,
            borderColor: '#EBBA95',
            borderWidth: 1
        },

        legend: {
            enabled: true,
            align: 'right',
            verticalAlign: 'top',
            backgroundColor: '#FCFFC5',
            y: 0,
            shadow: true,
            floating: true
        },
        /**
       * 版权信息配置，不用修改直接复制
       * 
       * @param {boolean} enabled 是否显示版权信息
       * @param {string} href 版权信息所链接到的地址
       * @param {string} text 版权信息所显示的文字内容
       */
       credits: {
            enabled: false
        },

        /**
* 域选择配置
* 
* @param {array} buttons 缩放选择按钮
* @param {int} selected 默认选择缩放按钮中的第几个
* @param {boolean} inputEnabled 是否允许input标签选框
*/
        // rangeSelector: {
        //     enabled: false,
        //     // 缩放选择按钮，是一个数组。
        //     // 其中type可以是： 'millisecond', 'second', 'minute', 'day', 'week', 'month', 'ytd' (year to date), 'year' 和 'all'。
        //     // 其中count是指多少个单位type。
        //     // 其中text是配置显示在按钮上的文字
        //     buttons: [{
        //         type: 'minute',
        //         count: 60,
        //         text: '1小时'
        //     }, {
        //         type: 'minute',
        //         count: 180,
        //         text: '3小时'
        //     }, {
        //         type: 'minute',
        //         count: 360,
        //         text: '6小时'
        //     }, {
        //         type: 'day',
        //         count: 1,
        //         text: '1日'
        //     }, {
        //         type: 'day',
        //         count: 3,
        //         text: '3日'
        //     }, {
        //         type: 'all',
        //         text: '所有'
        //     }],
        //     buttonTheme: { // styles for the buttons
        //         fill: 'none',
        //         stroke: 'none',
        //         'stroke-width': 0,
        //         width: 50,
        //         r: 8,
        //         style: {
        //             color: '#039',
        //             fontWeight: 'bold'
        //         },
        //         states: {
        //             hover: {
        //             },
        //             select: {
        //                 fill: '#039',
        //                 style: {
        //                     color: 'white'
        //                 }
        //             }
        //         }
        //     },
        //     // 默认选择域：0（缩放按钮中的第一个）、1（缩放按钮中的第二个）……
        //     selected: 3,
        //     // 是否允许input标签选框
        //     inputEnabled: true,
        //     inputBoxWidth: 150,
        //     inputDateFormat: '%Y-%m-%d %H:%M:%S',
        //     inputEditDateFormat: '%Y-%m-%d %H:%M:%S',

        //     // Custom parser to parse the %H:%M:%S.%L format
        //     inputDateParser: function (value) {
        //         var time = new Date(Date.parse(value.replace(/-/g, "/")))
        //         return Date.UTC(time.getFullYear(), time.getMonth(), time.getDate(), time.getHours(), time.getMinutes());
        //     }
        // },
        title: {
            text: '测站水位过程线图'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                second: '%Y-%m-%d<br/>%H:%M:%S',
                minute: '%Y-%m-%d<br/>%H:%M',
                hour: '%Y-%m-%d<br/>%H:%M',
                day: '%Y<br/>%m-%d',
                week: '%Y<br/>%m-%d',
                month: '%Y-%m',
                year: '%Y'
            },
            labels: {
                formatter: function () {
                    return Highcharts.dateFormat('%Y-%m-%d<br/>%H:%M:%S', this.value);
                }
            }
        },
        yAxis: [{
            title: {
                text: '水位(m)'
            },
            labels: {
                format: '{value}m'
            },
            opposite: false,
            showEmpty: false
        },
         // { // Secondary yAxis
         //     title: {
         //         text: '雨量(mm)',
         //         style: {
         //             color: '#4572A7'
         //         }
         //     },
         //     labels: {
         //         format: '{value} mm',
         //         style: {
         //             color: '#4572A7'
         //         }
         //     },
         //     opposite: true,
         //     showEmpty: false
         // }
        ],
        tooltip: {
            // 日期时间格式化
            xDateFormat: '%Y-%m-%d %H:%M:%S',
            crosshairs: [true, true],
            formatter: function () {
                if (this.series.name === "警戒水位") {
                    return "警戒水位" + this.y + 'm';
                }
                else if (this.series.name === "危险水位") {
                    return "危险水位" + this.y + 'm';
                }
                var unit = "m";
                var s = '<b>' + this.x + '</b>';

                if (this.series.name === "小时雨量")
                    unit = "mm";
                return '<b>' + this.series.name + '</b><br/>' +
                Highcharts.dateFormat('%y年%m月%d日%H时%M分', this.x) + ': ' + this.y + unit;
            },
            shared: false
        },
        plotOptions: {
            /**
             * 数列，对于所有的图表都可以适用的配置参数，属于共用性质。
             */
            column: {
                // 鼠标样式
                cursor: 'pointer',

                // 当是柱状图时，柱状的宽度
                pointWidth: 15
            }
        },

        series: [{
            name: '水位',
            type: 'line',
            data: [],
            marker: {
                enabled: true
            },
            dataGrouping: {
                enabled: false
            }
        }, {
            name: '小时雨量',
            data: [],
            type: 'column',
            yAxis: 1,
            dataGrouping: {
                enabled: false
            }
        }
        ]
    });
}

//初始化图形控件
function ResetChartToDefault(id, dangerWater, warnWater) {
    Highcharts.setOptions({
        lang: {
            contextButtonTitle: "功能菜单",
            downloadJPEG: "保存为jpeg格式",
            downloadPDF: "保存为pdf格式",
            downloadPNG: "保存为png格式",
            downloadSVG: "保存为svg格式",
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            shortMonths: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一', '十二'],
            printChart: "打印图片",
            rangeSelectorFrom: "从",
            rangeSelectorTo: "至",
            rangeSelectorZoom: "缩放等级",
            resetZoom: "缩放",
            resetZoomTitle: "缩放",
            weekdays: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        },

        colors: ['#7CB5EC', '#20B2AA', '#FFD700', '#FF0000', '#24CBE5', '#64E572', '#FF9655',
    '#FFF263', '#6AF9C4']

    });
    $('#chart').highcharts({
        chart: {
            alignTicks: true,
            animation: true,
            borderColor: '#EBBA95',
            borderWidth: 1
        },

        legend: {
            enabled: true,
            align: 'right',
            verticalAlign: 'top',
            backgroundColor: '#FCFFC5',
            y: 0,
            shadow: true,
            floating: true
        },
        /**
       * 版权信息配置，不用修改直接复制
       * 
       * @param {boolean} enabled 是否显示版权信息
       * @param {string} href 版权信息所链接到的地址
       * @param {string} text 版权信息所显示的文字内容
       */
        credits: {
            enabled: false
        },
        title: {
            text: '测站水位过程线图'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                second: '%Y-%m-%d<br/>%H:%M:%S',
                minute: '%Y-%m-%d<br/>%H:%M',
                hour: '%Y-%m-%d<br/>%H:%M',
                day: '%Y<br/>%m-%d',
                week: '%Y<br/>%m-%d',
                month: '%Y-%m',
                year: '%Y'
            },
            gridLineColor: '#e0e0e0',
            gridLineDashStyle: 'ShortDot',
            gridLineWidth: 1,
            labels: {
                formatter: function () {
                    return Highcharts.dateFormat('%Y-%m-%d<br/>%H:%M:%S', this.value);
                }
            }
        },
        yAxis: [{
            title: {
                text: '水位(m)'
            },
            labels: {
                format: '{value}m'
            },
            id: 'WaterYAxies',
            opposite: false,
            gridLineColor: '#e0e0e0',
            gridLineDashStyle: 'ShortDot',
            gridLineWidth: 1,
            showEmpty: true
        },
         {
             title: {
                 text: '雨量(mm)',
                 style: {
                     color: '#4572A7'
                 }
             },
             labels: {
                 format: '{value} mm',
                 style: {
                     color: '#4572A7'
                 }
             },
             id: 'rainYAxies',
             opposite: true,
             showEmpty: true,
             reversed: true
         }
        ],
        tooltip: {
            // 日期时间格式化
            xDateFormat: '%Y-%m-%d %H:%M:%S',
            crosshairs: [true, true],
            formatter: function () {
                var s = Highcharts.dateFormat('%y年%m月%d日%H时', this.x);
                $.each(this.points, function () {
                    if (this.series.name === '警戒水位' || this.series.name === '危险水位' || this.series.name === "水位" || this.series.name.indexOf("水位") > -1)
                        s += '<br/>' + this.series.name + ': ' +
                            this.y + 'm';
                    else
                        s += '<br/>' + this.series.name + ': ' +
                            this.y + 'mm';
                });
                return s;
            },
            shared: true
        },
        plotOptions: {
            /**
             * 数列，对于所有的图表都可以适用的配置参数，属于共用性质。
             */
            column: {
                // 鼠标样式
                cursor: 'pointer',

                // 当是柱状图时，柱状的宽度
                pointWidth: 15
            }
        },
        series: [{
            name: '水位',
            type: 'line',
            data: [],
            marker: {
                enabled: true
            },
            dataGrouping: {
                enabled: false
            },
            id: 'WaterYSeries',


            color: '#0072E3'
        }, {
            name: '小时雨量',
            data: [],
            type: 'column',
            yAxis: 1,
            id: 'rainYSeries',
            dataGrouping: {
                enabled: false
            }
        }, {
            name: function () { if (warnWater) return warnWater; return '汛限水位' },
            type: 'line',
            data: [],
            marker: {
                enabled: false
            },
            dataGrouping: {
                enabled: false
            },
            id: 'WaterY1',


            color: '#ffd400'
        }, {
            name: function () { if (dangerWater) return dangerWater; return '设计水位' },
            type: 'line',
            data: [],
            marker: {
                enabled: false
            },
            dataGrouping: {
                enabled: false
            },
            id: 'WaterY2',


            color: '#d71345'
        }
        ]
    });
}

//初始化图形控件
function ResetChartToRainDefault(id) {
    $('#chart').highcharts({
        chart: {
            //zoomType: 'xy',
            //spacingRight: 20
            alignTicks: true,
            animation: true,
            //height: picHeight,
            //width: picWidth,
            borderColor: '#EBBA95',
            borderWidth: 1
        },

        legend: {
            enabled: true,
            align: 'right',
            verticalAlign: 'top',
            backgroundColor: '#FCFFC5',
            y: 0,
            shadow: true,
            floating: true
        },
        /**
       * 版权信息配置，不用修改直接复制
       * 
       * @param {boolean} enabled 是否显示版权信息
       * @param {string} href 版权信息所链接到的地址
       * @param {string} text 版权信息所显示的文字内容
       */
        credits: {
            enabled: false
        },
        title: {
            text: '测站水位过程线图'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                second: '%Y-%m-%d<br/>%H:%M:%S',
                minute: '%Y-%m-%d<br/>%H:%M',
                hour: '%Y-%m-%d<br/>%H:%M',
                day: '%Y<br/>%m-%d',
                week: '%Y<br/>%m-%d',
                month: '%Y-%m',
                year: '%Y'
            },
            gridLineColor: '#e0e0e0',
            gridLineDashStyle: 'ShortDot',
            gridLineWidth: 1,
            labels: {
                formatter: function () {
                    return Highcharts.dateFormat('%Y-%m-%d<br/>%H:%M:%S', this.value);
                }
            }
        },
        yAxis: [{
            title: {
                text: '雨量(mm)',
                style: {
                    color: '#4572A7'
                }
            },
            labels: {
                format: '{value} mm',
                style: {
                    color: '#4572A7'
                }
            },
            id: 'rainYAxies',
            opposite: false,
            gridLineColor: '#e0e0e0',
            gridLineDashStyle: 'ShortDot',
            gridLineWidth: 1,
            showEmpty: true
        }
        ],

        tooltip: {
            // 日期时间格式化
            xDateFormat: '%Y-%m-%d %H:%M:%S',
            crosshairs: [true, true],
            formatter: function () {
                var s = Highcharts.dateFormat('%y年%m月%d日%H时', this.x);
                $.each(this.points, function () {
                    if (this.series.name === '警戒水位' || this.series.name === '危险水位' || this.series.name === "水位")
                        s += '<br/>' + this.series.name + ': ' +
                            this.y + 'm';
                    else
                        s += '<br/>' + this.series.name + ': ' +
                            this.y + 'mm';
                });
                return s;

            },
            shared: true
        },
        plotOptions: {
            /**
             * 数列，对于所有的图表都可以适用的配置参数，属于共用性质。
             */
            column: {
                // 鼠标样式
                cursor: 'pointer',

                // 当是柱状图时，柱状的宽度
                pointWidth: 15
            }
        },
        series: [{
            name: '小时雨量',
            data: [],
            type: 'column',
            yAxis: 0,
            id: 'rainYSeries',
            dataGrouping: {
                enabled: false
            }
        }
        ]
    });
}

//初始化图形控件
function ResetChartToWaterDefault(id, dangerWater, warnWater) {
    $('#chart').highcharts({
        chart: {
            //zoomType: 'xy',
            //spacingRight: 20
            alignTicks: true,
            animation: true,

            //height: picHeight,
            //width: picWidth,
            borderColor: '#EBBA95',
            borderWidth: 1
        },

        legend: {
            enabled: true,
            align: 'right',
            verticalAlign: 'top',
            backgroundColor: '#FCFFC5',
            y: 0,
            shadow: true,
            floating: true
        },
        /**
       * 版权信息配置，不用修改直接复制
       * 
       * @param {boolean} enabled 是否显示版权信息
       * @param {string} href 版权信息所链接到的地址
       * @param {string} text 版权信息所显示的文字内容
       */
        credits: {
            enabled: false
        },
        title: {
            text: '测站水位过程线图'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                second: '%Y-%m-%d<br/>%H:%M:%S',
                minute: '%Y-%m-%d<br/>%H:%M',
                hour: '%Y-%m-%d<br/>%H:%M',
                day: '%Y<br/>%m-%d',
                week: '%Y<br/>%m-%d',
                month: '%Y-%m',
                year: '%Y'
            },
            gridLineColor: '#e0e0e0',
            gridLineDashStyle: 'ShortDot',
            gridLineWidth: 1,
            labels: {
                formatter: function () {
                    return Highcharts.dateFormat('%Y-%m-%d<br/>%H:%M:%S', this.value);
                }
            }
        },
        yAxis: [{
            title: {
                text: '水位(m)'
            },
            labels: {
                format: '{value}m'
            },
            id: 'WaterYAxies',
            opposite: false,
            gridLineColor: '#e0e0e0',
            gridLineDashStyle: 'ShortDot',
            gridLineWidth: 1,
            showEmpty: true
        }
        ],

        tooltip: {
            // 日期时间格式化
            xDateFormat: '%Y-%m-%d %H:%M:%S',
            crosshairs: [true, true],
            formatter: function () {
                var s = Highcharts.dateFormat('%y年%m月%d日%H时', this.x);
                $.each(this.points, function () {
                    if (this.series.name === '警戒水位' || this.series.name === '危险水位' || this.series.name === "水位")
                        s += '<br/>' + this.series.name + ': ' +
                            this.y + 'm';
                    else
                        s += '<br/>' + this.series.name + ': ' +
                            this.y + 'mm';
                });
                return s;

            },
            shared: true
        },
        plotOptions: {
            /**
             * 数列，对于所有的图表都可以适用的配置参数，属于共用性质。
             */
            column: {
                // 鼠标样式
                cursor: 'pointer',

                // 当是柱状图时，柱状的宽度
                pointWidth: 15
            }
        },
        series: [{
            name: '水位',
            type: 'line',
            data: [],
            marker: {
                enabled: true
            },
            dataGrouping: {
                enabled: false
            },
            id: 'WaterYSeries',
            color: '#0072E3'
        }, {
            name: function () { if (warnWater) return warnWater; return '汛限水位' },
            type: 'line',
            data: [],
            marker: {
                enabled: true
            },
            dataGrouping: {
                enabled: false
            },
            id: 'WaterY1',


            color: '#ffd400'
        }, {
            name: function () { if (dangerWater) return dangerWater; return '设计水位' },
            type: 'line',
            data: [],
            marker: {
                enabled: false
            },
            dataGrouping: {
                enabled: false
            },
            id: 'WaterY2',


            color: '#d71345'
        }
        ]
    });
}

//初始化图形控件
function ResetChart(id, yAxies, series, title) {
    var colorList = ['#5190D9', '#49C0E7', '#58C37E', '#EA6871', '#F6B349'];//默认五种
    if (series.length > 5) {
        colorList = ['#4A5EA4', '#5190D9', '#58C37E', '#96C877', '#F7F06E', '#EECA0E', '#F6B349', '#EA6871', '#A25F42', '#8B3BA3', '#B46CCB', '#49C0E7'];
    }
    Highcharts.setOptions({
        lang: {
            contextButtonTitle: "功能菜单",
            downloadJPEG: "保存为jpeg格式",
            downloadPDF: "保存为pdf格式",
            downloadPNG: "保存为png格式",
            downloadSVG: "保存为svg格式",
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            shortMonths: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一', '十二'],
            printChart: "打印图片",
            rangeSelectorFrom: "从",
            rangeSelectorTo: "至",
            rangeSelectorZoom: "缩放等级",
            resetZoom: "缩放",
            resetZoomTitle: "缩放",
            weekdays: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        },
        colors: colorList
    });
     $('#chart').highcharts({
        chart: {
            alignTicks: true,
            animation: true,
            borderColor: '#EBBA95',
            borderWidth: 1
        },
        exporting:
        {
            enabled: exportflag //默认为可用，当设置为false时，图表的打印及导出功能失效
        },
        legend: {
            enabled: true,
            align: 'right',
            verticalAlign: 'top',
            backgroundColor: '#FCFFC5',
            y: 0,
            shadow: true,
            floating: true
        },
        /**
       * 版权信息配置，不用修改直接复制
       * 
       * @param {boolean} enabled 是否显示版权信息
       * @param {string} href 版权信息所链接到的地址
       * @param {string} text 版权信息所显示的文字内容
       */
        credits: {
            enabled: false
        },
        title: {
            text: title
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            //type: 'datetime',
            type: 'date',
            dateTimeLabelFormats: {
                //second: '%Y-%m-%d<br/>%H:%M:%S',
                //minute: '%Y-%m-%d<br/>%H:%M',
                //hour: '%Y-%m-%d<br/>%H:%M',
                day: '%Y<br/>%m-%d',
                week: '%Y<br/>%m-%d',
                month: '%Y-%m'
                //year: '%Y'
            },
            gridLineColor: '#e0e0e0',
            gridLineDashStyle: 'ShortDot',
            gridLineWidth: 1,
            labels: {
                formatter: function () {
                    //return Highcharts.dateFormat('%Y-%m-%d<br/>%H:%M:%S', this.value);
                    return Highcharts.dateFormat('%m-%d<br/>%H:00', this.value);
                }
            }
        },
        yAxis: yAxies,
        tooltip: {
            // 日期时间格式化
            //xDateFormat: '%Y-%m-%d %H:%M:%S',
            xDateFormat: '%m-%d<br/>%H:00',
            crosshairs: [true, true],
            formatter: function () {
                //var s = Highcharts.dateFormat('%y年%m月%d日%H时', this.x);
                var s = Highcharts.dateFormat('%m月%d日%H时00分', this.x);
                $.each(this.points, function () {
                    if (this.series.name === "水位" || this.series.name.indexOf("水位") > -1)
                        s += '<br/>' + this.series.name + ': ' +
                            this.y.toFixed(2) + 'm';
                    else if (this.series.name === "雨量" || this.series.name.indexOf("雨量") > -1)
                        s += '<br/>' + this.series.name + ': ' +
                            this.y.toFixed(1) + 'mm';
                    else if (this.series.name === "库容" || this.series.name.indexOf("库容") > -1)
                        s += '<br/>' + this.series.name + ': ' +
                            this.y.toFixed(1) + '万m³';
                });
                return s;
            },
            shared: true
        },
        plotOptions: {
            /**
             * 数列，对于所有的图表都可以适用的配置参数，属于共用性质。
             */
            column: {
                // 鼠标样式
                cursor: 'pointer'//,

                // 当是柱状图时，柱状的宽度
                //  pointWidth: 15
            }
        },
        series: series
    });
}



//初始化图形控件
function FloodResetChart(id, yAxies, series, title) {
    Highcharts.setOptions({
        lang: {
            contextButtonTitle: "功能菜单",
            downloadJPEG: "保存为jpeg格式",
            downloadPDF: "保存为pdf格式",
            downloadPNG: "保存为png格式",
            downloadSVG: "保存为svg格式",
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            shortMonths: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一', '十二'],
            printChart: "打印图片",
            rangeSelectorFrom: "从",
            rangeSelectorTo: "至",
            rangeSelectorZoom: "缩放等级",
            resetZoom: "缩放",
            resetZoomTitle: "缩放",
            weekdays: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        },

        colors: ['#B22222', '#20B2AA', '#FFF263', '#6AF9C4', '#FF9655', '#FFD700', '#64E572', '#FF0000', '#7CB5EC', '#24CBE5']

    });
     $('#chart').highcharts({
        chart: {


            //zoomType: 'xy',
            //spacingRight: 20
            alignTicks: true,
            animation: true,

            //height: picHeight,
            //width: picWidth,
            borderColor: '#EBBA95',
            borderWidth: 1
        },

        legend: {
            enabled: true,
            align: 'right',
            verticalAlign: 'top',
            backgroundColor: '#FCFFC5',
            y: 0,
            shadow: true,
            floating: true
        },
        /**
       * 版权信息配置，不用修改直接复制
       * 
       * @param {boolean} enabled 是否显示版权信息
       * @param {string} href 版权信息所链接到的地址
       * @param {string} text 版权信息所显示的文字内容
       */
        credits: {
            enabled: false
        },
        title: {
            text: title
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                second: '%Y-%m-%d<br/>%H:%M:%S',
                minute: '%Y-%m-%d<br/>%H:%M',
                hour: '%Y-%m-%d<br/>%H:%M',
                day: '%Y<br/>%m-%d',
                week: '%Y<br/>%m-%d',
                month: '%Y-%m',
                year: '%Y'
            },
            gridLineColor: '#e0e0e0',
            gridLineDashStyle: 'ShortDot',
            gridLineWidth: 1,
            labels: {
                formatter: function () {
                    return Highcharts.dateFormat('%m-%d', this.value);
                }
            }
        },
        yAxis: yAxies,
        tooltip: {
            // 日期时间格式化
            xDateFormat: '%Y-%m-%d %H:%M:%S',
            crosshairs: [true, true],
            formatter: function () {
                var s = Highcharts.dateFormat('%y年%m月%d日%H时', this.x);
                $.each(this.points, function () {
                    if (this.series.name === '模拟预报水位')
                        s += '<br/>' + this.series.name + ': ' +
                            this.y.toFixed(2) + '米';
                    else
                        s += '<br/>' + this.series.name + ': ' +
                            this.y.toFixed(1) + '立方米每秒';
                });
                return s;
            },
            shared: true
        },
        plotOptions: {
            /**
             * 数列，对于所有的图表都可以适用的配置参数，属于共用性质。
             */
            column: {
                // 鼠标样式
                cursor: 'pointer',

                // 当是柱状图时，柱状的宽度
                pointWidth: 15
            }
        },
        series: series
    });
}
