<script>
import { mapState, mapActions } from 'pinia'
import { useGlobalStore } from '../stores/global'

export default {
  methods: {
    ...mapActions(useGlobalStore, ['getTransactionDetail', 'sendReview'])
  },
  computed: {
    ...mapState(useGlobalStore, ['transactionDetail'])
  },
  async created() {
    this.getTransactionDetail(+this.$route.params.id)
  },
  data() {
    return {
      comment: ''
    }
  }
}
</script>

<template>
  <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-lg">
      <h1 class="text-center text-2xl font-bold sm:text-3xl text-[#176B87] border-b-2 py-4">
        Review Our Gadget
      </h1>

      <form
        @submit.prevent="sendReview(transactionDetail.id, comment)"
        class="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl bg-[#DAFFFB] shadow-[#04364A]"
      >
        <div class="flex">
          <div class="items-start my-auto">
            <img
              width="70"
              height="70"
              src="https://img.icons8.com/ios/50/gender-neutral-user--v1.png"
              alt="gender-neutral-user--v1"
            />
          </div>
          <div class="ml-6">
            <p class="text-lg font-medium py-1">Transaction id: {{ transactionDetail.id }}</p>
            <p class="text-sm font-medium">Customer: {{ transactionDetail.Customer.name }}</p>
            <p class="text-sm font-medium">Item: {{ transactionDetail.Gadget.name }}</p>
          </div>
        </div>

        <div>
          <label for="review" class="text-sm font-medium">Review This Product</label>

          <div class="relative mt-1">
            <textarea
              v-model="comment"
              type="text"
              id="review"
              class="w-full rounded-lg border border-[#04364A] bg-[#DAFFFB] p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter your review"
            />
          </div>
        </div>

        <button
          type="submit"
          class="block w-full rounded-lg bg-[#176B87] hover:bg-[#04364A] px-5 py-3 text-sm font-medium text-white"
        >
          Send Review
        </button>
      </form>
    </div>
  </div>
</template>
