<template>

<nav v-if="isLoggedIn" class="navbar navbar-expand-sm navbar-dark bg-dark">
    <ul class="navbar-nav">
        <li class="nav-item active">
            <a class="nav-link">Welcome, {{ getName }}</a>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" to="/home">Home</router-link>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="navbardrop" data-toggle="dropdown">
                Settings
            </a>
            <div class="dropdown-menu">
                <router-link class="dropdown-item" to="/account">Account</router-link>
                <router-link class="dropdown-item" to="/changepassword">Change Password</router-link>
                <router-link class="dropdown-item" to="/login" v-on:click.native="logout()" replace>Logout</router-link>
            </div>
        </li>
    </ul>
</nav>

</template>

<script>
export default {
    name: 'header-component',
    computed: {
        isLoggedIn() {
            return this.$store.getters.getLoggedIn;
        },
        getName () {
			let name = this.$store.getters.getName;
			
			if (name === '') {
				return 'User';
			} else {
				return name;
			}
		}
    },
    methods: {
        logout () {
            this.$router.push({ name: 'login-component' });
			this.$store.commit('setLoggedIn', false);
        },
        showPassModal() {
            this.$store.commit('showChangePasswordModal', true);
        }
    }
}
</script>

<style>
.navbar {
    background-color: #e3f2fd;
}
</style>