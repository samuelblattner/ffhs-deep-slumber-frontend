import AbstractSerializeable from "../../../common/AbstractSerializeable.js";


function Alarm(raw) {

    this.id = 0;
    this.earliest = '';
    this.latest = null;
    this.active = false;
    this.device_hwid = null;

    AbstractSerializeable.call(this, raw);
}

Alarm.prototype = Object.create(AbstractSerializeable.prototype);

export default Alarm;
