import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Gmap from '@/components/Gmap'
import AddShop from '@/components/AddShop'
import Counter from '@/components/Counter'
import NewTodos from '@/components/NewTodos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/addShop',
      name: 'AddShop',
      component: AddShop
    },
    {
      path: '/gmap',
      name: 'Gmap',
      component: Gmap
    },
    {
      path: '/counter',
      name: 'GmapCounter',
      component: Counter
    },
    {
      path: '/todos',
      name: 'NewTodos',
      component: NewTodos
    }
  ]
})
