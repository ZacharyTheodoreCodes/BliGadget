<script>
import StoreCard from '../components/Stores/StoreCard.vue'
import { mapActions, mapState } from 'pinia'
import { useGlobalStore } from '../stores/global'

export default {
  components: {
    StoreCard
  },
  methods: {
    ...mapActions(useGlobalStore, ['fetchStores']),
    showOnMap(coordinate, storeName) {
      if (this.marker) {
        this.map.removeLayer(this.marker)
      }
      this.marker = L.marker(coordinate).addTo(this.map)
      this.marker.bindPopup(`<b>${storeName}</b>`).openPopup()
    }
  },
  computed: {
    ...mapState(useGlobalStore, ['stores'])
  },
  created() {
    this.fetchStores()
  },
  mounted() {
    const map = L.map('map').setView([-6.227777, 106.810544], 10)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)
    this.map = map
  },
  data() {
    return {
      map: '',
      marker: ''
    }
  }
}
</script>
<template>
  <section id="location-section" class="mt-10">
    <section>
      <h2
        class="text-3xl font-bold sm:text-4xl px-8 text-center text-[#176B87] border-b-2 py-4 mx-32"
      >
        Our Location
      </h2>
      <div class="mx-auto max-w-screen-xl px-4 py-4">
        <div class="mt-3 grid grid-cols-1 gap-x-4 gap-y-8 lg:grid-cols-3 justify-center">
          <StoreCard
            v-for="store in stores"
            :key="store.id"
            :store="store"
            @showOnMap="showOnMap"
          />
        </div>

        <h2 class="text-xl text-center mt-16">Click store to view location on map</h2>

        <div id="map"></div>
      </div>
    </section>
  </section>
</template>
