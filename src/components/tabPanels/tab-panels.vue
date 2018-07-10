<template>
  <div class="cube-tab-panels" ref="panels">
    <div class="cube-tab-panels-group" ref="panelsGroup">
      <slot>
        <!-- <cube-tab-panel
          v-for="(item, index) in data" 
          :label="item.label"
          :key="index">
          {{item.label}}
        </cube-tab-panel> -->
      </slot>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">

  // import TabPanel from './tab-panel.vue'


  import { prefixStyle, findIndex } from '../../assets/js/dom'

  const TRANSFORM = prefixStyle('transform')

  const COMPONENT_NAME = 'cube-tab-panels'

  export default {
    name: COMPONENT_NAME,
    props: {
      value: {
        type: [String, Number]
      },
      data: {
        type: Array,
        default () {
          return []
        }
      }
    },
    created () {
      this.panels = []
    },
    mounted () {
      this._move(this.value)
    },
    methods: {
      _move(value) {

        const curIndex = findIndex(this.panels, panel => panel.label === value)
        const panelsGroup = this.$refs.panelsGroup
        const distance = -(curIndex * 100)
        panelsGroup.style[TRANSFORM] = `translateX(${distance}%)`


      },
      addPanel (panel) {
        this.panels.push(panel)
      },
      removePanel (panel) {
        const index = this.panels.indexOf(panel)
        if (index > -1) this.panels.splice(index, 1)
      }
    },
    watch: {
      value (newV) {
        this._move(newV)
      }
    },
    components: {
      //  TabPanel 
    }
  }
</script>
<style lang="scss"  scoped>
  .cube-tab-panels{
    position: relative;
    overflow: hidden;
  }
  .cube-tab-panels-group{
    display: flex;
    transition: all .4s cubic-bezier(.86, 0, .07, 1);
  }
  
</style>