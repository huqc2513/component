
// import env from '../config/env';

// import * as wxsdk from "./jssdk";


// const browser = {
//   versions: function () {
//     const u = navigator.userAgent, app = navigator.appVersion;
//     return {         //移动终端浏览器版本信息
//       trident: u.indexOf('Trident') > -1, //IE内核
//       presto: u.indexOf('Presto') > -1, //opera内核
//       webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
//       gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
//       mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
//       ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
//       android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
//       iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
//       iPad: u.indexOf('iPad') > -1, //是否iPad
//       webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
//     };
//   }(),
//   language: (navigator.browserLanguage || navigator.language).toLowerCase()
// };


// // 获取url参数
// const getQueryString = (name) => {
//   var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
//   var r = window.location.search.substr(1).match(reg);
//   if (r != null) {
//     return unescape(r[2]);
//   }
//   return null;
// };

// const isWeiXin = () => {
//   const ua = navigator.userAgent.toLowerCase();//获取判断用的对象
//   if (ua.match(/MicroMessenger/i) == "micromessenger") {
//     //在微信中打开
//     return true;
//   }
//   return false;
// };



// /**
//  * 判断是否是微信app+微信调试（wechatdevtools） 排除微信PC端(windowswechat)
//  */
// const isWechatApp = function () {
//   let ua = navigator.userAgent.toLowerCase();
//   if (!(/macintosh|window/.test(ua)) && (!/wechatdevtools/.test(ua)) && ua.match(/MicroMessenger/i) && ua.match(/MicroMessenger/i)[0] === "micromessenger") {
//     return true;
//   } else {
//     return false;
//   }
// };



// /**
//  * 即时防抖函数，防止频繁触发
//  * @param {function} fn - 需要执行的函数
//  * @param {number} delta - 触发间隔
//  * @param {object} context - 上下文
//  * @returns {function}
//  */
// const immediate = function (fn, delta, context) {
//   let timeoutID = null;
//   let safe = true;

//   return function () {
//     if (safe) {
//       fn.call(context, arguments);
//       safe = false;
//     }

//     clearTimeout(timeoutID);
//     timeoutID = setTimeout(function () {
//       safe = true;
//     }, delta);
//   };
// };



// /**
//  * dataURL转Blob或File格式，有options会转成File
//  * @param {string} dataURL - 需要转换的dataURL
//  * @param {object} [options] - 可选参数，有则生成File格式，其中name是必须
//  * @param {string} options.name - 文件名
//  * @param {string} [options.lastModified] - 最后更新日期
//  * @returns {Blob|File}
//  */

// const dataURLtoBlobOrFile = function (dataURL, options) {
//   let byteString = atob(dataURL.split(',')[1]);
//   let mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
//   let ab = new ArrayBuffer(byteString.length);
//   let ia = new Uint8Array(ab);
//   for (let i = 0; i < byteString.length; i++) {
//     ia[i] = byteString.charCodeAt(i);
//   }
//   if (options) {
//     if (options.hasOwnProperty("name")) {
//       let tmp = options.name.lastIndexOf('.');
//       let trueName = '';
//       if (tmp === -1) {
//         trueName = options.name;
//       } else {
//         trueName = options.name.slice(0, tmp);
//       }
//       let trueType = mimeString.slice(mimeString.lastIndexOf('/') + 1);
//       let nowOptions = {
//         name: trueName + '.' + trueType,
//         type: mimeString,
//         lastModified: options.lastModified
//       };
//       return new File([ia], nowOptions.name, nowOptions)
//     }
//   } else {
//     return new Blob([ia], {type: mimeString});
//   }
// };


// /**
//  * @typedef resolve
//  * @property {string} - base64格式的数据
//  */

// /**
//  * @typedef reject
//  * @property {string} - 错误信息
//  */


// /**
//  * 压缩图片，异步操作返回Promise，如果只规定宽或高其中一个，会等比例缩放，不指定则不缩放。
//  * @param {string} aim - 图片的地址或dataURL
//  * @param {object} [options] - 可选参数
//  * @param {string} [options.type] - 输出文件类型
//  * @param {number} [options.encoderOptions] - 编码器配置，比如jpeg可以设置压缩质量0~1
//  * @param {number} [options.width] - 规定宽度
//  * @param {number} [options.height] - 规定高度
//  * @returns {Promise<resolve>|Promise<reject>}
//  */

