// store.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authToken: null,
        user: null,
    },
    mutations: {
        setAuthToken(state, token) {
            state.authToken = token;
            localStorage.setItem('authToken', token);
        },
        setUser(state, user) {
            state.user = user;
        },
        clearAuthToken(state) {
            state.authToken = null;
            localStorage.removeItem('authToken');
        },
        clearUser(state) {
            state.user = null;
        },
    },
    actions: {
        // You can add more actions here based on your application requirements
    },
});
