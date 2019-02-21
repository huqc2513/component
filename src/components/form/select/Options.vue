<template>
  <div
    :class="{
      'i-select-options-box': true,
      'option-active-item': isActive
    }"
    @click.stop="handleClick"
  >
    <slot></slot>
  </div>
</template>

<script>
import { directive as clickOutside } from "v-click-outside-x";
import { findComponentUpward } from "util/index";

export default {
  name: "i-Option",
  directives: { clickOutside },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: [String, Number]
  },
  inject: ["Select"],
  data: () => {
    return {
      isOpen: false,
      isActive: false
    };
  },
  mounted() {
    this.ParentSelect = findComponentUpward(this, "i-Select");
    if (this.ParentSelect.value === this.value) {
      this.isActive = true;
    }
  },
  methods: {
    handleClick() {
      if (this.ParentSelect.onChange.chooseItem != this.value) {
        this.ParentSelect.onChange(this.value);
        this.isActive = false;
      } else {
        this.isActive = true;
      }
    }
  }
};
</script>

<style  scoped lang="less">
div {
  box-sizing: content-box;
}

.i-select-options-box {
  clear: both;
  color: #657180;
  padding: 0 5px;
  font-size: 12px !important;
  white-space: nowrap;
  transition: background-color 0.2s ease-in-out;
}

.i-select-options-box:hover {
  background: #f3f3f3;
}
.option-active-item {
  background: rgba(51, 153, 255, 0.9);
  color: #fff;
}
.option-active-item:hover {
  color: #fff;
  background: rgba(51, 153, 255, 0.9);
}
</style>
