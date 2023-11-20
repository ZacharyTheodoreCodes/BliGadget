<script>
import { mapState, mapActions } from 'pinia'
import { useGlobalStore } from '../stores/global'
export default {
  computed: {
    ...mapState(useGlobalStore, ['isLoggedIn'])
  },
  methods: {
    ...mapActions(useGlobalStore, ['logoutHandler'])
  }
}
</script>
<template>
  <section id="navbar" class="sticky top-0 bg-[#04364A] z-50 bg-opacity-90 h-16 shadow-md py-3">
    <header aria-label="Site Header">
      <div class="mx-auto flex max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <span class="sr-only">Home</span>
        <div class="flex gap-2">
          <i class="fa-solid fa-headphones" style="color: #ffffff"></i>
          <p class="text-center font-bold text-white">BliGadget</p>
        </div>

        <div class="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Site Nav" class="hidden md:block">
            <ul class="flex items-center gap-6 text-sm">
              <li>
                <router-link to="/" class="text-sm transition hover:font-bold text-white" href="/">
                  Products
                </router-link>
              </li>

              <li>
                <router-link
                  to="/stores"
                  class="text-sm transition hover:font-bold text-white"
                  href="/"
                >
                  Our Stores
                </router-link>
              </li>
            </ul>
          </nav>

          <div class="flex items-center gap-4">
            <div class="sm:flex sm:gap-4">
              <router-link
                v-if="!isLoggedIn"
                to="/login"
                class="block rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white hover:text-black"
                href="/"
              >
                Login
              </router-link>

              <router-link
                v-if="!isLoggedIn"
                to="/register"
                class="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-black transition hover:font-extrabold sm:block"
                href="/"
              >
                Register
              </router-link>

              <router-link
                v-if="isLoggedIn"
                to="/profile"
                class="hidden rounded-md px-5 py-2.5 text-sm font-medium text-white transition hover:font-extrabold sm:block"
                href="/"
              >
                My Profile
              </router-link>

              <router-link
                v-if="isLoggedIn"
                @click.prevent="logoutHandler"
                to="/login"
                class="block rounded-md px-5 py-2.5 text-sm font-medium text-gray-300 transition hover:font-extrabold sm:block"
                href="/"
              >
                Logout
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </header>
  </section>
</template>
