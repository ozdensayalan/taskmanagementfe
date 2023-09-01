<template>
   <div class="template">
  <div class="login-container">
    <div class="d-flex justify-center pt-4 pb-2">
                      <v-avatar size="200">
                          <img src="/logo.png">
                      </v-avatar>
                  </div>
    <div class="input-container">
    <label for="username">Username:</label>
    <input v-model="username" id="username">
  </div>
  <div class="input-container">
      <label for="password">Password:</label>
    <input v-model="password" type="password">
  </div>
    <button @click="login" class="login-button">Login</button>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</div>
</template>
<script>

import { mapMutations } from 'vuex'; 
import store from '../js/store'; 
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
      methods: {
      ...mapMutations(['setLoggedIn']),
      async  login() {
      const employee = {
      userName: this.username,
      password: this.password
    };
      try {
          const response = await axios.get('http://localhost:8080/validateUser', {
        params: employee
      });

      if (response.data !== '') {
          const responseData =response.data
          store.commit('setUsername', this.username); 
          store.commit('setLoggedIn', true); 
          store.commit('setAvatar', responseData.avatar); 
          store.commit('setId', responseData.id); 
          store.commit('setAdmin', responseData.admin); 
          this.$router.push('/DashBoard');
      } else {
          this.errorMessage = 'Invalid username or password';
      }
    } catch (error) {
      console.error(error);
    }
    }
  }  
};
</script>

<style scoped>
.template {
  background: linear-gradient(to bottom, #0074D9, #004080, #001F3F);
    margin: 0;
    padding: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-container {
max-width: 400px;
margin: 10px auto; 
padding: 20px;
border: 1px solid #ccc;
border-radius: 5px;
background-color: #f5f5f5;
text-align: center;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
}

h1 {
color: #333;
font-size: 24px;
margin-bottom: 20px;
}

.input-field {
width: 100%;
padding: 10px;
margin-bottom: 15px;
border: 1px solid #ccc;
border-radius: 5px;
font-size: 14px;
}

.login-button {
background-color:rgb(26, 154, 234);
color: #fff;
border: none;
border-radius: 5px;
padding: 10px 15px;
cursor: pointer;
}

.error-message {
color: #ff0000;
margin-top: 10px;
}
.input-container {
display: flex;
align-items: center; /* İçerikleri dikeyde hizalar */
margin-bottom: 10px; /* İhtiyaca göre alt boşluk ekleme */
}

.input-container label {
margin-right: 10px; /* Label ile input arasına boşluk bırakma */
}
</style>