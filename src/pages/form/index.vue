<template>
  <div>

    <div class='row-title'>Checkbox </div>
    <div class='row'>
      <p class='title'> Checkbox</p>
      <Checkbox
        v-model='value'
        label='毒液'
      />
    </div>
    <div> {{value}}</div>

    <div class='row'>
      <p class='title'>CheckboxGroup </p>
      <CheckboxGroup v-model="arr">
        <Checkbox label='1' />
        <Checkbox label='2' />
        <Checkbox label='3' />
      </CheckboxGroup>
    </div>
    <div> {{arr}}</div>

    <div class='row-title'>switch
      <Iswitch v-model="switchFlag">
      </Iswitch>
    </div>
    <div> {{switchFlag}}</div>

  </div>
</template>

<script type="text/ecmascript-6">
import { Checkbox, CheckboxGroup, Iswitch } from "@/components/form/index.js";
import switchBox from "@/components/switch/switch";

import Emitter from "util/base.js";

export default {
  data() {
    return {
      arr: ["1"],
      value: false,
      switchFlag: false
    };
  },
  mixins: [Emitter],
  components: {
    Checkbox,
    CheckboxGroup,
    Iswitch
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.row-title {
  display: block;
  margin: 0 20px;
  padding: 0 10px;
  text-align: left;
  height: 40px;
  line-height: 40px;
  font-weight: bold;
  position: relative;

  &::after {
    display: inline-block;
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 40%;
    width: 2px;
    background: #2d8cf0;
  }
}

.row {
  text-align: left;
  padding: 10px 40px;

  .title {
    padding-bottom: 5px;
    font-size: 16px;
  }
}
</style>

