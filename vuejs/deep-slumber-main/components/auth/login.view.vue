<template>

    <form id="login-form" class="column is-one-third-desktop is-offset-one-third-desktop is-full-mobile" action="" @submit="login">

        <div class="notification is-warning" v-if="validateMsg !== ''">
            <button class="delete"></button>
            <div v-html="validateMsg"></div>
        </div>

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

        <input type="submit" class="button is-primary is-fullwidth" @click="login" value="Login" />
    </form>
</template>

<script>

    import axios from 'axios';
    import User from "../user/models/User.model.js";


    export default {
        components: {},
        props: {},
        data() {
            return {
                validateMsg: ''
            }
        },
        methods: {
            login(e) {

                e.preventDefault();
                e.cancelBubble = true;

                let that = this;
                axios.post(
                    '/api/users/login/', {
                        username: this.$refs.username.value,
                        password: this.$refs.password.value
                    }
                ).then(response => {

                    let user = new User(response.data);
                    that.$eventBus.$emit('user-changed', user);

                    this.$router.push('/');

                }).catch(error => {
                    that.validateMsg = error.response.data;
                })
            }
        }
    }
</script>
