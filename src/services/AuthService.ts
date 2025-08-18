import { useAxios } from '@/axios/axios.ts'
import router from '@/router'
import { userStore } from '@/stores/userStore.ts'
import { isAuthenticated } from '@/stores/isAuthenticated.ts'

export function CheckIfUserIsLoggedIn() {
  const isUserAuthenticated = isAuthenticated()
  const user = userStore()
  useAxios('api/user', 'get', {})
    .then(function (responseUser) {
      isUserAuthenticated.setState(responseUser.status === 200)
      if (isUserAuthenticated.state) {
        user.setName(responseUser.data.name)
        user.setId(responseUser.data.id)
      }
    })
    .catch(function (error) {
      isUserAuthenticated.setState(false)
      router.push('/login')
    })
}