// const compressImg = function (aim, options) {
//   //默认参数
//   let defaultOptions = {
//     type: 'image/jpeg',
//     encoderOptions: 0.6,
//     width: 750,
//   };
//   return new Promise((resolve, reject) => {
//     if (!aim) {
//       reject('没有传入合法的图片的地址或dataURL！');
//     }
//     let nowOptions = {};
//     // 合并可选设置
//     Object.assign(nowOptions, defaultOptions, options);
//     if (nowOptions.width) {
//       nowOptions.width = toNumber(nowOptions.width);
//     }
//     if (nowOptions.height) {
//       nowOptions.height = toNumber(nowOptions.height);
//     }
//     let img = new Image();
//     if (env.debug) {
//     }
//     img.addEventListener('load', function () {
//       let w;
//       let h;
//       //计算宽高
//       if (nowOptions.width && nowOptions.height) {
//         w = Math.min(nowOptions.width, img.width);
//         h = Math.min(nowOptions.height, img.height);
//       } else if (nowOptions.width && !nowOptions.height) {
//         w = Math.min(nowOptions.width, img.width);
//         h = img.height * (w / img.width);
//       } else if (!nowOptions.width && nowOptions.height) {
//         h = Math.min(nowOptions.height, img.height);
//         w = img.width * (h / img.height);
//       } else {
//         h = img.height;
//         w = img.width;
//       }
//       let canvas = document.createElement('canvas');
//       let ctx = canvas.getContext('2d');
//       // 设置 canvas 的宽度和高度
//       canvas.width = w;
//       canvas.height = h;
//       // 把图片绘制到 canvas 中
//       ctx.drawImage(img, 0, 0, w, h);
//       // 取出 base64 格式数据
//       let result = canvas.toDataURL(nowOptions.type, nowOptions.encoderOptions);
//       if (result) {
//         resolve(result);
//       } else {
//         reject('压缩失败');
//       }
//     });
//     img.src = aim;
//   });
// };


// /**
//  * 强转至number类型，成功则返回数字，否则false
//  * @param {*} data - 需要转换的值
//  * @returns {*}
//  */
// const toNumber = function (data) {
//   let dataType = typeof (data);
//   if (!isNaN(data)) {
//     if (dataType === 'number') {
//       return data;
//     } else {
//       return Number(data);
//     }
//   } else {
//     return false;
//   }
// };


// /**
//  * @typedef resolve
//  * @property {string} dataURL - base64格式的数据
//  * @property {string} name - 资源文件名
//  * @property {string} type - 文件类型meta
//  * @property {number} lastModified - 最后更新事件
//  * @property {number} size - 文件大小
//  */
// /**
//  * @typedef reject
//  * @property {string} - 错误信息
//  */


// /**
//  * 读取文件并转成DataURL的形式，异步操作返回Promise
//  * @param {File|Blob} file
//  * @param {object} [options] - 可选参数
//  * @param {function} [options.onLoadProgress] - 读取进度事件处理器
//  * @returns {Promise<resolve>|Promise<reject>}
//  */
// const readFileAsDataURL = function (file, options) {
//   let defaultOptions = {
//     onLoadProgress: null,
//     onLoadStart: null
//   };


//   return new Promise((resolve, reject) => {
//     if (!(file instanceof Blob)) {
//       reject('传入参数类型有误，请传入File或Blob类型');
//     }
//     let nowOptions = {};
//     Object.assign(nowOptions, defaultOptions, options);
//     let reader = new FileReader();


//     reader.addEventListener('loadstart', (e) => {
//       if (env.debug) {
//       }
//       if (nowOptions.onLoadStart) {
//         nowOptions.onLoadStart(e);
//       }
//     });
//     reader.addEventListener('progress', (e) => {
//       if (env.debug) {
//         if (e.lengthComputable) {
//           let percentComplete = e.loaded / e.total;
//         }
//       }
//       if (nowOptions.onLoadProgress) {
//         nowOptions.onLoadProgress(e);
//       }
//     });
//     reader.addEventListener('load', (e) => {
//       let result = {
//         dataURL: e.target.result,
//         name: file.name,
//         type: file.type,
//         lastModified: file.lastModified,
//         size: file.size
//       };
//       if (env.debug) {
//         let tmp = bytesToSize(result.size);
//       }
//       if (result) {
//         resolve(result);
//       } else {
//         reject('读取不到内容');
//       }
//     });
//     reader.addEventListener('error', (e) => {
//       if (env.debug) {
//       }
//       reject('读取出错');
//     });
//     reader.readAsDataURL(file);
//   })
// };

