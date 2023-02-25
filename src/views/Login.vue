<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div class="card card-signin my-5">
                    <div class="card-body">
                        <h3 class="card-title text-center">Marketplace</h3>
                        <form class="was-validated">
                            <div class="form-group">
                                <label for="inputEmail">Username/Email</label>
                                <input type="text" 
                                        id="inputEmail" 
                                        class="form-control" 
                                        v-model="input.username" 
                                        placeholder="Enter your Username or Email" 
                                        name="email" 
                                        required 
                                        autofocus
                                >
                            </div>

                            <div class="form-group">
                                <label for="inputPassword">Password</label>
                                <input type="password" 
                                        id="inputPassword" 
                                        class="form-control" 
                                        v-model="input.password" 
                                        placeholder="Enter your Password" 
                                        name="pswd" 
                                        required
                                >
                                <div class="invalid-feedback">Enter Correct Password</div>
                            </div>
                            <button type="button" class="btn btn-lg btn-primary btn-block text-uppercase" v-on:click="login()">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login-component',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                },
                incorrectPassword: false
            }
        },
        methods: {
            login() {
                //  Supposed to post to DB and check for res status
                if(this.input.username !== "" && this.input.password !== "") {
                    if(this.input.username === this.$store.state.userInfo.username && 
                            this.input.password === this.$store.state.userInfo.password) {
                        this.$store.commit('setLoggedIn', true);
                        this.$router.push({ name: "home-component" });
                    } else {
                        this.$router.push({ name: "login-component" });
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .card-signin {
        border: 0;
        border-radius: 0.5rem;
        box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
    }

    .card-signin .card-title {
        margin-bottom: 2rem;
    }

    .card-signin .card-body {
        padding: 2rem;
    }
    .btn {
        font-size: 80%;
        border-radius: 5rem;
        letter-spacing: .1rem;
        font-weight: bold;
        padding: 1rem;
        transition: all 0.2s;
    }
    .form-group {
        position: relative;
        margin-bottom: 1rem;
    }

    .form-group input {
        height: auto;
    }


</style>