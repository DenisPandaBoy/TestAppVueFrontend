<script setup lang="ts">
import InputText from 'primevue/inputtext'
import { reactive, ref } from 'vue'
import { Form } from '@primevue/forms'
import BasicLayout from '@/views/BasicLayout.vue'
import IftaLabel from 'primevue/iftalabel'
import { useAxios } from '@/axios/axios.ts'
import Button from 'primevue/button'

const name = ref<string>()
const lastName = ref<string>()

useAxios('api/user', 'get', {}).then((response) => {
  console.log(initialValues.name)
  initialValues.name = response.data.name
  initialValues.lastName = response.data.lastName
})

const initialValues = reactive({
  name: '',
  lastName: '',
})
console.log(initialValues.name)
function onFormSubmit() {}
</script>

<template>
  <BasicLayout>
    <Form
      :initialValues="initialValues"
      @submit="onFormSubmit"
      class="flex flex-col items-center justify-center gap-4 w-full h-screen"
    >
      <IftaLabel>
        <InputText id="name" name="name" type="text" v-model="name" :placeholder="name" />
        <label for="name">Name</label>
      </IftaLabel>
      <IftaLabel>
        <InputText
          id="lastName"
          name="lastName"
          type="text"
          v-model="lastName"
          :placeholder="lastName"
        />
        <label for="lastName">Last Name</label>
      </IftaLabel>
      <Button type="submit" severity="secondary" label="Submit" class="sm:w-56" />
    </Form>
  </BasicLayout>
</template>

<style scoped></style>
