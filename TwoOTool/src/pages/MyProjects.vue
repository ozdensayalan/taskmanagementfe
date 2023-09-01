<template>
    <div>
        <h1 class="grey--text">My Tasks</h1>
        <v-container>
             <v-snackbar v-model="snackbar" color="indigo">
        </v-snackbar>
            <v-expansion-panels>
                <v-expansion-panel v-for="project in myProjects" :key="project.id">
                    <v-expansion-panel-header class="d-flex justify-left mb-2" :style="{ 'font-weight': 'bold' }">{{  project.title }}</v-expansion-panel-header>
                    <h5 class="d-flex justify-center mb-2">Due Date: {{ formatDueDate(project.dueDate) }}</h5>
                    <v-expansion-panel-content>
                        <p>{{ project.info }}</p>
                    </v-expansion-panel-content>
                    <div class="d-flex justify-end mb-2">
                        <div class="mr-4"> 
                             <pop-up :initialContent="project" @editProject="editProject"></pop-up>
                        </div>
                    </div>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-container>
    </div>
</template>

<script>
import PopUp from '../components/EditPopup.vue';
import store from '../js/store'; 
import axios from 'axios';

import { format } from 'date-fns';
import { mapMutations } from 'vuex'; 

export default {
    emits: ['editProject'],
    components: {
        PopUp
    },
    data() {
        return {
            myProjects: []
        }
    },
    watch: {
    myProjects: {
      deep: true,
      handler() {
        this.getTasks();
      }
    }
  },
    methods: { 
        ...mapMutations(['setLoggedIn']),     
        async getTasks(){
            const tasks = {
        id: store.state.id
      };
        try {
            const response = await axios.get('http://localhost:8080/myTasks', {
            params: tasks
        });
            this.myProjects=response.data
 
      } catch (error) {
        console.error(error);
      }
    } ,
     formatDueDate(dueDate) {
      return format(new Date(dueDate), 'dd-MM-yyyy');
    },
    },
    created() {
        this.getTasks();
    }
}
</script>
<style>
.mr-4 {
  margin-right: 10rem;
}
</style>