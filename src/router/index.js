import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect:'/test',

    },
    {
      path: '/test',
      component : resolve => require(['../pages/test'], resolve),
      meta: {
        title: "测试"
      }
    }
  ]
})


