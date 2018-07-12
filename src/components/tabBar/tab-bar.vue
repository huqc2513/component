<template>
  <div class="cube-tab-bar" :class="{'cube-tab-bar_inline': inline}">
    <slot>
     
    </slot>
    <div v-if="showSlider" ref="slider" class="cube-tab-bar-slider" :style="{backgroundColor:activeColor}"></div>
  </div>
</template>
<script type="text/ecmascript-6">



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
      animation:{
        type:Boolean,
        default:false
      },
      color:{
        type:String,
        default:`#666`
      },
      activeColor:{
        type:String,
        default:'#FF9900'
      },
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
      },
     
    },
    created () {
      this.tabs = []
    },
    mounted () {
        this.$nextTick(() => {
          if (!this.showSlider) return

         
            this._updateSliderStyle()
            this.setSlideWidth()
        })
    },
    methods: {
      setSlideWidth(index){
             const slider = this.$refs.slider
              let { width } = this._getSliderWidthAndIndex();
              
             if(this.animation){
                  width =width * 0.6
                }

              slider.style.width = `${width}px`
      },

      SelectAnimation(){

              const slider = this.$refs.slider
              let { width } = this._getSliderWidthAndIndex()
              // let transformWidth =width
              // if(this.animation==='creeping'){
              //    width = width*0.6
              // }
              // slider.style.width = `${width}px`
              
              // this.setSliderTransform ( ( transformWidth - width)/2)

      },
      addTab (tab) {
        this.tabs.push(tab)
      },
      removeTab (tab) {
        const index = this.tabs.indexOf(tab)
        if (index > -1) this.tabs.splice(index, 1)
      },
      trigger (item) {
         let index= this.data.indexOf(item)
          if (item.label !== this.value) {
              const changedEvents = [EVENT_INPUT, EVENT_CHANGE]
              changedEvents.forEach((eventType) => {
                this.$emit(eventType,index)
              })
            }
      },
      //动态设置宽度
      _updateSliderWidth(offset){
        const slider = this.$refs.slider
        if (typeof offset === 'number') {
          offset = `${offset}px`
        }
        if (slider) {
          if (this.useTransition) slider.style[TRANSITION] = `all 0.2s linear`
          
          let width = slider.style.width
          // slider.style.width=  width+offset +'px'
          // slider.style[TRANSFORM] = `translateX(${offset/10}) translateZ(0)`
        }
      },
      _updateSliderStyle () {
        if (!this.showSlider) return
        const slider = this.$refs.slider
        this.$nextTick(() => {
           this.setSliderTransform(this._getOffsetLeft(this.index))
        })
      },
      setSliderWidth(percent){
                  const slider = this.$refs.slider
                  let width  =  this.tabs[0].$el.clientWidth *0.6
                  let w =(parseInt(width) + percent)
                if(w> this.tabs[0].$el.clientWidth){
                  w= this.tabs[0].$el.clientWidth
                }
                slider.style.width =  w+'px'
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
          this.tabs.forEach((e,i)=>{
              if(i<=this.index && e.$el){
                       width=  e.$el.clientWidth
                }
          })
        return {
          width,
          index
        }
      },
       //计算指定 tab的偏移量   公式为 当前下标前的元素*width
      _getOffsetLeft (index) {
        let offsetLeft = 0
        this.tabs.forEach((tab, i) => {
          if (i < index){
            if(tab.$el){
            offsetLeft += tab.$el.clientWidth
            }
          } 
        })
           if(this.animation){
         offsetLeft =    offsetLeft +   (this.tabs[0].$el.clientWidth - this.tabs[0].$el.clientWidth *0.6)/2
             
           }
        return offsetLeft
      },
      shrinkWidt(){

      }
    },
    watch: {
      value () {
        if(this.animation){
            this.setSlideWidth()
             this._updateSliderStyle()
        }else{
        this._updateSliderStyle()
        }
      }
    },
   computed: {
      index () {
        let index=-1
        this.data.forEach((e,i)=>{
          if(e.label===this.value){
            index=i
              return
          }
        })
         return  index
      }
    },
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

    // background-color:#2F5FEA;
  }


</style>