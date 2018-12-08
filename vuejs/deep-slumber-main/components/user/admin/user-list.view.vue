<template>

    <div class="column is-one-third-desktop is-offset-one-third-desktop is-full-mobile">
        <section class="section">

            <h1 class="title">Users</h1>

            <ul>
                <li v-for="user of users" class="has-icon-right">
                    <span @click="(e) => {editUser(e, user);}">{{user.username}} (id: {{user.id}})</span>
                    <div class="controls is-pulled-right">
                    <span class="icon is-small is-link" @click="(e) => {editUser(e, user);}">
                        <i class="fas fa-edit"></i>
                    </span>
                    <span class="icon is-small is-link" @click="(e) => {deleteUser(user, false);}" v-if="!user.is_admin">
                        <a><i class="fas fa-trash"></i></a>
                    </span>
                    </div>
                </li>
            </ul>
            <div class="modal" :class="{'is-active': showDeleteModal}">
                <div class="modal-background"></div>
                <div class="modal-content">
                    <div class="box">
                        <h1 class="title">Warning</h1>
                        <p>By deleting a user, all data assigned to that user will be removed, too. This action cannot be undone! Are you sure you want to proceed?</p>
                        <button class="button is-danger is-fullwidth" @click="deleteUser(null, true)">Yes, unassign device and remove all data</button>
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


    export default {
        components: {},
        props: {},
        data() {
            return {
                users: [],
                showDeleteModal: false,
                userToDelete: null
            }
        },
        methods: {

            loadUsers() {

                let that = this;

                axios.get(
                    '/api/users/user/'
                ).then(response => {
                    that.users = [];
                    for (let user of response.data) {
                        that.users.push(user);
                    }

                }).catch(error => {

                });
            },

            editUser(e, user) {
                this.$router.push('/admin/users/' + user.id + '/edit/')
            },
            closeModal() {
                this.showDeleteModal = false;
            },

            deleteUser(user, confirmed=false) {

                let that = this;

                if (!confirmed) {
                    this.showDeleteModal = true;
                    this.userToDelete = user;
                } else {
                    axios.delete(
                        '/api/users/user/' + this.userToDelete.id + '/delete/', {

                        }
                    ).then(response => {
                        that.closeModal();
                        that.loadUsers();
                    });
                }

            }
        },
        mounted() {
            this.loadUsers();
        }
    }
</script>
