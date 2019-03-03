<template>
  <div>
    <div class="current-month">
      <p class="weekDay_text">
        <span>日</span>
        <span>一</span>
        <span>二</span>
        <span>三</span>
        <span>四</span>
        <span>五</span>
        <span>六</span>
      </p>

      <div>
        <div class="date-list-wrapper" @mousemove="handleMouseMove">
          <ul v-for="(items, index) in list" :key="index">
            <li
              v-for="(item, idx) in items"
              :key="idx"
              @click="handleClick(item, index, idx)"
            >
              <Cell
                :data-rowIndex="index"
                :data-columnIndex="idx"
                :list="list"
                :item="item"
                :startTime="startTime"
                :endTime="endTime"
                :month="month"
                :chooseDate="chooseDate"
              ></Cell>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { dateToString, convertDateFromString, findIndex } from "../date.js";
import { getData } from "./date.js";
import Cell from "./cell.vue";

import { findComponentUpward } from "util/index";


export default {
  name: "i-calendar",
  components: {
    Cell
  },
  created() {
      this.initData(this.year, this.month);
      this.calculateRange();
  },
  mounted(){
      this.datePickerRange =  findComponentUpward(this,'i-datePickerRange')
      // console.error('min',dateToString(this.minDate))
      // console.error('starttime',dateToString(this.startTime))
  },
  watch: {
    year(val) {
      this.initData(val, this.month);
    },
    month(val) {
      this.initData(this.year, val);
    },
    maxDate: {
      handler(val) {
        this.endTime = val;
         this.calculateRange();
      },
      deep: true,
      immediate:true,
    },
    minDate: {
      handler(val) {
        this.startTime = val;
        console.log(val)
         this.calculateRange();
      },
      deep: true,
      immediate:true,
    },
    startTime: {
      handler(val) {
        this.calculateRange();
        this.proxyEmit(val,this.endTime)
      },
      deep: true
    },
    endTime: {
      handler(val) {
        // console.log(dateToString(val),dateToString(this.startTime))
        this.calculateRange();
        this.proxyEmit(this.startTime,val)
      },
      deep: true
    }
  },
  props: {  
    type:String,
    maxDate: {
      type: Date,
      defalut: null
    },
    minDate: {
      type: Date,
    },
    isMultiple: {
      type: Boolean,
      default: true
    },
    year: {
      type: [Number],
      default: null
    },
    month: {
      type: [Number],
      default: null
    }
  },
  data() {
    return {
      list: [],
      startTime: this.minDate,
      endTime: this.maxDate,
      chooseDate: [],
      datePickerRange:null
    };
  },
  update() {
    this.startTime = this.minDate;
    this.endTime = this.maxDate;
  },
  methods: {
    calculateRange(obj) {
      let startTime = this.startTime;
      let endTime = this.endTime;
      let rows = this.list;

      if (startTime && endTime) {
        if (startTime > endTime) {
          let tmp = startTime;
          startTime = endTime;
          endTime = tmp;
        }

        rows.forEach((row, index) => {
          row.forEach((r, idx) => {

            if (startTime <= r.date && r.date <=endTime) {

              rows[index][idx].inRange = true;
              this.list[index].splice(idx, 1, rows[index][idx]);
            } else {
              rows[index][idx].inRange = false;
              this.list[index].splice(idx, 1, rows[index][idx]);
            }
          });
        });
      } else {
        rows.forEach((row, index) => {
          row.forEach((r, idx) => {
            rows[index][idx].inRange = false;
          });
        });
      }
    },
    proxyEmit(min, max, isClickEvent = false) {
      if(min!==max || (!max || !min)){
        this.$emit("multipleChange", min, max,isClickEvent);
      }
    },
    handleClick(item, index, idx) {
      if (this.type=='rangeDate') {
        let endTime = this.endTime,
          startTime = this.startTime;

        if (!startTime && !endTime) {
          startTime = item.date;
        } else if (startTime && !endTime) {
          endTime = item.date;

          if (endTime < startTime) {
            let tmp = startTime;
            startTime = endTime;
            endTime = tmp;
          }
          this.proxyEmit(startTime, endTime, true);
        } 
        
        if (startTime && endTime) {
          if( this.datePickerRange.stopMove===false){
              this.datePickerRange.stopMove = true
              this.proxyEmit(startTime, endTime, true);
          }else{
              this.datePickerRange.stopMove = false
              this.startTime = null;
              this.endTime = null;
              this.proxyEmit(null, null, true);
          }

          return;
        }


        this.proxyEmit(startTime, endTime, true);

        this.startTime = startTime;
        this.endTime = endTime;
      } else {
          this.startTime = item.date
          this.$emit('change',item.date)
      }
    },
    initData(y, m) {
      let { year, month, days } = getData(y, m);
      this.list = this.splitArr(days, 7);
    },
    splitArr(arr, nub) {
      let result = [];
      for (let i = 0, len = arr.length; i < len; i += nub) {
        result.push(arr.slice(i, i + nub));
      }
      return result;
    },
    getDateOfCell(row, column) {
      return this.list[row][column];
    },
    reversal(cell) {
      if (this.startTime && this.endTime) {
        if (
          this.endTime < this.startTime &&
          this.endTime != cell.date
        ) {
          let tmp = this.startTime;
          this.startTime = this.endTime;
          this.endTime = tmp;
        }
      }
    },
    handleMouseMove() {
      if(this.type !=='rangeDate'){
        return
      }
      let target = event.target;
      if (target.tagName === "EM") {
        target = target.parentNode;
      }
      const row = target.dataset.rowindex;
      const column = target.dataset.columnindex;

      if (row !== undefined || column !== undefined) {
        let cell = this.getDateOfCell(row, column);

        const stopMove = this.datePickerRange.stopMove

        if (this.startTime && cell && !stopMove) {
            if (this.startTime !== cell.date) {
             this.endTime = cell.date;
            } 
          // if (this.startTime.date < cell.date) {
          //   this.endTime = cell;
          // } else if (this.startTime.date > cell.date) {
          //   this.endTime = cell;
          // }
          this.reversal(cell);
        }


      }
    }
  }
};
</script>

