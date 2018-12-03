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
                    <span class="icon is-small is-link" @click="(e) => {deleteUser(e, user);}">
                        <i class="fas fa-trash"></i>
                    </span>
                    </div>
                </li>
            </ul>

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
                users: []
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

            deleteUser(e, user) {

            }
        },
        mounted() {
            this.loadUsers();
        }
    }
</script>
