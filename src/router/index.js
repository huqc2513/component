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
    },
    {
      path: '/home',
      component : resolve => require(['../pages/home'], resolve),
      meta: {
        title: "主页"
      }
    },
    {
      path: '/login',
      component : resolve => require(['../pages/login/login.vue'], resolve),
      meta: {
        title: "登录 "
      }
    }
  ]
})


//路由拦截器代码
// router.beforeEach((to, from, next) => {

//   if (to.meta.isNeedLogin) {
//           // 获取登录状态     
//           store.dispatch('getLoginStatus').then(status => {
//             // 未登录   这里只是把router信息写进缓存
//             if (status == 0) {
//               store.dispatch('saveLoginFrom', {
//                 path: to.path,
//                 query: to.query,
//                 params: to.params,
//                 meta: to.meta
//               });
//               next('/login');
//               return false;
//             } else {
//                 next();
//               }
//           })
//     } else {
//           next();
//    }
//   })


