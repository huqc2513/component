<template>
  <div class="pull-refresh-container">
    <slot name="pull">
      <div class="pull-refresh-wrap" ref="pullRefreshContent">
        <div class="pull-icon-box">
          <IconFont
            class="rotate0"
            :class="{ rotate90: pullStatus === 1 }"
            v-show="pullStatus !== 3 && pullStatus !== 4"
            :name="PullIcon"
          ></IconFont>
          <Loading class='loading' title="" v-show="pullStatus === 3"></Loading>
        </div>
        <IconFont
          class="finish-icon"
          v-show="pullStatus === 4"
          name="iconwancheng"
        ></IconFont>
        <span class="pull-status-text">{{ pullText }}</span>
      </div>
    </slot>
    <div
      class="pull-content"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
      ref="pullContent"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import IconFont from "./iconFont.vue";
import Loading from "../loading/loading";

const pull_status_map = {
  0: "下拉刷新",
  1: "立即释放刷新",
  3: "刷新中...",
  4: "刷新成功"
};

const on = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent("on" + event, handler);
      }
    };
  }
})();

export default {
  data: () => {
    return {
      PullIcon: "iconiconxlsx",
      pullStatus: 0,
      startFlag: false,
      _isScroller: false
    };
  },
  props: {
    pageY: {
      type: [String, Number],
      default: 80
    },
    timer: {
      type: [String, Number],
      default: 1000
    },
    list: {
      type: Array,
      required: true
    }
  },
  computed: {
    pullText() {
      let text = pull_status_map[this.pullStatus];
      return text || "下拉刷新";
    }
  },
  components: {
    IconFont,
    Loading
  },
  created() {
    this.touch = {};
  },
  mounted() {
    this.$nextTick(() => {
      this.$pullRefreshContentEl = this.$refs.pullRefreshContent;
      this.$pullContentEl = this.$refs.pullContent;
      this.prevent(this.$pullContentEl);
    });
  },
  watch: {
    list: {
      handler(curVal, oldVal) {
        setTimeout(() => {
          this.forceUpdate(true);
        }, this.refreshDelay);
      },
      deep: true
    }
  },
  methods: {
    touchStart(e) {
      if (this.startFlag == true) {
        return;
      }

      const touch = e.touches[0];
      this.touch.pageX = touch.pageX;
      this.touch.pageY = touch.pageY;
    },
    touchMove(e) {
      this.startFlag = true;
      const touch = e.touches[0];
      if (touch.pageY - this.touch.pageY >= 0 === false) {
        return;
      }
      this.$pullRefreshContentEl.style["transition-property"] = "null";
      this.$pullContentEl.style["transition-property"] = "null";

      let distX = Math.abs(touch.pageX - this.touch.pageX);
      let distY = Math.abs(touch.pageY - this.touch.pageY);

      if (this.$pullRefreshContentEl && this.$pullContentEl) {
        if (this.pageY <= distY) {
          let shrinkPercent = distY / window.innerHeight;

          distY = this.pageY + this.pageY * shrinkPercent;
          this.touch.distY = distY;
          this.$nextTick(() => {
            if (this.pullStatus != 1) {
              this.pullStatus = 1;
            }
          });
        } else {
          this.pullStatus = 0;
        }

        this.$pullRefreshContentEl.style[
          "transform"
        ] = `translate3d(0,${distY}px,0)`;
        this.$pullContentEl.style["transform"] = `translate3d(0,${distY}px,0)`;
        this.$pullRefreshContentEl.style["transition-duration"] = 0;
        this.$pullContentEl.style["transition-duration"] = 0;
      }
    },

    touchEnd(e) {
      this.$nextTick(() => {
        if (this.pullStatus === 1) {
          this.pullStatus = 3;

          function resetPaint() {
            let distY = this.$pullRefreshContentEl.offsetHeight;
            this.$pullRefreshContentEl.style["transition-duration"] = "0.2s";
            this.$pullRefreshContentEl.style["transition-property"] = "all";
            this.$pullRefreshContentEl.style[
              "transform"
            ] = `translate3d(0,${distY}px,0)`;
            this.$pullContentEl.style["transition-duration"] = "0.3s";
            this.$pullContentEl.style["transition-property"] = "all";
            this.$pullContentEl.style[
              "transform"
            ] = `translate3d(0,${distY}px,0)`;
          }
          resetPaint.call(this);
          this.$emit("pullingDown");
        } else {
          this.recall();
        }
      });
    },
    forceUpdate() {
      let me = this;
      this.$nextTick(() => {
        if (this.pullStatus === 3) {
          setTimeout(() => {
            this.pullStatus = 4;
            this.recall();
          }, 500);
        }
      });
    },
    recall() {
      this.startFlag = false;
      this.touch = {};
      let me = this;

      if (this.pullStatus === 4) {
        setTimeout(() => {
          resetPaint.call(me);
        }, 800);
      } else {
        resetPaint.call(me);
      }

      function resetPaint() {
        this.$pullRefreshContentEl.style["transition-duration"] = "0.3s";
        this.$pullRefreshContentEl.style["transition-property"] = "all";
        this.$pullRefreshContentEl.style["transform"] = `translate3d(0,0,0)`;
        this.$pullContentEl.style["transition-duration"] = "0.3s";
        this.$pullContentEl.style["transition-property"] = "all";
        this.$pullContentEl.style["transform"] = `translate3d(0,0,0)`;
      }
    },
    prevent(el) {
      var startX = 0,
        startY = 0;
      //touchstart事件
      function touchSatrtFunc(evt) {
        try {
          //evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等

          var touch = evt.touches[0]; //获取第一个触点
          var x = Number(touch.pageX); //页面触点X坐标
          var y = Number(touch.pageY); //页面触点Y坐标
          //记录触点初始位置
          startX = x;
          startY = y;
        } catch (e) {
          alert("touchSatrtFunc：" + e.message);
        }
      }
      document.addEventListener("touchstart", touchSatrtFunc, false);

      var _ss = el;
      _ss.ontouchmove = function(ev) {
        var _point = ev.touches[0],
          _top = _ss.scrollTop;
        // 什么时候到底部
        var _bottomFaVal = _ss.scrollHeight - _ss.offsetHeight;
        // 到达顶端
        if (_top === 0) {
          // 阻止向下滑动
          if (_point.clientY > startY) {
            ev.preventDefault();
          } else {
            // 阻止冒泡
            // 正常执行
            ev.stopPropagation();
          }
        } else if (_top === _bottomFaVal) {
          // 到达底部
          // 阻止向上滑动
          if (_point.clientY < startY) {
            ev.preventDefault();
          } else {
            // 阻止冒泡
            // 正常执行
            ev.stopPropagation();
          }
        } else if (_top > 0 && _top < _bottomFaVal) {
          ev.stopPropagation();
        } else {
          ev.preventDefault();
        }
      };
    }
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.pull-refresh-container {
  background: grey;
  position: relative;
  clear: both;
  overflow-y: scroll;

  .pull-refresh-wrap {
    position: absolute;
    top: -50px;
    display: flex;
    height: 50px;
    align-items: center;
    width: 100%;
    background: grey;

    .pull-icon-box {
      display: inline-block;
      // width: 30px;
      // height: 30px;
      // margin-left: 50px;
      // margin-right: 60px;
      // position: relative;
      position absolute
      left 50px
      top 50%;
      transform translateY(-50%)

      .rotate0 {
        transition: all 0.2s;
      }

      .rotate90 {
        transform: rotate(180deg);
      }
      .loading{
             width: 24px;
            height: 24px;
      }
    }

    .finish-icon {
      width: 24px;
      height: 24px;
      position: relative;
      left: 33%;
    }

    .pull-status-text {
      position: absolute;
      left: 50%;
      top: 50%;
      color rgba(255,255,255,0.6)
      transform: translate(-50%, -50%);
    }
  }

  .pull-content {
    background: #FFF;
    padding: 0;
    border: 1px solid #ededed;
    width: 100%;
  }
}
</style>
