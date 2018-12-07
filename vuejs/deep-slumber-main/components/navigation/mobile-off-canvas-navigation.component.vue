<template>
    <transition name="slide-fade">
        <div class="off-menu column" :class="{active: menuActive}" v-show="menuActive">
            <aside class="menu">
                <ul class="menu-list">
                    <li>
                        <router-link to="/" v-if="user"><a class="navbar-item">Dashboard</a></router-link>
                    </li>
                    <li>
                        <router-link to="/login" v-if="!user"><a class="navbar-item">Login</a></router-link>
                    </li>
                    <li>
                        <router-link to="/logout" v-if="user"><a class="navbar-item">Logout</a></router-link>
                    </li>
                    <li>
                        <router-link to="/signup" v-if="!user"><a class="navbar-item">Sign Up</a></router-link>
                    </li>
                    <li>
                        <router-link to="/profile" v-if="user"><a class="navbar-item has-icon-left">
                    <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
                            <span>{{user.username}}</span>
                        </a></router-link>
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