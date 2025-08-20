<script setup lang="ts">
import { login } from '@/API/Login.ts'
import { Form } from '@primevue/forms'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import { reactive } from 'vue'
import type { AxiosError } from 'axios'
import { useForm } from '@primevue/forms/useform'

const formData = reactive({
  email: '',
  password: '',
})

const resolver = useForm({})

const onFormSubmit = () => {
  login(formData.email, formData.password).catch((error: AxiosError) => {
    // console.log(error.response.data)
    // console.log(error.response.data.errors.email)
    resolver.states['email'].invalid = true
    resolver.states['email'].error = {
      message: error.response.data.errors.email,
    }
  })
}
</script>

<template>
  <Form
    v-slot="$form"
    :resolver="resolver"
    @submit="onFormSubmit"
    class="flex flex-col items-center justify-center gap-4 w-full h-screen"
  >
    <div class="flex flex-col gap-4 w-72 items-center">
      <InputText
        v-model="formData.email"
        name="email"
        type="text"
        placeholder="email@email"
        fluid
      />
      <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{
        $form.email.error?.message
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
