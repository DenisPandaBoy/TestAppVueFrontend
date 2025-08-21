import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/Login.vue'
import Profile from '@/views/Profile.vue'
import PasswordChange from '@/views/PasswordChange.vue'
import { useAuth } from '@/components/AuthComposable.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: { auth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { auth: true },
    },
    {
      path: '/profile/change-password',
      name: 'change-password',
      component: PasswordChange,
      meta: { auth: true },
    },
  ],
})

router.beforeEach(async (to) => {
  if (to.meta.auth) {
    const auth = useAuth()
    console.log(to.name)
    auth
      .checkAuth()
      .then((isAuthenticated) => {
        if (to.name !== 'login' && !isAuthenticated) {
          router.push('login')
          return
        }

        if (to.name === 'login' && isAuthenticated) {
          router.push('/')
        }
      })
      .catch((errs) => {
        router.push('login')
      })
  }
})

export default router
