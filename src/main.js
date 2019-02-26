/* eslint-disable */


import Vue from "vue";
import App from "./App";
import router from "./router";

Vue.config.productionTip = false;

import "./assets/reset.css";

import "./assets/js/iconfont";

import toast from "./components/toast/index";
import notiFication from "./components/notiFication/index";

// import VueWechatTitle from "vue-wechat-title";  
//  Vue.use(VueWechatTitle);


Vue.use(toast);
Vue.use(notiFication);

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
