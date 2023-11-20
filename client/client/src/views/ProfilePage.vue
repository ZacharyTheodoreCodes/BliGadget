<script>
import MyGadget from '../components/Profile/MyGadget.vue'
import MyOrder from '../components/Profile/MyOrder.vue'
import { mapWritableState, mapState } from 'pinia'
import { useGlobalStore } from '../stores/global'

export default {
  components: {
    MyGadget,
    MyOrder
  },
  computed: {
    ...mapWritableState(useGlobalStore, ['profileContent', 'fetchCustomerData']),
    ...mapState(useGlobalStore, ['customer'])
  },
  methods: {
    switchContent(content) {
      this.profileContent = content
    }
  },
  created() {
    this.fetchCustomerData()
  }
}
</script>

<template>
  <section id="">
    <ul class="flex border-b border-gray-100">
      <li class="flex-1">
        <a @click.prevent="switchContent('my-order')" class="relative block p-4" href="">
          <span
            v-if="profileContent === 'my-order'"
            class="absolute inset-x-0 -bottom-px h-px w-full bg-[#176B87]"
          ></span>
          <div class="flex items-center justify-center">
            <span class="ml-3 text-sm font-medium text-gray-900"> Order History </span>
          </div>
        </a>
      </li>

      <li class="flex-1">
        <a @click.prevent="switchContent('my-gadget')" class="relative block p-4" href="">
          <span
            v-if="profileContent === 'my-gadget'"
            class="absolute inset-x-0 -bottom-px h-px w-full bg-[#176B87]"
          ></span>

          <div class="flex items-center justify-center">
            <span class="ml-3 text-sm font-medium text-gray-900"> My Gadget </span>
          </div>
        </a>
      </li>
    </ul>

    <div id="profile" class="flex justify-center my-4">
      <div class="my-auto">
        <h1 class="text-2xl font-bold border-b-2 border-[#64CCC5] my-2 text-center">
          Profile Info:
        </h1>
        <p class="text-md">Name : {{ customer.name }}</p>
        <p class="text-md">Email : {{ customer.email }}</p>
        <p class="text-md">Phone Number: {{ customer.phoneNumber }}</p>
      </div>
    </div>

    <MyOrder v-if="profileContent === 'my-order'" />

    <MyGadget v-if="profileContent === 'my-gadget'" />
  </section>
</template>
