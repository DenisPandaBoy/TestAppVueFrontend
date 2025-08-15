<script setup lang="ts">
import { ref } from 'vue'
import { Form } from '@primevue/forms'
import MegaMenu from 'primevue/megamenu'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import axios from 'axios'
import Password from 'primevue/password'

const items = ref([{ icon: 'pi pi-home', label: 'Home' }, { label: 'Test2' }])
const name = defineModel('name', { type: String })
const password = defineModel('password', { type: String })
function onFormSubmit() {
  axios
    .post('http://localhost:80/login', {
      email: name.value,
      password: password.value,
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}
</script>

<template>
  <MegaMenu :model="items" />
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
