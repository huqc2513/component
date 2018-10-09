<template>
  <div class='main'>




  </div>
</template>

<script type="text/ecmascript-6">

  import BScroll from "better-scroll";
  import {tabBar, tab} from "@/components/tabBar/index";
  import { tabPanel, tabPanels } from "@/components/tabPanels/index";
  import {slideItem, slide} from "@/components/slide/index";

  import {FOLLOWERS_DATA, RECOMMEND_DATA, HOT_DATA} from '@/assets/data/tab-bar'


  import {offset} from '@/assets/js/dom'

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
      'cube-scroll': scroll
    },
    data() {
      return {

      };
    },

    created() {

    },
    mounted() {

    },
    methods: {

    }

  };
</script>
<style lang='stylus'>

  .main {
    width: 100%;
    height: 100%;
    overflow: scroll;
  }

  .tab-slide-container {
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

  .tabpanels {
    border: 1px solid black;
  }

  .item {
    height 100px
  }

  .wrap {
    height: 100%;
    width: 100%;
    overflow: scroll;
  }

  .list-content {
    position: relative;
    z-index: 10;
    background: #fff;
  }

  .list-item {
    height: 60px;
    line-height: 60px;
    font-size: 18px;

    border-bottom: 1px solid #e5e5e5;
  }


</style>

