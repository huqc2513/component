<template>
  <div ref="wrapper" class="scroll-wrap list-wrapper">

    <div class="scroll-content">
      <div ref="listWrapper">
        <slot>
        </slot>
      </div>

    <!--上拉刷新-->
    <slot name="pullup"
          :pullUpLoad="pullUpLoad"
          :isPullUpLoad="isPullUpLoad"
    >
      <div class="pullup-wrapper" v-if="pullUpLoad">
        <div class="before-trigger" v-if="!isPullUpLoad">
          <span>{{pullUpTxt}}  </span>
        </div>
        <div class="after-trigger" v-else>
          <loading></loading>
        </div>
      </div>
    </slot>


    </div>

    <!--下拉刷新-->
    <slot name="pulldown"
          :pullDownRefresh="pullDownRefresh"
          :bubbleY="bubbleY"
    >
      <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
        <div class="before-trigger" v-if="beforePullDown">
          <bubble :y="bubbleY"></bubble>
        </div>
        <div class="after-trigger" v-else>
          <div v-if="isPullingDown" class="loading">
            <loading ></loading>
          </div>
          <div v-else><span>{{refreshTxt}}</span></div>
        </div>
      </div>
    </slot>


  </div>
</template>
<script type="text/ecmascript-6">

  import BScroll from 'better-scroll'
  import bubble from './bubble'
  import loading from '../loading/loading'
  import {getRect} from '../../assets/js/dom'

  export default {
    data() {
      return {
        bubbleY: 0,
        beforePullDown: true,
        isPullingDown: false,
        isRebounding: false,
        isPullUpLoad: false,
        pullUpDirty: true,
        pullDownStyle: '',

      }
    },
    components: {
      bubble,
      loading
    },
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      list: {
        type: Array,
        default: null
      },
      startY: {
        type: Number,
        default: 0
      },
      pullup: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      },
      pullDownRefresh: {
        type: null,
        default: false
      },
      pullUpLoad: {
        type: null,
        default: false
      },
    },
    computed: {
      pullUpTxt() {
        const moreTxt = (this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more) || '上拉加载更多'
        const noMoreTxt = (this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.noMore) || `没有更多了`
        return this.pullUpDirty ? moreTxt : noMoreTxt
      },
      refreshTxt() {
        return (this.pullDownRefresh && this.pullDownRefresh.txt) || '刷新成功'
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    created() {
      this.$nextTick(()=>{
        this.pullDownInitTop =  - this.$refs.pulldown.offsetHeight
      })
    //   console.warn('23')
    },
    methods: {
      //下拉刷新
      _initPullDownRefresh() {

        this.scroll.on('scroll', (pos) => {
          if (!this.pullDownRefresh) {
            return
          }

          if (this.beforePullDown) {
            // 这里 pullDownInitTop为负值，高度为它自身的高度滚动的Y值 + pullDownInitTop，加上，bubble组件才会从top为0值才开始计算拖动拉长效果
            this.bubbleY = Math.max(0, pos.y+ this.pullDownInitTop)

            //高度一定要加上他本身高度的负值，pos.y在滚动完成后会为0 ，如果不加上会定位在顶部，不会隐藏在屏幕上方
            this.pullDownStyle = `top:${Math.min(pos.y +this.pullDownInitTop, 10) }px`
          } else {
            this.bubbleY = 0
          }
          if (this.isRebounding) {
            // 回弹
            this.pullDownStyle = `top:${10- (this.pullDownRefresh.stop - pos.y)}px`
          }
        })

        this.scroll.on('pullingDown', () => {
          this.beforePullDown = false
          this.isPullingDown = true
          this.$emit('pullingDown')
        })

      },
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
          this.$refs.listWrapper.style.minHeight = `${getRect(this.$refs.wrapper).height + 1}px`
        }
        let options = {
          scrollbar:true,
          click: true,
          probeType: 3,
          scrollY: true,
          startY: this.startY,
          pullUpLoad: {
            threshold: 0, // 负值是当上拉到超过低部 70px；正值是距离底部距离 时，
            stop: 50
          },
          pullDownRefresh: this.pullDownRefresh
        }
        this.scroll = new BScroll(this.$refs.wrapper, options);

        // 监听滚动
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos)
          })
        }
        // 监听滚动结束
        if (this.listenScrollEnd) {
          this.scroll.on('scrollEnd', (pos) => {
            this.$emit('scroll-end', pos)
          })
        }

        //下拉刷新结束
        if (this.pullDownRefresh) {
          this._initPullDownRefresh()
        }
        //上拉刷新结束
        if (this.pullUpLoad) {
         this._initPullUpLoad()
        }
      },
      // 下拉刷新之后
      _reboundPullDown() {
        const { stopTime = 600 } = this.pullDownRefresh
        return new Promise((resolve) => {
          setTimeout(() => {
            this.isRebounding = true
            this.scroll.finishPullDown()
            resolve()
          }, stopTime)
        })
      },
      // 下拉刷新之后
      _afterPullDown() {
        setTimeout(() => {
          //这里的pullDownInitTop将div的top还原到最顶部
          this.pullDownStyle = `top:${this.pullDownInitTop}px`
          //
          this.beforePullDown = true
          this.isRebounding = false
          this.refresh()

          //  bounceTime 为设置回弹动画的动画时长。
        }, this.scroll.options.bounceTime)
      },
      //  上拉加载
      _initPullUpLoad() {
        this.scroll.on('pullingUp', () => {
          this.isPullUpLoad = true
          // this.pullUpLoad=false
          this.$emit('pullingUp')
        })
      },
      finishPullDown() {
        this.scroll.finishPullDown()
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      },
      forceUpdate(dirty) {

        // 下拉刷新
        if (this.pullDownRefresh && this.isPullingDown) {
          this.isPullingDown = false
          //在下拉刷新后，需要多少秒后才开始回弹

          // 定时器
          this._reboundPullDown().then(() => {
            this._afterPullDown()
          })

          // 上拉刷新
        } else if (this.pullUpLoad && this.isPullUpLoad) {
          this.isPullUpLoad = false
          this.scroll.finishPullUp()
          this.scroll.refresh()
          this.pullUpDirty = dirty
          this.refresh()
        } else {
          this.refresh()
        }
      }
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
    destroyed() {
      this.$refs.scroll && this.$refs.scroll.destroy()
    },
  }
</script>

<style scoped lang="stylus">

  .list-wrapper
    position: relative
    height: 100%
    /*position: absolute*/
    /*left: 0*/
    /*top: 0*/
    /*right: 0*/
    /*bottom: 0*/
    overflow: hidden
    background: #fff
    .scroll-content
      position: relative
      z-index: 1
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

  .pulldown-wrapper
    position: absolute
    width: 100%
    /*border 1px solid red*/
    z-index 99
    left: 0
    display: flex
    justify-content center
    align-items center
    transition: all
    .after-trigger
        margin-top: 10px
        display flex
        justify-content center
        margin auto
  .pullup-wrapper
    width: 100%
    display: flex
    justify-content center
    align-items center
    padding: 16px 0


</style>
