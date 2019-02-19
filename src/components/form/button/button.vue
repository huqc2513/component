<template>
  <div class="button-wrap">
    <button
      :class="{ 'disabled':disabled }"
      :disabled:="disabled"
      @click="handleClick"
    > {{ btntext || '登录'}}
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: "form_button",
  props: {
    btntext: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick() {
      if (!this.disabled) {
        this.$emit("click");
      } else {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/base/fn";

.button-wrap {
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    border: none;
    outline: none;
    background: -webkit-linear-gradient(
      left,
      rgb(56, 198, 245),
      rgb(17, 167, 212)
    );
    border-radius: px2rem(200);
    color: #fff;
    width: px2rem(520);
    height: px2rem(100);
    line-height: px2rem(100);
    margin: auto;
    -webkit-tap-highlight-color: transparent;
  }
}
.disabled {
  background: -webkit-linear-gradient(
    left,
    rgba(56, 198, 245, 0.5),
    rgba(17, 167, 212, 0.5)
  ) !important;
}
</style>
