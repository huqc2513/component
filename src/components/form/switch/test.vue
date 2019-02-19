<template>
  <div class="i-switch">
    <input
      class="i-input"
      type="checkbox"
      v-model="checkboxValue"
      :disabled="disabled"
    >
    <i class="i-switch-ui"></i>
    <span class="i-switch-label">
      <slot></slot>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
const COMPONENT_NAME = "cube-switch";
const EVENT_INPUT = "input";

export default {
  name: COMPONENT_NAME,
  props: {
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checkboxValue: this.value
    };
  },
  watch: {
    value(newVal) {
      this.checkboxValue = newVal;
    },
    checkboxValue(newVal) {
      this.$emit(EVENT_INPUT, newVal);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
$switch-width = 48px;
$switch-height = 24px;
$switch-off-border-color = #dcdee2;
$switch-off-bgc = #fff;
$color-white = #FFF;
$switch-on-bgc = #2d8cf0;

.i-switch {
  display: flex;
  position: relative;
  align-items: center;

  .i-input {
    position: absolute;
    z-index: 1;
    width: $switch-width;
    height: $switch-height;
    opacity: 0;

    &:checked + .i-switch-ui {
      border-color: $switch-on-bgc;
      background-color: $switch-on-bgc;

      &::after {
        transform: translateX($switch-width - $switch-height);
      }

      &::before {
        transform: scale(0);
      }
    }
  }

  .i-switch-ui {
    position: relative;
    display: block;
    width: $switch-width;
    height: $switch-height;
    box-sizing: content-box;
    border: 1px solid $switch-off-border-color;
    border-radius: $switch-height;

    &::before, &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: $switch-height;
      background-color: $switch-off-bgc;
      transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1.28);
    }

    &::after {
      width: $switch-height;
      background-color: $color-white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    }
  }
}
</style>
