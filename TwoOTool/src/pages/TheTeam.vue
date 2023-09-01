<template >
    <div>
        <h1 class="grey--text mb-3">Team Members</h1>
        <v-layout row wrap>
            <v-flex xs12 sm6 md4 lg3 v-for="person in employees" :key="person.id"  @mouseover="hoveredIndex = person.id" @mouseleave="hoveredIndex = null">
                <v-card class="ma-4">
        <v-tooltip bottom color="black" text-color="blue" border-radius="8px" elevation="10">
        <template v-slot:activator="{ on }">
          <div @mouseover="hoveredIndex = index" @mouseleave="hoveredIndex = null" v-on="on">
            <div class="d-flex justify-center pt-4 pb-2">
              <v-avatar size="100">
                <img :src="person.avatar">
              </v-avatar>
            </div>
            <div class="d-flex justify-center">
              <v-card-title class="pa-0">{{ person.name }}</v-card-title>
            </div>
          </div>
          <div class="d-flex justify-end mb-2"  v-if="isAdmin">
                        <div class="mr-4"> 
                             <employee-edit-popup :initialContent="person" @editMember="editMember"></employee-edit-popup>
                             <v-btn style="width: 30px; height: 15px;  background-color: #0074D9;" v-if="isAdmin" @click="deleteRecord(person.id)">            
                              <span style="font-size: 10px; color: white;">Delete</span>
                            </v-btn>
                        </div>
                    </div>
        </template>
        <span>Email: {{ person.email }}</span><br>
        <span>Phone: {{ person.phone }}</span>
      </v-tooltip>
                </v-card>
            </v-flex>
        </v-layout>
        <div class="employee-popup-container" v-if="isAdmin">
                        <div class="mr-4"> 
                             <employee-pop-up @editMember="editMember"></employee-pop-up>
                        </div>
                    </div>
                    <div>
  </div>
    </div>
</template>

<script>
import TeamService from '../services/TeamService';
import EmployeeEditPopup from '../components/EmployeeEditPopup.vue';
import EmployeePopUp from '../components/EmployeePopUp.vue';
import store from '../js/store'; 
import axios from 'axios';

    export default{
        emits: ['editMember'],
        components: {
        EmployeeEditPopup,
        EmployeePopUp
    },
        name: 'EmployeeList',
        data(){
            return{
                employees : []            }
        },   
        watch: {
            employees: {
      deep: true,
      handler() {
        this.getEmployees();
      }
    }
  },    
  computed: {
    isAdmin() {
      return store.state.admin==='yes';
    }},
        methods: {
            getEmployees(){
                TeamService.getEmployees().then((response)=>{
                    this.employees=response.data;
                });
            },
        deleteRecord(id) {
      axios.delete(`http://localhost:8080/deleteUser?id=${id}`)
        .then(response => {
          console.log('Kullanıcı başarıyla silindi:', response);
        })
        .catch(error => {
          console.error('Kullanıcı silme hatası:', error);
        });
    }
        },
        created() {
            this.getEmployees();
        }
    }
</script>
<style>
.employee-popup-container {
  position: fixed;
  bottom: 20px;
  right: 20px; 
}
.custom-popup {
  width: 300px;
  height: 400px;
}
</style>