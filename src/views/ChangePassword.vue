<template>
<div class="pass">
    <h1>Change Password</h1>
    <form>
        <div class="form-group">
            <label for="pwd">Old Password:</label>
            <input type="password" class="form-control" v-model="input.oldPassword" id="oldPwd">
        </div>
        <div class="form-group">
            <label for="pwd">New Password:</label>
            <input type="password" class="form-control" v-model="input.newPassword" id="newPwd">
        </div>
        <div class="form-group">
            <label for="pwd">Re-enter New Password:</label>
            <input type="password" class="form-control" v-model="input.checkPassword" id="checkPwd">
        </div>
        <button type="button" class="btn btn-primary" v-on:click="change()">Submit</button>
        <span v-if="success!==null">
            <div v-if="success" class="text-success">Successfully changed password</div>
            <div v-if="!success" class="text-danger">Incorrect password/Passwords do not match</div>
        </span>
    </form>
</div>
</template>

<script>
export default {
    name: 'changepassword-component',
    data() {
        return {
            input: {
                oldPassword: "",
                newPassword: "",
                checkPassword: ""
            },
            success: null
        }
    },
    methods: {
        change() {
            if(this.input.oldPassword === this.$store.getters.getPassword &&
                this.input.newPassword === this.input.checkPassword) 
            {
                this.success = true;
                this.$store.commit('setPassword', this.input.newPassword);
            }
            else {
                this.success = false;
            }
            
        }
    }
}
</script>

<style>
.pass {
    padding: 30px;
    background-color: white;
}
</style>