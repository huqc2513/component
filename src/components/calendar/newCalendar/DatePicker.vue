<template>
  <div
    v-click-outside.capture="onClickOutside"
    v-click-outside:mousedown.capture="onClickOutside"
  >
    <div class="i-picker-wrap">
      <input
        type="text"
        class="i-input-wrap"
        placeholder="请选择日期"
        @focus="open"
        v-model="currenValue"
      />
      <transition name="transition-drop">
        <div v-show="isOpen" class="calendar-wrap" ref="CanledarBox">
          <Calendar
            :year="year"
            :minDate="minDate"
            :month="month"
            @change="changeTime"
            @changeMonth="changeMonth"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Calendar from "./index.vue";

import { directive as clickOutside } from "v-click-outside-x";
import { dateToString } from "../date.js";

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;

export default {
  directives: { clickOutside },
  components: {
    Calendar
  },
  data() {
    return {
      year: year,
      month: month,
      currenValue: this.value,
      isOpen: false,
      minDate:null,
      valueObj: {}
    };
  },
  watch: {
    value(e) {
      this.parseValue(e)
    }
  },
  props: {
    value: {
      type: String
    }
  },
  mounted() {
    this.CanledarBox = this.$refs.CanledarBox;
  },
  created() {
    this.parseValue(this.value)
  },
  methods: {
    parseValue(val){
      if (typeof val == "string") {
        this.minDate = new Date(Date.parse(val));
      }
    },
    StringTimeParse(data) {
      data = Date.parse(data);
      if (!isNaN(data)) {
        let obj = new Date(data);
        return {
          month: obj.getMonth() + 1,
          year: obj.getFullYear()
        };
      }
    },
    open() {
      this.isOpen = true;
    },
    onClickOutside() {
      if (!this.minDate instanceof Date ){
        this.currenValue = null;
      } else {
        this.currenValue = dateToString(this.minDate)
      }
      this.isOpen = false;
    },
    changeTime(item) {
      item = dateToString(item);
      this.minDate = item
      this.currenValue = item;
      this.valueObj = item;
      this.$emit("input", this.currenValue);
      this.isOpen = false;
    },
    changeMonth(y, m) {
      this.year = y;
      this.month = m;
    },
    IsStrDate(data) {
      if (isNaN(data) && !isNaN(Date.parse(data))) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../common/comon.less";

.i-picker-wrap {
  width: 300px;
  height: 40px;
  position: relative;
  .i-input-wrap {
    display: flex;
    align-items: center;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 100%;
    line-height: 100%;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
  }
  .calendar-wrap {
    width: 100%;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    position: absolute;
    padding: 5px 0;
    margin-top: 5px;
    border-radius: 3px;
    z-index: 9999;
  }
}

.i-picker-wrap:hover {
  border-color: #5cadff;
}
</style>
