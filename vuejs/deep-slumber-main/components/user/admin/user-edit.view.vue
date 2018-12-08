<template>

    <div class="column is-one-third-desktop is-offset-one-third-desktop is-full-mobile">
        <section class="section">

            <h1 class="title">Edit User {{id}}</h1>


        </section>

        <section class="section">

            <h2 class="title">Permissions</h2>

            <PermissionComponent :userId="id"/>

        </section>

        <section class="section">
            <h2 class="title">Devices</h2>
            <DeviceComponent :userId="id"/>
        </section>

        <section class="section">
            <h2 class="title">Simulation</h2>
            <button class="button is-fullwidth is-warning" @click="generateSleepCycle">{{genButtonText}}</button>
        </section>

    </div>
</template>

<script>

    import axios from 'axios';
    import PermissionComponent from './permissions.component.vue';
    import DeviceComponent from './userdevices.component.vue';


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
                users: [],
                genButtonText: 'Generate Random Sleep Cycle'
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

            },
            generateSleepCycle() {
                let that = this;
                axios.post(
                    '/api/drslumber/simulation/generate_sleep_cycle/', {
                        'userId': this.id
                    }
                ).then(response => {
                    that.genButtonText = 'Generated!';
                    setTimeout(function() {
                        that.genButtonText = 'Generate Random Sleep Cycle';
                    }, 500);
                })
            }
        },
        mounted() {
            this.loadUser();
        }
    }
</script>
