<template>

    <div class="column is-one-third-desktop is-offset-one-third-desktop is-full-mobile">
        <section class="section">

            <h1 class="title">Edit User {{id}}</h1>


        </section>

        <section class="section">

            <h2 class="title">Permissions</h2>

            <PermissionComponent :userId="id" />

        </section>

        <section class="section">

            <h2 class="title">Devices</h2>

            <DeviceComponent :userId="id" />

        </section>

    </div>
</template>

<script>

    import axios from 'axios';
    import PermissionComponent from './permissions.component.vue';
    import DeviceComponent from './permissions.component.vue';


    export default {
        components: {
            PermissionComponent,
            DeviceComponent
        },
        props: {
            id: {
                type: String,
                default: -1
            }
        },
        data() {
            return {
                users: []
            }
        },
        methods: {

            loadUser() {

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

            editUser() {
                this.$router.push('/users/user/')
            },

            deleteUser() {

            }
        },
        mounted() {
            this.loadUser();
        }
    }
</script>
