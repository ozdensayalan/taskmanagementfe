<template>
    <div>
        <h1 class="grey--text ml-3 mb-4">Task Lists</h1>
        <v-layout class="ml-3">
            <div class="float-left">
                <v-btn depressed class="mb-4 mr-3" @click="sortBy('title')">
                    <span>Sort</span>
                    <v-icon right>mdi-message</v-icon>
                </v-btn>
                <v-btn depressed class="mb-4" @click="sortBy('assign')">
                    <span>Sort</span>
                    <v-icon right>mdi-account</v-icon>
                </v-btn>
            </div>
            <div class="popup-container" v-if="isAdmin">
                        <div class="mr-4"> 
                             <pop-up @addedProject="addedProject"></pop-up>
                        </div>
                    </div>
        </v-layout>
        <v-container>
            <v-card v-for="project in projects" :key="project.id" :class="`project ${project.report}`">
                <v-layout row wrap class="mx-4 mb-8 pa-4">
                    <v-flex xs6 sm4 md2 class="pb-1">
                        <div class="caption grey--text">Task Title</div>
                        <div>{{ project.title }}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md2 class="pb-1">
                        <div class="caption grey--text">Assing To</div>
                        <div>{{ project.assign }}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md2 class="pb-1">
                        <div class="caption grey--text">Status</div>
                        <div>{{ project.status }}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md2 class="pb-1">
                        <div class="caption grey--text">Due Date</div>
                        <div>{{ project.dueDate }}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md2 class="pb-1">
                        <v-chip :class="`white--text ${project.report}`">{{ project.report }}</v-chip>
                    </v-flex>
                    <v-flex xs6 sm4 md2 class="pb-1 d-flex align-center justify-sm-end">
                        <v-btn color="#0074D9" style="width: 30px; height: 15px;" v-if="isAdmin" @click="deleteRecord(project.id)">            
                            <span style="font-size: 10px; color: white;">Delete</span>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-container>
    </div>
</template>

<script>

import store from '../js/store'; 
import axios from 'axios';
import PopUp from '../components/PopUp.vue';

export default {
    emits: ['addedProject'],
        components: {
        PopUp
    },
    data() {
        return {
            projects: []
        }
    },
    created() {
        this.getTasks();
    },
    methods: {
        sortBy(prop) {
            this.projects.sort((a,b) => a[prop] < b[prop]? -1 : 1);
        },       
        async getTasks(){
            const tasks = {
        id: store.state.id
      };
        try {
            const response = await axios.get('http://localhost:8080/taskById', {
            params: tasks
        });
            this.projects=response.data
        
      } catch (error) {
        console.error(error);
      }
    },
    deleteRecord(id) {
      axios.delete(`http://localhost:8080/deleteTask?id=${id}`)
        .then(response => {
          console.log('Kullanıcı başarıyla silindi:', response);
        })
        .catch(error => {
          console.error('Kullanıcı silme hatası:', error);
        });
    }
  },
  watch: {
    projects: {
      deep: true,
      handler() {
        this.getTasks();
      }
    }
  },    
    computed: {
    isAdmin() {
      return store.state.admin==='yes';
    },
  }
}
</script>

<style>
.popup-container {
  position: absolute;
  top: 20px; 
  right: 20px; 
}
.project.completed {
    border-left: 4px solid turquoise;
}

.project.ongoing {
    border-left: 4px solid orange;
}

.project.overdue {
    border-left: 4px solid tomato;
}

.v-chip.completed {
    background: turquoise !important;
}
.v-chip.ongoing {
    background: orange !important;
}
.v-chip.overdue {
    background: tomato !important;
}
</style>



