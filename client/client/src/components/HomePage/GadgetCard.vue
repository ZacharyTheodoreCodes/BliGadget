<script>
import { mapState, mapActions } from 'pinia'
import { useGlobalStore } from '../../stores/global'

export default {
  props: ['gadget'],
  methods: {
    ...mapActions(useGlobalStore, ['formattedPrice'])
  }
}
</script>

<template>
  <div
    class="shadow-lg border border-[#DAFFFB] bg-white rounded-lg flex items-start cursor-pointer mb-10"
  >
    <router-link
      :to="`/gadget/${gadget.id}`"
      id="gadget"
      class="group block overflow-hidden rounded-xl"
    >
      <img
        alt="Gadget"
        :src="gadget.imgUrl"
        class="h-[200px] w-full object-contain transition-transform duration-500 group-hover:scale-110 sm:h-[300px]"
      />

      <div class="relative p-5">
        <h3
          class="font-bold text-2xl text-gray-700 group-hover:underline group-hover:underline-offset-4"
        >
          {{ gadget.name }}
        </h3>
        <span
          class="inline-block bg-[#176B87] rounded-full px-3 py-1 text-sm font-semibold text-slate-100 mr-2 mb-2 mt-2"
        >
          #&nbsp;{{ gadget.type }}</span
        >
        <div id="description">
          <p class="text-md my-4 text-justify">{{ gadget.description }}</p>
        </div>
        <!-- <p>
          <span class="tracking-wider text-xl font-bold"> Start Fr. </span>
        </p> -->
        <p class="my-1">
      
          <span class="tracking-wider text-xl font-bold">
         {{formattedPrice(gadget.price) }}
          </span>
        </p>
      </div>
    </router-link>
  </div>
</template>
