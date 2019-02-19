<template>
  <div class="foodPanel-container">
    <div class="wrap">
      <scroll
        :list="list"
        ref="scroll"
        :pullUpLoad="pullUpLoad"
        :pullDownRefresh="pullDownRefresh"
        @pullingDown="pullingDown"
        @pullingUp="pullingUp"
      >
        <ul class="list-content">
          <li
            class="list-item"
            v-for="(i,index) in list"
            :key="index"
          >{{i}}</li>
        </ul>
      </scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import scroll from "../components/scroll/scroll.vue";

export default {
  created() {},
  data() {
    return {
      pullUpLoad: {
        threshold: 0
      },
      pullDownRefresh: {
        threshold: 90,
        stop: 40
      },
      index: 1,
      list: [1, 50, 1, 50, 1, 50, 1, 50, 1, 50],
      obj: {
        count: 0
      },
      inputValue: 1,
      inputValue1: 1
    };
  },
  components: {
    scroll
  },
  mounted() {},
  methods: {
    pullingUp() {
      let list = [13, 13, 15, 153, 132, 1];
      setTimeout(() => {
        this.index++;
        if (this.index >= 3) {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate();
          return;
        } else {
          this.list = this.list.concat(list);
        }
      }, 1000);
    },
    pullingDown(i) {
      let list = [13, 13];
      setTimeout(() => {
        this.list = this.list.concat(list);
      }, 1000);
    }
  }
};
</script>

<style scoped>
.foodPanel-container {
  height: 100%;
  width: 100%;
  /* border: 1px solid red */
}
.wrap {
  height: 100%;
  width: 100%;
  overflow: scroll;
}

.list-content {
  position: relative;
  z-index: 10;
  background: #fff;
}
.list-item {
  height: 60px;
  line-height: 60px;
  font-size: 18px;

  border-bottom: 1px solid #e5e5e5;
}
</style>

