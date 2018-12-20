import AbstractSerializeable from "../../../common/AbstractSerializeable.js";


function RequestDeviceStateMessage(raw) {

    this.hwid = 0;
    this.msgType = 6;

    AbstractSerializeable.call(this, raw);
}

RequestDeviceStateMessage.prototype = Object.create(AbstractSerializeable.prototype);

export default RequestDeviceStateMessage;
