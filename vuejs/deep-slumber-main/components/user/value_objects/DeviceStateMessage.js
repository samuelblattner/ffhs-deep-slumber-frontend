import AbstractSerializeable from "../../../common/AbstractSerializeable.js";


function DeviceStateMessage(raw) {

    this.id = 0;
    this.earliest = '';
    this.latest = null;
    this.active = false;
    this.device_hwid = null;

    AbstractSerializeable.call(this, raw);
}

DeviceStateMessage.prototype = Object.create(AbstractSerializeable.prototype);

export default DeviceStateMessage;
