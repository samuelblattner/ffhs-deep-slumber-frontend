<template>
    <div class="column is-3-desktop is-full-mobile">

        <h1 class="title">
            Alarm settings
        </h1>
        <p class="subtitle">
           Set your alarm clock
        </p>
        <form>
            <div class="field">
            <label class="checkbox">
            <input type="checkbox" @change="toggleAlarmActive" v-model="alarm.active">
                Alarm active
            </label>
            </div>

            <div class="field">

            <label class="label" >Latest wake-up time</label>
            <input type="time" class="input" @change="updateLatestTime" v-model="alarm.latest" />
            </div>

            <div class="field">
            <label class="label" >Earliest wake-up time</label>
            <input type="time" class="input" @change="updateEarliestTime" v-model="alarm.earliest" />
            </div>

            <input type="submit" class="button is-fullwidth is-primary" value="Save" v-if="dirty && !saved" @click="saveAlarm"  />
            <div class="notification is-info" v-if="saved">
                Alarm saved!
            </div>
        </form>
    </div>

</template>

<script>

    import axios from 'axios';
    import Alarm from "../models/Alarm.model";


    export default {
        components: {},
        props: {},
        data() {
            return {
                dirty: false,
                saved: false,
                alarm: new Alarm()
            }
        },
        methods: {
            loadAlarm() {

                let that = this;

                axios.get(
                    '/api/drslumber/alarms/'
                ).then(response => {
                    that.alarm = new Alarm(response.data[0]);
                   // that.alarm.latest = new Time();
                })
            },
            saveAlarm(e) {
                e.preventDefault();
                e.cancelBubble = true;

                let that = this;

                axios.patch(
                    '/api/drslumber/alarms/' + this.alarm.id + '/update/', this.alarm.serialize()
                ).then(response => {
                    that.saved = true;

                    setTimeout(function() {
                        that.saved = false
                    }, 3000);
                })
            },
            toggleAlarmActive(e) {
                this.alarm.active = e.target.checked;
                this.dirty=true;
            },
            updateEarliestTime(e) {
                this.alarm.earliest = e.target.value;
                this.dirty=true;
            },
            updateLatestTime(e) {
                this.alarm.latest = e.target.value;
                this.dirty=true;
            }
        },
        mounted() {
            this.loadAlarm();
        }
    }
</script>