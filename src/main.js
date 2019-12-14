// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

router.beforeEach((to, from, next) => {
  if (to.meta.need2Login) {     // 判断该路由是否需要登录权限
    let username = localStorage.getItem('username')
    if (username) {              // 通过localStorage.getItem()获取当前的 username 是否存在
      next()
    }
    else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath    // 将跳转的路由path作为参数，登录成功后跳转到该路由
        }
      })
    }
  }
  else {
    next()
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
