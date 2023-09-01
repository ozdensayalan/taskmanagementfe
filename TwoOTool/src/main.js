import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router.js'
import store from './js/store.js'; 

new Vue({
  vuetify,
  router,
  render: h => h(App),
  store,
}).$mount('#app')