// /**
//  * 数字单位
//  */
// const numberUnit = (num) => {
//   if(num > 10000 ) {
//     return (num/10000).toFixed(2) + 'w';
//   }else {
//     return num
//   }
// }

// /**
//  * 字节转大单位，自动匹配到最大单位
//  * @param {number} bytes - 需要转换的字节数
//  * @param {number} [fix] - 保留的小数位数，默认两位
//  * @returns {{value: number, unit: string}}
//  */
// const bytesToSize = function (bytes, fix) {
//   let result = {
//     value: 0,
//     unit: 'B'
//   };
//   if (!toNumber(bytes)) return result;
//   let k = 1024;
//   let f = 2;
//   if (fix) {
//     f = fix;
//   }
//   let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
//   let i = Math.floor(Math.log(bytes) / Math.log(k));
//   result = {
//     value: (bytes / Math.pow(k, i)).toFixed(f),
//     unit: sizes[i]
//   };
//   return result;
// };

// /**
//  * 数字转百分比
//  * @param {number} num - 需要转换的数字
//  * @param {number} [fix] - 需要保留的小数位数，默认保留一位
//  * @returns {string}
//  */
// const toPercent = function (num, fix) {
//   let number = toNumber(num);
//   let f = 1;
//   if (num) {
//     if (fix) {
//       f = fix;
//     }
//     return (Math.round(number * 10000) / 100).toFixed(f) + '%';
//   } else {
//     return false;
//   }
// };


// /**
//  * 生成uuid
//  * @param {number} len 需要的长度
//  * @param {number} radix 基数
//  * @returns {string}
//  */
// const uuid = function (len, radix) {
//   let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
//   let uuid = [], i;
//   radix = radix || chars.length;

//   if (len) {
//     // Compact form
//     for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
//   } else {
//     // rfc4122, version 4 form
//     let r;

//     // rfc4122 requires these characters
//     uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
//     uuid[14] = '4';

//     // Fill in random data.  At i==19 set the high bits of clock sequence as
//     // per rfc4122, sec. 4.1.5
//     for (i = 0; i < 36; i++) {
//       if (!uuid[i]) {
//         r = 0 | Math.random() * 16;
//         uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
//       }
//     }
//   }
//   return uuid.join('');
// };





// /**
//  * 判断是否是微信内置浏览器
//  * @returns {boolean}
//  */
// const isWechat = function () {
//   let ua = navigator.userAgent.toLowerCase();
//   if (ua.match(/MicroMessenger/i) && ua.match(/MicroMessenger/i)[0] === "micromessenger") {
//     return true;
//   } else {
//     return false;
//   }
// };



// /**
//  * 判断是否是app环境
//  * @returns {boolean}
//  */
// const isApp = function () {
//   if (navigator.userAgent.indexOf("Html5Plus") < 0) {
//     return false;
//   } else {
//     return true;
//   }
// };


// /**
//  * 对Date的扩展，将 Date 转化为指定格式的String
//  * @param {Date} date - Date对象
//  * @param {String} fmt - 格式"yyyy-MM-dd hh:mm:ss"
//  * @returns {String}
//  */
// const dateFormat = function (date, fmt) {
//   let o = {
//     "M+": date.getMonth() + 1, //月份
//     "d+": date.getDate(), //日
//     "h+": date.getHours(), //小时
//     "m+": date.getMinutes(), //分
//     "s+": date.getSeconds(), //秒
//     "q+": Math.floor((date.getMonth() + 3) / 3), //季度
//     "S": date.getMilliseconds() //毫秒
//   };
//   if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
//   for (let k in o)
//     if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
//   return fmt;
// };

// /**
//  * promise顺序执行
//  * @param promises
//  * @returns {Promise}
//  */
// const promiseOrder = function (promises) {
//   return new Promise((resolve, reject) => {
//     nextPromise(0, promises);

//     function nextPromise(index, promises) {
//       let length = promises.length;
//       if (index >= length) {
//         resolve();
//       } else {
//         promises[index]()
//           .then(() => {
//             nextPromise(index + 1, promises);
//           })
//           .catch((err) => {
//             reject(err);
//           })
//       }
//     }
//   });
// };






