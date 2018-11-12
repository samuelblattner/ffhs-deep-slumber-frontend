<template>
    <nav class="navbar" role="navigation">
        <div class="navbar-brand">
            <a class="navbar-item">Deep Slumber</a>

            <a role="button" class="navbar-burger burger">
                <span></span>
                <span></span>
                <span></span>
            </a>
        </div>
        <div class="navbar-menu">
            <div class="navbar-end">
                <router-link to="/login"><a class="navbar-item">Login</a></router-link>
            </div>

        </div>
    </nav>
</template>

<script>

    export default {
        components: {
        },
        props: {},
        data() {
            return {}
        },
    }
</script>