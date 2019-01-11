<template>
    <div>
        <ul class="content">
            <li v-for="device of devices" class="has-icon-right">
                <div class="content device-id">Device-HWID: <strong>{{device.hwid.slice(0, 16)}}...</strong><span
                        :class="{is_success:device.isConnected}" v-html="connectionState(device)"></span>
                </div>
                <div class="columns device-info">
                    <div class="column info-block environment is-one-third">

                        <div class="">
                            <div class="measurement">Temperature</div>
                            <span class="digits">{{temperature}}</span><span class="units">°C</span>
                        </div>

                        <div class="">
                            <div class="measurement">Pressure</div>
                            <span class="digits">{{pressure}}</span><span class="units">mbar</span>
                        </div>

                        <div class="">
                            <div class="measurement">Humidity</div>
                            <span class="digits">{{humidity}}</span><span class="units">%</span>
                        </div>

                    </div>
                    <div class="column info-block">
                        <div>System state</div>

                        <div v-if="deviceState===1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 256">
                                <polygon
                                        points="355.37 150.07 355.37 173.68 86.35 173.68 86.35 104.98 72.43 104.98 72.43 173.68 72.43 199.4 72.43 233.46 86.35 233.46 86.35 199.4 355.37 199.4 355.37 233.46 369.28 233.46 369.28 199.4 369.28 173.68 369.28 150.07 355.37 150.07"
                                        style="stroke:#231f20;stroke-miterlimit:10"/>
                            </svg>
                        </div>

                        <div v-if="deviceState===2">
                            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 256"><title>Artboard 1 copy</title><polygon points="355.37 150.07 355.37 173.68 86.35 173.68 86.35 104.98 72.43 104.98 72.43 173.68 72.43 199.4 72.43 233.46 86.35 233.46 86.35 199.4 355.37 199.4 355.37 233.46 369.28 233.46 369.28 199.4 369.28 173.68 369.28 150.07 355.37 150.07" style="stroke:#231f20;stroke-miterlimit:10"/><path d="M418.61,158.3v-65c0-.4,0-.81,0-1.21a1.35,1.35,0,0,0-1.35-1.42,1.39,1.39,0,0,0-1.5,1.29,7.26,7.26,0,0,0-.05,1.32q0,23.24,0,46.47a6.7,6.7,0,0,1-13.37.92c-.05-.76,0-1.53,0-2.29,0-18.28.06-36.55,0-54.82a13.24,13.24,0,0,1,6.37-11.75,17.26,17.26,0,0,1,9.8-3c13.92,0,27.83,0,41.75,0,6.76,0,13.07,4,15.3,9.76a14,14,0,0,1,.94,4.82q.09,28.18,0,56.39a6.69,6.69,0,1,1-13.38,0q0-23.41,0-46.83c0-.37.14-.84,0-1.07-.39-.48-.95-1.15-1.43-1.14s-1,.69-1.36,1.2c-.2.31-.06.86-.06,1.3q0,64.74,0,129.48c0,3.78-1.16,6.92-4.38,9a9.65,9.65,0,0,1-15-8.16q0-37.27,0-74.54a11.62,11.62,0,0,0,0-1.45c-.11-.83-.64-1.45-1.45-1.26A2.77,2.77,0,0,0,438,147.6c-.2.32-.05.86-.05,1.31q0,37.28,0,74.54a9.65,9.65,0,1,1-19.29.32c0-7.18,0-14.36,0-21.54Z"/><path d="M439.23,62.42a15.37,15.37,0,1,1,15.39-15.34A15.31,15.31,0,0,1,439.23,62.42Z"/></svg>
                        </div>

                        <div v-if="deviceState===3">
                            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 256"><title>Artboard 3</title><polygon points="355.37 150.07 355.37 173.68 86.35 173.68 86.35 104.98 72.43 104.98 72.43 173.68 72.43 199.4 72.43 233.46 86.35 233.46 86.35 199.4 355.37 199.4 355.37 233.46 369.28 233.46 369.28 199.4 369.28 173.68 369.28 150.07 355.37 150.07" style="stroke:#231f20;stroke-miterlimit:10"/><path d="M112.85,165.2a15.37,15.37,0,1,1,15.38-15.34A15.31,15.31,0,0,1,112.85,165.2Z"/><path d="M147.13,124h175a12.42,12.42,0,0,1,12.42,12.42v26.28a3,3,0,0,1-3,3H137.08a2.37,2.37,0,0,1-2.37-2.37V136.4A12.42,12.42,0,0,1,147.13,124Z"/></svg>
                        </div>

                        <div v-if="deviceState===4">
                            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 256"><title>Artboard 4</title><polygon points="355.37 150.07 355.37 173.68 86.35 173.68 86.35 104.98 72.43 104.98 72.43 173.68 72.43 199.4 72.43 233.46 86.35 233.46 86.35 199.4 355.37 199.4 355.37 233.46 369.28 233.46 369.28 199.4 369.28 173.68 369.28 150.07 355.37 150.07" style="stroke:#231f20;stroke-miterlimit:10"/><path d="M418.61,158.3v-65c0-.4,0-.81,0-1.21a1.35,1.35,0,0,0-1.35-1.42,1.39,1.39,0,0,0-1.5,1.29,7.26,7.26,0,0,0-.05,1.32q0,23.24,0,46.47a6.7,6.7,0,0,1-13.37.92c-.05-.76,0-1.53,0-2.29,0-18.28.06-36.55,0-54.82a13.24,13.24,0,0,1,6.37-11.75,17.26,17.26,0,0,1,9.8-3c13.92,0,27.83,0,41.75,0,6.76,0,13.07,4,15.3,9.76a14,14,0,0,1,.94,4.82q.09,28.18,0,56.39a6.69,6.69,0,1,1-13.38,0q0-23.41,0-46.83c0-.37.14-.84,0-1.07-.39-.48-.95-1.15-1.43-1.14s-1,.69-1.36,1.2c-.2.31-.06.86-.06,1.3q0,64.74,0,129.48c0,3.78-1.16,6.92-4.38,9a9.65,9.65,0,0,1-15-8.16q0-37.27,0-74.54a11.62,11.62,0,0,0,0-1.45c-.11-.83-.64-1.45-1.45-1.26A2.77,2.77,0,0,0,438,147.6c-.2.32-.05.86-.05,1.31q0,37.28,0,74.54a9.65,9.65,0,1,1-19.29.32c0-7.18,0-14.36,0-21.54Z" style="fill:none;stroke:#231f20;stroke-miterlimit:10;stroke-width:2px;stroke-dasharray:6.01531982421875,6.01531982421875"/><path d="M439.23,62.42a15.37,15.37,0,1,1,15.39-15.34A15.31,15.31,0,0,1,439.23,62.42Z" style="fill:none;stroke:#231f20;stroke-miterlimit:10;stroke-width:2px;stroke-dasharray:6.036313056945801,6.036313056945801"/></svg>
                        </div>

                        <div>Lighting state</div>
                        <div style="text-align: center">
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="70%"
	 viewBox="-30 100 550 550"  xml:space="preserve">
