<script setup lang="ts">
import BasicLayout from '@/views/BasicLayout.vue'
import Button from 'primevue/button'
import ConfirmDialog from 'primevue/confirmdialog'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import { onMounted, ref } from 'vue'
import type { Category } from '@/types/Category.ts'
import { useCategories } from '@/API/Categories.ts'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { useConfirm } from 'primevue/useconfirm'
import { authStore } from '@/stores/auth.ts'

const categories = ref<Category[]>([])
const createCategoryDialogVisible = ref<boolean>(false)
const updateCategoryDialogVisible = ref<boolean>(false)
const { getCategories, deleteCategory, updateCategory, createCategory } = useCategories()
const confirm = useConfirm()
const auth = authStore()
const createFormData = ref({
  name: '',
})

const updateFormData = ref({
  id: 0,
  name: '',
})
const showEditDialog = (data) => {
  updateCategoryDialogVisible.value = true
  updateFormData.value.name = data.name
  updateFormData.value.id = data.id
}
const deleteCategoryConfirm = (data) => {
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
      deleteCategory(data.id).then(() => {
        loadData()
      })
    },
  })
}

const createCategorySubmit = () => {
  createCategory(createFormData.value).then(loadData)
  createCategoryDialogVisible.value = false
}
const updateCategorySubmit = () => {
  updateCategoryDialogVisible.value = false
  updateCategory(updateFormData.value.id, {
    name: updateFormData.value.name,
  }).then(loadData)
}

onMounted(() => {
  loadData()
})

const loadData = () => {
  getCategories().then((res) => {
    categories.value = res.data.data
  })
}
</script>

<template>
  <BasicLayout>
    <Button
      icon="pi pi-file-plus"
      @click="createCategoryDialogVisible = true"
      severity="info"
      :disabled="!auth.isAdmin"
    ></Button>
    <DataTable :value="categories" tableStyle="min-width: 50rem">
      <Column field="id" header="ID"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="slug" header="Slug"></Column>
      <Column class="w-24" header="Actions">
        <template #body="{ data }">
          <div class="flex flex-row gap-2">
            <Button
              icon="pi pi-pencil"
              @click="showEditDialog(data)"
              severity="info"
              :disabled="!auth.isAdmin"
            ></Button>
            <Button
              icon="pi pi-trash"
              @click="deleteCategoryConfirm(data)"
              severity="danger"
              :disabled="!auth.isAdmin"
            ></Button>
          </div>
        </template>
      </Column>
    </DataTable>
    <ConfirmDialog></ConfirmDialog>
    <Dialog
      v-model:visible="createCategoryDialogVisible"
      modal
      header="Create Category"
      position="left"
      :style="{ width: '25rem' }"
    >
      <span class="text-surface-500 dark:text-surface-400 block mb-8"
        >Update your information.</span
      >
      <div class="flex items-center gap-4 mb-4">
        <label for="name" class="font-semibold w-24">Name</label>
        <InputText v-model="createFormData.name" id="name" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="createCategoryDialogVisible = false"
        ></Button>
        <Button type="button" label="Save" @click="createCategorySubmit"></Button>
      </div>
    </Dialog>
    <Dialog
      v-model:visible="updateCategoryDialogVisible"
      modal
      header="Create Category"
      position="left"
      :style="{ width: '25rem' }"
    >
      <span class="text-surface-500 dark:text-surface-400 block mb-8"
        >Update your information.</span
      >
      <div class="flex items-center gap-4 mb-4">
        <label for="name" class="font-semibold w-24">Name</label>
        <InputText v-model="updateFormData.name" id="name" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="updateCategoryDialogVisible = false"
        ></Button>
        <Button type="button" label="Save" @click="updateCategorySubmit"></Button>
      </div>
    </Dialog>
  </BasicLayout>
</template>

<style scoped></style>
