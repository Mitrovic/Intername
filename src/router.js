import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/UserLogin.vue'
import Dashboard from './components/UserDashboard.vue'
import BookView from './components/BookView.vue';
import BookEdit from './components/BookEdit.vue';
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard,
            props: {}
        },
        {
            path: '/book/:id',
            name: 'book-view',
            component: BookView,
        },
        {
            path: '/book/:id/edit',
            name: 'book-edit',
            component: BookEdit,
        },
    ]
})