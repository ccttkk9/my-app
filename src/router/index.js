import Vue from 'vue'
import VueRouter from "vue-router";
import Home from '../components/Home.vue'
import Work from '../components/Work.vue'
import TestPage from '../components/TestPage.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/work',
        name: 'Work',
        component: Work
    },
    {
        path: '/TestPage',
        name: 'TestPage',
        component: TestPage
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router