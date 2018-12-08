<template>
    <transition name="slide-fade">
        <div class="off-menu column" :class="{active: menuActive}" v-show="menuActive">
            <aside class="menu">
                <ul class="menu-list">
                    <li>
                        <router-link to="/profile" v-if="user">
                            <a class="has-icon-left">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                </span>
                                <span>{{user.username}}</span>
                            </a>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/" v-if="user">Dashboard</router-link>
                    </li>
                    <li>
                        <router-link to="/login" v-if="!user">Login</router-link>
                    </li>
                    <li>
                        <router-link to="/logout" v-if="user">Logout</router-link>
                    </li>
                    <li>
                        <router-link to="/signup" v-if="!user">Sign Up</router-link>
                    </li>
                </ul>
                <p class="menu-label" v-if="user && user.is_admin">Admin</p>
                <ul class="menu-list">
                    <li>
                        <router-link to="/admin/users" v-if="user && user.is_admin">Manage Users</router-link>
                    </li>
                </ul>
            </aside>
        </div>
    </transition>
</template>

<script>

    export default {
        components: {},
        props: {
            user: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                menuActive: false
            }
        },
        methods: {
            toggleMenu(force = null) {
                if (force !== null) {
                    this.menuActive = force;
                } else {
                    this.menuActive = !this.menuActive;
                }
            }
        },
        mounted() {
            let that = this;
            this.$eventBus.$on('toggle-menu', function (force = null) {
                that.toggleMenu(force);
            })
        }
    }
</script>