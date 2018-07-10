<template>
  <div class="cube-slide" ref="slide">
    <div class="cube-slide-group" ref="slideGroup">
      <slot>
        <cube-slide-item
          v-for="(item, index) in data"
          :key="index"
          @click.native="clickItem(item, index)"
          :item="item">
        </cube-slide-item>
      </slot>
    </div>

    <div class="cube-slide-dots" v-if="showDots">
      <slot name="dots" :current="currentPageIndex" :dots="dots">
        <span :class="{active: currentPageIndex === index}" v-for="(item, index) in dots" :key="index"></span>
      </slot>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">

  import CubeSlideItem from './slide-item.vue'
  import BScroll from 'better-scroll'

  const COMPONENT_NAME = 'cube-slide'
  const EVENT_CHANGE = 'change'
  const EVENT_SELECT = 'click'
  const EVENT_SCROLL_END = 'scroll-end'
  const EVENT_SCROLL = 'scroll'
  const DIRECTION_H = 'horizontal'
  const DIRECTION_V = 'vertical'

  const DEFAULT_OPTIONS = {
    momentum: false,
    click: true,
    observeDOM: false,
    bounce: false
  }

  export default {
    name: COMPONENT_NAME,

    props: {
      options: {
        type: Object,
        default() {
            return {}
        }
      },
      data: {
        type: Array,
        default() {
          return []
        }
      },
      initialIndex: {
        type:[ Number,String],
        default: 0
      },
      loop: {
        type: Boolean,
        default: true
      },
      threshold: {
        type: Number,
        default: 0.3
      },
      speed: {
        type: Number,
        default: 400
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      },
      showDots: {
        type: Boolean,
        default: true
      },
      direction: {
        type: String,
        default: DIRECTION_H
      },
      allowVertical: {
        type: Boolean,
        default: undefined,
        deprecated: {
          replacedBy: 'options'
        }
      },
      stopPropagation: {
        type: Boolean,
        default: undefined,
        deprecated: {
          replacedBy: 'options'
        }
      }
    },
    data() {
      return {
        dots: 0,
        currentPageIndex: this.initialIndex || 0
      }
    },
    created() {

      const needRefreshProps = ['data', 'loop', 'autoPlay', 'options.eventPassthrough', 'threshold', 'speed', 'allowVertical']

      needRefreshProps.forEach((key) => {
        this.$watch(key, () => {
          if (key === 'data') {
            this._destroy()
          }
          this.$nextTick(() => {
            this.refresh()
          })
        })
      })

    },
    watch: {
      initialIndex(newIndex) {
        if (newIndex !== this.currentPageIndex) {
          this.slide && this.slide.goToPage(newIndex)
        }
      }
    },
    methods: {
      clickItem(item, index) {
        this.$emit(EVENT_SELECT, item, index)
      },
      refresh() {
        if (this.slide === null) {
          return
        }
        this._destroy()
        clearTimeout(this._timer)
        if (this.slide) {
          this.currentPageIndex = 0
        }
        //设置宽度
        this._updateSlideDom()
        if (this.showDots) {
          this._initDots()
        }
        if (this.currentPageIndex >= this.dots.length) {
          this.currentPageIndex = this.dots.length - 1
        }
        //初始化 bs
        this._initSlide()
        if (this.autoPlay) {
          this._play()
        }

      },
      _destroy() {
        this.slide && this.slide.destroy()
      },
      _refresh() {
        this._updateSlideDom(true)
        this.slide.refresh()
      },
      _updateSlideDom(isResize) {
        this._setSlideStyle(isResize)
      },
      _setSlideStyle(isResize) {
        
        //轮播图的所有子节点
        this.children = this.$refs.slideGroup.children
        //判断方向是水平还是垂直居中
        
        const target = this.direction === DIRECTION_H ? 'width' : 'height'
        let allSize = 0

        //获取到轮播图的高度或宽度
        const slideSize = this.$refs.slide[`client${target[0].toUpperCase() + target.slice(1)}`]

        const len = this.children.length

        //设置每张图的尺寸和累计宽度或者高度
        for (let i = 0; i < len; i++) {
          const child = this.children[i]
          child.style[target] = slideSize + 'px'
          allSize += slideSize
        }
        //加上第一个子节点和最后一个子节点的宽或高
        if (this.loop && !isResize && len > 1) {
          allSize += 2 * slideSize
        }

        //设置wrap
        this.$refs.slideGroup.style[target] = allSize + 'px'

      },
      //初始化
      _initSlide() {
        const eventPassthrough = this.direction === DIRECTION_H && this.allowVertical ? DIRECTION_V : ''
        const options = Object.assign({}, DEFAULT_OPTIONS, {
          scrollX: this.direction === DIRECTION_H,
          scrollY: this.direction === DIRECTION_V,
          eventPassthrough,
          snap: {
            loop: this.loop,
            threshold: this.threshold,
            speed: this.speed
          },
          stopPropagation: this.stopPropagation
        }, this.options)

        this.slide = new BScroll(this.$refs.slide, options)
      
      //滚动到指定页码数
        this.slide.goToPage(this.currentPageIndex, 0, 0)
      
      this.slide.on('scrollEnd', this._onScrollEnd)
        if (this.options.listenScroll) {
          this.options.probeType = 3
          this.slide.on('scroll', this._onScroll)
        }
        const slideEl = this.$refs.slide
        slideEl.removeEventListener('touchend', this._touchEndEvent, false)
        this._touchEndEvent = () => {
          if (this.autoPlay) {
            this._play()
          }
        }
        slideEl.addEventListener('touchend', this._touchEndEvent, false)
        this.slide.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this._timer)
          }
        })
      },

      _onScrollEnd() {
          //获取到滚动停止的页码数
  
        const { pageX, pageY } = this.slide.getCurrentPage()
        let pageIndex = this.direction === DIRECTION_H ? pageX : pageY
        //滚动后的页码数和当前页码数，如果不一样emit
        if (this.currentPageIndex !== pageIndex) {
     
          this.currentPageIndex = pageIndex
          // console.warn('emit:'+pageIndex)

          this.$emit(EVENT_CHANGE, pageIndex)
        }
        this.$emit(EVENT_SCROLL_END, pageIndex)
        
        if (this.autoPlay) {
          this._play()
        }
      },
      _onScroll(pos) {
        this.$emit(EVENT_SCROLL, pos)
      },
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      //自动播放
      _play() {
          //清除一次定时器
        clearTimeout(this._timer)
        this._timer = setTimeout(() => {
          this.slide.next()
        }, this.interval)
      },
      _deactivated() {
        clearTimeout(this._timer)
        clearTimeout(this._resizeTimer)
        window.removeEventListener('resize', this._resizeHandler)
        const slideEl = this.$refs.slide
        if (slideEl) {
          slideEl.removeEventListener('touchend', this._touchEndEvent, false)
        }
      },
      _resizeHandler() {
        /* istanbul ignore if */
        if (!this.slide) {
          return
        }
        clearTimeout(this._resizeTimer)
        this._resizeTimer = setTimeout(() => {
    
         //这里判断是否还在滚动的过程中 如果还在滚动则停止滚动
          if (this.slide.isInTransition) {
            this._onScrollEnd()
          } else {
            if (this.autoPlay) {
              this._play()
            }
          }
          this._refresh()
        }, 60)
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.refresh()
      })
      window.addEventListener('resize', this._resizeHandler)
    },
    activated() {
      /* istanbul ignore next */
      if (this.autoPlay) {
        this._play()
      }
      window.addEventListener('resize', this._resizeHandler)
    },
    deactivated() {
      /* istanbul ignore next */
      this._deactivated()
    },
    destroyed() {
      this._deactivated()
      this._destroy()
      this.slide = null
    },
    components: {
      CubeSlideItem
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">



  .cube-slide
    position: relative
    min-height: 1px
    height: 100%
  .cube-slide-group
    position: relative
    height: 100%
    overflow: hidden
    white-space: nowrap
  .cube-slide-dots
    position: absolute
    bottom: 2px
    right: 0
    left: 0
    padding: 0 6px
    font-size: 0
    text-align: center
    transform: translateZ(1px)
    > span
      display: inline-block
      vertical-align: bottom
      margin: 0 1px
      width: 10px
      height: 1px
      background: #fff
      &.active
        background: rgb(255, 153, 0)
</style>