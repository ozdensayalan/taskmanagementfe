<template>
    <div>
      <label for="avatar-select">Avatar :</label>
      <select id="avatar-select" v-model="selectedAvatar" @change="emitSelectedAvatar">
        <option value="" disabled>Seçim Yapınız</option>
        <option v-for="(avatar, index) in avatars" :key="index" :value="avatar">
          {{ avatar }}
        </option>
      </select>
      <div v-if="selectedAvatar">
        <img :src="require(`@/assets/avatars/${selectedAvatar}`)" alt="Seçilen Avatar" class="avatar-image" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        avatars: ['bulbasaur.png','butterfree.png', 'caterpie.png', 'charmander.png', 'jigglypuff.png', 'pidgeot.png','pikachu.png', 'squirtle.png'],
        selectedAvatar: '',
      };
    },
    methods: {
      emitSelectedAvatar() {
        this.$emit('avatarSelected', this.selectedAvatar);
      },
    },
  };
  </script>
  <style scoped>
  .avatar-image {
    width: 150px;
    height: auto; 
  }
  </style>