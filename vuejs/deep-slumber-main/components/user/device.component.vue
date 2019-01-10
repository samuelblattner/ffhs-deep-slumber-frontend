<template>
    <div>
        <ul class="content">
            <li v-for="device of devices" class="has-icon-right">
                <div><strong>{{device.hwid.slice(0, 16)}}...</strong>(<span :class="{is_success:device.isConnected}">{{device.isConnected ? 'online' : 'offline'}}</span>)</div>
                <ul class="event-list" ref="list">
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
                deviceState: null,
                STATES: [
                    'DUMMY', 'IDLE', 'READY', 'RECORDING', 'PAUSED'
                ]
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
                for (let device of this.devices) {
                    if (device.hwid === event.hwid) {

                        let eventEntry = '';

                        // TODO: Put to config and solve with generic event translation routine
                        switch(event.event_type) {
                            case 2000:
                            {
                                eventEntry += 'State Change: ' + this.STATES[event.value];
                                break;
                            }
                            case 1:
                            {
                                eventEntry += 'Start Recording';
                                break;
                            }
                            case 2:
                            {
                                eventEntry += 'Stop Recording';
                                break;
                            }
                            case 3:
                            {
                                eventEntry += 'Pause Recording';
                                break;
                            }
                            case 4:
                            {
                                eventEntry += 'Resume Recording';
                                break;
                            }
                            case 10:
                            {
                                eventEntry += 'Start Waking Process';
                                break;
                            }
                            case 11:
                            {
                                eventEntry += 'Abort Waking Process';
                                break;
                            }
                            case 12:
                            {
                                eventEntry += 'End Waking Process';
                                break;
                            }
                            case 1000:
                            {
                                eventEntry += 'Movement';
                                break;
                            }
                            case 1001:
                            {
                                eventEntry += 'Temperature ' + event.value.toFixed(2) + ' °C';
                                break;
                            }
                            case 1002:
                            {
                                eventEntry += 'Pressure ' + event.value.toFixed(2) + ' mbar';
                                break;
                            }
                            case 1003:
                            {
                                eventEntry += 'Humidity ' + event.value.toFixed(2) + '%';
                                break;
                            }

                        }
                        device.events.push(event.timestamp + ': ' + eventEntry);
                        let that = this;
                        this.$nextTick(() => {
                            that.$refs.list[0].scrollTop = that.$refs.list[0].scrollHeight || 0;
                        });

                    }
                }
            },
            handleWebsocketMessage(msg) {

                let parsedMessage = {};

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
