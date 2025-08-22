<script setup lang="ts">
import { useRoute } from 'vue-router'
import BasicLayout from '@/views/BasicLayout.vue'
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { onMounted, reactive, ref } from 'vue'
import Dialog from 'primevue/dialog'
import { useOrderItems } from '@/API/OrderItems.ts'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
import type { OrderItem } from '@/types/OrderItem.ts'

const { getOrderItems, deleteOrderItem, createOrderItem, updateOrderItem } = useOrderItems()
const orderItems = ref([])
const confirm = useConfirm()
const editOrderItemDialogVisible = ref(false)
const createOrderItemDialogVisible = ref(false)
const route = useRoute()

const createFormData = reactive<OrderItem>({
  id: 0,
  name: '',
  count: 0,
  price: 0,
  vat: 0,
  price_vat: 0,
})

const editFormData = reactive({
  id: 0,
  name: '',
  count: 0,
  price: 0,
  vat: 0,
  price_vat: 0,
})

onMounted(() => {
  fetchData()
})

const fetchData = () => {
  getOrderItems(Number(route.params.id)).then((res) => {
    orderItems.value = res.data.data
  })
}

const deleteButton = (data) => {
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
      deleteOrderItem(data.id).then(() => {
        fetchData()
      })
    },
  })
}

const showEditDialog = (data) => {
  editFormData.id = data.id
  editFormData.name = data.name
  editFormData.count = data.count
  editFormData.price = data.price
  editFormData.vat = data.vat
  editFormData.price_vat = data.price_vat
  editOrderItemDialogVisible.value = true
}

const editSubmit = () => {
  editOrderItemDialogVisible.value = false
  updateOrderItem(editFormData.id, editFormData).then(() => {
    fetchData()
  })
}

const createOrderSubmit = () => {
  createOrderItemDialogVisible.value = false
  createOrderItem(Number(route.params.id), createFormData).then(() => {
    fetchData()
  })
}
</script>

<template>
  <BasicLayout>
    <Button
      icon="pi pi-file-plus"
      @click="createOrderItemDialogVisible = true"
      severity="info"
    ></Button>
    <DataTable :value="orderItems" tableStyle="min-width: 50rem">
      <Column field="id" header="ID"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="count" header="Count"></Column>
      <Column field="price" header="Price"></Column>
      <Column field="vat" header="Vat"></Column>
      <Column field="price_vat" header="Price VAT"></Column>
      <Column class="w-24" header="Actions">
        <template #body="{ data }">
          <div class="flex flex-row gap-2 items-center">
            <Button icon="pi pi-pencil" @click="showEditDialog(data)" severity="info"></Button>
            <Button icon="pi pi-trash" @click="deleteButton(data)" severity="danger"></Button>
          </div>
        </template>
      </Column>
    </DataTable>
    <ConfirmDialog></ConfirmDialog>
    <Dialog
      v-model:visible="createOrderItemDialogVisible"
      modal
      header="Edit Profile"
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
      <div class="flex items-center gap-4 mb-8">
        <label for="count" class="font-semibold w-24">Count</label>
        <InputNumber
          v-model="createFormData.count"
          id="count"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="price" class="font-semibold w-24">Price</label>
        <InputNumber
          v-model="createFormData.price"
          id="price"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="vat" class="font-semibold w-24">VAT</label>
        <InputNumber v-model="createFormData.vat" id="vat" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="vat_price" class="font-semibold w-24">VAT price</label>
        <InputNumber
          v-model="createFormData.price_vat"
          id="vat_price"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="createOrderItemDialogVisible = false"
        ></Button>
        <Button type="button" label="Save" @click="createOrderSubmit"></Button>
      </div>
    </Dialog>
    <Dialog
      v-model:visible="editOrderItemDialogVisible"
      modal
      header="Edit Order Item"
      :style="{ width: '25rem' }"
    >
      <span class="text-surface-500 dark:text-surface-400 block mb-8"
        >Update your information.</span
      >
      <div class="flex items-center gap-4 mb-4">
        <label for="name" class="font-semibold w-24">Name</label>
        <InputText v-model="editFormData.name" id="name" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="count" class="font-semibold w-24">Count</label>
        <InputNumber v-model="editFormData.count" id="count" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="price" class="font-semibold w-24">Price</label>
        <InputNumber v-model="editFormData.price" id="price" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="vat" class="font-semibold w-24">VAT</label>
        <InputNumber v-model="editFormData.vat" id="vat" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="price_vat" class="font-semibold w-24">VAT price</label>
        <InputNumber
          v-model="editFormData.price_vat"
          id="price_vat"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="editOrderItemDialogVisible = false"
        ></Button>
        <Button type="button" label="Save" @click="editSubmit"></Button>
      </div>
    </Dialog>
  </BasicLayout>
</template>

<style scoped></style>
