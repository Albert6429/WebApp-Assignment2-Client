import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Posts from '@/components/Posts'
import WritePosts from '@/components/WritePosts'
import DetailView from "../components/DetailView"
import UserList from "../components/UserList"
import Login from "../components/Login"
import Register from "../components/Register"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts,
      meta: {
        need2Login: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/writeposts',
      name: 'WritePosts',
      component: WritePosts,
      meta: {
        need2Login: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/detailview',
      name: 'DetailView',
      component: DetailView,
      props: true,
      meta: {
        need2Login: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/userlist',
      name: 'UserList',
      component: UserList,
      props: true,
      meta: {
        need2Login: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      props: true
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      props: true,
    }
  ]
})
