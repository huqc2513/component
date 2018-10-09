<template>
  <div
    class="cube-tab"
    :style="isActive"
    :class="{'cube-tab_active': isActive}"
    @click="handleClick">
    <slot name="icon">
      <i :class="icon"></i>
    </slot>
    <slot>
      <div >{{item.label}}</div>
    </slot>
  </div>
</template>
<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'tab'



  export default {
    name: COMPONENT_NAME,
    props: {
      item: {
        type: [Object],
      },
      icon: {
        type: String,
        default: ''
      },
    //  width:{
        // type:[String],
        // default:`100px`
      // }
    },
    mounted () {
      this.$parent.addTab(this)
    },
    destroyed () {
      this.$parent.removeTab(this)
    },
    computed: {
      isActive () {
        return {
              color: this.$parent.value ===this.item.label ? this.$parent.activeColor :this.$parent.color,
         }  
      }
    },
    methods: {
      handleClick () {
        this.$parent.trigger(this.item)
      }
    }
  }
</script>
<style lang="scss" scoped >

  .cube-tab{
         flex: 1;
        padding: 7px 0;
   
        text-align: center;
  }


</style>