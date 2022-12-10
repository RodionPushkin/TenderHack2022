import {v4 as uuidv4} from 'uuid';
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// = new Peer(undefined, {
//     host: 'rodionpushkin.ru',
//     secure: true,
//     port: '443',
//     path: '/peerjs'
// })
const app = createApp(App).mixin({
    data() {
        return {
            componentId: uuidv4()
        }
    },
})
app.config.globalProperties.$peer = new Peer(undefined, {
    host: 'rodionpushkin.ru',
    secure: true,
    port: '443',
    path: '/peerjs'
})
app.use(store).use(router).mount('#app')
