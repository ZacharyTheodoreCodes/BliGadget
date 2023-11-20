<script>
import TransactionCard from './TransactionCard.vue'
import { mapState, mapActions } from 'pinia'
import { useGlobalStore } from '../../stores/global'
export default {
  components: {
    TransactionCard
  },
  methods: {
    ...mapActions(useGlobalStore, ['fetchTransaction'])
  },
  computed: {
    ...mapState(useGlobalStore, ['allTransaction'])
  },
  created() {
    console.log(this.allTransaction)
    this.fetchTransaction('All')
  }
}
</script>

<template>
  <section id="my-order-section">
    <TransactionCard
      v-for="(transaction, index) in allTransaction"
      :key="index"
      :transaction="transaction"
    />
  </section>
</template>
