import AbstractSerializeable from "../../../common/AbstractSerializeable.js";


function Device(raw) {

    this.id = -1;
    this.hwid = '';
    this.userId = null;

    this.status = null;
    this.isConnected = false;

    this.events = [];

    AbstractSerializeable.call(this, raw);
}

Device.prototype = Object.create(AbstractSerializeable.prototype);

export default Device;
