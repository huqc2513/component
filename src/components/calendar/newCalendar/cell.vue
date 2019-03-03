<template>
  <div class="item-wrap item-date" :class="cellCalss">
    <em> {{ item.day }} </em>
  </div>
</template>

<script type="text/ecmascript-6">
import { dateToString} from '../date.js' 
export default {
  name: "i-calendar-cell",
  props: {
    item: {
      type: [Object],
      required: true
    },
    list: {
      type: [Array]
    },
    startTime: {
      type: [Date]
    },
    endTime: {
      type: [Date],
      default: null
    },
    month: {
      type: Number
    }
  },
  data() {
    return {
      isCheck: false,
      cellCalss: ""
    };
  },
  watch: {
    list: {
      handler(arr) {
        this.getClass(this.startTime, this.endTime);
      },
      deep: true
    },
    startTime: {
      handler(val) {
        this.getClass(val, this.endTime);
      },
      deep: true,
         immediate:true,
    },
    endTime: {
      handler(val) {
        this.getClass(this.startTime, val);
      },
      deep: true
    }
  },
  updated() {
    this.getClass(this.startTime, this.endTime);
  },
  created() {
    this.getClass(this.startTime, this.endTime);
  },
  methods: {
    getClass(startTime, endTime) {
      let ret = [];
      let i = this.item;

    if (i.disabled) {
        ret.push("disabled");
      }
      if (this.month !== i.month) {
        ret.push("currentMonth");
      }

      if (startTime && endTime) {
        if (endTime < startTime) {
          let tmp = startTime;
          startTime = endTime;
          endTime = tmp;
        }
      }

      if (
        (startTime && startTime == i.date) ||
        (endTime && endTime === i.date)
      ) {
        ret.push("clickActive");
      }


      if (dateToString(startTime) == i.time) {
        ret.push("startDate");
      }

      if (dateToString(endTime)  == i.time) {
        ret.push("endDate");
      }
      if (i.inRange && i.month === this.month) {
        ret.push("in-range");
      }
      this.cellCalss = ret.join(" ");

      return ret.join(" ");
    }
  }
};
</script>

<style lang="scss" scoped>
$maxWidth: 768px;

.in-range {
  background-color: #f2f6fc !important;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 0;
}
.disabled {
  color: #c2c2c2 !important;
}

.currentMonth {
  color: #c0c4cc !important;
}


.startDate {
  border-radius: 40% 0 0 40%;
    display: flex;
  align-items: center;
  justify-content: center;
  em {
    background: #2d8cf0 !important;
    color: #fff !important;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    line-height: 30px;
  }
}

.endDate {
  border-radius: 0 40% 40% 0;
  display: flex;
  align-items: center;
  justify-content: center;
  em {
    background: #2d8cf0 !important;
    color: #fff !important;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    line-height: 30px;
  }
}

.item-wrap {
  display: flex;
  align-items: center;
  position: relative;
  /* height: 100%; */
  width: 100%;
  height: 35px;
  justify-content: center;

  .item-date {
    color: #444444;
    width: 100%;

    em {
      height: 30px;
      width: 30px;
      border-radius: 3px;
    }
  }
}

.clickActive {
  display: flex;
  align-items: center;
  justify-content: center;
  em {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff !important;
    background: #2d8cf0 !important;
    color: #fff !important;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    line-height: 30px;
  }
}
</style>

