<template>
  <div class="foodPanel-container">
    <picker :data='list'> </picker>
  </div>
</template>

<script type="text/ecmascript-6">
import { address as data } from "@/assets/js/address.js";
import list from "@/assets/js/addressData.js";
import popup from "../components/popup/popup.vue";
import picker from "../components/picker";

export default {
  created() {},
  data() {
    return {
      list: list
    };
  },
  components: {
    popup,
    picker
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped>
.foodPanel-container {
  height: 100%;
  width: 100%;
}
</style>

