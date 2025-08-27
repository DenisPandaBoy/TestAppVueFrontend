<script setup lang="ts">
import InputText from 'primevue/inputtext'
import { onMounted, reactive, ref } from 'vue'
import { Form } from '@primevue/forms'
import BasicLayout from '@/views/BasicLayout.vue'
import IftaLabel from 'primevue/iftalabel'
import { useAxios } from '@/Composables/axios.ts'
import Button from 'primevue/button'
import router from '@/router'
import { authStore } from '@/stores/auth.ts'
import { useAuth } from '@/API/Auth.ts'
import { preloaderStore } from '@/stores/preloader.ts'

const { setLoaded } = preloaderStore()
const formData = reactive({
  name: '',
  lastName: '',
})
const noChangesToSubmit = ref(true)

const initialValues = ref({
  name: '',
  lastName: '',
})
const { execAxios } = useAxios()
const { getUser } = useAuth()

const onFormSubmit = () => {
  const auth = authStore()
  execAxios({
    method: 'patch',
    url: 'api/users/' + auth.user.id,
    data: {
      name: formData.name,
      last_name: formData.lastName,
    },
  }).then((response) => {
    if (response.data === undefined) return
    initialValues.value.name = response.data.name
    initialValues.value.lastName = response.data.last_name
  })
}

const valueChanged = () => {
  noChangesToSubmit.value =
    initialValues.value.name === formData.name && initialValues.value.lastName === formData.lastName
}

const onChangePassword = () => {
  router.push('/profile/change-password')
}

getUser().then((res) => {
  initialValues.value.name = res.data.name
  initialValues.value.lastName = res.data.last_name
  formData.name = res.data.name
  formData.lastName = res.data.last_name
})

onMounted(() => {
  setLoaded(true)
})
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
            v-model="formData.name"
            @valueChange="valueChanged"
            :placeholder="formData.name"
          />
          <label for="name">Name</label>
        </IftaLabel>
        <IftaLabel>
          <InputText
            id="lastName"
            name="lastName"
            type="text"
            v-model="formData.lastName"
            @valueChange="valueChanged"
            :placeholder="formData.lastName"
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
