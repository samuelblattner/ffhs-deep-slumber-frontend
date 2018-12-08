<template>
    <div>
    <ul>
        <li v-for="device of devices" class="has-icon-right">
            <span>{{device.hwid}}</span>
            <div class="controls is-pulled-right">
                <span class="icon is-small is-link" @click="(e) => {removeDevice(device, false);}">
                    <a><i class="fas fa-trash"></i></a>
                </span>
            </div>

        </li>

    </ul>
        <div class="modal" :class="{'is-active': showDeleteModal}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="box">
                    <h1 class="title">Warning</h1>
                    <p>By unassigning a device from a user, all data assigned to the device will be removed! Are you sure you want to proceed?</p>
                    <button class="button is-danger is-fullwidth" @click="removeDevice(null, true)">Yes, unassign device and remove all data</button>
                    <button class="button has-background-grey-light is-fullwidth" @click="closeModal">No, abort</button>
                </div>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
        </div>
    </div>

</template>

<script>

    import axios from 'axios';
    import Device from "../models/Device.model";


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
                devices: [],
                showDeleteModal: false,
                deviceToRemove: null
            }
        },
        methods: {

            loadDevices() {

                let that = this;

                axios.get(
                    '/api/users/user/' + this.userId + '/device/'
                ).then(response => {
                    that.devices = [];
                    for (let deviceData of response.data) {
                        that.devices.push(new Device(deviceData));
                    }

                }).catch(error => {

                });
            },
            closeModal() {
                this.showDeleteModal = false;
            },
            removeDevice(device, confirmed=false) {
                let that = this;

                if (!confirmed) {
                    this.showDeleteModal = true;
                    this.deviceToRemove = device;
                } else {
                    axios.post(
                        '/api/users/user/' + this.userId + '/device/remove/', {
                            'deviceId': this.deviceToRemove.hwid
                        }
                    ).then(response => {
                        that.loadDevices();
                        that.closeModal();
                    });
                }
            }
        },
        mounted() {
            this.loadDevices();
        }
    }
</script>
