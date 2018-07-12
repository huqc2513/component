<template>
  <div id="app">
      <router-view v-wechat-title="$route.meta.title"></router-view> 

  </div>



</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body{
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
