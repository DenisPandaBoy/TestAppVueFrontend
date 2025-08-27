<script setup lang="ts">
import BasicLayout from '@/views/BasicLayout.vue'
import Button from 'primevue/button'
import ConfirmDialog from 'primevue/confirmdialog'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import type { User } from '@/types/User.ts'
import { onMounted, ref } from 'vue'
import { useUsers } from '@/API/Users.ts'
import { useConfirm } from 'primevue/useconfirm'
import InputText from 'primevue/inputtext'
import Dialog from 'primevue/dialog'
import ToggleSwitch from 'primevue/toggleswitch'
import Password from 'primevue/password'
import { preloaderStore } from '@/stores/preloader.ts'

const users = ref<User[]>([])
const createUserDialogVisible = ref<boolean>(false)
const { getUsers, deleteUser, createUser } = useUsers()
const confirm = useConfirm()
const { setLoaded } = preloaderStore()

const createUserForm = ref({
  name: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  isAdmin: false,
})

const createUserSubmit = () => {
  createUserDialogVisible.value = false
  createUser({
    name: createUserForm.value.name,
    last_name: createUserForm.value.lastName,
    email: createUserForm.value.email,
    password: createUserForm.value.password,
    password_confirmation: createUserForm.value.passwordConfirm,
  }).then(loadData)
}

const deleteUserConfirm = (data) => {
  confirm.require({
    message: `Are you sure you want to delete ${data.name} item?`,
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    acceptProps: {
      label: 'Delete',
      severity: 'danger',
    },
    rejectProps: {
      label: 'Cancel',
      type: 'secondary',
    },
    accept: () => {
      deleteUser(data.id).then(() => {
        loadData()
      })
    },
  })
}
const loadData = () => {
  getUsers().then((res) => {
    users.value = res.data.data
  })
}

onMounted(() => {
  loadData()
  setLoaded(true)
})
</script>

<template>
  <BasicLayout>
    <Button icon="pi pi-file-plus" @click="createUserDialogVisible = true" severity="info"></Button>
    <DataTable :value="users" tableStyle="min-width: 50rem">
      <Column field="id" header="ID"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="last_name" header="Last Name"></Column>
      <Column field="email" header="Email"></Column>
      <Column class="w-24" header="Actions">
        <template #body="{ data }">
          <div class="flex flex-row gap-2">
            <Button icon="pi pi-trash" @click="deleteUserConfirm(data)" severity="danger"></Button>
          </div>
        </template>
      </Column>
    </DataTable>
    <ConfirmDialog></ConfirmDialog>
    <Dialog
      v-model:visible="createUserDialogVisible"
      modal
      header="Create Category"
      position="left"
      :style="{ width: '45rem' }"
    >
      <span class="text-surface-500 dark:text-surface-400 block mb-8"
        >Update your information.</span
      >
      <div class="flex items-center gap-4 mb-4">
        <label for="name" class="font-semibold w-24">Name</label>
        <InputText v-model="createUserForm.name" id="name" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="lastName" class="font-semibold w-24">Last Name</label>
        <InputText
          v-model="createUserForm.lastName"
          id="lastName"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="email" class="font-semibold w-24">Email</label>
        <InputText v-model="createUserForm.email" id="email" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="isAdmin" class="font-semibold w-24">Is Admin</label>
        <ToggleSwitch v-model="createUserForm.isAdmin" name="isAdmin" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="password" class="font-semibold w-24">Password</label>
        <Password
          v-model="createUserForm.password"
          name="password"
          placeholder="Password"
          :feedback="false"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="passwordConfirmation" class="font-semibold w-24">Password Confirmation</label>
        <Password
          v-model="createUserForm.passwordConfirm"
          name="passwordConfirmation"
          placeholder="Password"
          :feedback="false"
        />
      </div>

      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="createUserDialogVisible = false"
        ></Button>
        <Button type="button" label="Save" @click="createUserSubmit"></Button>
      </div>
    </Dialog>
  </BasicLayout>
</template>

<style scoped></style>
