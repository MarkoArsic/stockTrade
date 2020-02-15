import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Stocks from '@/views/Stocks'
import Portfolio from '@/views/Portfolio'
import store from './store'
Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter (to, from , next) {
        if (store.state.idToken){
          next();
        }else {
          next('/stocks');
        }
      }
    },
    {
      path: '/stocks',
      name: 'stocks',
      component: Stocks
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: Portfolio
    }
  ]
})
