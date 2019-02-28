<template>
  <div>
    <Cheader @change="changeYearAndMonth" :year="year" :month="month" />
    <Cbody :year="year" :month="month" @change="handleChange" />
  </div>
</template>

<script>
import Cheader from "./header.vue";
import Cbody from "./body.vue";
import { findComponentsDownward } from "util/index";

export default {
  components: {
    Cheader,
    Cbody
  },
  data() {
    return {
      year: 2019,
      month: 4
    };
  },
  watch: {
    value(data) {
      data = this.StringTimeParse(data);
        if(data){
          let { year ,month } = data
          this.year = year
          this.month = month
        }  
    }
  },
  // mounted(){
  //   this.I_calendar = findComponentsDownward(this,'i-calendar')
  // },
  craeted(){
       let obj = this.StringTimeParse(this.value);
        if(obj){
          let { year ,month } = obj
          this.year = year
          this.month = month
        }  
  },
  methods: {
    StringTimeParse(data) {
        data = Date.parse(data);
        if (!isNaN(data)) {
          let obj = new Date(data);
          return {
            month:obj.getMonth()+1,
            year:obj.getFullYear()
          }
        }
    },
    changeYearAndMonth(year, month) {
      this.month = month;
      this.year = year;
    },
    handleChange(item) {
      this.$emit("change", item);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
