    <template>
        <div class='main'>
          <div style='height:80px'>
              <p>
                带滚动的tab
              </p>
                <div class='tabbar'>
                    <tabBar  v-model="value1" ref='tabNav' :data='list' :showSlider='true' > 
                            <tab
                            v-for="(item,index) in list"
                            :item="item"
                            :icon="item.icon"
                            :key="index">
                        </tab>
                    </tabBar> 
            </div> 
         </div>


                <div class="tab-slide-container" >
                        <slide
                            ref="slide"
                            :loop="false"
                            :initial-index="value1"
                            :auto-play="false"
                            :show-dots="true"
                            :options="options"
                            @scroll="scroll"
                            @change="changePage"
                        >

                                <slide-item>
                                  <div class='item' style="height:400px;">1</div>  
                                </slide-item>
                                    <!-- <cube-scroll 
                                      :list="list1" 
                                      ref="scroll" 
                                      :pullUpLoad="pullUpLoad" 
                                      :pullDownRefresh="pullDownRefresh"
                                       @pullingDown="pullingDown" 
                                       @pullingUp="pullingUp"
                                      >
                                                <ul class="list-content">
                                                        <li class="list-item" v-for="(i,index) in list1" :key="index" >{{i}}</li>
                                                 </ul>
                                    </cube-scroll> -->
                                <!-- </slide-item> -->
                                <slide-item>
                                  <div class='item' style="height:400px;">2</div>  
                                </slide-item>
                                <slide-item>
                                      <div class='item' style="height:400px;">3</div>   
                                </slide-item>

                        </slide>
               </div>

        <div>
        <p>滑动动画效果</p>
                <div class='tabbar'>
                    <tabBar  v-model="value1" ref='tabNav' :animation='true' :data='list' :showSlider='true' > 
                            <tab
                            v-for="(item,index) in list"
                            :item="item"
                            :icon="item.icon"
                            :key="index">
                        </tab>
                    </tabBar> 

                       <slide
                            ref="slide"
                            :loop="false"
                            :initial-index="value1"
                            :auto-play="false"
                            :show-dots="true"
                            :options="options"
                            @scroll="scroll"
                            @change="changePage"
                            :animation='true'
                        >

                                <slide-item>
                                  <div class='item' style="height:400px;">1</div>  
                                </slide-item>
                                    <!-- <cube-scroll 
                                      :list="list1" 
                                      ref="scroll" 
                                      :pullUpLoad="pullUpLoad" 
                                      :pullDownRefresh="pullDownRefresh"
                                       @pullingDown="pullingDown" 
                                       @pullingUp="pullingUp"
                                      >
                                                <ul class="list-content">
                                                        <li class="list-item" v-for="(i,index) in list1" :key="index" >{{i}}</li>
                                                 </ul>
                                    </cube-scroll> -->
                                <!-- </slide-item> -->
                                <slide-item>
                                  <div class='item' style="height:400px;">2</div>  
                                </slide-item>
                                <slide-item>
                                      <div class='item' style="height:400px;">3</div>   
                                </slide-item>

                        </slide>

            </div> 

        </div>

        </div> 
    </template>

<script type="text/ecmascript-6">

import BScroll from "better-scroll";
import { tabBar, tab } from "@/components/tabBar/index";
import {  tabPanel,tabPanels  } from "@/components/tabPanels/index";
import {  slideItem ,slide  } from "@/components/slide/index";

import { FOLLOWERS_DATA, RECOMMEND_DATA, HOT_DATA } from '@/assets/data/tab-bar'

import scroll from '../components/scroll/scroll.vue'



import {
  button as ButtonItem,
  checkbox as checkboxItem,
  input as inputeItem,
  verificationCode
} from "@/components/form/index";

import slideItemVue from '../components/slide/slide-item.vue';


