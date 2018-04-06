import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/index'
import Radio from '@/pages/radio/index'
import RadioStation from '@/pages/radio/_guide_id'
import Settings from '@/pages/settings/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/radio',
      component: Radio
    },
    {
      path: '/radio/:guide_id',
      component: RadioStation
    },
    {
      path: '/settings',
      component: Settings
    }
  ]
})
