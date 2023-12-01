// main.js
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios'
import vuetify from './plugins/vuetify'
import store from './store';

axios.defaults.baseURL = 'http://intername.local/';

Vue.prototype.$http = axios

const storedToken = localStorage.getItem('authToken');
if (storedToken) {
  store.commit('setAuthToken', storedToken);
}

new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  render: h => h(App)
});
