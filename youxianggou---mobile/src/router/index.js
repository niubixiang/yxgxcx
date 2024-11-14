import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Layout from '@/views/layout'
import Car from '@/views/layout/car'
import User from '@/views/layout/user'
import Home from '@/views/layout/home'
import Category from '@/views/layout/category'

const Login = () => import('@/views/login')
const Search = () => import('@/views/search')
const SearchList = () => import('@/views/search/list')
const Pay = () => import('@/views/pay')
const MyOrder = () => import('@/views/myorder')
const ProDetail = () => import('@/views/prodetail')
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      // 重定向
      redirect: '/home',
      children: [
        { path: '/car', component: Car },
        { path: '/user', component: User },
        { path: '/home', component: Home },
        { path: '/category', component: Category }
      ]
    },
    { path: '/search', component: Search },
    { path: '/myorder', component: MyOrder },
    { path: '/pay', component: Pay },
    { path: '/prodetail/:id', component: ProDetail },
    { path: '/searchlist', component: SearchList }
  ]
})

const authUrls = ['/pay', '/myorder']
// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  if (!authUrls.includes(to.path)) {
    next()
    return
  }
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
