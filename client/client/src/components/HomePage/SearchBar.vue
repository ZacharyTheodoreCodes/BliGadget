<script>
import { mapState, mapActions } from 'pinia'
import { useGlobalStore } from '../../stores/global'
export default {
  computed: {},
  data() {
    return {
      filter: ''
    }
  },
  methods: {
    ...mapActions(useGlobalStore, ['fetchGadgets', 'updateFilter']),
    doSearch() {
      this.updateFilter(this.filter)
      this.fetchGadgets()
    }
  }
}
</script>

<template>
  <form @submit.prevent="doSearch" class="  w-full border-2 rounded ">
    <div class="flex">
      <div class="relative h-[45px] w-full">
        <input
          class="w-full h-full p-4"
          type="search"
          id="search-dropdown"
          placeholder="Search by name"
          v-model="filter"
        />
        <button
          type="submit"
          class="absolute top-0 right-0 px-4 text-sm font-medium h-full text-white bg-[#176B87] hover:opacity-60 transition-opacity duration-100 rounded-r-lg hover:bg-[#04364A]"
        >
          <i class="fa-solid fa-magnifying-glass"></i>
          <span class="sr-only">Search</span>
        </button>
      </div>
    </div>
  </form>
</template>
