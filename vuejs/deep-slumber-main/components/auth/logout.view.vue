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

            let that = this;

            axios.post(
                '/api/users/logout/', {}
            ).then(response => {
                that.$eventBus.$emit('user-changed', null);
            }).catch(error => {
                console.log('errore');
                console.log(error);
            })

        }
    }
</script>