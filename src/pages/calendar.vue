<template>
  <div>
    <!-- <calendar :isSingle="true" :dataList="list" timeKey="onDate"></calendar> -->

    <newCalendar/>
  </div>
</template>

<script type="text/ecmascript-6">

  import calendar from "@/components/calendar/calendar.vue";
  import newCalendar from '@/components/calendar/newCalendar/DatePicker.vue'

  export default {
    components: {
      calendar,
      newCalendar
    },
    data() {
      return {
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
</style>

