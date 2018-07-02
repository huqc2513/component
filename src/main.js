import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import './assets/reset.css'


import "./assets/js/iconfont"


import toast from './components/toast/index'
import notiFication from './components/notiFication/index'




Vue.use(toast)
Vue.use(notiFication)



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
