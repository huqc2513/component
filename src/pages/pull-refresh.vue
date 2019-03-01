<template>
  <div>
    <PullRefresh @pullingDown="pullingDown" :list="list">
      <ul class="list">
        <li v-for="(item, index) in list" :key="index">{{ index }}</li>
      </ul>
    </PullRefresh>

  </div>
</template>

<script type="text/ecmascript-6">
import PullRefresh from "@/components/pull-refresh/index";

import Circular from '@/components/pull-refresh/circular'


export default {
  components: {
    PullRefresh,
    Circular
  },
  data() {
    return {
      flag: false,
      list: [
        1,
        2,
        23,
        1,
        2,
        23,
      ]
    };
  },
  created() {
    this.isPhone();
  },
  methods:{
    isPhone(){
      if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          console.log('iPhone')
      } else {
               console.log('pc')
      }
    },
    pullingDown(i) {
      let list = [13, 13,13, 13,13, 13,13, 13,13, 13,];
      setTimeout(() => {
        this.list = this.list.concat(list);
      }, 1000);
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.list {
  display: block;

  li {
    height: 40px;
  }
}
</style>

