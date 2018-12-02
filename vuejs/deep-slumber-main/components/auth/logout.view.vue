<template>
    <div id="login-form">
        You have been logged out. Good bye.
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
        mounted() {

            axios.post(
                '/api/users/logout/', {}
            ).then(response => {

            }).catch(error => {
                alert(error);
            })

        }
    }
</script>