// const checkWeb = () => {
//     let agent = navigator.userAgent.toLowerCase();

//     if (agent.match(/MicroMessenger/i) == "micromessenger") {
//       return true;

//     } else if(agent.indexOf("html5plus") > 0){

//       return true;
//     }
//     else {
//       return false;
//     }
// }


// const checkDcloud = () => {
//   let agent = navigator.userAgent.toLowerCase();
//   if(agent.indexOf("html5plus") > 0){
//     return false;
//   }
//   else {
//     return true;
//   }
// }



// /**
//  * 判断是否webview环境
//  * @returns {boolean}
//  */

// //约定android,webview环境
// const isWebView = () => {
//   let ua = navigator.userAgent.toLowerCase();
//   if(ua.indexOf("app/yyjx_android") >= 0) {
//     return false;
//   }else {
//     return true;
//   }
// }

// //约定Android二级
// const secondWebview = () => {
//   let ua = navigator.userAgent.toLowerCase();
//   if(ua.indexOf("app/yyjx_share") >= 0) {
//     return false;
//   }else {
//     return true;
//   }
// }

// // 拨打号码
// const tel = (phone) => {
//   if (phone) {
//     phone = phone + "";
//     phone = phone.replace(/-/g, '');
//     location.href = "tel:" + phone;
//   } else {
//     window.toast("暂无商家联系方式");
//   }
// };







// const lazyToast = (toastText, success) => {
//   window.toast(toastText);
//   setTimeout(() => {
//     success();
//   }, 500);
// };

// //有推荐人的情况
// const getOpenidRecommend = (path, recommend) => {
//   let baseUrl = window.location.origin + window.location.pathname;
//   location.href = env.wxapiROOT + '/wxlogin?returnUrl=' + baseUrl + "@from=" + path + '&recommend=' + recommend;
// }


// // 跳转微信授权获取openid
// const getOpenid = (path) => {
//   // 获取当前登录的地址
//   let baseUrl = window.location.origin + window.location.pathname;
//   location.href = env.wxapiROOT + '/wxlogin?returnUrl=' + baseUrl + "@from=" + path;
// };



// /**
//  * 日期计算
//  * @param {string} interval - 需要添加的时间类型
//  * @param {number} number - 需要添加的量
//  * @param {Date} oldDate - 原始时间
//  * @returns {*}
//  */
// const dateCount = function (interval, number, oldDate) {
//   let date = new Date(oldDate.getTime());
//   switch (interval) {
//     case "y": {
//       date.setFullYear(date.getFullYear() + number);
//       return date;
//     }
//     case "q": {
//       date.setMonth(date.getMonth() + number * 3);
//       return date;
//     }
//     case "M": {
//       date.setMonth(date.getMonth() + number);
//       return date;
//     }
//     case "w": {
//       date.setDate(date.getDate() + number * 7);
//       return date;
//     }
//     case "d": {
//       date.setDate(date.getDate() + number);
//       return date;
//     }
//     case "h": {
//       date.setHours(date.getHours() + number);
//       return date;
//     }
//     case "m": {
//       date.setMinutes(date.getMinutes() + number);
//       return date;
//     }
//     case "s": {
//       date.setSeconds(date.getSeconds() + number);
//       return date;
//     }
//     default: {
//       date.setDate(date.getDate() + number);
//       return date;
//     }
//   }
// };


// const rem2px = (fontSize) => {
//   return fontSize * window.document.documentElement.style.fontSize.replace('px', '') / 75;
// };

// //web跳到指定页面
// const gotoApp = (schemaUrl) => {
//    // return `<iframe src="${src}" style="display:none"></iframe>`
//   let iframe = document.createElement("iframe");
//   iframe.style.display = "none";
//   iframe.src = schemaUrl;
//   document.body.appendChild(iframe);

// }

// let getUrlKey = function (name) {
//   return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
// }



// Date.prototype.Format = function (fmt) { //author: meizz
//   var o = {
//       "M+": this.getMonth() + 1, //月份
//       "d+": this.getDate(), //日
//       "h+": this.getHours(), //小时
//       "m+": this.getMinutes(), //分
//       "s+": this.getSeconds(), //秒
//       "q+": Math.floor((this.getMonth() + 3) / 3), //季度
//       "S": this.getMilliseconds() //毫秒
//   };
//   if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
//   for (var k in o)
//   if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
//   return fmt;
// }



