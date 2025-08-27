<script setup lang="ts">
import { Form } from '@primevue/forms'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import { reactive } from 'vue'
import type { AxiosError } from 'axios'
import { useAuth } from '@/API/Auth.ts'
import { preloaderStore } from '@/stores/preloader.ts'

const { login } = useAuth()
const { setLoaded } = preloaderStore()
const formData = reactive({
  email: '',
  password: '',
  emailInvalid: false,
  passwordInvalid: false,
  emailError: '',
  passwordError: '',
})

const onFormSubmit = () => {
  setLoaded(false)
  login(formData.email, formData.password).catch((error: AxiosError) => {
    if (error.response.data.errors.email) {
      formData.emailInvalid = true
      formData.emailError = error.response.data.errors.email[0]
    }
  })
}
</script>

<template>
  <Form
    @submit="onFormSubmit"
    class="flex flex-col items-center justify-center gap-4 w-full h-screen"
  >
    <div class="flex flex-col gap-4 w-72 items-center">
      <InputText
        v-model="formData.email"
        name="email"
        type="text"
        :invalid="formData.emailInvalid"
        placeholder="email@email"
        fluid
      />
      <Message :v-if="formData.emailInvalid" severity="error" size="small" variant="simple">{{
        formData.emailError
      }}</Message>

      <Password
        v-model="formData.password"
        name="password"
        placeholder="Password"
        :feedback="false"
        class="w-full"
        fluid
      />

      <Button type="submit" severity="secondary" label="Submit" class="sm:w-56" />
    </div>
  </Form>
</template>

<style scoped></style>
