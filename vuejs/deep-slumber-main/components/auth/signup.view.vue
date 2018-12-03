<template>
    <form id="login-form" class="column is-one-third-desktop is-offset-one-third-desktop is-full-mobile" action="" @submit="register">

        <div class="notification is-warning" v-if="validateMsg !== ''">
            <button class="delete"></button>
            <div v-html="validateMsg"></div>
        </div>

        <div class="field">
            <label class="label">Username</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input" :class="{'is-success':usernameAvailable, 'is-danger':usernameAvailable===false}" type="text" placeholder="Username" value="" ref="username" @keyup="checkUsernameAvailable">
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
                <span class="icon is-small is-right" v-if="usernameAvailable === true">
                    <i class="fas fa-check"></i>
                </span>
            </div>
            <p class="help is-danger" v-if="usernameAvailable === false">This username is already taken!</p>
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
        <p class="help is-danger" v-if="!passwordsMatch">Passwords do not match!</p>
        <p class="help is-danger" v-if="!passwordValid">Password needs to contain at least 6 characters!</p>

        <input type="submit" class="button is-primary is-fullwidth" @click="register"  value="Sign up" />

    </form>
</template>

<script>

    import axios from 'axios';
    import _ from 'lodash';
    import User from "../user/models/User.model.js";


    export default {
        components: {},
        props: {},
        data() {
            return {
                usernameAvailable: null,
                passwordsMatch: true,
                passwordValid: true,
                validateMsg: ''
            }
        },
        methods: {

            validateData() {
                this.checkPassword();
                this.validateMsg = '';
                if (this.usernameAvailable===false) {
                    this.validateMsg += 'The username <strong>' + this.$refs.username.value + '</strong> has already been taken. Please choose another one.' + '<br/>';
                }
                if (!this.passwordValid) {
                    this.validateMsg += 'Please choose a password of at least <strong>6 characters</strong>';
                }
                if (!this.passwordsMatch) {
                    this.validateMsg += 'The passwords you entered do not match. Please make sure you enter the same password twice and that they match in upper/lower case.';
                }
                if (this.validateMsg !== '') {
                    return false;
                }

                return true;

            },
            register(e) {

                e.preventDefault();
                e.cancelBubble = true;

                if (!this.validateData()) {
                    return;
                }

                let that = this;
                axios.post(
                    '/api/users/register/', {
                        username: this.$refs.username.value,
                        password: this.$refs.password.value
                    }
                ).then(response => {
                    let user = new User();
                    console.log(response);
                    user.username = response.data['username'];
                    that.$eventBus.$emit('user-changed', user);

                    this.$router.push('/');

                }).catch(error => {
                    alert(error);
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
            }, 100)
        }
    }
</script>