<style lang="scss" scoped>
$maxWidth: 768px;

.disabled {
  color: #c2c2c2 !important;
}

.currentMonth {
  color: #c0c4cc !important;
}

.header-btn {
  height: 50px;
  display: flex;
  background: #fff;
  justify-content: center;
  align-items: center;
  margin-bottom: px2rem(40);

  .title {
    height: 20px;
    font-family: PingFangSC-Regular;
    font-size: px2rem(30);
    color: #333333;
    margin: 0 px2rem(12);
  }

  ul {
    display: flex;
    /*border-bottom: 1px solid #e2e2e2 ;*/
    li {
      display: inline-flex;
      flex: 1;
      height: 30px;
      line-height: 30px;
      text-align: center;
      justify-content: center;
      font-size: px2rem(30);
      color: #666666;
      border-bottom: 1px solid #e2e2e2;
    }
    .active-tab {
      font-size: px2rem(30);
      color: #222222;
      text-align: center;
      border-bottom: 1px solid #3f96ff !important;
    }
  }
}

.item-wrap {
  position: relative;
  height: 100%;
  width: 100%;
  padding: px2rem(10) 0;
  .item-time {
    font-size: px2rem(26);
    color: #444444;
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .item-price {
    position: absolute;
    bottom: px2rem(5);
    left: 50%;
    color: #666666;
    font-size: px2rem(20);
    transform: translateX(-50%) scale(0.8);
  }
}

.btn {
  display: flex;
  p {
    flex: 1;
    text-align: center;
  }
}

.foodPanel-container {
  height: 100%;
  width: 100%;
}

.chooseBg {
  background: #538ef2;
  color: #fff;
  border-radius: px2rem(2);
}

.calendar_box {
  bottom: 0;
  left: 0;
  width: 100%;
  padding-bottom: px2rem(100);
}

.time_commit {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  max-width: $maxWidth;
  height: px2rem(90);
  /*margin:px2rem(20) px2rem(30);*/
  text-align: center;
  line-height: px2rem(90);
  background: #538ef2;
  color: #fff;
}

.current-month,
.next-month {
  background: #fff;
}

h3 {
  text-align: center;
  height: px2rem(88);
  line-height: px2rem(88);
  background: #ecedec;
  color: #292524;
}

h4 {
  margin: px2rem(20) 0;
  text-align: center;
  color: #292524;
}

.next-month {
  padding: px2rem(44) 0;
  margin-top: px2rem(30);
}

.gray {
  color: #aaabaa;
}

.weekDay_text {
  display: flex;
  justify-content: space-around;

  border-bottom: 1px solid #e4e7ed;
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
  padding: 10px 0;
  color: #606266;
  line-height: px2rem(88);
  padding: 0 px2rem(20);
  span {
    flex: 1;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: px2rem(30);
    color: #666666;
  }
}

.date-list-wrapper {
  padding: px2rem(20);
  width: 100%;
}

ul {
  display: flex;
  width: 100%;
  li {
    // min-height: px2rem(100);
    // height:px2rem(100);
    min-height: 50px;
    width: px2rem(100);
    flex: 1;
    text-align: center;
    .base-color {
      color: #d67034;
    }
    color: #656665;
    font-size: px2rem(24);
  }
}

.show {
  visibility: hidden;
}

.icon-wrap {
  display: inline-block;
  width: 20px;
  height: 20px;
  text-align: center;
}

.remainder {
  width: 100%;
  color: #f36a05;
  position: absolute;
  top: 3px;
  left: 50%;
  -webkit-transform: translateX(-50%) scale(0.8);
  transform: translateX(-50%) scale(0.7);
}

.singleClickActive {
  background: #3f96ff;
  border-radius: 10px 4px 10px 4px;
  color: #fff !important;
}

.white {
  color: #fff !important;
}

/*开始结束*/
.start-active {
  background: #3f96ff;
  border-radius: 10px 0 0 4px;
  color: #fff !important;
}

/*开始结束*/
.end-active {
  background: #3f96ff;
  border-radius: 0 4px 10px 0;
  color: #fff !important;
}

/*中间部分*/
.active {
  background: rgba(62, 198, 242, 0.2);
  color: #fff !important;
  /*border-radius: 5px;*/
  /*background: #538FF3;*/
}
</style>

