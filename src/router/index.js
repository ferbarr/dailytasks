import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {auth} from '@/firebase'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{requiresAuth:true}
  },
  {
    path: '/perfil',
    name: 'perfil',
   
    component: () => import('../views/perfil.vue'),
    meta:{requiresAuth:true}
  },
  ,
  {
    path: '/finalizada',
    name: 'finalizada',
   
    component: () => import('../views/finalizada.vue'),
    meta:{requiresAuth:true}
  },
  {
    path:'/agregar',
    name:'agregar',
    component:()=>import('../views/agregar.vue'),
    meta:{requiresAuth:true}
  },
  {
    path:'/ingreso',
    name:'ingreso',
    component: () => import('../views/ingreso.vue')

  } ,
  {
    path: '/editar/:id',
    name: 'editar',
   
    component: () => import('../views/editar.vue'),
    meta:{requiresAuth:true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=>{
  const user=auth.currentUser
  if(to.matched.some(record=>record.meta.requiresAuth)){
    if(user){
      next()
    }else{
      next('/ingreso')
    }
  }else{
    next()
  }
})
export default router
