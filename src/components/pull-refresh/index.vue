<template>
  <div class="pull-refresh-container">
    <slot name="pull">
      <div class="pull-refresh-wrap" ref="pullRefreshContent">
        <div class="pull-icon-box">
          <IconFont class='rotate0' :class="{'rotate90':pullStatus===1}" v-show='pullStatus!==3 && pullStatus!==4' :name="PullIcon"></IconFont>
          <Loading  title=''  v-show='pullStatus===3'></Loading>
          <IconFont  v-show='pullStatus===4' name="iconwancheng"></IconFont>
        </div>
        <span class="pull-status-text">{{ pullText }}</span>
      </div>
    </slot>
    <div
      class="pull-content"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
      ref="pullContent"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import IconFont from "./iconFont.vue";
import Loading from '../loading/loading'

const map_pull_status = {
  0: "下拉刷新",
  1: "立即释放刷新",
  3: "刷新中...",
  4: "刷新成功"
};

export default {
  data: () => {
    return {
      PullIcon: "iconiconxlsx",
      pullStatus: 0,
      startFlag: false
    };
  },
  props: {
    pageY: {
      type: [String, Number],
      default: 80
    },
    timer:{
      type: [String, Number],
      default: 1000
    },
    list:{
      type:Array,
      required:true,
    }
  },
  computed: {
    pullText() {
      let text = map_pull_status[this.pullStatus];
      return text || "下拉刷新";
    }
  },
  components: {
    IconFont,
    Loading
  },
  created() {
    this.touch = {};
  },
  mounted() {
    this.$nextTick(() => {
      this.$pullRefreshContentEl = this.$refs.pullRefreshContent;
      this.$pullContentEl = this.$refs.pullContent;
    });
  },
  watch: {
      list:{
        handler(curVal,oldVal){
          setTimeout(() => {
            this.forceUpdate(true)
          }, this.refreshDelay)
        },
        deep:true
      }
    },
  methods: {
    touchStart(e) {
      if (this.startFlag == true) {
        return;
      }

      const touch = e.touches[0];
      this.touch.pageX = touch.pageX;
      this.touch.pageY = touch.pageY;
    },
    touchMove(e) {
      this.startFlag = true;
      const touch = e.touches[0];
      if((touch.pageY - this.touch.pageY >=0 )===false){
        return 
      }
        this.$pullRefreshContentEl.style["transition-property"] = 'null';
        this.$pullContentEl.style["transition-property"] = 'null';

      let distX = Math.abs(touch.pageX - this.touch.pageX);
      let distY = Math.abs(touch.pageY - this.touch.pageY);

        if (this.$pullRefreshContentEl && this.$pullContentEl) {

         if (this.pageY <= distY) {
             let shrinkPercent =  (distY / window.innerHeight )

             distY = this.pageY + (this.pageY*shrinkPercent)
             this.touch.distY = distY
              this.$nextTick(()=>{
                if(this.pullStatus!=1){
                    this.pullStatus =1;
                }
              })
         }else{
           this.pullStatus =0;
         }

        
          this.$pullRefreshContentEl.style["transform"] = `translate3d(0,${distY}px,0)`;
          this.$pullContentEl.style["transform"] = `translate3d(0,${distY}px,0)`;
          this.$pullRefreshContentEl.style["transition-duration"] = 0
          this.$pullContentEl.style["transition-duration"] = 0
        }
    },

    touchEnd(e) {
 
     this.$nextTick(()=>{
      if(this.pullStatus ===1){
          this.pullStatus = 3

          function resetPaint(){
            let distY  = this.$pullRefreshContentEl.offsetHeight
            this.$pullRefreshContentEl.style["transition-duration"] = '0.2s';
            this.$pullRefreshContentEl.style["transition-property"] = 'all';
            this.$pullRefreshContentEl.style["transform"] = `translate3d(0,${distY}px,0)`;
            this.$pullContentEl.style["transition-duration"] = '0.3s';
            this.$pullContentEl.style["transition-property"] = 'all';
            this.$pullContentEl.style["transform"] = `translate3d(0,${distY}px,0)`;

          }
        resetPaint.call(this)
        this.$emit('pullingDown')

      }else {
          this.recall()
      }
     })
      
    },
    forceUpdate(){
      let me  = this
      this.$nextTick(()=>{
        if(this.pullStatus===3){
              setTimeout(()=>{
                  this.pullStatus=4
                  this.recall()
              },300)
          }
      })
    },
    recall(){
      this.startFlag = false;
      this.touch = {};
      let me = this

      if(this.pullStatus===4){
          setTimeout(()=>{
             resetPaint.call(me)
          },500)

      }else{
          resetPaint.call(me)
      }

      function resetPaint(){
        this.$pullRefreshContentEl.style["transition-duration"] = '0.3s';
        this.$pullRefreshContentEl.style["transition-property"] = 'all';
        this.$pullRefreshContentEl.style["transform"] = `translate3d(0,0,0)`;
        this.$pullContentEl.style["transition-duration"] = '0.3s';
        this.$pullContentEl.style["transition-property"] = 'all';
        this.$pullContentEl.style["transform"] = `translate3d(0,0,0)`;
      }
    },
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">


.pull-refresh-container {
    background: grey;
    position relative;
    clear both
    overflow-y scroll;
  .pull-refresh-wrap {
    position:absolute;
    top:-50px;
    display: flex;
    height 50px;
    align-items: center;
    width: 100%;
    background: grey;

    .pull-icon-box{
      display inline-block
      width 30px;
      height 30px;
      margin-left: 50px;
      margin-right: 60px;
      position relative
      .rotate0{
        transition all 0.2s;
      }
      .rotate90{
        transform rotate(180deg)
      }
    }
    .pull-status-text {
      position absolute
      left 50%
      top 50%
      transform translate(-50%,-50%)
    }
  }

  .pull-content {
    background #FFF;
    padding 0;
    border: 1px solid #ededed;
    width: 100%;
  }
}
</style>
