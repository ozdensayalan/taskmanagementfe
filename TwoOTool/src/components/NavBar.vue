<template>
    <nav>
        <v-snackbar v-model="snackbar" color=#004080>
            <div class="d-flex justify-space-between">
                <span>Project {{ title }} is added sucessfully</span>
                <v-icon color="white">mdi-check-circle</v-icon>
            </div>
        </v-snackbar>
        <v-app-bar flat app>
            <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-app-bar-title class="text-uppercase grey--text">
                <div class="d-flex">
                    <span class="font-weight-light" >TWO</span>
                    <img src="/pokeballl.png" height="40px">
                    <span>TOOL</span>
                </div>
            </v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn text @click="logout">
                <span>Sign out</span>
                <v-icon right>mdi-logout</v-icon>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" app color="#0054D9">
            <div class="mt-5 d-flex justify-center">
                <v-avatar size="160">
                    <img :src='avatar'>
                </v-avatar>
            </div>
            <div>
                <h2 class="white--text text-center my-3">{{ username }}</h2>
            </div>
            <v-list>
                <v-list-item v-for="link in links" :key="link.name" :to="link.route">
                    <v-list-item-action>
                        <v-icon class="white--text">{{ link.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">{{ link.name }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>
<script>
import store from '../js/store'; 

export default {
    data() {
        return {
            snackbar: false,
            drawer: false,
            title: '',
            links: [
                { icon: 'mdi-view-array', name: 'Task Lists', route: '/Dashboard' },
                { icon: 'mdi-view-list', name: 'My Tasks', route: '/projects' },
                { icon: 'mdi-account-circle', name: 'Team', route: '/team' },
            ],
            project: [{title: '',
            info: '',
            dueDate: null,
            status:'NEW',
            assign:null}]
        }
    },
    methods: {
        showSnackBar() {

            this.snackbar = true;
        },
        logout() {
      store.commit('setLoggedIn', false); 
      this.$router.push('/');
    }
    },
    computed: {
    isLoggedIn() {
      return store.state.isLoggedIn;
    },
    username() {
      return store.state.username; 
    },
    avatar() {
      return store.state.avatar;
    },
    isAdmin() {
      return store.state.role==='admin';
    },
  }
}
</script>

<style>
.v-app-bar-title__placeholder, .v-app-bar-title__content {
    text-overflow: clip !important;
    overflow: visible !important;
}
</style>