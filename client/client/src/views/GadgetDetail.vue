<script>
import { mapState, mapActions } from 'pinia'
import { useGlobalStore } from '../stores/global'
import ReviewCard from '../components/GadgetDetail/Review-item.vue'

export default {
  components: {
    ReviewCard
  },
  methods: {
    ...mapActions(useGlobalStore, ['fetchGadgetDetail', 'fetchYoutubeVideos', 'paymentHandler','formattedPrice']),
    orderHandler() {
      this.paymentHandler(this.$route.params.id, this.gadget.price, 'new')
    }
  },
  computed: {
    ...mapState(useGlobalStore, ['gadget', 'videoUrl'])
  },
  async created() {
    await this.fetchGadgetDetail(this.$route.params.id)
    this.fetchYoutubeVideos(this.gadget.name)
  }
}
</script>

<template>
  <section id="product-detail-section">
    <section>
      <div class="relative mx-auto max-w-screen-xl px-4 py-8">
        <div class="flex gap-4 items-center py-3 content-center border-b-2 border-[#64CCC5]">
          <h1 class="text-2xl font-bold lg:text-3xl">{{ gadget.name }}</h1>
          <span class="bg-[#176B87] rounded-full p-2 text-sm font-semibold text-white">
            #&nbsp;{{ gadget.type }}</span
          >
        </div>
        <div class="grid gap-8 lg:grid-cols-4 lg:items-start">
          <div class="lg:col-span-3">
            <div class="relative mt-4">
              <img
                alt="Tee"
                :src="gadget.imgUrl"
                class="h-72 w-full rounded-xl lg:h-[300px] object-contain"
              />
            </div>
          </div>

          <div>
            <form class="space-y-4">
              <h2 class="text-xl my-5 font-bold">About Product</h2>
              <p>{{ gadget.description }}</p>
              <div>
                <p class="mt-10 pt-2 border-t-2">Start From</p>
                <p class="text-xl font-bold"> {{formattedPrice(gadget.price) }}</p>

                <button
                  @click.prevent="orderHandler"
                  type="button"
                  id="pay-button"
                  class="w-full border mt-6 border-gray-300 bg-[#176B87] hover:bg-[#04364A] rounded-md hover-opacity-60 text-white px-6 py-3 text-sm font-bold tracking-wide"
                >
                  Order Now
                </button>
              </div>
            </form>
          </div>

          <div class="lg:col-span-3">
            <div
              class="prose max-w-none [&>iframe]:mt-6 [&>iframe]:aspect-video [&>iframe]:w-full [&>iframe]:rounded-xl"
            >
              <h2 class="text-2xl my-5 font-bold">Specification</h2>

              <ul>
                <li v-for="(specification, index) in gadget.specification.split(`\n`)" :key="index">
                  {{ specification }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <h2 class="text-2xl my-5 font-bold">Video Review</h2>

        <div class="h-[600px] w-full" v-if="videoUrl">
          <iframe
            :src="videoUrl"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>

        <div class="bg-slate-400"></div>
      </div>
      <section id="review-section">
        <section class="bg-white">
          <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-24 lg:px-8">
            <div class="mx-auto max-w-xl text-center">
              <h2 class="text-4xl font-bold tracking-tight sm:text-xl border-b-2 pb-4">
                Review customer tentang {{ gadget.name }}
              </h2>
            </div>
            <p v-if="gadget.Reviews.length === 0" class="text-center text-md mt-16">
              No reviews for this item yet.
            </p>
            <div
              v-else
              class="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-16 lg:grid-cols-3"
            >
              <ReviewCard v-for="(review, index) in gadget.Reviews" :key="index" :review="review" />
            </div>
          </div>
        </section>
      </section>
    </section>
  </section>
</template>
