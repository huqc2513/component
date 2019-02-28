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
        <div class="date-list-wrapper">
          <ul v-for="(items, index) in list" :key="index">
            <li
              v-for="(item, idx) in items"
              :key="idx"
              @click="clickDay(item, index, idx)"
              :class="[
                {
                  active: item.active,
                  'start-active': startTime && item.StartActive == true,
                  'end-active': endTime && item.EndActive == true,
                  singleClickActive: item.singleClickActive
                }
              ]"
            >
              <div class="item-wrap">
                <p
                  :class="[
                    'item-time',
                    {
                      disabled: item.disabled,
                      currentMonth: item.month != month,
                      clickDay: item.isClick
                    }
                  ]"
                >
                  {{ item.day }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  dateToString,
  initTime,
  convertDateFromString,
  findIndex
} from "../date.js";

export default {
  name: "i-calendar",
  created() {
    this.$nextTick(() => {
        //被点击过的时间
      this.clickcacheObj = {};
      this.initData(this.year, this.month);
    });
  
  },
  watch: {
    year(val) {
      this.initData(val, this.month);
    },
    month(val) {
      this.initData(this.year, val);
    }
  },
  props: {
    isMultiple: {
      type: Boolean,
      default: false
    },
    click: {
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
      activeTab: 0,
      selectList: [],
      list: [],
      startTime: null,
      endTime: null,
      monthList: [],
      arrangeArr: []
    };
  },
  components: {},
  methods: {
    clickDay(item, index, idx) {
  
      if (this.isMultiple) {
      
      } else {

        if(item.isClick){
          return
        }
        item.isClick = true
        //item.isClick = !item.isClick;
       let clickItem = item;

        let cache = this.clickcacheObj;
        let key = clickItem.time;
        let arr = Object.keys(cache);
        const pushCacheArr = (item, index, idx) => {
          this.clickcacheObj[item.time] = {
            item,
            index,
            idx
          };
        };

        if (arr.length == 1) {
          if (cache[key] == key) {
            this.list[index].splice(idx, 1, clickItem);
            this.clickcacheObj = {};
            pushCacheArr(clickItem, index, idx);
          } else {
            let oldClickItem = cache[arr[0]];
            let { index, idx, item } = oldClickItem;
            item.isClick = false;
            this.clickcacheObj = {};
            pushCacheArr(clickItem, index, idx);
            this.list[index].splice(idx, 1, item);
          }
        } else if (arr.length == 0) {
          pushCacheArr(item, index, idx);
          this.list[index].splice(idx, 1, item);
        }
      }
      this.$emit("change", item);
    },

    initData(y, m) {
      let { year, month, days } = initTime(y, m);
      
      const replaceDays = ()=>{

        Object.keys(this.clickcacheObj).forEach(e=>{
            let { item:cacheObj} =  this.clickcacheObj[e]
            days.forEach((o,index)=>{
                if(o.time == cacheObj.time){
                    days[index]  = cacheObj
                } 
            })
          })
      }

     replaceDays()

      this.$nextTick(() => {
        setTimeout(() => {
          this.list = this.split(days, 7);
        }, 20);
      });
    },
    split(arr, nub) {
      let result = [];
      for (let i = 0, len = arr.length; i < len; i += nub) {
        result.push(arr.slice(i, i + nub));
      }
      return result;
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
.clickDay {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff !important;
  background-color: #409eff !important;
  border-radius: 50%;
  width: 28px !important;
  height: 28px !important;
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

