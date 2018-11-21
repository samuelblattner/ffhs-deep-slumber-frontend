<template>
    <div id="login-form" class="column is-one-third-desktop is-offset-one-third-desktop is-full-mobile">
        <div class="field">
            <label class="label">Username</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input is-success" type="text" placeholder="Text input" value="bulma">
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
                <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                </span>
            </div>
            <p class="help is-success">This username is available</p>
        </div>

        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="password" placeholder="Password">
                <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
                </span>
            </p>
        </div>

        <div class="button is-primary is-fullwidth" @click="login();">Login</div>
    </div>
</template>

<script>

    import axios from 'axios';


    export default {
        components: {},
        props: {},
        data() {
            return {}
        },
        methods: {
            login() {
                axios.post(
                    '/api/users/login/', {
                        username: 'sam',
                        password: 'pass'
                    }
                ).then(response => {


                })
            }
        }
    }
</script>