<template>
  <div style="width:100%">
    <Cheader
      :showPrevBtn="showPrevBtn"
      :type='type'
      :showNextBtn="showNextBtn"
      @change="changeYearAndMonth"
      :year="year"
      :month="month"
    />
    <Cbody
      :type='type'
      :minDate="minDate"
      :maxDate="maxDate"
      :year="year"
      :month="month"
      @change="handleChange"
      @multipleChange="multipleChange"
    />
  </div>
</template>

<script>
import Cheader from "./header.vue";
import Cbody from "./body.vue";
import { findComponentsDownward } from "util/index";

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;

export default {
  components: {
    Cheader,
    Cbody
  },
  data() {
    return {
    };
  },
  created(){
  },
  props: {
    type:String,
    year: {
      type: [Number, String],
      default:year
    },
    month: {
      type: [Number, String],
      default:month
    },
    showPrevBtn: {
      type: Boolean,
      default: true
    },
    showNextBtn: {
      type: Boolean,
      default: true
    },
    maxDate: {
      type: Date
    },
    minDate: {
      type: Date
    }
  },
  watch: {
    value(data) {
  
    }
  },
  
  craeted() {
    // let obj = this.StringTimeParse(this.value);
    // if (obj) {
    //   let { year, month } = obj;
    //   this.year = year;
    //   this.month = month;
    // }
  },
  methods: {
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
    changeYearAndMonth(year, month) {
      this.$emit('rangeMonth',year,month)
      this.$emit('changeMonth',year,month)
    },
    handleChange(item) {
      this.$emit("change", item);
    },
    multipleChange(start, end,isClick) {
      this.$emit("changeRange", start, end,isClick);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
