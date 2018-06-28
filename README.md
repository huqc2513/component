component
##上下拉刷新例子，以及一些其他组件
<br>

 


下拉刷新在线预览 ：
http://112.74.173.191/component/index.html#/test <br><br>


下拉刷新组件代码分析地址 ：https://www.jianshu.com/p/9baf9e3aff96

<br>
<br>
<br>
<br>

## 路由登录拦截

使用vuex和vue-router实现路由登录拦截，登录成功后 ，跳转到之前的登录成功的页面

实现思路：
在路由拦截器里面，mete字段中可以配置路由是否需要登录，如果需要登录就调用接口判断是否登录，其原理也就是在判断请求头是否有带上 token，如果状态为未登录，将需要去到的路由信息利用vuex存下来，然后在登录页面，登录成功的回调中，判断是否有loginFrom，如果有值，直接将obj传入过去 给next( ojb ），这里路由就能跳转了，实现成功登录后，跳转到要去到的被打回的页面

```
//需要登录的路由配置
  {
        name: 'ReplayList',
        path: '/ReplayList',
        meta: {
          title: '我的问答',
          isNeedLogin:true
        },
        component: r => require(['@/pages/ReplyList'], r)
      }


//路由拦截器代码
router.beforeEach((to, from, next) => {
        
        if (to.meta.isNeedLogin) {
                // 获取登录状态     
                store.dispatch('getLoginStatus').then(status => {
                  // 未登录   这里只是把router信息写进缓存
                  if (status == 0) {
                    store.dispatch('saveLoginFrom', {
                      path: to.path,
                      query: to.query,
                      params: to.params,
                      meta: to.meta
                    });
                    next('/login');
                    return false;
                  } else {
                  	  next();
                 	 }
                })
          } else {
               	 next();
         }
})


//登录组件接口代码
     this.$api.checkLoin().then(r=>{
                if(r.data.code==1)｛
                    //存vuex
                    this.$store.commit('USER_INFO', res.data.user);

                      this.$store.dispatch("getLoginFrom").then(loginFromObj => {
                        if (loginFromObj) {
                          this.$router.replace(loginFromObj);
            //如果没有缓存路由数据，则直接按照正常逻辑来跳转到user
                        } else {
                          this.$router.replace({name: "user"});
                        }
                       });
     
                }
          });

```




### Development

```shell

npm install
npm run dev

```






