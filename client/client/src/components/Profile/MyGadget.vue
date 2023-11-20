<script>
import GadgetCard from './GadgetCard.vue'
import { mapState, mapActions } from 'pinia'
import { useGlobalStore } from '../../stores/global'
export default {
  components: {
    GadgetCard
  },
  methods: {
    ...mapActions(useGlobalStore, ['fetchTransaction'])
  },
  computed: {
    ...mapState(useGlobalStore, ['paidTransaction'])
  },
  created() {
    this.fetchTransaction('Paid')
  }
}
</script>

<template>
  <section id="my-gadget-section">
    <section>
      <div class="mx-auto max-w-screen-xl px-4 py-8">
        <div class="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3">
          <GadgetCard
            v-for="transaction in paidTransaction"
            :key="transaction.id"
            :transaction="transaction"
          />
        </div>
      </div>
    </section>
  </section>
</template>
