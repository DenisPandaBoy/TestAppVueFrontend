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
import { formatDateForBackend } from '@/helpers/date.ts'
import { preloaderStore } from '@/stores/preloader.ts'

const { getUsersOrders, createOrder, deleteOrder, editOrder, getOrderStatusHistory } = useOrders()
const { getCategories } = useCategories()
const products = ref<Order[]>([])
const categories = ref<Category[]>([])
const statuses = ref([])
const confirm = useConfirm()
const editOrderDialogVisible = ref(false)
const createOrderDialogVisible = ref(false)
const orderStatusHistoryDialogVisible = ref(false)
const { setLoaded } = preloaderStore()

const createFormData = reactive({
  category: {},
  due_date: {},
  payment_date: {},
})

const editFormData = reactive({
  id: 0,
  category: {},
  due_date: {},
  payment_date: {},
})

onMounted(() => {
  loadData()

  getCategories().then((res) => {
    categories.value = res.data.data
  })
  setLoaded(true)
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
}

const openHistoryStatuses = (data) => {
  getOrderStatusHistory(Number(data.id)).then((res) => {
    statuses.value = res.data.data
    orderStatusHistoryDialogVisible.value = true
  })
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

const showEditDialog = (data) => {
  editFormData.id = data.id
  editFormData.category = categories.value.find((c) => c.id == data.category_id) ?? {}
  editFormData.due_date = new Date(data.due_date)
  editFormData.payment_date = new Date(data.payment_date)
  editOrderDialogVisible.value = true
}

const confirmEditOrder = () => {
  editOrder(editFormData.id, {
    category_id: editFormData.category.id,
    due_date: formatDateForBackend(editFormData.due_date),
    payment_date: formatDateForBackend(editFormData.payment_date),
  }).then(loadData)
  editOrderDialogVisible.value = false
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
            <Button
              icon="pi pi-calendar-clock"
              @click="openHistoryStatuses(data)"
              severity="secondary"
            ></Button>
            <Button icon="pi pi-pencil" @click="showEditDialog(data)" severity="info"></Button>
            <Button icon="pi pi-trash" @click="deleteOrderConfirm(data)" severity="danger"></Button>
          </div>
        </template>
      </Column>
    </DataTable>
    <ConfirmDialog></ConfirmDialog>
    <Dialog
      v-model:visible="orderStatusHistoryDialogVisible"
      modal
      header="Status History"
      :style="{ width: 'auto' }"
      resizableColumns
      columnResizeMode="expand"
    >
      <span class="text-surface-500 dark:text-surface-400 block mb-8">Status log for order</span>
      <DataTable :value="statuses" tableStyle="min-width: 50rem">
        <Column field="id" header="ID"></Column>
        <Column field="status" header="Status"></Column>
        <Column field="order_id" header="OrderID"></Column>
        <Column field="created_at" header="Date"></Column>
      </DataTable>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="orderStatusHistoryDialogVisible = false"
        ></Button>
      </div>
    </Dialog>
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
    <Dialog
      v-model:visible="editOrderDialogVisible"
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
          v-model="editFormData.category"
          :options="categories"
          optionLabel="name"
          placeholder="Select a Category"
          class="w-full md:w-56"
        />
      </div>
      <div class="card flex justify-center">
        <label for="due_date" class="font-semibold w-24">Due date</label>
        <DatePicker v-model="editFormData.due_date" id="due_date" />
      </div>
      <div class="card flex justify-center">
        <label for="payment_date" class="font-semibold w-24">Payment Date</label>
        <DatePicker v-model="editFormData.payment_date" id="payment_date" />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="editOrderDialogVisible = false"
        ></Button>
        <Button type="button" label="Save" @click="confirmEditOrder"></Button>
      </div>
    </Dialog>
  </BasicLayout>
</template>
