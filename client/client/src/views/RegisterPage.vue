<script>
import { mapActions } from 'pinia'
import { useGlobalStore } from '../stores/global'

export default {
  data() {
    return {
      register: {
        name: '',
        email: '',
        password: '',
        phoneNumber: ''
      }
    }
  },
  methods: {
    ...mapActions(useGlobalStore, ['registerHandler'])
  }
}
</script>

<template>
  <section class="bg-gray-50" id="register-section">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
          >
            Create an account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="registerHandler(register)">
            <div>
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Name</label>
              <input
                v-model="register.name"
                type="text"
                id="register-username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter your username ..."
                autocomplete="off"
              />
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
                >Your email</label
              >
              <input
                type="email"
                id="register-email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
                autocomplete="off"
                v-model="register.email"
              />
            </div>
            <div>
              <label for="phone-number" class="block mb-2 text-sm font-medium text-gray-900"
                >Phone Number</label
              >
              <input
                v-model="register.phoneNumber"
                type="text"
                id="register-phone"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter your phone-number ..."
                autocomplete="off"
              />
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900"
                >Password</label
              >
              <input
                type="password"
                id="register-password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                autocomplete="off"
                v-model="register.password"
              />
            </div>
            <button
              type="submit"
              class="w-full text-white bg-[#176B87] hover:bg-[#04364A] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create an account
            </button>
            <p class="text-sm font-light text-gray-500">
              Already have an account?
              <a href="#" class="font-medium hover:underline" @click="$router.push('/login')"
                >Login here</a
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
