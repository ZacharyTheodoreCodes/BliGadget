<script>
export default {
  props: ['transaction']
}
</script>

<template>
  <a
    class="rounded-lg relative block overflow-hidden group border border-[#DAFFFB] shadow-lg shadow-[#04364A]"
  >
    <img
      :src="transaction.Gadget.imgUrl"
      alt="Car-Photo"
      class="h-[200px] w-full object-contain transition-transform duration-500 group-hover:scale-110 sm:h-[300px]"
    />

    <div class="relative p-6 bg-white border border-gray-100">
      <span
        class="whitespace-nowrap bg-green-400 rounded-full px-6 py-1.5 text-xs font-medium text-green-800"
      >
        Paid
      </span>

      <h3 class="mt-4 text-lg font-medium text-gray-900">{{ transaction.Gadget.name }}</h3>

      <form v-if="!transaction.Review" class="mt-4">
        <button
          @click.prevent="this.$router.push(`/review/${transaction.id}`)"
          class="block w-full p-4 text-sm font-medium transition bg-[#176B87] text-white rounded hover:scale-105"
        >
          Review this product
        </button>
      </form>
    </div>
  </a>
</template>