export default {
  components: {
    tabBar,
    tab,
    ButtonItem,
    checkboxItem,
    inputeItem,
    verificationCode,
    tabPanel,
    tabPanels,
    slideItem,
    slide,
    'cube-scroll':scroll
  },
  data() {
    return {
          pullUpLoad:{
          threshold:0,
        },
        pullDownRefresh:{
          threshold:90,
          stop:40
        },
         list1:[1,50,1,50,1,50,1,50,1,50],
        list2:[1,50,1,50,1,50,1,50,1,50],
        list3:[1,50,1,50,1,50,1,50,1,50],
        options: {
            listenScroll: true,
            probeType: 3
        },
      isAjax: false,
      phone: "",
      value1: 'tab1',
      showSlide: true,
      demoList:[{
        label: 0,
        icon: 'cubeic-like',
        heroes: ['敌法师', '卓尔游侠', '主宰', '米拉娜', '变体精灵', '幻影长矛手', '复仇之魂', '力丸', '矮人狙击手', '圣堂刺客', '露娜', '赏金猎人', '熊战士']
      }, {
        label: 1,
        icon: 'cubeic-star',
        heroes: ['血魔', '影魔', '剃刀', '剧毒术士', '虚空假面', '幻影刺客', '冥界亚龙', '克林克兹', '育母蜘蛛', '编织者', '幽鬼', '司夜刺客', '米波']
      }],
      list: [
        {
          icon: "test",
          label: 'tab1'
        },
        {
          icon: "test",
          label: 'tab2'
        },
        {
          icon: "test",
       label: 'tab3'
        },
    
      ],
      TabList: [1, 2, 3, 4],
      listWidth: [],
      scrollX: 0,
      index:0
    };
  },
  computed: {
 
  },

  mounted() {
  },
  methods: {
      pullingUp(){
        let list = [13,13,15,153,132,1]
        setTimeout(()=>{
          this.index++;
          if(this.index>=3){
            // 如果没有新数据
            this.$refs.scroll.forceUpdate()
            return
          }else{
            this.list1 = this.list1.concat(list)
          }
        },1000)
      },
      pullingDown(i) {
        let list = [13,13]
        setTimeout(()=>{
          this.list1 =this.list1.concat(list)
        },1000)
      },
      //设置label
       changePage (current) {
        this.value1 = this.list[current].label
      },
        scroll (pos) {
        //返回滚动x轴 的绝对值
        const x = Math.abs(pos.x)
        //tab-bar的总宽度
        const tabItemWidth = this.$refs.tabNav.$el.clientWidth
        //slide 宽度
        const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth

    
        //滚动距离的百分比取余 
        let per=  (x / slideScrollerWidth) %this.list.length
        per= per.toFixed(2)  * tabItemWidth
        // %  (100 /this.list.length)
        if(per>0){
         this.$refs.tabNav.setSliderWidth(per)
        }

       
       
         const deltaX = x / slideScrollerWidth * tabItemWidth
        // const percentage = x/ (tabItemWidth/3) /  (slideScrollerWidth / 3 ) 

        // this.$refs.tabNav.setSliderTransform(deltaX)

        
      //  console.error(deltaX)
        // this.$refs.tabNav._updateSliderWidth(deltaX)

      },
      getCode() {
        toast("验证码已发送，请查收短信");
        this.$refs.verificationCode.send();
        this.scrollmethod.scrollToElement(
          document.querySelector(".nav-box li:nth-child(" + val + ")"),
          null,
          true,
          true
        );
        this.scrollmethod.refresh();
      },
  }
};
</script>
 <style  lang='stylus'  >

 .main{
   width:100%;
   height:100%;
   overflow:scroll;
 }

.tab-slide-container{
  // position absolute
  // height calc( 100% - 80px)  
  width 100%
  border 1px solid #ededed
  overflow hidden
}


.tab {
  position: absolute;
  width: 100%;
  border: 1px solid red;
  height: 100%;
  overflow: hidden;
}
.tab_content {
  height: 1.333333rem;
  /*width: auto;*/
  /*overflow-y: hidden;*/
}
.tab_item {

  width: 375px;
  height: 100px;
  border: 1px solid black;
  line-height: 1.333333rem;
  padding: 0 0.466667rem;
}

.tabpanels{
    border: 1px solid black;
}
.item{
    height 100px
}


 .wrap{
    height: 100%;
    width: 100%;
    overflow: scroll;
  }

  .list-content{
    position: relative;
    z-index: 10;
    background: #fff;
  }
  .list-item{
    height: 60px;
    line-height: 60px;
    font-size: 18px;
  
    border-bottom: 1px solid #e5e5e5;
  }
  

</style>

