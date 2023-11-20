<script>
import NavBar from '../src/components/NavBar-item.vue'
import { mapWritableState } from 'pinia'
import { useGlobalStore } from './stores/global'

export default {
  components: {
    NavBar
  },
  computed: {
    ...mapWritableState(useGlobalStore, ['isLoggedIn'])
  },
  created() {
    if (localStorage.access_token) {
      this.isLoggedIn = true
    } else {
      this.isLoggedIn = false
    }
  }
}
</script>

<template>
  <NavBar />
  <RouterView />
</template>

<style></style>
