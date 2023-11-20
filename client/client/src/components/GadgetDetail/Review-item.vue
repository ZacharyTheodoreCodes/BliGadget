<script>
export default {
  props: ['review']
}
</script>

<template>
  <div class="rounded-lg border-2 border-[#04364A] shadow-sm">
    <blockquote
      id="review"
      class="flex flex-col justify-between rounded-lg p-12 text-center shadow-xl"
    >
      <p class="text-lg font-bold text-[#04364A]">{{ review.Customer.name }}</p>
      <p class="text-sm text-gray-500">"{{ review.comment }}""</p>
    </blockquote>
  </div>
</template>
