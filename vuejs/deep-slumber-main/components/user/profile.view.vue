<template>

    <div class="column is-one-third-desktop is-offset-one-third-desktop is-full-mobile">
        <section class="section">

            <h1 class="title">User details</h1>

            <form id="login-form" action="" @submit="changePassword">

                <div class="notification is-warning" v-if="validateMsg !== ''">
                    <button class="delete"></button>
                    <div v-html="validateMsg"></div>
                </div>

                <div class="field">
                    <label class="label">Change password</label>
                    <p class="control has-icons-left has-icons-right">
                        <input class="input" type="password" placeholder="New password" ref="password" @keyup="checkPassword">
                        <span class="icon is-small is-left"><i class="fas fa-lock"></i></span>
                        <span class="icon is-small is-right" v-if="passwordsMatch && passwordValid"><i class="fas fa-check"></i></span>
                    </p>
                </div>

                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input class="input" type="password" placeholder="Repeat password" ref="password2" @keyup="checkPassword">
                        <span class="icon is-small is-left"><i class="fas fa-lock"></i></span>
                        <span class="icon is-small is-right" v-if="passwordsMatch && passwordValid"><i class="fas fa-check"></i></span>
                    </p>
                </div>
                <p class="help is-danger" v-if="!passwordsMatch">Passwords do not match!</p>
                <p class="help is-danger" v-if="!passwordValid">Password needs to contain at least 6 characters!</p>

                <input type="submit" class="button is-primary is-fullwidth" @click="changePassword" value="Change"/>

            </form>

        </section>

        <section class="section">

            <div class="container">
                <h1 class="title">Settings</h1>
            </div>

        </section>

        <section class="section">

                <h1 class="title">My Devices</h1>
                <DeviceComponent :user="user ? user : null" />

        </section>

    </div>
</template>

<script>

    import axios from 'axios';
    import _ from 'lodash';
    import User from "./models/User.model";
    import DeviceComponent from './device.component.vue';


    export default {
        components: {
            DeviceComponent
        },
        props: {},
        data() {
            return {
                passwordsMatch: true,
                passwordValid: true,
                validateMsg: '',
                user: null
            }
        },
        methods: {

            validateData() {
                this.checkPassword();
                this.validateMsg = '';
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
            changePassword(e) {

                e.preventDefault();
                e.cancelBubble = true;

                if (!this.validateData()) {
                    return;
                }

                let that = this;
                axios.patch(
                    '/api/users/user/' + window.ctx.user.id + '/update/', {
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
            },
            checkPassword() {
                this.passwordsMatch = this.$refs.password.value === this.$refs.password2.value;
                this.passwordValid = this.$refs.password.value.length >= 6;
            }
        },
        mounted() {
            this.user = window.ctx.user;
        }
    }
</script>
