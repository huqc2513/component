<template>

  <div class="mycheck">
    <label>
      <span class="check-icon"></span>
      <input type="checkbox"  :checked="newValue"  @change="handleChange" name="" />
      <slot name="icon">
        <i></i>
      </slot>
      <span class="checkbox-label" v-if="label">{{label}}</span>
    </label>
    <slot></slot>
  </div>

</template>

<script>

  export default {
    props: {
      type:String,
      value:{
        type:Boolean,
        default:false
      },
      label:String
    },
    watch: {
      value(newValue) {
        this.newValue = newValue
      }
    },
    created() {

    },
    data(){
      return{
        newValue:this.value
      }
    },
    methods:{
      handleChange() {
        this.$emit('input', event.target.checked)
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import "../../assets/styles/base/fn";

  $input-color: #CECECE;
  $input-active-color: #4D4D4D;
  $input-font-size: px2rem(32);


  .mycheck {
    position: relative;
    display: inline-block;
    /*height: 20px;*/
  }
  .mycheck input[type=checkbox] {
    visibility: hidden;
  }
  .mycheck label{
    position: relative;
  }
  .mycheck .check-icon {
    cursor: pointer;
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
    background: #f2f2f2;
    border-radius: 3px;
    border: 1px solid #d8d8d8;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
  }
  .mycheck label>i {
    opacity: 0;
    position: absolute;
    width: 9px;
    top: 7px;
    left: 5px;
    height: 5px;
    background: transparent;
    border: 2px solid #11A4D4;
    border-top: none;
    border-right: none;
    -webkit-transform: rotate(-45deg) ;
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg) ;
  }

  .checkbox-label{
      margin-left: px2rem(20);
      font-size: px2rem(26);
      color: #CECECE;
  }


  .mycheck input[type=checkbox]:checked +i {
    opacity: 1
  }


</style>
