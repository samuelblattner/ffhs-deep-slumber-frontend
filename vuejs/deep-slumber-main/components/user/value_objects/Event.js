import AbstractSerializeable from "../../../common/AbstractSerializeable.js";


function Event(raw) {

    this.event_type = 0;
    this.timestamp = null;
    this.value = null;
    this.hwid = null;

    AbstractSerializeable.call(this, raw);
}

Event.prototype = Object.create(AbstractSerializeable.prototype);

export default Event;
