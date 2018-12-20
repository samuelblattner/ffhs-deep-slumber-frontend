<template>
    <div>
        <ul class="content">
            <li v-for="device of devices" class="has-icon-right">
                <div><strong>{{device.hwid.slice(0, 16)}}...</strong>(<span :class="{is_success:device.isConnected}">{{device.isConnected ? 'online' : 'offline'}}</span>)</div>
                <ul>
                    <li v-for="event of device.events">{{event}}</li>
                </ul>
            </li>
            <li v-if="devices.length === 0" class=""><p>You haven't added any devices yet.</p></li>
        </ul>
        <button @click="openModal" class="button is-primary is-fullwidth">Add device</button>
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
                            <input type="text" class="input" ref="deviceId"/>
                        </div>
                        <input class="button is-primary is-fullwidth" type="submit" value="Add"/>
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
    import RequestDeviceStateMessage from "./value_objects/RequestDeviceStateMessage";

    import Event from './value_objects/Event.js';


    export default {
        components: {},
        props: {},
        data() {
            return {
                devices: [],
                validateMsg: '',
                showAddModal: false,
                user: null,
                deviceState: null
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

                    that.establishLiveDeviceInfo();

                }).catch(error => {

                });
            },
            handleKeyUp(e) {
                if (e.keyCode === 27) {
                    this.closeModal();
                }
            },
            handleDeviceEvent(event) {
                console.log('handle event');
                console.log(event);
                console.log(event.hwid);
                for (let device of this.devices) {
                    if (device.hwid === event.hwid) {
                        device.events.push(event);
                    }
                }
            },
            handleWebsocketMessage(msg) {
                let parsedMessage = {};

                console.log(msg);

                try {
                    parsedMessage = JSON.parse(msg.data);
                } catch {
                    parsedMessage = msg.data;
                }

                if (parsedMessage.msgType) {
                    switch (parsedMessage.msgType) {
                        case 1: {
                            for (let device of this.devices) {
                                if (device.hwid === parsedMessage.hwid) {
                                    device.isConnected = true;
                                }
                            }
                            break;
                        }
                        case 4: {
                              this.handleDeviceEvent(new Event(parsedMessage));
                              break;
                        }
                        case 10: {
                            for (let device of this.devices) {
                                if (device.hwid === parsedMessage.hwid) {
                                    device.isConnected = false;
                                }
                            }
                            break;
                        }
                    }
                }

            },
            establishLiveDeviceInfo() {


                let request = new RequestDeviceStateMessage(
                    {hwid: this.devices[0].hwid}
                );
                console.log(request.serialize());
                this.$socket.send(
                    request.serialize()
                );
            }

        },
        created() {
            this.user = window.ctx.user;
        },
        mounted() {
            this.loadDevices();
            window.addEventListener('keyup', this.handleKeyUp, false);

            this.$options.sockets.onmessage = this.handleWebsocketMessage;
        }
    }
</script>
