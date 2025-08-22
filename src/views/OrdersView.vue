<script setup lang="ts">
import BasicLayout from '@/views/BasicLayout.vue'
import { useOrders } from '@/API/Orders.ts'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { onMounted, reactive, ref } from 'vue'
import type { Order } from '@/types/Order.ts'
import type { Category } from '@/types/Category.ts'
import { useCategories } from '@/API/Categories.ts'
import router from '@/router'
import { useConfirm } from 'primevue/useconfirm'
import Dialog from 'primevue/dialog'
import ConfirmDialog from 'primevue/confirmdialog'
import Select from 'primevue/select'
import DatePicker from 'primevue/datepicker'
import { useDateFormatter } from '@/Composables/DateFormatter.ts'

const { getUsersOrders, createOrder, deleteOrder } = useOrders()
const { getCategories } = useCategories()
const { formatDateForBackend } = useDateFormatter()
const products = ref<Order[]>([])
const categories = ref<Category[]>([])
const confirm = useConfirm()
const editOrderDialogVisible = ref(false)
const createOrderDialogVisible = ref(false)

const createFormData = reactive({
  category: {},
  due_date: {},
  payment_date: {},
})

onMounted(() => {
  loadData()

  getCategories().then((res) => {
    categories.value = res.data.data
  })
})

const loadData = () => {
  getUsersOrders().then((res) => {
    products.value = res.data.data
  })
}

const getCategory = (id: number) => {
  return categories.value.find((item) => item.id === id)
}
const selectRow = (row: Order) => {
  router.push('/orders/' + row.id)
  console.log(row)
}

const createOrderSubmit = () => {
  createOrder({
    category_id: createFormData.category.id,
    due_date: formatDateForBackend(createFormData.due_date),
    payment_date: formatDateForBackend(createFormData.payment_date),
  }).then(loadData)
  createOrderDialogVisible.value = false
}

const deleteOrderConfirm = (data) => {
  console.log(data)
  confirm.require({
    message: `Are you sure you want to delete ${data.order_number} item?`,
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
      deleteOrder(data.id).then(loadData)
    },
  })
}
</script>

<template>
  <BasicLayout>
    <Button
      icon="pi pi-file-plus"
      @click="createOrderDialogVisible = true"
      severity="info"
    ></Button>
    <DataTable :value="products" tableStyle="min-width: 50rem">
      <Column field="id" header="ID"></Column>
      <Column field="order_number" header="OrderNumber"></Column>
      <Column header="Category">
        <template #body="{ data }">
          {{ getCategory(data.category_id)?.name }}
        </template>
      </Column>
      <Column field="due_date" header="Due Date"></Column>
      <Column field="payment_date" header="Payment Date"></Column>
      <Column class="w-24" header="Actions">
        <template #body="{ data }">
          <div class="flex flex-row gap-2">
            <Button icon="pi pi-search" @click="selectRow(data)" severity="secondary"></Button>
            <Button icon="pi pi-pencil" @click="selectRow(data)" severity="info"></Button>
            <Button icon="pi pi-trash" @click="deleteOrderConfirm(data)" severity="danger"></Button>
          </div>
        </template>
      </Column>
    </DataTable>
    <ConfirmDialog></ConfirmDialog>
    <Dialog
      v-model:visible="createOrderDialogVisible"
      modal
      header="Edit Profile"
      position="left"
      :style="{ width: '25rem' }"
    >
      <span class="text-surface-500 dark:text-surface-400 block mb-8"
        >Update your information.</span
      >
      <div class="card flex justify-center">
        <label for="category" class="font-semibold w-24">Category</label>
        <Select
          id="category"
          v-model="createFormData.category"
          :options="categories"
          optionLabel="name"
          placeholder="Select a Category"
          class="w-full md:w-56"
        />
      </div>
      <div class="card flex justify-center">
        <label for="due_date" class="font-semibold w-24">Due date</label>
        <DatePicker v-model="createFormData.due_date" id="due_date" />
      </div>
      <div class="card flex justify-center">
        <label for="payment_date" class="font-semibold w-24">Payment Date</label>
        <DatePicker v-model="createFormData.payment_date" id="payment_date" />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="createOrderDialogVisible = false"
        ></Button>
        <Button type="button" label="Save" @click="createOrderSubmit"></Button>
      </div>
    </Dialog>
  </BasicLayout>
</template>
