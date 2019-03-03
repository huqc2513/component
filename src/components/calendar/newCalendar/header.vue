<template>
  <div class="iCalendar-header">
    <IconFont
      v-show='showPrevBtn && type=="date"'
      class="icon-wrap"
      name="iconjiantouarrowheads3-copy"
      @click="prveYear"
    />
    <IconFont v-show='showPrevBtn' class="icon-wrap" name="iconjiantou-copy" @click="prve" />
    <div class="title">
      <div class="year">{{ currentYear }}年</div>
      <div class="month">{{ currentMonth }}月</div>
    </div>
    <IconFont  v-show='showNextBtn' class="icon-wrap" name="iconjiantou" @click="next" />
    <IconFont
      v-show='showNextBtn  && type=="date"'
      class="icon-wrap"
      name="iconjiantouarrowheads3"
      @click="nextYear"
    />
  </div>
</template>

<script>
import format from "../util";
import IconFont from "../../iconFont";

export default {
  components: {
    IconFont
  },
  data() {
    return {
      currentYear: this.year,
      currentMonth: this.month
    };
  },
  created(){
  },
  props: {
    type:{
      type:String,
      default:'date'
    },
    year: {
      type: [Number, String],
      default: 2019
    },
    month: {
      type: [Number, String],
      default: 2
    },
    showPrevBtn: {
      type: Boolean,
      default: true
    },
    showNextBtn: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    year(val) {
      this.currentYear = val;
    },
    month(val) {
      this.currentMonth = val;
    }
  },
  methods: {
    prveYear() {
      this.currentYear -= 1;
      this.$emit("change", this.currentYear, this.currentMonth);
    },
    nextYear() {
      this.currentYear += 1;
      this.$emit("change", this.currentYear, this.currentMonth);
    },
    prve() {
      if (this.currentMonth <= 1) {
        --this.currentYear;
        this.currentMonth = 12;
      } else {
        --this.currentMonth;
      }
      this.$emit("change", this.currentYear, this.currentMonth);
    },
    next() {
      if (this.currentMonth >= 12) {
        ++this.currentYear;
        this.currentMonth = 1;
      } else {
        ++this.currentMonth;
      }
      this.$emit("change", this.currentYear, this.currentMonth);
    }
  }
};
</script>

<style lang="scss" scoped>
.iCalendar-header {
  display: flex;
  height: 50px;
  padding: 10px;
  min-width: 200px;
  max-width: 400px;
  background: #fff;
  align-items: center;
  .title {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    & > div {
      font-weight: bold;
      padding: 0 3px;
      cursor: pointer;
    }
    & > div:hover {
      color: rgb(64, 158, 255);
    }
  }
  .icon-wrap {
    padding: 0 5px;
  }
}
</style>
