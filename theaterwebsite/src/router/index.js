import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import Login from '@/components/pages/Login'
import Register from '@/components/pages/Register'
import MovieIntro from '@/components/pages/MovieIntro'
import Order from '@/components/pages/Order'
import Checkout from '@/components/pages/Checkout'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'HomePage',
    },
    {
      path: '/',
      name: 'HomePage',
      // redirect: '/HomePage',
      component: HomePage
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/movieintro/:id',
      name: 'MovieIntro',
      component: MovieIntro
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout
    }
  ]
})
