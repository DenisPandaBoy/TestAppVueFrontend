import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/Login.vue'
import Profile from '@/views/Profile.vue'
import PasswordChange from '@/views/PasswordChange.vue'
import { useAuth } from '@/API/Auth.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
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
    },
    {
      path: '/profile/change-password',
      name: 'change-password',
      component: PasswordChange,
    },
  ],
})

router.beforeEach(async (to) => {
  const { checkAuth } = useAuth()

  checkAuth()
    .then((isAuthenticated) => {
      if (to.name !== 'login' && !isAuthenticated) {
        router.push('login')
        return
      }

      if (to.name === 'login' && isAuthenticated) {
        router.push('/')
      }
    })
    .catch(() => {
      router.push('login')
    })
})

export default router
