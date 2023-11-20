<script>
export default {
  props: ['store'],
  emits: ['showOnMap'],
  methods: {
    showOnMap() {
      this.$emit('showOnMap', [+this.store.latitude, +this.store.longitude], this.store.name)
    }
  }
}
</script>

<template>
  <a
    @click.prevent="showOnMap"
    class="cursor-pointer block rounded-lg p-4 border border-[#DAFFFB] shadow-lg shadow-[#04364A]"
  >
    <div class="mt-2">
      <p class="text-xl font-bold border-b-2 py-2">{{ store.name }}</p>

      <div class="mt-3 flex items-center text-lg justify-between">
        <div class="sm:inline-flex sm:shrink-0 sm:items-center">
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/ios/50/address--v1.png"
            alt="address--v1"
          />
          <div class="mt-1.5 sm:ml-3 sm:mt-0">
            <p class="text-gray-500 text-sm">Address</p>

            <p class="text-sm">{{ store.address }} , {{ store.city }}</p>
          </div>
        </div>
        <div class="sm:inline-flex sm:shrink-0 sm:items-center">
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/ios/50/phone--v1.png"
            alt="phone--v1"
          />

          <div class="mt-1.5 sm:ml-3 sm:mt-0">
            <p class="text-gray-500 text-sm">Telephone</p>

            <p class="text-sm">{{ store.phoneNumber }}</p>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>
