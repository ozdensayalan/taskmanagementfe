import Vue from "vue";
import VueRouter from "vue-router";

import DashBoard from '@/pages/DashBoard.vue';
import MyProjects from '@/pages/MyProjects.vue';
import TheTeam from '@/pages/TheTeam.vue';
import LogIn from '@/pages/LogIn.vue';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: LogIn },
        { path: '/DashBoard', component: DashBoard },
        { path: '/projects', component: MyProjects },
        { path: '/team', component: TheTeam },
    ]
})