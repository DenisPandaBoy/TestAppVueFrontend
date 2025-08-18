<script setup lang="ts">
import { useAxios } from '@/axios/axios.ts'
import { Form } from '@primevue/forms'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import router from '@/router'

const name = defineModel('name', { type: String })
const password = defineModel('password', { type: String })
function onFormSubmit() {
  useAxios('/sanctum/csrf-cookie', 'get', {}).then(() =>
    useAxios('/login', 'post', {
      email: name.value,
      password: password.value,
    })
      .then(function (response) {
        router.push('/dashboard')
      })
      .catch(function (error) {
        console.log(error)
      }),
  )
}
</script>

<template>
  <Form v-slot="$form" @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
    <div class="flex flex-col gap-1">
      <InputText v-model="name" name="email" type="text" placeholder="email@email" fluid />
      <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{
        $form.email.error?.message
      }}</Message>

      <Password v-model="password" name="password" placeholder="Password" :feedback="false" fluid />
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
  </Form>
</template>

<style scoped></style>
