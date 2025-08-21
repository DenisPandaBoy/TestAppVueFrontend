<script setup lang="ts">
import BasicLayout from '@/views/BasicLayout.vue'
import IftaLabel from 'primevue/iftalabel'
import Button from 'primevue/button'
import { Form } from '@primevue/forms'
import { ref } from 'vue'
import Password from 'primevue/password'
import { useAxios } from '@/Composables/axios.ts'

const oldPassword = ref('')
const newPassword = ref('')
const newPasswordConfirmation = ref('')
const { execAxios } = useAxios()
const onFormSubmit = () => {
  execAxios({
    url: '/api/user/update-password',
    method: 'post',
    data: {
      old_password: oldPassword.value,
      new_password: newPassword.value,
      new_password_confirmation: newPasswordConfirmation.value,
    },
  })
}
</script>

<template>
  <BasicLayout>
    <Form
      @submit="onFormSubmit"
      class="flex flex-col items-center justify-center gap-4 w-full h-screen"
    >
      <IftaLabel>
        <Password v-model="oldPassword" :feedback="false" />
        <label for="name">Old password</label>
      </IftaLabel>
      <IftaLabel>
        <Password v-model="newPassword" :feedback="false" />
        <label for="lastName">new password</label>
      </IftaLabel>
      <IftaLabel>
        <Password v-model="newPasswordConfirmation" :feedback="false" />
        <label for="lastName">new password confirmation</label>
      </IftaLabel>
      <Button type="submit" severity="secondary" label="Submit" class="sm:w-56" /> </Form
  ></BasicLayout>
</template>

<style scoped></style>
