<template>
    <v-dialog max-width="600px" v-model="dialog">
        <template v-slot:activator="{ on, attrs }">
            <v-btn style="width: 30px; height: 15px;  background-color: #0074D9;" v-bind="attrs" v-on="on" >
                <span style="font-size: 10px; color: white;">Edit</span>
            </v-btn>
        </template>
        <v-form ref="form">
            <v-card>
                <v-card-title>Edit Member</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pt-5 pb-0">
                    <v-text-field label="Name" v-model="employee.name" outlined color="#0074D9"></v-text-field>
                    <v-select v-model="employee.title" :items="titles" item-text="title" item-value="id" label="Title" outlined color="#0074D9"></v-select>
                    <v-text-field label="Email" v-model="employee.email" outlined color="#0074D9"></v-text-field>
                    <v-text-field label="Phone" v-model="employee.phone" outlined color="#0074D9"></v-text-field>
                    <div id="app">
    <AvatarComboBox v-model="employee.avatar" @avatarSelected="setEmployeeAvatar" />
  </div>
                    <v-text-field label="Username" v-model="employee.userName" outlined color="#0074D9"></v-text-field>
                    <v-text-field label="Password" v-model="employee.password" outlined color="#0074D9"></v-text-field>
                    <label for="checkbox">Admin: </label>
                    <input
                        v-text="admin"
                        type="checkbox"
                        v-model="employee.admin"
                        true-value="yes"
                        false-value="no" />
                </v-card-text>
                <v-divider></v-divider>
                <v-card-action class="d-flex justify-end pa-3">
                    <v-btn color="#0074D9"  style="color: white; width: 110px; height: 25px" @click="validate">Edit Member</v-btn>
                    <v-btn color="#0074D9"  style="color: white; width: 80px; height: 25px" @click="closePopup">Cancel</v-btn>
                </v-card-action>
            </v-card>
        </v-form>
    </v-dialog>
</template>
<script>

import TeamService from '../services/TeamService';
import axios from 'axios';
import AvatarComboBox from './AvatarComboBox.vue';

export default {
    components: {
    AvatarComboBox,
  },
    props: ['initialContent'],
    data() {
        return {
            selectedAvatar: null,
            dialog: false,
            dateMenu: false,
            title: '',
            titles : [],  
            info: '',
        items: [],
            inputRules: [
                v => v.length > 0 || 'Please provide the input'
            ],

            employee: {
                id: this.initialContent.id,
                avatar: this.initialContent.avatar,
                email: this.initialContent.email,
                name: this.initialContent.name,
                password:this.initialContent.password,
                phone:this.initialContent.phone,
                title:this.initialContent.title,
                userName:this.initialContent.userName,
                admin:this.initialContent.admin
            }
        }
    },
    methods: {    setEmployeeAvatar(selectedAvatar) {
      this.employee.avatar = selectedAvatar;
    },
        validate() {
            if (this.$refs.form.validate()) {
                this.$emit('editMember', this.employee);
                this.dialog = false;
            }
            try {
                const response = axios.post('http://localhost:8080/employees', this.employee);
                console.log('Response:', response.data);
            } catch (error) {
                console.error('Error:', error);
            }
            this.dialog = false,
            this.dateMenu= false,
            this.$emit('editMember', this.employee);
        }, 
        closePopup() {
            if (this.$refs.form.validate()) {
                this.dialog = false;
            }
        },
        getEmployees(){
                TeamService.getEmployees().then((response)=>{
                    this.items=response.data;
                });
            },
        getTitles(){
                TeamService.getTitles().then((response)=>{
                    this.titles=response.data;
                });
            }
    },
        created() {
            this.getEmployees(),
            this.getTitles();
        }
}
</script>
