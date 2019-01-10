<template>
    <div>
        <ul class="content">
            <li v-for="device of devices" class="has-icon-right">
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 100 486 486" style="enable-background:new 0 0 486 486;" xml:space="preserve">
<g>
	<path style="transition: fill 1s" :fill="bulbFillColor" id="XMLID_49_" d="M298.4,424.7v14.2c0,11.3-8.3,20.7-19.1,22.3l-3.5,12.9c-1.9,7-8.2,11.9-15.5,11.9h-34.7
		c-7.3,0-13.6-4.9-15.5-11.9l-3.4-12.9c-10.9-1.7-19.2-11-19.2-22.4v-14.2c0-7.6,6.1-13.7,13.7-13.7h83.5
		C292.3,411,298.4,417.1,298.4,424.7z M362.7,233.3c0,32.3-12.8,61.6-33.6,83.1c-15.8,16.4-26,37.3-29.4,59.6
		c-1.5,9.6-9.8,16.7-19.6,16.7h-74.3c-9.7,0-18.1-7-19.5-16.6c-3.5-22.3-13.8-43.5-29.6-59.8c-20.4-21.2-33.1-50-33.4-81.7
		c-0.7-66.6,52.3-120.5,118.9-121C308.7,113.1,362.7,166.9,362.7,233.3z M256.5,160.8c0-7.4-6-13.5-13.5-13.5
		c-47.6,0-86.4,38.7-86.4,86.4c0,7.4,6,13.5,13.5,13.5c7.4,0,13.5-6,13.5-13.5c0-32.8,26.7-59.4,59.4-59.4
		C250.5,174.3,256.5,168.3,256.5,160.8z" />
</g>

</svg>
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
                bulbFillColor: 'rgb(0,0,0)',
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
                            case 13:
                            {
                                eventEntry += 'Set Light Intensity ' + event.value;
                                this.bulbFillColor = 'rgb(' + event.value + ', ' + event.value * 0.9 + ', ' + event.value * 0.2 + ')';
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
