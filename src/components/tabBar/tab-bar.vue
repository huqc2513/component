<template>
  <div class="cube-tab-bar" :class="{'cube-tab-bar_inline': inline}">
    <slot>
      <cube-tab
        v-for="(item,index) in data"
        :label="item.label"
        :icon="item.icon"
        :key="index">
      </cube-tab>
    </slot>
    <div v-if="showSlider" ref="slider" class="cube-tab-bar-slider"></div>
  </div>
</template>
<script type="text/ecmascript-6">


    function findIndex(ary, fn) {
    if (ary.findIndex) {
        return ary.findIndex(fn)
    }
    let index = -1
    ary.some(function (item, i, ary) {
        const ret = fn.call(this, item, i, ary)
        if (ret) {
        index = i
        return ret
        }
    })
    return index
    }


  import { prefixStyle } from '@/assets/js/dom'

  
  import CubeTab from './tab.vue'
  const COMPONENT_NAME = 'cube-tab-bar'
  const EVENT_INPUT = 'input'
  const EVENT_CHANGE = 'change'
  const EVENT_CLICK = 'click'
  
  const TRANSFORM = prefixStyle('transform')
  const TRANSITION = prefixStyle('transition')

  export default {
    name: COMPONENT_NAME,
    components: {
      CubeTab
    },
    props: {
      value: {
        type: [String, Number],
        required: true
      },
      data: {
        type: Array,
        default () {
          return []
        }
      },
      inline: {
        type: Boolean,
        default: false
      },
      showSlider: {
        type: Boolean,
        default: false
      },
      useTransition: {
        type: Boolean,
        default: true
      }
    },
    created () {
      this.tabs = []
      console.error(this.showSlider)
    },
    mounted () {
      this._updateSliderStyle()
    },
    methods: {
      addTab (tab) {
        this.tabs.push(tab)
      },
      removeTab (tab) {
        const index = this.tabs.indexOf(tab)
        if (index > -1) this.tabs.splice(index, 1)
      },
      trigger (label) {
        this.$emit(EVENT_CLICK, label)
        if (label !== this.value) {
          const changedEvents = [EVENT_INPUT, EVENT_CHANGE]
          changedEvents.forEach((eventType) => {
            this.$emit(eventType, label)
          })
        }
      },
      _updateSliderStyle () {

        if (!this.showSlider) return
        const slider = this.$refs.slider
        this.$nextTick(() => {
            //拿到每个tab的宽度和下标
          const { width, index } = this._getSliderWidthAndIndex()
          slider.style.width = `${width}px`
          this.setSliderTransform(this._getOffsetLeft(index))
        })
      },
      setSliderTransform (offset) {
        const slider = this.$refs.slider
        if (typeof offset === 'number') {
          offset = `${offset}px`
        }
        if (slider) {
          if (this.useTransition) slider.style[TRANSITION] = `all 0.2s linear`
          slider.style[TRANSFORM] = `translateX(${offset}) translateZ(0)`
        }
      },
      //根据value来遍历属于哪个下标
      _getSliderWidthAndIndex () {
        let width = 0
        let index = 0
        if (this.tabs.length > 0) {
          index = findIndex(this.tabs, (tab) => tab.label === this.value)
          width = this.tabs[index].$el.clientWidth
        }
        return {
          width,
          index
        }
      },
       //计算指定 tab的偏移量   公式为 当前下标前的元素*width
      _getOffsetLeft (index) {
        let offsetLeft = 0
        this.tabs.forEach((tab, i) => {
          if (i < index) offsetLeft += tab.$el.clientWidth
        })
        return offsetLeft
      }
    },
    watch: {
      value () {
        this._updateSliderStyle()
      }
    }
  }
</script>
<style lang="scss" >

  .cube-tab-bar{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cube-tab-bar_inline{
    .cube-tab{
        display: flex;
        align-content: center;
        justify-content: center;
    }
  }
  .cube-tab-bar-slider{
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    width: 20px;
    background-color:#2F5FEA;
  }


</style>