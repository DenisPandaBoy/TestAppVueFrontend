import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/Login.vue'
import { isAuthenticated } from '@/stores/isAuthenticated.ts'
import Profile from '@/views/Profile.vue'
import { useAxios } from '@/axios/axios.ts'
import { CheckIfUserIsLoggedIn } from '@/services/AuthService.ts'
import PasswordChange from '@/views/PasswordChange.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Dashboard',
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
  await CheckIfUserIsLoggedIn()
  const isUserAuthenticated = isAuthenticated()

  useAxios('api/user', 'get', {})
  if (to.name === 'Login' && isUserAuthenticated.state) {
    router.push('/Dashboard')
  }
})

export default router
