import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLoggedIn: false,
    username: '',
    password: '',
    avatar: '',
    id: 0,
    admin:'',
    showBtn: true,
    showEBtn: false,
  },
  mutations: {
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
    setUsername(state, username) {
      state.username = username;
    },
    setPassword(state, password) {
      state.password = password;
    },
    setAvatar(state, avatar) {
      state.avatar = avatar;
    },
    setId(state, id) {
      state.id = id;
    },   
    setAdmin(state, admin) {
      state.admin = admin;
    },
  },
});

export default store;