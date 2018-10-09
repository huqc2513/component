import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)




export default  new Router({
  routes: [
    {
      path: '/',
      redirect:'/home',
      meta: {
        title: " "
      }
    },
    {
      path: '/test',
      component : resolve => require(['../pages/test'], resolve),
      meta: {
        title: "测试"
      }
    },
    {
      path: '/home',
      component : resolve => require(['../pages/home'], resolve),
      meta: {
        title: "跑马灯"
      }
    },
    {
      path: '/tab',
      component : resolve => require(['../pages/tab'], resolve),
      meta: {
        title: "tab"
      }
    },
    {
      path: '/picker',
      component : resolve => require(['../pages/picker'], resolve),
      meta: {
        title: "picker"
      }
    },
    {
      path: '/login',
      component : resolve => require(['../pages/login/login.vue'], resolve),
      meta: {
        title: "登录 "
      }
    },
    {
      path: '/popup',
      component : resolve => require(['../pages/popup.vue'], resolve),
      meta: {
        title: " "
      }
    },
    {
      path: '/calendar',
      component : resolve => require(['../pages/calendar.vue'], resolve),
      meta: {
        title: "日历"
      }
    }

  ]
})

