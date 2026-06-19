import App from '@/App.vue'
import Home from '../Home.vue'
import Friends from '../Friends.vue'
import Message from '../Message.vue'
import Search from '../Search.vue'
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/friends',
        component: Friends
    },
    {
        path: '/messages',
        component: Message
    },
    {
        path: '/search/:keyword',
        component: Search
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router