import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginComponent from '../views/Login'
import HomeComponent from '../views/Home'
import AccountComponent from '../views/Account'
import ChangePasswordComponent from '../views/ChangePassword'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: "login-component",
            component: LoginComponent
        },
        {
            path: "/home",
            name: "home-component",
            component: HomeComponent
        },
        {
            path: "/account",
            name: "account-component",
            component: AccountComponent
        },
        {
            path: "/changepassword",
            name: "changepassword-component",
            component: ChangePasswordComponent
        }
    ]
})