<template>
  <v-app>
    <Navbar v-if="isLoggedIn"/>
    <v-main class="ma-5">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/NavBar.vue'
import store from './js/store'; 

export default {
  components: {
    Navbar,
  }, 
  computed: {
    isLoggedIn() {
      return store.state.isLoggedIn;
    },
  },
  }
</script>