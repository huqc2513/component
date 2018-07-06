    <template>
        <div>
        <!-- <div style="margin:20px  0">
            <b>tab联动</b>  
        </div> -->

            <!-- <div class='tabbar'>
                <tabBar :value='value' @change='change'  :data='demoList' :showSlider='true' > 
                        <tab
                        v-for="(item,index) in demoList"
                        :item="item"
                        :icon="item.icon"
                        :key="index">
                    </tab>
                </tabBar> 
            </div>
            <div class='tabpanels'>
                    <tabPanels  :data='demoList'  :value='value' >
                                <tabPanel v-for="(item,index) in demoList" :key="index" :label='item.label' >
                                            <ul>
                                                <li v-for="(v,i) in item.heroes" :key='i'>{{v}}</li>
                                            </ul>                    
                                </tabPanel>    
                    </tabPanels> 
            </div> -->



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


  <!-- @scroll="scroll" -->

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
                                    <!-- <cube-scroll :data="followersData"> -->
                                                       <div class='item' style="height:400px;">1 </div>  
                                    <!-- </cube-scroll> -->
                                </slide-item>


                                <slide-item>
                                    <!-- <cube-scroll :data="recommendData"> -->
                                  <div class='item' style="height:400px;">2</div>  
                                    <!-- </cube-scroll> -->
                                </slide-item>


                                <slide-item>
                                    <!-- <cube-scroll :data="hotData"> -->
                                      <div class='item' style="height:400px;">3</div>   
                                    <!-- </cube-scroll> -->
                                </slide-item>

                        </slide>
               </div>




                <!-- <div class="tab" ref="tab">
                        <div class="tab_content" ref="tabcontent">
                            <div class="tab_item" v-for="(item,index) in TabList"  :key='index' ref="tabitem">
                                {{item}}
                            </div>
                        </div>
              </div>-->
        </div> 
    </template>

<script type="text/ecmascript-6">

import BScroll from "better-scroll";
import { tabBar, tab } from "@/components/tabBar/index";
import {  tabPanel,tabPanels  } from "@/components/tabPanels/index";
import {  slideItem ,slide  } from "@/components/slide/index";

import { FOLLOWERS_DATA, RECOMMEND_DATA, HOT_DATA } from '@/assets/data/tab-bar'


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
    slide

  },
  data() {
    return {
        options: {
            listenScroll: true,
            probeType: 3
        },
      followersData: FOLLOWERS_DATA,
      recommendData: RECOMMEND_DATA,
      hotData: HOT_DATA,

      isAjax: false,
      phone: "",
      value: 0,
      value1: 0,
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
          label: 0
        },
        {
          icon: "test",
          label: 1
        },
        {
          icon: "test",
          label: 2
        },
    
      ],
      TabList: [1, 2, 3, 4],
      listWidth: [],
      scrollX: 0
    };
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listWidth.length; i++) {
        let width = this.listWidth[i];
        let width2 = this.listWidth[i + 1];
        if (!width2 || (this.scrollX >= width && this.scrollX < width2)) {
          return i;
        }
      }
      return 0;
    }
  },

  mounted() {
    //  this.InitTabScroll()
  },
  methods: {
        resolveTitle (item) {
             return `${item.name}关注了问题 · ${item.postTime} 小时前`
        },
        resolveQuestionFollowers (item) {
             return `${item.answers} 赞同 · ${item.followers} 评论`
        },
      //设置label
       changePage (current) {
         this.value1 = this.list[current].label
        
      },
        scroll (pos) {
       //返回绝对值
        const x = Math.abs(pos.x)

        //nav 的宽度
        const tabItemWidth = this.$refs.tabNav.$el.clientWidth
     
        //拿到最外层wrap的滚动宽度
        const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth


  
        const deltaX = x / slideScrollerWidth * tabItemWidth
        this.$refs.tabNav.setSliderTransform(deltaX)
      },
    _calculateHeight() {
      let List = this.$refs.tabcontent.getElementsByClassName("tab_item");
      let width = 0;
      this.listWidth.push(width);
      for (let i = 0; i < List.length; i++) {
        let item = List[i];
        width += item.clientWidth;
        this.listWidth.push(width);
      }
    },
    InitTabScroll() {
      let width = 0;
      for (let i = 0; i < this.TabList.length; i++) {
        width += this.$refs.tabitem[0].getBoundingClientRect().width;
      }
      this.$nextTick(() => {
        this.$refs.tabcontent.style.width = width + "px";
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.tab, {
              startX: 0,
              click: true,
              scrollX: true,
              scrollY: false,
              eventPassthrough: "vertical",
              probeType: 3
            });
            this.scroll.on("scroll", pos => {
              this.scrollX = Math.ceil(-pos.x) < 0 ? 0 : Math.ceil(-pos.x);
            });
            this._calculateHeight();
          } else {
            this.scroll.refresh();
          }
        });
      });
    },
    iscrollCenter(index) {
      const list = this.$refs.tabcontent.getElementsByClassName("tab_item");
      if (list[index]) {
        this.$nextTick(() => {
          this.scroll.scrollToElement(list[index], 300, true);
        });
      }
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
    change(item, i) {
      if (this.value != item.label) {
        this.value = item.label;
      }
    },
      change1(item, i) {
        console.error(item)
              console.error(i)
      if (this.value1 != item.label) {
        this.value1 = item.label;
      }
    }
  }
};
</script>
 <style  lang='stylus'  >
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
  display: inline-block;
  width: 375px;
  height: 100px;
  border: 1px solid black;
  line-height: 1.333333rem;
  padding: 0 0.466667rem;
}
.tabbar {
  margin-bottom: 30px;
  padding-bottom: 10px;
}
.tabpanels{
    border: 1px solid black;
}



.item{
    border 1px solid black;
    height 100px
}


</style>

