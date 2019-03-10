<template>
  <label>
    <span>
      <input
        v-if="group"
        type="checkbox"
        :value="label"
        v-model="model"
        @change="change"
        :class="{ activeClass: groupStyle }"
      />
      <input
        v-else
        type="checkbox"
        :value="currentValue"
        ref="input"
         @change="change"
        :class="{ activeClass: currentValue }"
      />
    </span>
    {{ label }}
    <slot></slot>
  </label>
</template>
<script>
import { findComponentUpward } from "util/index";

export default {
  name: "iCheckbox",
  props: {
    label: {
      type: [String, Number, Boolean],
      default: ""
    },
    value: {
      type: [String, Number, Boolean],
      default: false
    }
  },
  computed: {
    groupStyle() {
      if (this.group) {
        this.checkboxGroup = findComponentUpward(this, "iCheckboxGroup");
        const index = this.checkboxGroup.currentValue.indexOf(this.label);
        return index < 0 ? false : true;
      }
    }
  },
  watch: {
    value(val) {
        this.updateModel();
    }
  },
  data() {
    return {
      currentValue: this.value,
      model: [],
      group: false,
      parent: null
    };
  },
  mounted() {
    this.parent = findComponentUpward(this, "iCheckboxGroup");
    if (this.parent) {
      this.group = true;
    } else {
      this.updateModel();
    }
  },
  methods: {
    updateModel() {
      this.currentValue = this.value ? true : false;
    },
    change(event) {
      const checked = event.target.checked;

      this.currentValue = checked;

      if (this.group) {
        this.checkboxGroup = findComponentUpward(this, "iCheckboxGroup");
        const index = this.checkboxGroup.currentValue.indexOf(this.label);
        if (index < 0) {
          let arr = [...this.checkboxGroup.currentValue, this.label];
          this.checkboxGroup.change(arr);
        } else {
          this.checkboxGroup.currentValue.splice(index, 1);
          this.checkboxGroup.change(this.checkboxGroup.currentValue);
        }
      } else {
        this.$emit("input", checked);
        this.$emit("on-change", checked);
      }
    }
  }
};
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
label {
  // display: flex;
  // align-items: center;
  // justify-content: center;
  vertical-align: top;
}

.activeClass {
  border-color: #2d8cf0 !important;
  background-color: #2d8cf0 !important;
  transition: border-color 0.2s ease-in-out;
  background-color: 0.2s ease-in-out;
}

input[type=checkbox] {
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  width: 15px;
  height: 15px;
  cursor: pointer;
  vertical-align: center;
  border: 1px solid #dcdee2;
  border-color: #dcdee2;
  position: relative;
  border-radius: 2px;
}

input[type=checkbox]:checked::after {
  content: '\2713';
  display: block;
  position: absolute;
  top: 4px;
  left: 2px;
  right: 0;
  bottom: 0;
  width: 0px;
  height: 8px;
  line-height: 7px;
  color: #FFF;
  font-size: 12px;
}
</style>