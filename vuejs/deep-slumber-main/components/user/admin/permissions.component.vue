<template>
    <ul>
        <li v-for="permission of permissions" class="has-icon-right">
            <label class="checkbox">
                <input type="checkbox" :checked="permission.active" @change="(e) => {togglePermission(e.target.checked, permission);}" />
                {{permission.label}} (key: {{permission.key}})
            </label>
        </li>
    </ul>
</template>

<script>

    import axios from 'axios';
    import Permission from '../models/Permission.model';


    export default {
        components: {},
        props: {
            userId: {
                type: String,
                default: null
            }
        },
        data() {
            return {
                permissions: []
            }
        },
        methods: {

            loadPermissions() {

                let that = this;

                axios.get(
                    '/api/users/user/' + this.userId + '/permission/'
                ).then(response => {
                    that.permissions = [];
                    for (let permissionData of response.data) {
                        that.permissions.push(new Permission(permissionData));
                    }

                }).catch(error => {

                });
            },

            togglePermission(value, permission) {
                let that = this;

                axios.post(
                    '/api/users/user/' + this.userId + '/permission/' + permission.id + '/toggle/',
                    {
                        'toggle': value
                    }
                )
            }

        },
        mounted() {
            this.loadPermissions();
        }
    }
</script>
