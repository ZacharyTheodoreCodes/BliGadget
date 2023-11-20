<script>
import { mapActions } from 'pinia'
import { useGlobalStore } from '../../stores/global'
export default {
  props: ['transaction'],
  methods: {
    ...mapActions(useGlobalStore, ['cancelTransaction', 'paymentHandler'])
  }
}
</script>

<template>
  <div
    v-if="transaction.status === 'Paid'"
    id="transaction"
    class="flex items-center justify-between p-4 mx-60 my-4 rounded-lg border-2 bg-[#DAFFFB]"
  >
    <div>
      <p class="font-bold text-xl">{{ transaction.Gadget.name }}</p>
      <p>Booking Fee: IDR {{ transaction.Gadget.price }}</p>
    </div>
    <p class="py-1 px-1 text-green-600">Paid</p>
  </div>

  <div
    v-if="transaction.status === 'Pending'"
    id="transaction"
    class="flex items-center justify-between p-4 mx-60 my-4 rounded-lg border-2 bg-orange-100"
  >
    <div>
      <p class="font-bold text-xl">{{ transaction.Gadget.name }}</p>
      <p>Booking Fee: IDR {{ transaction.Gadget.price }}</p>
    </div>
    <p
      @click.prevent="paymentHandler(transaction.id, transaction.Gadget.price, 'existed')"
      class="mr-4 ml-auto cursor-pointer bg-green-500 py-1 px-6 rounded-lg text-white w-30 text-center hover:bg-green-600"
    >
      Pay
    </p>
    <p
      @click.prevent="cancelTransaction(transaction.id)"
      class="cursor-pointer bg-red-500 py-1 px-6 rounded-lg text-white w-30 text-center hover:bg-red-600"
    >
      Cancel
    </p>
  </div>
  <div
    v-if="transaction.status === 'Cancel'"
    id="transaction"
    class="flex items-center justify-between p-4 mx-60 my-4 rounded-lg border-2 bg-red-100"
  >
    <div>
      <p class="font-bold text-xl">{{ transaction.Gadget.name }}</p>
      <p>Booking Fee: IDR {{ transaction.Gadget.price }}</p>
    </div>
    <p class="py-1 px-1 text-red-600">Canceled</p>
  </div>
</template>
