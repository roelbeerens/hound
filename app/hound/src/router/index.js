import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Radio from '@/views/Radio'
import Settings from '@/views/Settings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'Home',
      path: '/',
      component: Home
    },
    {
      name: 'Radio',
      path: '/radio',
      component: Radio
    },
    {
      name: 'Settings',
      path: '/settings',
      component: Settings
    }
  ]
})
