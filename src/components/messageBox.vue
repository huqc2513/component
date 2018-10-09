<template>
  <transition name="message-fade">
    <div class="popup-message-box" @touchmove.prevent="true" v-show="openMessageBox">
      <div class="mask"></div>
      <div class="message-box">
        <div v-html="obj.message" class="content"></div>
        <div class="message-box-btn">
          <button v-if="obj.showCancelButton" class="cancel" @click="submit('cancel')">{{obj.cancelButtonText}}</button>
          <button v-if="obj.showConfirmButton" class="confirm" @click="submit('confirm')">{{obj.confirmButtonText}}

          </button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  created() {},
  data() {
    return {
      openMessageBox: false,
      openBox: false,
      show: false, // 是否显示模态框
      resolve: "",
      reject: "",
      promise: "", // 保存promise对象,
      // 数据对象
      obj: {},
      defaultObj: {
        message: "",
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonDisabled: false
      }
    };
  },
  methods: {
    /**
     * 确定,将promise断定为完成态
     */
    submit(type) {
      this.close();
      this.resolve(type);
    },
    /**
     * 关闭,将promise断定为reject状态
     * @param type {number} 关闭的方式 0表示关闭按钮关闭,1表示取消按钮关闭
     */
    close() {
      this.openMessageBox = false;
    },
    /**
     * 显示confirm弹出,并创建promise对象
     * @returns {Promise}
     */
    open(obj) {
      Object.assign(this.obj, this.defaultObj, obj);
      this.openMessageBox = true;
      setTimeout(() => {
        this.openBox = true;
      }, 100);
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
      return this.promise; //返回promise对象,给父级组件调用
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/styles/base/fn";

.popup-message-box {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10000000000;
  display: flex;
  justify-content: center;
  align-items: center;
  .message-box {
    transition: all 0.3s;
    background: #fff;
    border-radius: px2rem(8);
    /*box-shadow: ;*/
    overflow: hidden;
    width: px2rem(600);
    & > div:nth-child(1) {
      min-height: px2rem(212);
      font-size: $fontSize_titleBig;
      padding: px2rem(45) px2rem(60);
      line-height: 1.5;
      color: $textColor_sub;
      word-break: break-all;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .message-box-btn {
      /*background: #DFDFDF;*/
      border-top: 1px solid #dfdfdf;
      display: flex;
      height: px2rem(100);
      font-size: $fontSize_title;
      & > button {
        width: 100%;
        padding: 0 px2rem(20);
        text-align: center;
        &:nth-child(2) {
          border-left: 1px solid #dfdfdf;
        }
        &:active {
          background: #f0f0f0;
        }
      }
      .confirm {
        font-family: PingFangSC-Regular;
        color: #d36c2f;
        font-size: 16px;
      }
      .cancel {
        font-size: 16px;
        color: #666666;
        font-family: PingFangSC-Regular;
      }
    }
  }
}

.mask {
  transition: all 0.3s;
  @extend %maskBg;
  z-index: -1;
}

.message-fade-enter {
  .mask {
    opacity: 0;
  }
  .message-box {
    transform: scale(0.8);
  }
}

.message-fade-leave {
  .mask {
    opacity: 0;
  }
  .message-box {
    transform: scale(0.9);
  }
}

.content {
  font-size: 16px !important;
  /*color: #A6A6A6 !important;*/
}
</style>
