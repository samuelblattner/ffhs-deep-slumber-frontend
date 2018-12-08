<template>
    <div>
        <ul>
            <li v-for="device of devices" class="has-icon-right">
                <div>{{device.hwid}}</div>
                <div>{{device.status}}</div>
            </li>
            <li v-if="devices.length === 0" class=""><p>You haven't added any devices yet.</p></li>
            <li @click="openModal" class="button is-primary is-fullwidth">Add device</li>
        </ul>
        <div class="modal" :class="{'is-active': showAddModal}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="box">

                    <div class="notification is-warning" v-if="validateMsg !== ''">
                        <button class="delete"></button>
                        <div v-html="validateMsg"></div>
                    </div>

                    <form action="" @submit="addDevice">
                        <p>Please enter the 8-digit ID of the device you would like to add:</p>
                        <div class="field">
                            <input type="text" class="input" ref="deviceId" />
                        </div>
                        <input class="button is-primary is-fullwidth" type="submit" value="Add" />
                    </form>
                </div>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
        </div>
    </div>

</template>

<script>

    import axios from 'axios';
    import Device from './models/Device.model';
    import User from './models/User.model';


    export default {
        components: {},
        props: {
        },
        data() {
            return {
                devices: [],
                validateMsg: '',
                showAddModal: false,
                user: null
            }
        },
        methods: {

            closeModal() {
                this.showAddModal = false;
            },
            openModal() {
                this.showAddModal = true;
            },
            addDevice(e) {
                e.preventDefault();
                e.cancelBubble = true;

                axios.post(
                    '/api/users/user/' + this.user.id + '/device/add/', {
                        deviceId: this.$refs.deviceId.value
                    }
                ).then(response => {
                    this.loadDevices();
                    this.closeModal();
                }).catch(error => {
                    this.validateMsg = error.response.data.error;
                })
            },
            loadDevices() {

                let that = this;

                axios.get(
                    '/api/users/user/device/'
                ).then(response => {
                    that.devices = [];
                    for (let deviceData of response.data) {
                        that.devices.push(new Device(deviceData));
                    }

                }).catch(error => {

                });
            },
            handleKeyUp(e) {
                if (e.keyCode === 27) {
                    this.closeModal();
                }
            }

        },
        created() {
            this.user = window.ctx.user;
        },
        mounted() {
            this.loadDevices();
            window.addEventListener('keyup', this.handleKeyUp, false);
        }
    }
</script>
