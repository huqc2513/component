<template>
  <div class="item-box">
    <div class="input-box">
      <input
        @blur="blur"
        class='input'
        :type="type ?type :'text'"
        :placeholder="placeholder || '请输入手机号'"
        v-model.trim.native="newValue"
        @keyup.enter="enter"
      >
      <span
        v-show="newValue"
        @click.stop="newValue=''"
        class="clear-icon clear "
      ></span>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    debounce: {
      type: Boolean,
      default: false
    },
    type: String,
    placeholder: String,
    value: [String, Number]
  },
  watch: {
    value(newValue) {
      this.newValue = newValue;
    },
    newValue(newQuery) {
      this.$emit("input", newQuery);
    }
  },
  created() {},
  data() {
    return {
      newValue: this.value
    };
  },
  methods: {
    blur() {
      this.$emit("blur", event.target.value);
    },
    enter() {
      // if(this.$router.name=='newLogin'){
      this.$emit("enter");
      // }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/base/fn";

$input-color: #cecece;
$input-active-color: #4d4d4d;
$input-font-size: 16px;

.clear-icon {
  height: 12px;
  width: 12px;
  background: url("./clear@3x.png") no-repeat;
  background-size: cover;
}

.item-box {
  display: flex;
  align-items: center;
  margin: 0 px2rem(60);
  padding: px2rem(40) 0;
  border-bottom: 1px solid #a6a6a6;

  .input-box {
    flex: 1;
    position: relative;
    padding-right: px2rem(10);
    .clear {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    .input {
      border: none;
      outline: none;
      color: $input-active-color;
      font-size: $input-font-size;
    }
  }
}

::-webkit-input-placeholder {
  font-size: $input-font-size;
  color: $input-color;
}

:-moz-placeholder {
  font-size: $input-font-size;
  color: $input-color;
}

::-moz-placeholder {
  font-size: $input-font-size;
  color: $input-color;
}

:-ms-input-placeholder {
  font-size: $input-font-size;
  color: $input-color;
}
</style>
