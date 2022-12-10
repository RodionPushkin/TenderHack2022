import {createRouter, createWebHistory} from 'vue-router'
import api from "@/api/index.js";

const authGuard = async (to, from, next) => {
    let isAuthorized = false
    if (localStorage.getItem('token')) {
        let auth = await api.get(`user?token=${localStorage.getItem('token')}`).then(r => r)
        isAuthorized = auth.length > 0
    }
    if (isAuthorized) {
        if (to.path == "/auth") {
            next({path: "/panel"})
        } else {
            next()
        }
    } else {
        if (to.path == "/auth") {
            next()
        } else if (to.path == "/panel") {
            next({ path: "/auth" })
        }
    }
};
const routes = [
    {
        path: '/',
        name: 'главная',
        component: () => import('../views/home/index.vue')
    },
    {
        path: '/auth',
        name: 'вход',
        beforeEnter: authGuard,
        component: () => import('../views/auth/index.vue')
    },
    {
        path: '/panel',
        name: 'панель',
        beforeEnter: authGuard,
        component: () => import('../views/panel/index.vue')
    },
    {path: '/:pathMatch(.*)*', component: () => import('../views/404/index.vue')}
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
