webpackJsonp([7],{KLp6:function(e,t){},c7wZ:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=[{text:"剧毒",value:1},{text:"蚂蚁",value:2},{text:"幽鬼",value:3},{text:"主宰",value:4},{text:"卡尔",value:5},{text:"宙斯",value:6},{text:"巫医",value:7},{text:"巫妖",value:8},{text:"神谕者",value:9},{text:"撼地神牛",value:10},{text:"蓝胖子",value:11},{text:"水晶室女",value:12},{text:"莉娜",value:13},{text:"斯拉克",value:14},{text:"斯拉达",value:15}],c=[{text:"输出",value:"a"},{text:"控制",value:"b"},{text:"核心",value:"c"},{text:"爆发",value:"d"},{text:"辅助",value:"e"},{text:"打野",value:"f"},{text:"逃生",value:"g"},{text:"先手",value:"h"}],a=[{text:"梅肯",value:"s"},{text:"秘法鞋",value:"ss"},{text:"假腿",value:"sss"},{text:"飞鞋",value:"ssss"},{text:"辉耀",value:"sssss"},{text:"金箍棒",value:"ssssss"}],n={mounted:function(){this.$refs.picker0.setData([s]),this.$refs.picker0.setSelectedIndex([1])},data:function(){return{data:[[s],[s,c],[s,c,a]],selectedIndex:[[0],[1,0],[0,1,2],[0,0,0]],selectedText:["pickerdemo","pickerPage.pickerDemo","pickerPage.threeColumn","pickerPage.linkage"],title:["1","2","3","4"]}},created:function(){},methods:{showPicker:function(e){this.$refs["picker"+e].show()},handleSelect:function(e,t){console.error(e),console.error(t),this.selectedText.splice(e,1,t[2].join("，"))}},components:{Picker:i("ceV/").a}},l={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"picker-render-view"},[i("div",{ref:"select0",staticClass:"select",on:{click:function(t){e.showPicker(0)}}},[e._v(e._s(e.selectedText[0]))]),e._v(" "),i("picker",{ref:"picker0",attrs:{"selected-index":e.selectedIndex[0],title:e.title[0],cancelTxt:"取消",confirmTxt:"确定"},on:{select:function(t){e.handleSelect(0,arguments)}}})],1)},staticRenderFns:[]};var r=i("VU/8")(n,l,!1,function(e){i("enoj")},"data-v-04d9a480",null);t.default=r.exports},"ceV/":function(e,t,i){"use strict";var s=i("GQaK"),c={name:"picker",props:{data:{type:Array,default:function(){return[]}},title:{type:String},cancelTxt:{type:String,default:"cancel"},confirmTxt:{type:String,default:"confirm"},selectedIndex:{type:Array,default:function(){return[]}},value:{type:Boolean,default:!1}},data:function(){return{state:0,pickerData:this.data.slice(),pickerSelectedIndex:this.selectedIndex,pickerSelectedVal:[],pickerSelectedText:[]}},created:function(){if(!this.pickerSelectedIndex.length){this.pickerSelectedIndex=[];for(var e=0;e<this.pickerData.length;e++)this.pickerSelectedIndex[e]=0}},methods:{confirm:function(){if(this._canConfirm()){this.hide();for(var e=!1,t=0;t<this.pickerData.length;t++){var i=this.wheels[t].getSelectedIndex();this.pickerSelectedIndex[t]=i;var s=null;this.pickerData[t].length&&(s=this.pickerData[t][i].value),this.pickerSelectedVal[t]!==s&&(e=!0),this.pickerSelectedText[t]=this.pickerData[t][i].text}this.$emit("select",this.pickerSelectedVal,this.pickerSelectedIndex,this.pickerSelectedText),e&&this.$emit("valuechange",this.pickerSelectedVal,this.pickerSelectedIndex,this.pickerSelectedText)}},cancel:function(){this.hide(),this.$emit("cancel")},show:function(){var e=this;if(1!==this.state)if(this.state=1,!this.wheels||this.dirty)this.$nextTick(function(){e.wheels=[];for(var t=e.$refs.wheelWrapper,i=0;i<e.pickerData.length;i++)e._createWheel(t,i);e.dirty=!1});else for(var t=0;t<this.pickerData.length;t++)this.wheels[t].enable(),this.wheels[t].wheelTo(this.pickerSelectedIndex[t])},hide:function(){this.state=0;for(var e=0;e<this.pickerData.length;e++)this.wheels[e].disable()},setData:function(e){this.pickerData=e.slice(),this.dirty=!0},setSelectedIndex:function(e){this.pickerSelectedIndex=e},refill:function(e){var t=this,i=[];return e.length?(e.forEach(function(e,s){i[s]=t.refillColumn(s,e)}),i):i},refillColumn:function(e,t){var i=this;if(1===this.state){var s=this.$refs.wheelWrapper,c=s.children[e].querySelector(".wheel-scroll"),a=this.wheels[e];if(c&&a){var n=this.pickerData[e];this.$set(this.pickerData,e,t);var l=a.getSelectedIndex(),r=0;if(n.length)for(var h=n[l].value,o=0;o<t.length;o++)if(t[o].value===h){r=o;break}return this.pickerSelectedIndex[e]=r,this.$nextTick(function(){(a=i._createWheel(s,e)).wheelTo(r)}),r}}else console.error("can not use refillColumn when picker is not show")},scrollTo:function(e,t){var i=this.wheels[e];this.pickerSelectedIndex[e]=t,i.wheelTo(t)},refresh:function(){var e=this;this.$nextTick(function(){e.wheels.forEach(function(e,t){e.refresh()})})},_createWheel:function(e,t){var i=this;return this.wheels[t]?this.wheels[t].refresh():(this.wheels[t]=new s.a(e.children[t],{wheel:{selectedIndex:this.pickerSelectedIndex[t],wheelWrapperClass:"wheel-scroll",wheelItemClass:"wheel-item"},probeType:3}),this.wheels[t].on("scrollEnd",function(){i.$emit("change",t,i.wheels[t].getSelectedIndex())})),this.wheels[t]},_canConfirm:function(){return this.wheels.every(function(e){return!e.isInTransition})}},watch:{data:function(e){this.setData(e)}}},a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("transition",{attrs:{name:"picker-fade"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:1===e.state,expression:"state===1"}],staticClass:"picker",on:{touchmove:function(e){e.preventDefault()},click:e.cancel}},[i("transition",{attrs:{name:"picker-move"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:1===e.state,expression:"state===1"}],staticClass:"picker-panel",on:{click:function(e){e.stopPropagation()}}},[i("div",{staticClass:"picker-choose border-bottom-1px"},[i("span",{staticClass:"cancel",on:{click:e.cancel}},[e._v(e._s(e.cancelTxt))]),e._v(" "),i("span",{staticClass:"confirm",on:{click:e.confirm}},[e._v(e._s(e.confirmTxt))]),e._v(" "),i("h1",{staticClass:"picker-title"},[e._v(e._s(e.title))])]),e._v(" "),i("div",{staticClass:"picker-content"},[i("div",{staticClass:"mask-top border-bottom-1px"}),e._v(" "),i("div",{staticClass:"mask-bottom border-top-1px"}),e._v(" "),i("div",{ref:"wheelWrapper",staticClass:"wheel-wrapper"},e._l(e.pickerData,function(t,s){return i("div",{key:s,staticClass:"wheel"},[i("ul",{staticClass:"wheel-scroll"},e._l(t,function(t,s){return i("li",{key:s,staticClass:"wheel-item"},[e._v(e._s(t.text))])}))])}))]),e._v(" "),i("div",{staticClass:"picker-footer"})])])],1)])},staticRenderFns:[]};var n=i("VU/8")(c,a,!1,function(e){i("KLp6")},"data-v-fecb6508",null);t.a=n.exports},enoj:function(e,t){}});
//# sourceMappingURL=7.32bc6e1a676e3dd0ffff.js.map