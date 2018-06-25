<template>
  <div>
      <div class="toast" v-show="openToast">
        <transition >
          <div class="toast-box" v-show="openBox">
            <p>{{message}}</p>
          </div>
        </transition>
      </div>
  </div>
</template>
<script>
export default {
  name: "toast",
  created() {},
  data() {
    return {
      openBox: false,
      message: "",
      openToast: false
    };
  },
  methods: {
    open(message) {
      let vm = this;
      vm.message = message;
      vm.openToast = true;
      vm.openBox = false;
      setTimeout(() => {
        vm.openBox = true;
        setTimeout(() => {
          vm.openBox = false;
        }, 3300);
      }, 100);
    }
  }
};
</script>

<style  lang='stylus' scoped>
.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  z-index: 9999999999;
  max-width: 70%;

  .toast-box {
    background: rgba(0, 0, 0, 0.6);
    border-radius: 5px;
    padding:8px 10px
    line-height: 1.4;
    text-align: center;

    & > p {
      line-height: 1.43;
      color: #fff;
      font-size: 12px;
    }
  }
}
</style>
