export function dateToString (date) {
  var year = date.getFullYear ();
  var month = (date.getMonth () + 1).toString ();
  var day = date.getDate ().toString ();
  if (month.length == 1) {
    month = '0' + month;
  }
  if (day.length == 1) {
    day = '0' + day;
  }
  var dateTime = year + '-' + month + '-' + day;

  return dateTime;
}

Date.prototype.format = function (format) {
  var date = {
    'M+': this.getMonth () + 1,
    'd+': this.getDate (),
    'h+': this.getHours (),
    'm+': this.getMinutes (),
    's+': this.getSeconds (),
    'q+': Math.floor ((this.getMonth () + 3) / 3),
    'S+': this.getMilliseconds (),
  };
  if (/(y+)/i.test (format)) {
    format = format.replace (
      RegExp.$1,
      (this.getFullYear () + '').substr (4 - RegExp.$1.length)
    );
  }
  for (var k in date) {
    if (new RegExp ('(' + k + ')').test (format)) {
      format = format.replace (
        RegExp.$1,
        RegExp.$1.length == 1
          ? date[k]
          : ('00' + date[k]).substr (('' + date[k]).length)
      );
    }
  }
  return format;
};


function GetLastDayOfLastMonth(year,month){
  let  lastDayOfLastMonth = new Date (year, month - 1, 0); //上个月的最后一天
  let lastDayOfMonth = lastDayOfLastMonth.getDate(); //上个月最后
  let lastdayWeekofMonth = lastDayOfLastMonth.getDay();
  // let lastdayofMothDay = dateToString(lastDayOfLastMonth)
  return {
    lastDayOfMonth,lastdayWeekofMonth,
  }
}

function isToday(str) {
  if (new Date(str).toDateString() === new Date().toDateString()) {
      return true
  } else{
      return false
  }
}


function getfirstDayOfMonth (year,month){
  var firstDay = new Date (year, month - 1, 1);
  return  firstDay.getDay()
}

function getLastDay (year,month){
 var lastDay = new Date (year, month, 0); 
  return lastDay.getDate();
}


export function initTime (year, month) {
  let datapicker = {};

  datapicker.getMonthData = function (year, month) {
    var ret = [];
    if (!year || (!month && month != 0)) {
      var today = new Date ();
      year = today.getFullYear ();
      month = today.getMonth () + 1;
    }

    var firstDay = new Date (year, month - 1, 1);
    year = firstDay.getFullYear ();
    month = firstDay.getMonth () + 1;


    let { lastDayOfMonth } =  GetLastDayOfLastMonth(year,month)
    let firstDayWeek = getfirstDayOfMonth(year,month)
    let LastDayOfMonth = getLastDay(year,month)

    let firstDayofNextMonthConunt = 0,firstDayWeekCount= firstDayWeek,currentMonthCount=0,nextMonthCount=0;

    for (var i = 0; i <7 * 5 ; i++) {
      var date,time

      if(firstDayWeek===0){
        if(i===0){
          date  =  new Date (year, month - 1, 1)
        }else if(i>LastDayOfMonth){
          date  =  new Date (year, month - 1, ++firstDayofNextMonthConunt)
        }

        time = dateToString (date);
      }else{
        firstDayWeekCount--

        let Lastday
          // 上月最后一天，减去本月第一天的星期数，来补缺少的天数，周日为0 ，日历第一天是周日
        if(i===0){
          Lastday =  lastDayOfMonth + 1 - firstDayWeek
        }
       

        if(firstDayWeekCount>=0){
          Lastday =  lastDayOfMonth - firstDayWeekCount
          date  =  new Date (year, month - 2, Lastday)
        }else if( i < (LastDayOfMonth +firstDayWeek)){
          date  =  new Date (year, month - 1, ++currentMonthCount)
        }else{
          nextMonthCount++
          date  =  new Date (year, month ,nextMonthCount )
        }
        time = dateToString (date);

      }

      ret.push ({
        time,
        date,
        day:date.getDate(),
        month:date.getMonth()+1,
        year,
        // isToday:isToday(date),
      });
    }

    // debugger 

    return {
      year: year,
      month: month,
      days: ret,
    };
  };

  return datapicker.getMonthData (year, month);
}

function getCountDays () {
  var curDate = new Date ();
  var curMonth = curDate.getMonth();
  curDate.setMonth (curMonth + 1);
  curDate.setDate (0);
  return curDate.getDate ();
}

export function convertDateFromString (dateString) {
  if (dateString) {
    var date = new Date (dateString.replace (/-/g, '/'));
    return date;
  }
}

export function findIndex (ary, fn) {
  if (ary.findIndex) {
    return ary.findIndex (fn);
  }
  /* istanbul ignore next */
  let index = -1;
  /* istanbul ignore next */
  ary.some (function (item, i, ary) {
    const ret = fn.call (this, item, i, ary);
    if (ret) {
      index = i;
      return ret;
    }
  });
  /* istanbul ignore next */
  return index;
}

export function _matchWeek (time) {
  var show_day = new Array ('星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日');

  var week = convertDateFromString (time).getDay ();

  week = show_day[week];

  return week;
}
