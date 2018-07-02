<template>
  <div>
        <h1>home</h1>
          <marquee  direction='up'>
             <marquee-item v-for="(i,index) in articleList" :key="index" > {{i}}</marquee-item>
          </marquee>
  </div>
</template>

<script type="text/ecmascript-6">
  
  import  { marquee , marqueeItem }  from '@/components/marquee/index'

  export default {
    components:{
      marquee,
      marqueeItem
    },
    data(){
      return{
          articleList:[
          "测试走马灯1",
          "测试走马灯2",
          "测试走马灯3",
          "测试走马灯4",
          "测试走马灯5",
        ]
      }
    },
    created() {
      
      // this.$notify({
      //   content: "test $notify",
      //   btn: "close",
      //   autoClose: 2000
      // });
    
      toast('sdf')
    
    }
  }
</script>

<style scoped>
</style>

