webpackJsonp([5],{"/7hR":function(e,t){},"28ub":function(e,t){},"5xuL":function(e,t){},"7zqJ":function(e,t){},"9bBU":function(e,t,n){n("mClu");var i=n("FeBl").Object;e.exports=function(e,t,n){return i.defineProperty(e,t,n)}},C4MV:function(e,t,n){e.exports={default:n("9bBU"),__esModule:!0}},PzHl:function(e,t,n){"use strict";var i=n("bOdI"),s=n.n(i),r={name:"cube-popup",mixins:[{model:{prop:"visible",event:"toggle"},props:{visible:{type:Boolean,default:!1}},data:function(){return{isVisible:!1}},watch:{isVisible:function(e){this.$emit("toggle",e)}},mounted:function(){var e=this;this.$watch("visible",function(t,n){t?e.show():n&&!e._createAPI_reuse&&e.hide()},{immediate:!0})},methods:{show:function(){this.isVisible=!0},hide:function(){this.isVisible=!1}}},{props:{zIndex:{type:Number,default:100},maskClosable:{type:Boolean,default:!1}}}],props:{type:{type:String,default:""},mask:{type:Boolean,default:!0},content:{type:String,default:""},center:{type:Boolean,default:!0},position:{type:String,default:""}},computed:{rootClass:function(){var e={"cube-popup_mask":this.mask};return this.type&&(e["cube-"+this.type]=!0),e},containerClass:function(){var e=this.center,t=this.position;return t?s()({},"cube-popup-"+t,!0):e?{"cube-popup-center":!0}:void 0}},methods:{maskClick:function(e){this.$emit("mask-click",e),this.maskClosable&&this.hide()}}},a={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"show",rawName:"v-show",value:e.isVisible,expression:"isVisible"}],staticClass:"cube-popup",class:e.rootClass,style:{"z-index":e.zIndex}},[n("div",{staticClass:"cube-popup-mask",on:{click:e.maskClick}},[e._t("mask")],2),e._v(" "),n("div",{staticClass:"cube-popup-container",class:e.containerClass},[e.$slots.default?n("div",{staticClass:"cube-popup-content"},[e._t("default")],2):n("div",{staticClass:"cube-popup-content",domProps:{innerHTML:e._s(e.content)}})])])},staticRenderFns:[]};var o=n("VU/8")(r,a,!1,function(e){n("nrCd")},null,null);t.a=o.exports},bOdI:function(e,t,n){"use strict";t.__esModule=!0;var i,s=n("C4MV"),r=(i=s)&&i.__esModule?i:{default:i};t.default=function(e,t,n){return t in e?(0,r.default)(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},mClu:function(e,t,n){var i=n("kM2E");i(i.S+i.F*!n("+E39"),"Object",{defineProperty:n("evD5").f})},nrCd:function(e,t){},vkyI:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={render:function(){var e=this.$createElement;return(this._self._c||e)("li",[this._t("default")],2)},staticRenderFns:[]},s=n("VU/8")({name:"marquee-item",mounted:function(){var e=this;this.$nextTick(function(){e.$parent.destroy(),e.$parent.init(),e.$parent.start()})}},i,!1,null,null,null).exports,r={name:"marquee",props:{list:{type:Array},interval:{type:Number,default:2e3},duration:{type:Number,default:300},direction:{type:String,default:"up"},itemHeight:Number},created:function(){},mounted:function(){},beforeDestroy:function(){this.destroy()},data:function(){return{Newlist:[],currenTranslateY:0,height:"",length:0,currentIndex:0,noAnimate:!1}},methods:{destroy:function(){this.timer&&clearInterval(this.timer)},init:function(){this.destroy(),this.cloneNode&&this.$refs.box.removeChild(this.cloneNode),this.cloneNode=null;var e=this.$refs.box.firstElementChild;return!!e&&(this.length=this.$refs.box.children.length,this.height=this.itemHeight||e.offsetHeight,"up"===this.direction?(this.cloneNode=e.cloneNode(!0),this.$refs.box.appendChild(this.cloneNode)):(this.cloneNode=this.$refs.box.lastElementChild.cloneNode(!0),this.$refs.box.insertBefore(this.cloneNode,e)),!0)},start:function(){var e=this;"down"===this.direction&&this.go(!1),this.timer=setInterval(function(){"up"===e.direction?(e.currentIndex+=1,e.currenTranslateY=-e.currentIndex*e.height):(e.currentIndex-=1,e.currenTranslateY=-(e.currentIndex+1)*e.height),e.currentIndex===e.length?setTimeout(function(){e.go(!0)},e.duration):-1===e.currentIndex?setTimeout(function(){e.go(!1)},e.duration):e.noAnimate=!1},this.interval+this.duration)},go:function(e){this.noAnimate=!0,e?(this.currentIndex=0,this.currenTranslateY=0):(this.currentIndex=this.length-1,this.currenTranslateY=-(this.currentIndex+1)*this.height)}},computed:{transform:function(){return{transform:"translate3d(0,"+this.currenTranslateY+"px,0)",transition:"transform "+(this.noAnimate?0:this.duration)+"ms"}}}},a={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"vux-marquee",style:{height:this.height+"px"}},[t("ul",{ref:"box",staticClass:"vux-marquee-box",style:this.transform},[this._t("default")],2)])},staticRenderFns:[]};var o=n("VU/8")(r,a,!1,function(e){n("5xuL")},"data-v-87b8f15a",null).exports,c={name:"cube-switch",props:{value:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},data:function(){return{checkboxValue:this.value}},watch:{value:function(e){this.checkboxValue=e},checkboxValue:function(e){this.$emit("input",e)}}},l={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"cube-switch"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.checkboxValue,expression:"checkboxValue"}],staticClass:"cube-switch-input",attrs:{type:"checkbox",disabled:e.disabled},domProps:{checked:Array.isArray(e.checkboxValue)?e._i(e.checkboxValue,null)>-1:e.checkboxValue},on:{change:function(t){var n=e.checkboxValue,i=t.target,s=!!i.checked;if(Array.isArray(n)){var r=e._i(n,null);i.checked?r<0&&(e.checkboxValue=n.concat([null])):r>-1&&(e.checkboxValue=n.slice(0,r).concat(n.slice(r+1)))}else e.checkboxValue=s}}}),e._v(" "),n("i",{staticClass:"cube-switch-ui"}),e._v(" "),n("span",{staticClass:"cube-switch-label"},[e._t("default",[e._v("123")])],2)])},staticRenderFns:[]};var u=n("VU/8")(c,l,!1,function(e){n("/7hR")},null,null).exports,d=n("PzHl"),h=n("woOf"),f=n.n(h),p=(n("28ub"),{bind:function(e,t){e.addEventListener("click",function(n){console.error(t);var i=f()({},t.value),s=f()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},i),r=s.ele;if(r){r.style.position="relative",r.style.overflow="hidden";var a=r.getBoundingClientRect(),o=r.querySelector(".waves-ripple");switch(o?o.className="waves-ripple":((o=document.createElement("span")).className="waves-ripple",o.style.height=o.style.width=Math.max(a.width,a.height)+"px",r.appendChild(o)),console.error(s),s.type){case"center":o.style.top=a.height/2-o.offsetHeight/2+"px",o.style.left=a.width/2-o.offsetWidth/2+"px";break;default:o.style.top=n.pageY-a.top-o.offsetHeight/2-document.body.scrollTop+"px",o.style.left=n.pageX-a.left-o.offsetWidth/2-document.body.scrollLeft+"px"}return o.style.backgroundColor=s.color,o.className="waves-ripple z-active",!1}},!1)}}),m={components:{marquee:o,marqueeItem:s,switchBox:u,popup:d.a},directives:{Waves:p},data:function(){return{flag:!1,articleList:["测试走马灯1","测试走马灯2","测试走马灯3","测试走马灯4","测试走马灯5"]}},created:function(){toast("toast")}},v={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",[e._v("home")]),e._v(" "),n("marquee",{attrs:{direction:"up"}},e._l(e.articleList,function(t,i){return n("marquee-item",{key:i},[e._v(" "+e._s(t))])})),e._v(" "),n("switchBox",{model:{value:e.flag,callback:function(t){e.flag=t},expression:"flag"}})],1)},staticRenderFns:[]};var b=n("VU/8")(m,v,!1,function(e){n("7zqJ")},"data-v-a7a18746",null);t.default=b.exports}});
//# sourceMappingURL=5.f22c53b34414aaea0f9d.js.map