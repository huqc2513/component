webpackJsonp([7],{CV8I:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={name:"icon",props:{name:String}},l={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"},on:{click:function(e){t.$emit("click")}}},[n("use",{attrs:{"xlink:href":"#"+t.name}})])},staticRenderFns:[]};var i=n("VU/8")(s,l,!1,function(t){n("OT2n")},"data-v-8dc2fc98",null).exports,a=n("qqiS"),r={0:"下拉刷新",1:"立即释放刷新",3:"刷新中...",4:"刷新成功"},o=(document.addEventListener,{data:function(){return{PullIcon:"iconiconxlsx",pullStatus:0,startFlag:!1,_isScroller:!1}},props:{pageY:{type:[String,Number],default:80},timer:{type:[String,Number],default:1e3},list:{type:Array,required:!0}},computed:{pullText:function(){return r[this.pullStatus]||"下拉刷新"}},components:{IconFont:i,Loading:a.a},created:function(){this.touch={}},mounted:function(){var t=this;this.$nextTick(function(){t.$pullRefreshContentEl=t.$refs.pullRefreshContent,t.$pullContentEl=t.$refs.pullContent,t.prevent(t.$pullContentEl)})},watch:{list:{handler:function(t,e){var n=this;setTimeout(function(){n.forceUpdate(!0)},this.refreshDelay)},deep:!0}},methods:{touchStart:function(t){if(1!=this.startFlag){var e=t.touches[0];this.touch.pageX=e.pageX,this.touch.pageY=e.pageY}},touchMove:function(t){var e=this;this.startFlag=!0;var n=t.touches[0];if(n.pageY-this.touch.pageY>=0!=!1){this.$pullRefreshContentEl.style["transition-property"]="null",this.$pullContentEl.style["transition-property"]="null";Math.abs(n.pageX-this.touch.pageX);var s=Math.abs(n.pageY-this.touch.pageY);if(this.$pullRefreshContentEl&&this.$pullContentEl){if(this.pageY<=s){var l=s/window.innerHeight;s=this.pageY+this.pageY*l,this.touch.distY=s,this.$nextTick(function(){1!=e.pullStatus&&(e.pullStatus=1)})}else this.pullStatus=0;this.$pullRefreshContentEl.style.transform="translate3d(0,"+s+"px,0)",this.$pullContentEl.style.transform="translate3d(0,"+s+"px,0)",this.$pullRefreshContentEl.style["transition-duration"]=0,this.$pullContentEl.style["transition-duration"]=0}}},touchEnd:function(t){var e=this;this.$nextTick(function(){if(1===e.pullStatus){e.pullStatus=3,function(){var t=this.$pullRefreshContentEl.offsetHeight;this.$pullRefreshContentEl.style["transition-duration"]="0.2s",this.$pullRefreshContentEl.style["transition-property"]="all",this.$pullRefreshContentEl.style.transform="translate3d(0,"+t+"px,0)",this.$pullContentEl.style["transition-duration"]="0.3s",this.$pullContentEl.style["transition-property"]="all",this.$pullContentEl.style.transform="translate3d(0,"+t+"px,0)"}.call(e),e.$emit("pullingDown")}else e.recall()})},forceUpdate:function(){var t=this;this.$nextTick(function(){3===t.pullStatus&&setTimeout(function(){t.pullStatus=4,t.recall()},500)})},recall:function(){this.startFlag=!1,this.touch={};var t=this;function e(){this.$pullRefreshContentEl.style["transition-duration"]="0.3s",this.$pullRefreshContentEl.style["transition-property"]="all",this.$pullRefreshContentEl.style.transform="translate3d(0,0,0)",this.$pullContentEl.style["transition-duration"]="0.3s",this.$pullContentEl.style["transition-property"]="all",this.$pullContentEl.style.transform="translate3d(0,0,0)"}4===this.pullStatus?setTimeout(function(){e.call(t)},800):e.call(t)},prevent:function(t){var e=0;document.addEventListener("touchstart",function(t){try{var n=t.touches[0],s=Number(n.pageX),l=Number(n.pageY);s,e=l}catch(t){alert("touchSatrtFunc："+t.message)}},!1);var n=t;n.ontouchmove=function(t){var s=t.touches[0],l=n.scrollTop,i=n.scrollHeight-n.offsetHeight;0===l?s.clientY>e?t.preventDefault():t.stopPropagation():l===i?s.clientY<e?t.preventDefault():t.stopPropagation():l>0&&l<i?t.stopPropagation():t.preventDefault()}}}}),u={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pull-refresh-container"},[t._t("pull",[n("div",{ref:"pullRefreshContent",staticClass:"pull-refresh-wrap"},[n("div",{staticClass:"pull-icon-box"},[n("IconFont",{directives:[{name:"show",rawName:"v-show",value:3!==t.pullStatus&&4!==t.pullStatus,expression:"pullStatus !== 3 && pullStatus !== 4"}],staticClass:"rotate0",class:{rotate90:1===t.pullStatus},attrs:{name:t.PullIcon}}),t._v(" "),n("Loading",{directives:[{name:"show",rawName:"v-show",value:3===t.pullStatus,expression:"pullStatus === 3"}],staticClass:"loading",attrs:{title:""}})],1),t._v(" "),n("IconFont",{directives:[{name:"show",rawName:"v-show",value:4===t.pullStatus,expression:"pullStatus === 4"}],staticClass:"finish-icon",attrs:{name:"iconwancheng"}}),t._v(" "),n("span",{staticClass:"pull-status-text"},[t._v(t._s(t.pullText))])],1)]),t._v(" "),n("div",{ref:"pullContent",staticClass:"pull-content",on:{touchstart:t.touchStart,touchmove:t.touchMove,touchend:t.touchEnd}},[t._t("default")],2)],2)},staticRenderFns:[]};var c=n("VU/8")(o,u,!1,function(t){n("dbJo")},"data-v-7d118cb7",null).exports,h={props:{width:{type:[String,Number],default:"100px"},percent:{type:[String,Number],default:20},bgColor:{type:[String],default:"#458fd2"}},computed:{svgStyle:function(){return{width:this.width,height:this.width,opacity:this.percent/100,transform:"rotaote(-90deg)"}}},mounted:function(){var t=this;this.$nextTick(function(){t.path=t.$refs.path,t.init(t.percent)})},watch:{percent:function(t){this.init(t)},width:function(t){this.init(this.percent)}},methods:{init:function(t){var e=this;this.$nextTick(function(){e.run(e.percent)})},drawArcByRadiusDeg:function(t,e,n,s,l){var i=void 0!==l?l:1,a=t-n+n*Math.cos(s*Math.PI/180),r=e+(1===i?1:-1)*n*Math.sin(s*Math.PI/180);return"M "+t+" "+e+" A "+n+" "+n+" 0 "+(s>180?1:0)+" "+i+" "+a+" "+r+(" L"+(t-n)+" "+e+" L"+t+" "+e+"Z")},run:function(t){if(t=this.percent/100*360,this.path){var e=0===t;this.path.setAttribute("d",this.drawArcByRadiusDeg(40,25,15,e?t++:t--,1))}}}},p={render:function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{style:this.svgStyle,attrs:{version:"1.1",xmlns:"http://www.w3.org/2000/svg"}},[e("path",{ref:"path",attrs:{id:"path1",d:"",fill:this.bgColor,"fill-opacity":"1"}})])},staticRenderFns:[]};var f={components:{PullRefresh:c,Circular:n("VU/8")(h,p,!1,function(t){n("llh1")},"data-v-b86370f2",null).exports},data:function(){return{flag:!1,list:[1,2,23,1,2,23]}},created:function(){this.isPhone()},methods:{isPhone:function(){/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)?console.log("iPhone"):console.log("pc")},pullingDown:function(t){var e=this,n=[13,13,13,13,13,13,13,13,13,13];setTimeout(function(){e.list=e.list.concat(n)},1e3)}}},d={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("PullRefresh",{attrs:{list:t.list},on:{pullingDown:t.pullingDown}},[n("ul",{staticClass:"list"},t._l(t.list,function(e,s){return n("li",{key:s},[t._v(t._s(s))])}))])],1)},staticRenderFns:[]};var v=n("VU/8")(f,d,!1,function(t){n("qNdf")},"data-v-4381f38c",null);e.default=v.exports},OT2n:function(t,e){},dbJo:function(t,e){},llh1:function(t,e){},qNdf:function(t,e){}});
//# sourceMappingURL=7.5ce0477ca1a975a30346.js.map