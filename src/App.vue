<template>
    <div id="app">
        <header-component></header-component>
        <router-view></router-view>
    </div>
</template>

<script>
import HeaderComponent from './views/Header'

export default {
    name: 'App',
    components: {
        'header-component': HeaderComponent
    },
    mounted() {
        if(!this.$store.getters.getLoggedIn) {
            this.$router.replace({ name: "login-component" });
        }
    },
    methods: {
    }
}
</script>

<style>
    body {
        background-color: #F0F0F0;
    }
    #app {
        margin: auto;
    }
</style>