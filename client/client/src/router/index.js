import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import GadgetDetail from '../views/GadgetDetail.vue'
import ProfilePage from '../views/ProfilePage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import StoresPage from '../views/StoresPage.vue'
import ReviewPage from '../views/ReviewPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/gadget/:id',
      name: 'gadgetDetail',
      component: GadgetDetail
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage
    },
    {
      path: '/stores',
      name: 'stores',
      component: StoresPage
    },
    {
      path: '/review/:id',
      name: 'review',
      component: ReviewPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authenticated = localStorage.access_token
  if ((to.name === 'login' || to.name === 'register') && authenticated) next({ name: 'home' })
  if (to.name === 'profile' && !authenticated) next({ name: 'login' })
  else next()
})

export default router
