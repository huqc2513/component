<template>
  <div>
    <Tree :data='data'/>
  </div>
</template>

<script type="text/ecmascript-6">

import Tree from '@/components/tree/index.js'


export default {
  created() {},
  data() {
    return {
      data: [
        {
          title: "parent 1",
          expand: true,
          children: [
            {
              title: "parent 1-1",
              expand: true,
              children: [
                {
                  title: "leaf 1-1-1"
                },
                {
                  title: "leaf 1-1-2"
                }
              ]
            },
            {
              title: "parent 1-2",
              children: [
                {
                  title: "leaf 1-2-1"
                },
                {
                  title: "leaf 1-2-1"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  components: {
    Tree
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped>
</style>

