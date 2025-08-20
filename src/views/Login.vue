<script setup lang="ts">
import { login } from '@/API/Login.ts'
import { Form } from '@primevue/forms'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import { reactive } from 'vue'

const formData = reactive({
  email: '',
  password: '',
})

const onFormSubmit = () => {
  login(formData.email, formData.password)
}
</script>

<template>
  <Form
    v-slot="$form"
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
