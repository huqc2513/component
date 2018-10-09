export function dateToString(date) {
  var year = date.getFullYear();
  var month = (date.getMonth() + 1).toString();
  var day = (date.getDate()).toString();
  if (month.length == 1) {
    month = "0" + month;
  }
  if (day.length == 1) {
    day = "0" + day;
  }
  var dateTime = year + "-" + month + "-" + day;


  return dateTime;
}


Date.prototype.format = function(format) {
  var date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {

    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
}







export function initTime(year, month) {

  let datapicker = {}

  datapicker.getMonthData = function (year, month) {

    var ret = [];
    if (!year || !month && month != 0) {
      var today = new Date();
      year = today.getFullYear();
      month = today.getMonth() + 1;
    }

    var firstDay = new Date(year, month - 1, 1)
    var firDayWeekDay = firstDay.getDay();//获取当月1号的星期0~6

    year = firstDay.getFullYear()
    month = firstDay.getMonth() + 1

    var lastDayOfLastMonth = new Date(year, month - 1, 0);//上个月的最后一天

    var lastDateOfLastMonth = lastDayOfLastMonth.getDate();//上月最后一天的日期   31


    var preMonthDayCount = firDayWeekDay;
    var lastDay = new Date(year, month, 0);//本月最后一天
    var lastDate = lastDay.getDate();//本月最后一天日期1~31




    for (var i = 0; i < 7 * 5; i++) {

      // preMonthDayCount  单月第一天属于周几
      //1+1 - preMonthDayCount    公式为   1 -   单月第一天周几，求出差值

      var date = i + 2 - preMonthDayCount
      var showDate = date
      var thisMonth = month

      //日期
      var time = dateToString(new Date(year, month - 1, showDate))
      var weekList = new Array(7, 1, 2, 3, 4, 5, 6);
      var week = convertDateFromString(time).getDay();
      week = weekList[week]
      var ms = convertDateFromString(time).getTime()

      //上一个月    date小于0  用上一个月的最后一天的天数+上 本月第一天的差值进行补位
      if (date <= 0) {
        thisMonth = month - 1;
        showDate = lastDateOfLastMonth + date;
      } else if (date > lastDate) {
        //    下一个月
        thisMonth = month + 1;
        showDate = showDate - lastDate;
      }

      if (thisMonth == 0) thisMonth = 12;
      if (thisMonth == 13) thisMonth = 1;

      ret.push({
        month: thisMonth,
        date: date,
        showDate: showDate,
        time: time,
        ms: ms,
        week: week
      })

    }


    return {
      year: year,
      month: month,
      days: ret
    }

  };

  return datapicker.getMonthData(year, month)

}





function getCountDays() {

    var curDate = new Date();
    var curMonth = curDate.getMonth();
    curDate.setMonth(curMonth + 1);
    curDate.setDate(0);
    return curDate.getDate();
}




export function convertDateFromString(dateString) {


  if (dateString) {
    var date = new Date(dateString.replace(/-/g, "/"))
    return date;
  }
}


export function findIndex(ary, fn) {
  if (ary.findIndex) {
    return ary.findIndex(fn)
  }
  /* istanbul ignore next */
  let index = -1
  /* istanbul ignore next */
  ary.some(function (item, i, ary) {
    const ret = fn.call(this, item, i, ary)
    if (ret) {
      index = i
      return ret
    }
  })
  /* istanbul ignore next */
  return index
}


export function _matchWeek(time) {

  var show_day = new Array('星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日');


  var week = convertDateFromString(time).getDay();

  week = show_day[week]


  return week
}

