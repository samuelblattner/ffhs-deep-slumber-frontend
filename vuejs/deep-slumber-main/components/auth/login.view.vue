<template>
    <div id="login-form" class="column is-one-third-desktop is-offset-one-third-desktop is-full-mobile">
        <div class="field">
            <label class="label">Username</label>
            <div class="control has-icons-left">
                <input class="input is-success" type="text" placeholder="Username" value="" ref="username">
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
            </div>
        </div>

        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="password" placeholder="Password" ref="password">
                <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
                </span>
            </p>
        </div>

        <div class="button is-primary is-fullwidth" @click="login();">Login</div>
    </div>
</template>

<script>

    import axios from 'axios';
    import User from "./models/User.model.js";


    export default {
        components: {},
        props: {},
        data() {
            return {}
        },
        methods: {
            login() {
                let that = this;
                axios.post(
                    '/api/users/login/', {
                        username: this.$refs.username.value,
                        password: this.$refs.password.value
                    }
                ).then(response => {

                    let user = new User();
                    user.username = response.data['username'];
                    that.$eventBus.$emit('user-changed', user);

                    this.$router.push('/');


                }).catch(error => {
                    alert(error);
                })
            }
        }
    }
</script>
