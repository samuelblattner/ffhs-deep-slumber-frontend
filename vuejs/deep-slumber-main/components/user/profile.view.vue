<template>

    <div class="column is-one-third-desktop is-offset-one-third-desktop is-full-mobile">
        <section class="section">

            <h1 class="title">User details</h1>

            <form id="login-form" action="" @submit="changePassword">

                <div class="notification is-warning" v-if="validateMsg !== ''">
                    <button class="delete"></button>
                    <div v-html="validateMsg"></div>
                </div>

                <div class="notification is-success" v-if="successMsg !== ''">
                    <div v-html="successMsg"></div>
                </div>

                <div class="field">
                    <label class="label">Change password</label>
                    <p class="control has-icons-left has-icons-right">
                        <input class="input" type="password" placeholder="New password" ref="password"
                               @keyup="checkPassword">
                        <span class="icon is-small is-left"><i class="fas fa-lock"></i></span>
                        <span class="icon is-small is-right" v-if="passwordsMatch && passwordValid"><i
                                class="fas fa-check"></i></span>
                    </p>
                </div>

                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input class="input" type="password" placeholder="Repeat password" ref="password2"
                               @keyup="checkPassword">
                        <span class="icon is-small is-left"><i class="fas fa-lock"></i></span>
                        <span class="icon is-small is-right" v-if="passwordsMatch && passwordValid"><i
                                class="fas fa-check"></i></span>
                    </p>
                </div>
                <p class="help is-danger" v-if="!passwordsMatch">Passwords do not match!</p>
                <p class="help is-danger" v-if="!passwordValid">Password needs to contain at least 6 characters!</p>

                <input type="submit" class="button is-primary is-fullwidth" @click="changePassword" value="Change"/>

            </form>

        </section>

        <section class="section">

            <h1 class="title">My Devices</h1>
            <DeviceComponent :user="user ? user : null"/>

        </section>

        <section class="section">
            <h1 class="title">Delete Account</h1>
            <button class="button is-danger is-fullwidth" @click="(e) => {deleteAccount(false)}">Delete Account</button>

            <div class="modal" :class="{'is-active': showDeleteModal}">
                <div class="modal-background"></div>
                <div class="modal-content">
                    <div class="box">
                        <div class="notification is-warning" v-if="validateMsgDelUser !== ''">
                            <button class="delete"></button>
                            <div v-html="validateMsgDelUser"></div>
                        </div>
                        <h1 class="title">Warning</h1>
                        <p class="is-text">Do you really want to delete your account? This action cannot be undone!</p>
                        <button class="button is-danger is-fullwidth" @click="deleteAccount(true)">Yes, delete</button>
                        <button class="button has-background-grey-light is-fullwidth" @click="closeModal">No, abort</button>
                    </div>
                </div>
                <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
            </div>
        </section>
    </div>
</template>

<script>

    import axios from 'axios';
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
                successMsg: '',
                validateMsgDelUser: '',
                user: null,
                showDeleteModal: false
            }
        },
        methods: {
            closeModal() {
                this.showDeleteModal = false;
            },
            deleteAccount(confirmed=false) {
                if (!confirmed) {
                    this.showDeleteModal = true;
                } else {
                    axios.delete(
                        '/api/users/user/' + window.ctx.user.id + '/delete/', {
                        }
                    ).then(response => {
                        this.$eventBus.$emit('user-changed', null);
                        this.$router.push('/');
                    }).catch(error => {
                        this.validateMsgDelUser = error.response.data.error;
                    });
                }
            },
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
                    let user = new User(response.data);
                    this.$eventBus.$emit('user-changed', user);
                    this.successMsg = 'Password updated';
                    setTimeout(function() {
                        that.successMsg = '';
                    }, 1000);

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
