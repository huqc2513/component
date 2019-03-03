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
        v-model="currenValue"
        @focus="open"
      />
      <transition name="transition-drop">
        <div v-show="isOpen" class="calendar-wrap" ref="CanledarBox">
          <div class="date-picker-range-wrap">
            <Calendar
              @rangeMonth="rangeMonthLeft"
              :month="leftDate.month"
              :year="leftDate.year"
              :maxDate="maxDate"
              :minDate="minDate"
              :showNextBtn="showNextBtn"
              class="left-picker"
              type="rangeDate"
              @changeRange="changeTime"
              :value="value"
            />
            <Calendar
              @rangeMonth="rangeMonthRight"
              :month="rightDate.month"
              :year="rightDate.year"
              :maxDate="maxDate"
              :minDate="minDate"
              :showPrevBtn="showPrevBtn"
              @changeRange="changeTime"
              :value="value"
              type="rangeDate"
            />
          </div>
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
  name: "i-datePickerRange",
  directives: { clickOutside },
  components: {
    Calendar
  },
  data() {
    return {
      stopMove: false,
      year: year,
      month: month,
      showPrevBtn: false,
      showNextBtn: false,
      currenValue: "",
      isOpen: false,
      valueObj: {},
      maxDate: null,
      minDate: null,
      leftDate: {
        year: year,
        month: month
      },
      rightDate: {
        year: year,
        month: month + 1
      }
    };
  },
  props: {
    value: {
      type: [Array]
      // validator: data => {
      //   if (isNaN(data) && !isNaN(Date.parse(data))) {
      //     return true;
      //   }
      // }
    }
  },
  watch: {
    value: {
      handler(arr) {
        if (arr.length >= 2) {
          let ret = [];
          this.stopMove=true

          let newArr = arr.map((e, i) => {
            if (typeof e == "string") {
              ret.push(e);
              return new Date(Date.parse(e));
            }
          });
          this.currenValue = ret.join(" ").replace(/\s/g, " 至 ");
          this.minDate = newArr[0];
          this.maxDate = newArr[1];
          
          // debugger
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.CanledarBox = this.$refs.CanledarBox;
  },
  created() {
    let obj = this.StringTimeParse(this.value);
    if (obj) {
      let { year, month } = obj;
      this.year = year;
      this.month = month;
    }
  },
  methods: {
    rangeMonthLeft(y, m) {
      const change = () => {
        this.leftDate.year = y;
        this.leftDate.month = m;
      };
      let right = this.rightDate;

      if (y == right.year && m == right.month - 1) {
        this.showNextBtn = false;
        return;
      } else {
        change();
      }
      this.showNextBtn = true;
    },
    rangeMonthRight(y, m) {
      const change = () => {
        this.rightDate.year = y;
        this.rightDate.month = m;
      };

      let left = this.leftDate;

      if (y == left.year && m == left.month + 1) {
        this.showPrevBtn = false;
        return;
      } else {
        change();
      }
      this.showPrevBtn = true;
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
      if (!this.IsStrDate(this.value)) {
        this.currenValue = null;
      }
      this.isOpen = false;
    },
    changeTime(min, max, isClick) {
      this.minDate = min;
      this.maxDate = max;

      if (min && max && isClick) {
        min = dateToString(min);
        max = dateToString(max);
        let ret = [min, max];
        // this.currenValue = `${min} 至 ${max} `;\
        this.currenValue = ret.join(" ").replace(/\s/g, " 至 ");
        this.$emit("input", ret);

        this.isOpen = false;
      } else if(min && max){
        // this.currenValue = null;
      }


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
  width: 500px;
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
    min-width: 600px;
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

.date-picker-range-wrap {
  // border: 1px solid red;
  display: flex;
  min-width: 600px;
  .left-picker {
    margin-right: 20px;
  }
}
</style>
