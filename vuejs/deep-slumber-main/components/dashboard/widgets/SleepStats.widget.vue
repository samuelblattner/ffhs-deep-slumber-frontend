<template>
    <div class="column is-3-desktop is-full-mobile">

        <h1 class="title">
            Sleep stats
        </h1>
        <p class="subtitle">
           Set your alarm clock
        </p>
        <form>
            <div class="field">
            <label class="checkbox">
            <input type="checkbox">
                Alarm active
            </label>
            </div>

            <div class="field">

            <label class="label">Latest wake-up time</label>
            <input type="time" class="input" />
            </div>

            <div class="field">
            <label class="label">Earliest wake-up time</label>
            <input type="time" class="input" />
            </div>
        </form>
    </div>

</template>

<script>

    export default {
        components: {},
        props: {},
        data() {
            return {}
        },
    }
</script>