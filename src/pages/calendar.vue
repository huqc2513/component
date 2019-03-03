<template>
  <div class='box'>
    <DatePicker></DatePicker>
      <div style='margin:20px 0'></div>
    <DatePickerRange v-model="arr1"/>
  </div>
</template>

<script type="text/ecmascript-6">

  import DatePicker from '@/components/calendar/newCalendar/DatePicker.vue'
  import DatePickerRange from '@/components/calendar/newCalendar/datePickerRange.vue'

  export default {
    components: {
      DatePicker,
      DatePickerRange
    },
    data() {
      return {
        arr1:['2019-03-1','2019-03-10'],
        list: [
          {onDate: "2018-10-10", price: "98"},
          {onDate: "2018-10-11", price: "98"},
          {onDate: "2018-10-15", price: "98"}
        ]
      };
    }
  };
</script>

<style scoped>
.box{
  width: 100%;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>

