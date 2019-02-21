<template>
  <div
    class="i-select-box"
    v-click-outside.capture="onClickOutside"
    v-click-outside:mousedown.capture="onClickOutside"
  >
    <div
      :class="{
        'i-select-wrap': true,
        'active-border ': isOpen
      }"
      @click="trigger"
    >
      <div v-if="chooseItem">
        {{ chooseItem }}
      </div>
      <div v-else-if="placeholder" class="placeholder-text">
        {{ placeholder }}
      </div>
    </div>

    <transition name="transition-drop">
      <div class="i-select-content-wrap" v-if="isOpen">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { directive as clickOutside } from "v-click-outside-x";

export default {
  name: "i-Select",
  directives: { clickOutside },
  props: {
    placeholder: [String],
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number]
    }
  },
  provide: {
    Select: this
  },
  data: () => {
    return {
      isOpen: false,
      chooseItem: this.value
    };
  },
  created() {
    console.log(this.value);
  },
  watch: {
    value(val) {
      if (val) {
        this.chooseItem = val;
        this.$emit("onChange", val);
        this.$emit("input", val);
      }
    }
  },
  methods: {
    onChange(val) {
      this.chooseItem = val;
      this.$emit("onChange", val);
      this.$emit("input", val);
      this.isOpen = false;
    },
    trigger() {
      this.isOpen = !this.isOpen;
    },
    onClickOutside() {
      this.isOpen = false;
    }
  }
};
</script>

<style  scoped lang="less">
@ease-in-out : ease-in-out;
@animation-time : .3s;
@transition-time : .2s;

div {
  box-sizing: border-box;
}
.active-border {
  box-shadow: 0 0 0 2px rgba(51, 153, 255, 0.2);
  outline: 0;
}
.placeholder-text {
  color: #c3cbd6;
  font-size: 12px;
}

.slide-motion(@className, @keyframeName) {
  .make-motion(@className, @keyframeName);
  .@{className}-enter-active,
  .@{className}-appear {
    opacity: 0;
    animation-timing-function: @ease-in-out;
    transform-origin: top;
  }

  .@{className}-leave-active {
    transform-origin: top;
    animation-timing-function: @ease-in-out;
  }
}

.motion-common() {
  animation-duration: @animation-time;
  animation-fill-mode: both;
}

.make-motion(@className, @keyframeName) {
  .@{className}-enter-active,
  .@{className}-appear {
    .motion-common();
    animation-play-state: paused;
  }
  .@{className}-leave-active {
    .motion-common();
    animation-play-state: paused;
  }
  .@{className}-enter-active,
  .@{className}-appear {
    animation-name: ~"@{keyframeName}In";
    animation-play-state: running;
  }
  .@{className}-leave-active {
    animation-name: ~"@{keyframeName}Out";
    animation-play-state: running;
  }
}

.slide-motion(transition-drop, ivuTransitionDrop);

@keyframes ivuTransitionDropIn {
  0% {
    opacity: 0;
    transform: scaleY(0.8);
  }
  100% {
    opacity: 1;
    transform: scaleY(1);
  }
}

@keyframes ivuTransitionDropOut {
  0% {
    opacity: 1;
    transform: scaleY(1);
  }
  100% {
    opacity: 0;
    transform: scaleY(0.8);
  }
}

.i-select-box {
  position: relative;
  width: 200px;
  .i-select-wrap {
    width: 200px;
    height: 35px;
    line-height: 35px;
    border: 1px solid #ededed;
    border-radius: 4px;
    padding: 0 5px;
  }
  .i-select-wrap:hover {
    border-color: #5cadff;
  }

  .i-select-content-wrap {
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    position: absolute;
    padding: 5px 0;
    margin-top: 5px;
    width: 200px;
    min-height: 100px;
    max-height: 150px;
    border-radius: 3px;
    line-height: 35px;
    z-index: 9999;
    background: #fff;
    overflow-y: scroll;
    // border: 1px solid #d8d8d8;
  }
}
</style>
