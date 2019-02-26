<template>
  <svg class="icon" aria-hidden="true" @click="$emit('click')">
    <use :xlink:href="'#' + name"></use>
  </svg>
</template>

<script>
import "./iconfont.js";

export default {
  name: "icon",
  props: {
    name: String,
  }
};
</script>

<style lang="scss" scoped>
.icon {
  width: 25px;
  height: 25px;
}
</style>