// function timestampToTime(timestamp) {
//   let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
//   let Y = date.getFullYear() + '-';
//   let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
//   let D = date.getDate() + ' ';
//   let h = date.getHours() + ':';
//   let m = date.getMinutes() + ':';
//   let s = date.getSeconds();
//   return Y+M+D+h+m+s;
// }

// function formatDate_YMD(timestamp) {
//   let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
//   let Y = date.getFullYear() + '年';
//   let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
//   let D = date.getDate() + '日';
//   return Y+M+D;
// }

// function formatDate_YMDStr(timestamp) {
//   let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
//   let Y = date.getFullYear() + '-';
//   let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
//   let D = date.getDate() < 10 ? '0'+ date.getDate() : date.getDate();
//   return Y+M+D;
// }

// //验证邮箱
// function checkEmail(emailStr) {
//   var reg = new RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);
//   return reg.test(emailStr);
// }


// function strLengthLimit(num, str) {
//   if(str.length > num) {
//     toast('不能超过'+ num+ '字符');
//     return false;
//   }else {
//     return true;
//   }
// }


// // 时间转换
//   function getDateDiff(dateTimeStamp){
//   var minute = 1000 * 60;
//   var hour = minute * 60;
//   var day = hour * 24;
//   var halfamonth = day * 15;
//   var month = day * 30;
//   var now = new Date().getTime();
//   var diffValue = now - dateTimeStamp;
//   if(diffValue < 0){return;}
//   var monthC =diffValue/month;
//   var weekC =diffValue/(7*day);
//   var dayC =diffValue/day;
//   var hourC =diffValue/hour;
//   var minC =diffValue/minute;
//   var result;
//   if(monthC>=1){
//     result="" + parseInt(monthC) + "月前";
//   }
//   else if(weekC>=1){
//     result="" + parseInt(weekC) + "周前";
//   }
//   else if(dayC>=1){
//     result=""+ parseInt(dayC) +"天前";
//   }
//   else if(hourC>=1){
//     result=""+ parseInt(hourC) +"小时前";
//   }
//   else if(minC>=1){
//     result=""+ parseInt(minC) +"分钟前";
//   }else
//     result="刚刚";
//   return result;
// }


// const checkPhoneNum = (phoneNum) => {
//   let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
//   if(!myreg.test(phoneNum)) {
//     toast('请输入正确的手机号')
//     return false
//   }else {
//     return true
//   }
// }

// const wxShareCom = (title, dec, img, url) => {
//   let shareObj = {
//     title: title || '',
//     imgUrl: img || 'http://cdn.yunjiaxiang.com/upload/20170621/28fd46fcc86641a2a530a4f24b433958',
//     link: env.yyjxShareUrl + url,
//     desc: dec
//   };
//   wxsdk.share(shareObj);
// }






// const base = {
//   numberUnit,
//   secondWebview,
//   appShareCom,
//   amapGetCurLocation,
//   isWeiXin,
//   wxShareCom,
//   isWebView,
//   strLengthLimit,
//   checkEmail,
//   formatDate_YMDStr,
//   checkPhoneNum,
//   gotoApp,
//   checkDcloud,
//   getDateDiff,
//   formatDate_YMD,
//   timestampToTime,
//   getUrlKey,
//   getOpenidRecommend,
//   rem2px,
//   getOpenid,
//   lazyToast,
//   selectDictById,
//   createWxAndQQHtml,
//   resourceTypeText,
//   resourceType,
//   DictType,
//   matchData,
//   immediate,
//   dataURLtoBlobOrFile,
//   compressImg,
//   readFileAsDataURL,
//   toNumber,
//   bytesToSize,
//   toPercent,
//   uuid,
//   formatCity,
//   getQueryString,
//   isWechat,
//   isApp,
//   openLocation,
//   tel,
//   promiseOrder,
//   dateFormat,
//   isWechatApp,
//   dateCount,
//   refundStatus,
//   refundType,
//   checkWeb,
//   searchLocation
// };

// if (process.env.BROWSER_ENV === 'app') {
//   var  plussdk={}
//   Object.assign(base, plussdk);
// } else {
//   Object.assign(base, wxsdk);
// }

// export default base;
