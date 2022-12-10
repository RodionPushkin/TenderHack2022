import {createStore} from 'vuex'

export default createStore({
    state: {
        isFirstLoad: true,
    },
    getters: {
        ISFIRSTLOAD: state => {
            return state.isFirstLoad
        }
    },
    mutations: {
        SET_IS_FIRST_LOAD: (state, payload) => {
            state.isFirstLoad = payload
        }
    },
    actions: {
        SET_IS_FIRST_LOAD: (context, payload) => {
            context.commit('SET_IS_FIRST_LOAD', payload);
        }
    },
    modules: {}
})
