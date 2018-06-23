import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import './assets/reset.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
