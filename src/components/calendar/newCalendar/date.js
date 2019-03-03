

function dateToString (date) {
  if(!date){return }
  var year = date.getFullYear ();
  var month = (date.getMonth () +1).toString ();
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

function getFirstDay(year,month){
  let date  = new Date (year, month-1)
  date.setDate(1);
  return date
}

function getLastDay(year,month){
  let date  = new Date (year, month,0)
  return date
}


export function getData(year,month) {

  var lastDay = getLastDay(year,month).getDate();   


  let  lastDayOfLastMonth =getLastDay(year,month-1).getDate();       //上个月最后一天 
  let fisrtDayWeek = getFirstDay(year,month).getDay();                     //本月第一天是周几
  var lastDay = getLastDay(year,month).getDate();                      //本月最后一天

  let result = [],prevMonthCount= fisrtDayWeek,
  nextMonthDays=0,currentMonthDays=0;

  // debugger
  for(let i=1;i<=42;i++){
    let date;
  
    //如果大于0  需要补上个月的天数,
      if(fisrtDayWeek>0){

        //如果补位完成后，正常计算这个月天数
        if(prevMonthCount>0){
          date = new Date(year,month-2, lastDayOfLastMonth-prevMonthCount+1);
          --prevMonthCount;
        }else{

          if(currentMonthDays<=currentMonthDays){
            date = new Date(year,month -1,++currentMonthDays);
          }else{
            date = new Date(year,month,++nextMonthDays);
          }
   
        } 
      
      }else{
        if(i>lastDay){
          ++nextMonthDays
          date = new Date(year,month,nextMonthDays);
        }else{
          date = new Date(year,month -1,i);
        }
      }
      result.push({
        year:date &&date.getFullYear(),
        month:date &&date.getMonth()+1,
        day:date && date.getDate(),
        time:date && dateToString(date),
        date:date
      })
  }


  // if(month<12){
  //   if(result[result.length- 7].month == month+1 ){
  //     result = result.slice(0,result.length- 7)
  //   }
  // }else if (month==12){
  //   if(result[result.length- 7].month == 1 ){
  //     result = result.slice(0,result.length- 7)
  //   }
  // }
  

  



  return {
      days:result,
      year,
      month

  }
}




// getData(year,month).forEach(e=>{
//       console.log(e.date)
// })