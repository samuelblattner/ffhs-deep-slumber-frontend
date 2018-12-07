<template>
    <nav class="navbar" role="navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="/">Deep Slumber</a>

            <a role="button" class="navbar-burger burger" @click="toggleMenu">
                <span></span>
                <span></span>
                <span></span>
            </a>
        </div>
        <div class="navbar-menu">
            <div class="navbar-end">
                <router-link to="/" v-if="user"><a class="navbar-item">Dashboard</a></router-link>
                <router-link to="/login" v-if="!user"><a class="navbar-item">Login</a></router-link>
                <router-link to="/logout" v-if="user"><a class="navbar-item">Logout</a></router-link>
                <router-link to="/signup" v-if="!user"><a class="navbar-item">Sign Up</a></router-link>
                <router-link to="/profile" v-if="user"><a class="navbar-item has-icon-left">
                    <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
                    <span>{{user.username}}</span>
                </a></router-link>
            </div>

        </div>
    </nav>
</template>

<script>

    import User from "../user/models/User.model";

    export default {
        components: {
        },
        props: {
            user: {
                type: Object,
                default: null
            }
        },
        data() {
            return {}
        },
        methods: {
            toggleMenu(e) {
                e.preventDefault();
                e.cancelBubble = true;
                this.$eventBus.$emit('toggle-menu');
            }
        }
    }
</script>