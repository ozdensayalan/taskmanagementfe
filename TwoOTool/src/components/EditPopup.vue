<template>
    <v-dialog max-width="600px" v-model="dialog">
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on">Edit Task</v-btn>
        </template>
        <v-form ref="form">
            <v-card>
                <v-card-title>Edit Task</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pt-5 pb-0">
                    <v-text-field label="Title" v-model="task.title" outlined color="#0074D9"></v-text-field>
                    <v-textarea label="Information" v-model="task.info" rows="3" outlined color="#0074D9"></v-textarea>
                    <v-select v-model="task.assign" :items="items" item-text="name" item-value="id" label="Assign" outlined color="#0074D9"></v-select>
                    <v-select v-model="task.status" :items="taskstatus" item-text="status" item-value="id" label="Status" outlined color="#0074D9"></v-select>
                    <v-menu v-model="dateMenu" :close-on-content-click="false">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="task.dueDate" label="Due date" readonly outlined v-bind="attrs"
                                v-on="on" color="#0074D9"></v-text-field>
                        </template>
                        <v-date-picker v-model="task.dueDate" @input="dateMenu = false" color="#0074D9"></v-date-picker>
                    </v-menu>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-action class="d-flex justify-end pa-3">
                    <v-btn color="#0074D9"  style="color: white; width: 110px; height: 25px" @click="validate">Edit Project</v-btn>
                    <v-btn color="#0074D9"  style="color: white; width: 80px; height: 25px" @click="closePopup">Cancel</v-btn>
                </v-card-action>
            </v-card>
        </v-form>
    </v-dialog>
</template>
<script>

import TeamService from '../services/TeamService';

import TaskService from '../services/TaskService';

import axios from 'axios';

export default {
    props: ['initialContent'],
    data() {
        return {
            dialog: false,
            dateMenu: false,
            title: '',
            info: '',
            dueDate: null,
            selectedItem: null,
        items: [],
        taskstatus: [],
            inputRules: [
                v => v.length > 0 || 'Please provide the input'
            ],

            task: {
                id: this.initialContent.id,
                title: this.initialContent.title,
                info: this.initialContent.info,
                status: this.initialContent.status,
                assign:this.initialContent.assign,
                dueDate:this.initialContent.dueDate
        }
        }
    },
    methods: {
        validate() {
            if (this.$refs.form.validate()) {
                this.$emit('editProject', this.task);
                this.dialog = false;
            }
            try {
                const response = axios.post('http://localhost:8080/tasks', this.task);
                console.log('Response:', response.data);
            } catch (error) {
                console.error('Error:', error);
            }
            this.dialog = false,
            this.dateMenu= false,
            this.$emit('editProject', this.task);
        },
        closePopup() {
            if (this.$refs.form.validate()) {
                this.dialog = false;
            }
            this.$router.push('/projects');
        },
        getEmployees(){
                TeamService.getEmployees().then((response)=>{
                    this.items=response.data;
                });
            },
        getTaskStatus(){
            TaskService.getTaskStatus().then((response)=>{
                    this.taskstatus=response.data;
                });
            },
    },
        created() {
            this.getEmployees(),
            this.getTaskStatus();
        }
}
</script>
