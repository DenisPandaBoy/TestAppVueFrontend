<script setup lang="ts">
import InputText from 'primevue/inputtext'
import { ref } from 'vue'
import { Form } from '@primevue/forms'
import BasicLayout from '@/views/BasicLayout.vue'
import IftaLabel from 'primevue/iftalabel'
import { useAxios } from '@/axios/axios.ts'
import Button from 'primevue/button'
import { userStore } from '@/stores/userStore.ts'
import router from '@/router'

const name = ref<string>()
const lastName = ref<string>()
const noChangesToSubmit = ref(true)

const initialValues = ref({
  name: '',
  lastName: '',
})

useAxios('api/user', 'get', {}).then((response) => {
  initialValues.value.name = response.data.name
  initialValues.value.lastName = response.data.last_name
  name.value = response.data.name
  lastName.value = response.data.last_name
})

function onFormSubmit() {
  const user = userStore()
  useAxios('api/users/' + user.id, 'patch', {
    name: name.value,
    last_name: lastName.value,
  }).then((response) => {
    initialValues.value.name = response.data.name
    initialValues.value.lastName = response.data.last_name
  })
}

function valueChanged(): void {
  noChangesToSubmit.value =
    initialValues.value.name === name.value && initialValues.value.lastName === lastName.value
}

function onChangePassword(): void {
  router.push('/profile/change-password')
}
</script>

<template>
  <BasicLayout>
    <div class="flex flex-col items-center gap-4 justify-center h-screen">
      <Form
        :initialValues="initialValues"
        @submit="onFormSubmit"
        class="flex flex-col items-center justify-center gap-4 w-full"
      >
        <IftaLabel>
          <InputText
            id="name"
            name="name"
            type="text"
            v-model="name"
            @valueChange="valueChanged"
            :placeholder="name"
          />
          <label for="name">Name</label>
        </IftaLabel>
        <IftaLabel>
          <InputText
            id="lastName"
            name="lastName"
            type="text"
            v-model="lastName"
            @valueChange="valueChanged"
            :placeholder="lastName"
          />
          <label for="lastName">Last Name</label>
        </IftaLabel>
        <Button
          type="submit"
          severity="secondary"
          label="Submit"
          class="sm:w-56"
          :disabled="noChangesToSubmit"
        />
      </Form>
      <Button
        type="button"
        severity="info"
        label="Change Password"
        class="sm:w-56"
        @click="onChangePassword"
      />
    </div>
  </BasicLayout>
</template>

<style scoped></style>
