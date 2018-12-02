<template>
    <div id="login-form" class="column is-one-third-desktop is-offset-one-third-desktop is-full-mobile">
        <div class="field">
            <label class="label">Username</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input is-success" type="text" placeholder="Username" value="" ref="username" @keyup="checkUsernameAvailable">
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
                <span class="icon is-small is-right" v-if="usernameAvailable === true">
                    <i class="fas fa-check"></i>
                </span>
            </div>
            <p class="help is-warning" v-if="usernameAvailable === false">This username is already taken!</p>
        </div>

        <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input class="input" type="password" placeholder="Password" ref="password" @keyup="checkPassword">
                <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
                </span>
                <span class="icon is-small is-right" v-if="passwordsMatch && passwordValid">
                    <i class="fas fa-check"></i>
                </span>
            </p>
        </div>

        <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input class="input" type="password" placeholder="Repeat password" ref="password2" @keyup="checkPassword">
                <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
                </span>
                <span class="icon is-small is-right" v-if="passwordsMatch && passwordValid">
                    <i class="fas fa-check"></i>
                </span>
            </p>
        </div>
        <p class="help is-error" v-if="!passwordsMatch">Passwords do not match!</p>
        <p class="help is-error" v-if="!passwordValid">Password needs to contain at least 6 characters!</p>

        <div class="button is-primary is-fullwidth" @click="register();">Sign Up</div>
    </div>
</template>

<script>

    import axios from 'axios';
    import _ from 'lodash';


    export default {
        components: {},
        props: {},
        data() {
            return {
                usernameAvailable: null,
                passwordsMatch: true,
                passwordValid: true
            }
        },
        methods: {
            register() {
                axios.post(
                    '/api/users/register/', {
                        username: this.$refs.username.value,
                        password: this.$refs.password.value
                    }
                ).then(response => {


                }).catch(error => {
                    alert(error.response.data);
                })
            },
            checkPassword() {
                this.passwordsMatch = this.$refs.password.value === this.$refs.password2.value;
                this.passwordValid = this.$refs.password.value.length >= 6;
            },
            checkUsernameAvailable: _.debounce(function() {
                if (this.$refs.username.value === '') {
                    this.usernameAvailable = null;
                    return;
                }

                axios.get(
                    '/api/users/checkusername/?username=' + this.$refs.username.value
                ).then(response => {
                    if (response.data.available) {
                        this.usernameAvailable = true;
                    } else {
                        this.usernameAvailable = false;
                    }
                })
            }, 500)
        }
    }
</script>
