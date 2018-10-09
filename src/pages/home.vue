<template>

  <div>
        <h1>home</h1>
          <marquee  direction='up'>
              <marquee-item v-for="(i,index) in articleList" :key="index" > {{i}}</marquee-item> 
          </marquee>

          <switchBox v-model="flag">
          </switchBox> 

        <div class='btn' v-waves>按钮 </div>

          
  </div>

</template>

<script type="text/ecmascript-6">
  
   import  { marquee, marqueeItem }  from '@/components/marquee/index'

   import switchBox from  '@/components/switch/switch'
   import popup from '@/components/popup/popup'
   import Waves from '@/directives/waves.js'

  export default {
    components:{
      marquee,
      marqueeItem,
       switchBox,
       popup
    },
    directives: { Waves },
    data(){
      return{
          flag:false,
          articleList:[
          "测试走马灯1",
          "测试走马灯2",
          "测试走马灯3",
          "测试走马灯4",
          "测试走马灯5",
        ]
      }
    },
    credsted() {
    
      toast('sdf')
    
    }
  }
</script>

<style scoped>

.btn{
  margin-top: 100px;
  width:200px;
  height: 35px;
  line-height: 35px;
  border-radius: 5px;
  border: 1px solid #ededed;
  text-align: center;
  margin: auto
}
</style>

