webpackJsonp([3],{"//Fk":function(t,e,i){t.exports={default:i("U5ju"),__esModule:!0}},"2KxR":function(t,e){t.exports=function(t,e,i,n){if(!(t instanceof e)||void 0!==n&&n in t)throw TypeError(i+": incorrect invocation!");return t}},"82Mu":function(t,e,i){var n=i("7KvD"),r=i("L42u").set,s=n.MutationObserver||n.WebKitMutationObserver,o=n.process,l=n.Promise,a="process"==i("R9M2")(o);t.exports=function(){var t,e,i,u=function(){var n,r;for(a&&(n=o.domain)&&n.exit();t;){r=t.fn,t=t.next;try{r()}catch(n){throw t?i():e=void 0,n}}e=void 0,n&&n.enter()};if(a)i=function(){o.nextTick(u)};else if(!s||n.navigator&&n.navigator.standalone)if(l&&l.resolve){var c=l.resolve(void 0);i=function(){c.then(u)}}else i=function(){r.call(n,u)};else{var h=!0,f=document.createTextNode("");new s(u).observe(f,{characterData:!0}),i=function(){f.data=h=!h}}return function(n){var r={fn:n,next:void 0};e&&(e.next=r),t||(t=r,i()),e=r}}},CXw9:function(t,e,i){"use strict";var n,r,s,o,l=i("O4g8"),a=i("7KvD"),u=i("+ZMJ"),c=i("RY/4"),h=i("kM2E"),f=i("EqjI"),d=i("lOnJ"),p=i("2KxR"),v=i("NWt+"),w=i("t8x9"),m=i("L42u").set,y=i("82Mu")(),b=i("qARP"),x=i("dNDb"),_=i("iUbK"),g=i("fJUb"),D=a.TypeError,P=a.process,R=P&&P.versions,U=R&&R.v8||"",C=a.Promise,T="process"==c(P),L=function(){},M=r=b.f,E=!!function(){try{var t=C.resolve(1),e=(t.constructor={})[i("dSzd")("species")]=function(t){t(L,L)};return(T||"function"==typeof PromiseRejectionEvent)&&t.then(L)instanceof e&&0!==U.indexOf("6.6")&&-1===_.indexOf("Chrome/66")}catch(t){}}(),j=function(t){var e;return!(!f(t)||"function"!=typeof(e=t.then))&&e},S=function(t,e){if(!t._n){t._n=!0;var i=t._c;y(function(){for(var n=t._v,r=1==t._s,s=0,o=function(e){var i,s,o,l=r?e.ok:e.fail,a=e.resolve,u=e.reject,c=e.domain;try{l?(r||(2==t._h&&B(t),t._h=1),!0===l?i=n:(c&&c.enter(),i=l(n),c&&(c.exit(),o=!0)),i===e.promise?u(D("Promise-chain cycle")):(s=j(i))?s.call(i,a,u):a(i)):u(n)}catch(t){c&&!o&&c.exit(),u(t)}};i.length>s;)o(i[s++]);t._c=[],t._n=!1,e&&!t._h&&k(t)})}},k=function(t){m.call(a,function(){var e,i,n,r=t._v,s=$(t);if(s&&(e=x(function(){T?P.emit("unhandledRejection",r,t):(i=a.onunhandledrejection)?i({promise:t,reason:r}):(n=a.console)&&n.error&&n.error("Unhandled promise rejection",r)}),t._h=T||$(t)?2:1),t._a=void 0,s&&e.e)throw e.v})},$=function(t){return 1!==t._h&&0===(t._a||t._c).length},B=function(t){m.call(a,function(){var e;T?P.emit("rejectionHandled",t):(e=a.onrejectionhandled)&&e({promise:t,reason:t._v})})},F=function(t){var e=this;e._d||(e._d=!0,(e=e._w||e)._v=t,e._s=2,e._a||(e._a=e._c.slice()),S(e,!0))},W=function(t){var e,i=this;if(!i._d){i._d=!0,i=i._w||i;try{if(i===t)throw D("Promise can't be resolved itself");(e=j(t))?y(function(){var n={_w:i,_d:!1};try{e.call(t,u(W,n,1),u(F,n,1))}catch(t){F.call(n,t)}}):(i._v=t,i._s=1,S(i,!1))}catch(t){F.call({_w:i,_d:!1},t)}}};E||(C=function(t){p(this,C,"Promise","_h"),d(t),n.call(this);try{t(u(W,this,1),u(F,this,1))}catch(t){F.call(this,t)}},(n=function(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1}).prototype=i("xH/j")(C.prototype,{then:function(t,e){var i=M(w(this,C));return i.ok="function"!=typeof t||t,i.fail="function"==typeof e&&e,i.domain=T?P.domain:void 0,this._c.push(i),this._a&&this._a.push(i),this._s&&S(this,!1),i.promise},catch:function(t){return this.then(void 0,t)}}),s=function(){var t=new n;this.promise=t,this.resolve=u(W,t,1),this.reject=u(F,t,1)},b.f=M=function(t){return t===C||t===o?new s(t):r(t)}),h(h.G+h.W+h.F*!E,{Promise:C}),i("e6n0")(C,"Promise"),i("bRrM")("Promise"),o=i("FeBl").Promise,h(h.S+h.F*!E,"Promise",{reject:function(t){var e=M(this);return(0,e.reject)(t),e.promise}}),h(h.S+h.F*(l||!E),"Promise",{resolve:function(t){return g(l&&this===o?C:this,t)}}),h(h.S+h.F*!(E&&i("dY0y")(function(t){C.all(t).catch(L)})),"Promise",{all:function(t){var e=this,i=M(e),n=i.resolve,r=i.reject,s=x(function(){var i=[],s=0,o=1;v(t,!1,function(t){var l=s++,a=!1;i.push(void 0),o++,e.resolve(t).then(function(t){a||(a=!0,i[l]=t,--o||n(i))},r)}),--o||n(i)});return s.e&&r(s.v),i.promise},race:function(t){var e=this,i=M(e),n=i.reject,r=x(function(){v(t,!1,function(t){e.resolve(t).then(i.resolve,n)})});return r.e&&n(r.v),i.promise}})},EqBC:function(t,e,i){"use strict";var n=i("kM2E"),r=i("FeBl"),s=i("7KvD"),o=i("t8x9"),l=i("fJUb");n(n.P+n.R,"Promise",{finally:function(t){var e=o(this,r.Promise||s.Promise),i="function"==typeof t;return this.then(i?function(i){return l(e,t()).then(function(){return i})}:t,i?function(i){return l(e,t()).then(function(){throw i})}:t)}})},Gd1b:function(t,e){},L42u:function(t,e,i){var n,r,s,o=i("+ZMJ"),l=i("knuC"),a=i("RPLV"),u=i("ON07"),c=i("7KvD"),h=c.process,f=c.setImmediate,d=c.clearImmediate,p=c.MessageChannel,v=c.Dispatch,w=0,m={},y=function(){var t=+this;if(m.hasOwnProperty(t)){var e=m[t];delete m[t],e()}},b=function(t){y.call(t.data)};f&&d||(f=function(t){for(var e=[],i=1;arguments.length>i;)e.push(arguments[i++]);return m[++w]=function(){l("function"==typeof t?t:Function(t),e)},n(w),w},d=function(t){delete m[t]},"process"==i("R9M2")(h)?n=function(t){h.nextTick(o(y,t,1))}:v&&v.now?n=function(t){v.now(o(y,t,1))}:p?(s=(r=new p).port2,r.port1.onmessage=b,n=o(s.postMessage,s,1)):c.addEventListener&&"function"==typeof postMessage&&!c.importScripts?(n=function(t){c.postMessage(t+"","*")},c.addEventListener("message",b,!1)):n="onreadystatechange"in u("script")?function(t){a.appendChild(u("script")).onreadystatechange=function(){a.removeChild(this),y.call(t)}}:function(t){setTimeout(o(y,t,1),0)}),t.exports={set:f,clear:d}},LUaV:function(t,e){},"NWt+":function(t,e,i){var n=i("+ZMJ"),r=i("msXi"),s=i("Mhyx"),o=i("77Pl"),l=i("QRG4"),a=i("3fs2"),u={},c={};(e=t.exports=function(t,e,i,h,f){var d,p,v,w,m=f?function(){return t}:a(t),y=n(i,h,e?2:1),b=0;if("function"!=typeof m)throw TypeError(t+" is not iterable!");if(s(m)){for(d=l(t.length);d>b;b++)if((w=e?y(o(p=t[b])[0],p[1]):y(t[b]))===u||w===c)return w}else for(v=m.call(t);!(p=v.next()).done;)if((w=r(v,y,p.value,e))===u||w===c)return w}).BREAK=u,e.RETURN=c},U5ju:function(t,e,i){i("M6a0"),i("zQR9"),i("+tPU"),i("CXw9"),i("EqBC"),i("jKW+"),t.exports=i("FeBl").Promise},Y7I0:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={created:function(){},data:function(){return{pullUpLoad:{threshold:0},pullDownRefresh:{threshold:90,stop:40},index:1,list:[1,50,1,50,1,50],obj:{count:0},inputValue:1,inputValue1:1}},components:{scroll:i("bh5B").a},mounted:function(){},methods:{pullingUp:function(){var t=this,e=[13,132,1];setTimeout(function(){t.index++,t.index>=3?t.$refs.scroll.forceUpdate():t.list=t.list.concat(e)},1e3)},pullingDown:function(t){var e=this,i=[13,13];setTimeout(function(){e.list=e.list.concat(i)},1e3)}}},r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"foodPanel-container"},[i("div",{staticClass:"wrap"},[i("scroll",{ref:"scroll",attrs:{list:t.list,pullUpLoad:t.pullUpLoad,pullDownRefresh:t.pullDownRefresh},on:{pullingDown:t.pullingDown,pullingUp:t.pullingUp}},[i("ul",{staticClass:"list-content"},t._l(t.list,function(e,n){return i("li",{key:n,staticClass:"list-item"},[t._v(t._s(e))])}))])],1)])},staticRenderFns:[]};var s=i("VU/8")(n,r,!1,function(t){i("LUaV")},"data-v-de7665ea",null);e.default=s.exports},bRrM:function(t,e,i){"use strict";var n=i("7KvD"),r=i("FeBl"),s=i("evD5"),o=i("+E39"),l=i("dSzd")("species");t.exports=function(t){var e="function"==typeof r[t]?r[t]:n[t];o&&e&&!e[l]&&s.f(e,l,{configurable:!0,get:function(){return this}})}},bh5B:function(t,e,i){"use strict";var n=i("//Fk"),r=i.n(n),s=i("GQaK"),o={props:{y:{type:Number,default:0}},data:function(){return{width:50,height:80}},computed:{distance:function(){return Math.max(0,Math.min(this.y*this.ratio,this.maxDistance))},style:function(){return"width:"+this.width/this.ratio+"px;height:"+this.height/this.ratio+"px"}},created:function(){this.ratio=window.devicePixelRatio,this.width*=this.ratio,this.height*=this.ratio,this.initRadius=18*this.ratio,this.minHeadRadius=12*this.ratio,this.minTailRadius=5*this.ratio,this.initArrowRadius=10*this.ratio,this.minArrowRadius=6*this.ratio,this.arrowWidth=3*this.ratio,this.maxDistance=40*this.ratio,this.initCenterX=25*this.ratio,this.initCenterY=25*this.ratio,this.headCenter={x:this.initCenterX,y:this.initCenterY}},mounted:function(){this._draw()},methods:{_draw:function(){var t=this.$refs.bubble,e=t.getContext("2d");e.clearRect(0,0,t.width,t.height),this._drawBubble(e),this._drawArrow(e)},_drawBubble:function(t){t.save(),t.beginPath();var e=this.distance/this.maxDistance,i=this.initRadius-(this.initRadius-this.minHeadRadius)*e;this.headCenter.y=this.initCenterY-(this.initRadius-this.minHeadRadius)*e,t.arc(this.headCenter.x,this.headCenter.y,i,0,Math.PI,!0);var n=this.initRadius-(this.initRadius-this.minTailRadius)*e,r={x:this.headCenter.x,y:this.headCenter.y+this.distance},s={x:r.x-n,y:r.y},o={x:s.x,y:s.y-this.distance/2};t.quadraticCurveTo(o.x,o.y,s.x,s.y),t.arc(r.x,r.y,n,Math.PI,0,!0);var l={x:this.headCenter.x+i,y:this.headCenter.y},a={x:r.x+n,y:l.y+this.distance/2};t.quadraticCurveTo(a.x,a.y,l.x,l.y),t.fillStyle="rgb(170,170,170)",t.fill(),t.strokeStyle="rgb(153,153,153)",t.stroke(),t.restore()},_drawArrow:function(t){t.save(),t.beginPath();var e=this.distance/this.maxDistance,i=this.initArrowRadius-(this.initArrowRadius-this.minArrowRadius)*e;t.arc(this.headCenter.x,this.headCenter.y,i-(this.arrowWidth-e),-Math.PI/2,0,!0),t.arc(this.headCenter.x,this.headCenter.y,i,0,3*Math.PI/2,!1),t.lineTo(this.headCenter.x,this.headCenter.y-i-this.arrowWidth/2+e),t.lineTo(this.headCenter.x+2*this.arrowWidth-2*e,this.headCenter.y-i+this.arrowWidth/2),t.lineTo(this.headCenter.x,this.headCenter.y-i+3*this.arrowWidth/2-e),t.fillStyle="rgb(255,255,255)",t.fill(),t.strokeStyle="rgb(170,170,170)",t.stroke(),t.restore()}},watch:{y:function(t){this._draw(),console.warn(t)}}},l={render:function(){var t=this.$createElement;return(this._self._c||t)("canvas",{ref:"bubble",style:this.style,attrs:{width:this.width,height:this.height}})},staticRenderFns:[]};var a=i("VU/8")(o,l,!1,function(t){i("Gd1b")},"data-v-50cd7a00",null).exports,u=i("qqiS"),c=i("xQdF"),h={data:function(){return{bubbleY:0,beforePullDown:!0,isPullingDown:!1,isRebounding:!1,isPullUpLoad:!1,pullUpDirty:!0,pullDownStyle:""}},components:{bubble:a,loading:u.a},props:{probeType:{type:Number,default:1},click:{type:Boolean,default:!0},listenScroll:{type:Boolean,default:!1},list:{type:Array,default:null},startY:{type:Number,default:0},pullup:{type:Boolean,default:!1},beforeScroll:{type:Boolean,default:!1},refreshDelay:{type:Number,default:20},pullDownRefresh:{type:null,default:!1},pullUpLoad:{type:null,default:!1}},computed:{pullUpTxt:function(){var t=this.pullUpLoad&&this.pullUpLoad.txt&&this.pullUpLoad.txt.more||"上拉加载更多",e=this.pullUpLoad&&this.pullUpLoad.txt&&this.pullUpLoad.txt.noMore||"没有更多了";return this.pullUpDirty?t:e},refreshTxt:function(){return this.pullDownRefresh&&this.pullDownRefresh.txt||"刷新成功"}},mounted:function(){var t=this;setTimeout(function(){t._initScroll()},20)},created:function(){var t=this;this.$nextTick(function(){t.pullDownInitTop=-t.$refs.pulldown.offsetHeight})},methods:{_initPullDownRefresh:function(){var t=this;this.scroll.on("scroll",function(e){t.pullDownRefresh&&(t.beforePullDown?(t.bubbleY=Math.max(0,e.y+t.pullDownInitTop),t.pullDownStyle="top:"+Math.min(e.y+t.pullDownInitTop,10)+"px"):t.bubbleY=0,t.isRebounding&&(t.pullDownStyle="top:"+(10-(t.pullDownRefresh.stop-e.y))+"px"))}),this.scroll.on("pullingDown",function(){t.beforePullDown=!1,t.isPullingDown=!0,t.$emit("pullingDown")})},_initScroll:function(){var t=this;if(this.$refs.wrapper){this.$refs.listWrapper&&(this.pullDownRefresh||this.pullUpLoad)&&(this.$refs.listWrapper.style.minHeight=Object(c.b)(this.$refs.wrapper).height+1+"px");var e={scrollbar:!0,click:!0,probeType:3,scrollY:!0,startY:this.startY,pullUpLoad:{threshold:0,stop:50},pullDownRefresh:this.pullDownRefresh};this.scroll=new s.a(this.$refs.wrapper,e),this.listenScroll&&this.scroll.on("scroll",function(e){t.$emit("scroll",e)}),this.listenScrollEnd&&this.scroll.on("scrollEnd",function(e){t.$emit("scroll-end",e)}),this.pullDownRefresh&&this._initPullDownRefresh(),this.pullUpLoad&&this._initPullUpLoad()}},_reboundPullDown:function(){var t=this,e=this.pullDownRefresh.stopTime,i=void 0===e?600:e;return new r.a(function(e){setTimeout(function(){t.isRebounding=!0,t.scroll.finishPullDown(),e()},i)})},_afterPullDown:function(){var t=this;setTimeout(function(){t.pullDownStyle="top:"+t.pullDownInitTop+"px",t.beforePullDown=!0,t.isRebounding=!1,t.refresh()},this.scroll.options.bounceTime)},_initPullUpLoad:function(){var t=this;this.scroll.on("pullingUp",function(){t.isPullUpLoad=!0,t.$emit("pullingUp")})},finishPullDown:function(){this.scroll.finishPullDown()},disable:function(){this.scroll&&this.scroll.disable()},enable:function(){this.scroll&&this.scroll.enable()},refresh:function(){this.scroll&&this.scroll.refresh()},scrollTo:function(){this.scroll&&this.scroll.scrollTo.apply(this.scroll,arguments)},scrollToElement:function(){this.scroll&&this.scroll.scrollToElement.apply(this.scroll,arguments)},forceUpdate:function(t){var e=this;this.pullDownRefresh&&this.isPullingDown?(this.isPullingDown=!1,this._reboundPullDown().then(function(){e._afterPullDown()})):this.pullUpLoad&&this.isPullUpLoad?(this.isPullUpLoad=!1,this.scroll.finishPullUp(),this.scroll.refresh(),this.pullUpDirty=t,this.refresh()):this.refresh()}},watch:{list:{handler:function(t,e){var i=this;setTimeout(function(){i.forceUpdate(!0)},this.refreshDelay)},deep:!0}},destroyed:function(){this.$refs.scroll&&this.$refs.scroll.destroy()}},f={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"wrapper",staticClass:"scroll-wrap list-wrapper"},[i("div",{staticClass:"scroll-content"},[i("div",{ref:"listWrapper"},[t._t("default")],2),t._v(" "),t._t("pullup",[t.pullUpLoad?i("div",{staticClass:"pullup-wrapper"},[t.isPullUpLoad?i("div",{staticClass:"after-trigger"},[i("loading")],1):i("div",{staticClass:"before-trigger"},[i("span",[t._v(t._s(t.pullUpTxt)+"  ")])])]):t._e()],{pullUpLoad:t.pullUpLoad,isPullUpLoad:t.isPullUpLoad})],2),t._v(" "),t._t("pulldown",[t.pullDownRefresh?i("div",{ref:"pulldown",staticClass:"pulldown-wrapper",style:t.pullDownStyle},[t.beforePullDown?i("div",{staticClass:"before-trigger"},[i("bubble",{attrs:{y:t.bubbleY}})],1):i("div",{staticClass:"after-trigger"},[t.isPullingDown?i("div",{staticClass:"loading"},[i("loading")],1):i("div",[i("span",[t._v(t._s(t.refreshTxt))])])])]):t._e()],{pullDownRefresh:t.pullDownRefresh,bubbleY:t.bubbleY})],2)},staticRenderFns:[]};var d=i("VU/8")(h,f,!1,function(t){i("ddbd")},"data-v-2913790a",null);e.a=d.exports},dNDb:function(t,e){t.exports=function(t){try{return{e:!1,v:t()}}catch(t){return{e:!0,v:t}}}},ddbd:function(t,e){},fJUb:function(t,e,i){var n=i("77Pl"),r=i("EqjI"),s=i("qARP");t.exports=function(t,e){if(n(t),r(e)&&e.constructor===t)return e;var i=s.f(t);return(0,i.resolve)(e),i.promise}},iUbK:function(t,e,i){var n=i("7KvD").navigator;t.exports=n&&n.userAgent||""},"jKW+":function(t,e,i){"use strict";var n=i("kM2E"),r=i("qARP"),s=i("dNDb");n(n.S,"Promise",{try:function(t){var e=r.f(this),i=s(t);return(i.e?e.reject:e.resolve)(i.v),e.promise}})},knuC:function(t,e){t.exports=function(t,e,i){var n=void 0===i;switch(e.length){case 0:return n?t():t.call(i);case 1:return n?t(e[0]):t.call(i,e[0]);case 2:return n?t(e[0],e[1]):t.call(i,e[0],e[1]);case 3:return n?t(e[0],e[1],e[2]):t.call(i,e[0],e[1],e[2]);case 4:return n?t(e[0],e[1],e[2],e[3]):t.call(i,e[0],e[1],e[2],e[3])}return t.apply(i,e)}},qARP:function(t,e,i){"use strict";var n=i("lOnJ");t.exports.f=function(t){return new function(t){var e,i;this.promise=new t(function(t,n){if(void 0!==e||void 0!==i)throw TypeError("Bad Promise constructor");e=t,i=n}),this.resolve=n(e),this.reject=n(i)}(t)}},t8x9:function(t,e,i){var n=i("77Pl"),r=i("lOnJ"),s=i("dSzd")("species");t.exports=function(t,e){var i,o=n(t).constructor;return void 0===o||void 0==(i=n(o)[s])?e:r(i)}},"xH/j":function(t,e,i){var n=i("hJx8");t.exports=function(t,e,i){for(var r in e)i&&t[r]?t[r]=e[r]:n(t,r,e[r]);return t}},xQdF:function(t,e,i){"use strict";e.b=function(t){if(t instanceof window.SVGElement){var e=t.getBoundingClientRect();return{top:e.top,left:e.left,width:e.width,height:e.height}}return{top:t.offsetTop,left:t.offsetLeft,width:t.offsetWidth,height:t.offsetHeight}},e.c=function(t){if(!1===n)return!1;if("standard"===n)return"transitionEnd"===t?"transitionend":t;return n+t.charAt(0).toUpperCase()+t.substr(1)},e.a=function(t,e){if(t.findIndex)return t.findIndex(e);var i=-1;return t.some(function(t,n,r){var s=e.call(this,t,n,r);if(s)return i=n,s}),i};var n=function(){var t=document.createElement("div").style,e={standard:"transform",webkit:"webkitTransform",Moz:"MozTransform",O:"OTransform",ms:"msTransform"};for(var i in e)if(void 0!==t[e[i]])return i;return!1}()}});
//# sourceMappingURL=3.539a364a3846d7962251.js.map