<g>
	<path style="transition: fill 1s" :fill="bulbFillColor" id="XMLID_49_" d="M298.4,424.7v14.2c0,11.3-8.3,20.7-19.1,22.3l-3.5,12.9c-1.9,7-8.2,11.9-15.5,11.9h-34.7
		c-7.3,0-13.6-4.9-15.5-11.9l-3.4-12.9c-10.9-1.7-19.2-11-19.2-22.4v-14.2c0-7.6,6.1-13.7,13.7-13.7h83.5
		C292.3,411,298.4,417.1,298.4,424.7z M362.7,233.3c0,32.3-12.8,61.6-33.6,83.1c-15.8,16.4-26,37.3-29.4,59.6
		c-1.5,9.6-9.8,16.7-19.6,16.7h-74.3c-9.7,0-18.1-7-19.5-16.6c-3.5-22.3-13.8-43.5-29.6-59.8c-20.4-21.2-33.1-50-33.4-81.7
		c-0.7-66.6,52.3-120.5,118.9-121C308.7,113.1,362.7,166.9,362.7,233.3z M256.5,160.8c0-7.4-6-13.5-13.5-13.5
		c-47.6,0-86.4,38.7-86.4,86.4c0,7.4,6,13.5,13.5,13.5c7.4,0,13.5-6,13.5-13.5c0-32.8,26.7-59.4,59.4-59.4
		C250.5,174.3,256.5,168.3,256.5,160.8z" />
</g>

    <text x="75%" y ="400" style="text-anchor: middle" font-size="60">{{lighting}}%</text>
</svg></div>
                    </div>


                </div>


                <h2>Device event log</h2>
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
                deviceState: 1,
                temperature: '-',
                lighting: '0',
                pressure: '-',
                humidity: '-',
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

                    setTimeout(that.establishLiveDeviceInfo, 1000);

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
                        switch (event.event_type) {
                            case 2000: {
                                eventEntry += 'State Change: ' + this.STATES[event.value];
                                this.deviceState = event.value;
                                break;
                            }
                            case 1: {
                                eventEntry += 'Start Recording';
                                break;
                            }
                            case 2: {
                                eventEntry += 'Stop Recording';
                                break;
                            }
                            case 3: {
                                eventEntry += 'Pause Recording';
                                break;
                            }
                            case 4: {
                                eventEntry += 'Resume Recording';
                                break;
                            }
                            case 10: {
                                eventEntry += 'Start Waking Process';
                                break;
                            }
                            case 11: {
                                eventEntry += 'Abort Waking Process';
                                break;
                            }
                            case 12: {
                                eventEntry += 'End Waking Process';
                                break;
                            }
                            case 13: {
                                eventEntry += 'Set Light Intensity ' + event.value;
                                this.bulbFillColor = 'rgb(' + event.value + ', ' + event.value * 0.9 + ', ' + event.value * 0.4 + ')';
                                this.lighting = (event.value / 255 * 100).toFixed(1);
                                break;
                            }
                            case 1000: {
                                eventEntry += 'Movement';
                                break;
                            }
                            case 1001: {
                                eventEntry += 'Temperature ' + event.value.toFixed(2) + ' °C';
                                this.temperature = event.value.toFixed(1);
                                break;
                            }
                            case 1002: {
                                eventEntry += 'Pressure ' + event.value.toFixed(2) + ' mbar';
                                this.pressure = event.value.toFixed(1);
                                break;
                            }
                            case 1003: {
                                eventEntry += 'Humidity ' + event.value.toFixed(2) + '%';
                                this.humidity = event.value.toFixed(1);
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
            connectionState(device) {
                return device.isConnected ? '<span class="tag is-success">online</span>' : '<span class="tag is-light">offline</span>'
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
