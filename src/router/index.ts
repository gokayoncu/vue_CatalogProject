import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import { useauthStore } from '@/stores/authStore'
import { ref } from 'vue'
import CategoryView from '@/views/CategoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta:{
        layout:'MainLayout',
      }
    },
    {
      path: '/card',
      name: 'card',
      component: () => import('@/views/UserCard.vue'),
      meta:{
        authRequired:true,
        layout:'MainLayout'
      }
    },
    {
      path: '/login',
      name: 'login',      
      component: LoginView,
      meta:{
        layout:'LoginLayout'
      }
    },
    {
      path: '/category/:id',
      name: 'category',      
      component: CategoryView,
      meta:{
        layout:'MainLayout'
      }
    },
    {
      path: '/product/:id',
      name: 'product',      
      component: () => import('@/views/ProductView.vue'),
      meta:{
        layout:'MainLayout'
      }
    },
    {
      path: '/insertcategorie',
      name: 'insertcategorie',
      component: () => import('@/components/CategorieEdit.vue'),
      meta:{
        authRequired:true,
        layout:'InsertLayout'
      }
    },
    {
      path: '/insertproducts',
      name: 'insertproducts',
      component: () => import('@/components/ProductEdit.vue'),
      meta:{
        authRequired:true,
        layout:'InsertLayout'
      }
    }    
  ]
})

router.beforeEach(async(to)=>{
  const authStore =useauthStore()
  const data = ref();
  data.value= await authStore.isAuth
  if(to.meta.authRequired && !data?.value){
    location.href='/login'
  }
})

export default router
