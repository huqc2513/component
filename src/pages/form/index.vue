<template>
  <div class="box">
    <div class="row-title">Checkbox</div>

    <div class="content">
      <p class="title">Checkbox</p>
      <Checkbox v-model="value" label="毒液" />
    </div>

    <div class="content">
      <p class="title">CheckboxGroup</p>
      <CheckboxGroup v-model="arr">
        <Checkbox label="1" />
        <Checkbox label="2" />
        <Checkbox label="3" />
      </CheckboxGroup>
    </div>
    <div class="val">{{ arr }}</div>

    <div class="row-title">switch</div>
    <div class="content">
      <Iswitch v-model="switchFlag"> </Iswitch>
    </div>
    <div class="val">{{ switchFlag }}</div>

    <div class="row-title">select</div>
    <div class="content">
      <Select v-model="value1" @onChange="onChange" placeholder="请选择">
        <Option value="1">测试1</Option>
        <Option value="2">测试2</Option>
        <Option value="3">测试3</Option>
        <Option value="4">测试4</Option>
        <Option value="11">测试1</Option>
        <Option value="22">测试2</Option>
        <Option value="33">测试3</Option>
        <Option value="44">测试4</Option>
      </Select>
    </div>
    <div class="val">{{ value1 }}</div>

    <div class="row-title">DatePicker</div>
    <div class="content">
      <DatePicker v-model="start"></DatePicker>
    </div>
    <div class="val">{{ start }}</div>

    <div class="row-title">DatePickerRange</div>
    <div class="content">
      <DatePickerRange v-model="arr1"></DatePickerRange>
    </div>
    <div class="val">{{ arr1 }}</div>
  </div>
</template>






<script type="text/ecmascript-6">
import {
  Checkbox,
  CheckboxGroup,
  Iswitch,
  Select,
  Options as Option
} from "@/components/form/index.js";

import DatePicker from "@/components/calendar/newCalendar/DatePicker.vue";
import DatePickerRange from "@/components/calendar/newCalendar/datePickerRange.vue";

import Emitter from "util/base.js";

export default {
  methods: {
    onChange(val) {
      console.log(val);
    }
  },
  data() {
    return {
      value1: "1",
      arr: ["1"],
      arr1: ["2019-03-1", "2019-03-10"],
      value: false,
      switchFlag: false,
      start: "2019-03-01"
    };
  },
  mixins: [Emitter],
  components: {
    Checkbox,
    CheckboxGroup,
    Iswitch,
    Select,
    Option,
    DatePicker,
    DatePickerRange
  }
};
</script>

<style scoped lang="less" rel="stylesheet/stylus">
.content {
  text-align: left;
  margin: 10px 40px;

  .title {
    padding-bottom: 5px;
    font-size: 16px;
  }
}

.val {
  margin: 5px 40px;
}

.box {
  .row-title {
    display: block;
    margin: 10px 20px;
    padding: 0 10px;
    text-align: left;
    height: 40px;
    line-height: 40px;
    font-weight: bold;
    position: relative;

    &::before {
      display: inline-block;
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      height: 40%;
      width: 2px;
      background: #2d8cf0;
    }
  }
}
</style>

