<script>
import { mapState, mapActions } from 'pinia'
import { useGlobalStore } from '../stores/global'

import GadgetCard from '../components/HomePage/GadgetCard.vue'
import HeaderItem from '../components/HomePage/Header-item.vue'
import SearchBar from '../components/HomePage/SearchBar.vue'

export default {
  components: {
    GadgetCard,
    HeaderItem,
    SearchBar
  },
  data() {},
  methods: {
    ...mapActions(useGlobalStore, ['fetchGadgets'])
  },
  computed: {
    ...mapState(useGlobalStore, ['gadgets'])
  },
  created() {
    this.fetchGadgets()
  }
}
</script>

<template>
  <section>
    <HeaderItem />

    <section>
      <div id="background-img"></div>
      <div class="max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 mx-auto">
        <div class="max-w-[2000px] gap-8 flex items-center">
          <h2 class="text-3xl font-bold sm:text-4xl text-[#176B87]">Products</h2>
          <SearchBar />
        </div>
        <p v-if="gadgets.length === 0" class="text-xl text-center mt-16">No matching product</p>
        <div
          v-else
          class="mt-8 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 md:gap-4 lg:grid-cols-3 justify-items-center"
        >
          <GadgetCard v-for="gadget in gadgets" :key="gadget.id" :gadget="gadget" />
        </div>
      </div>
    </section>
  </section>
</template>
