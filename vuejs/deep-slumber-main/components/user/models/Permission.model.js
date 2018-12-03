import AbstractSerializeable from "../../../common/AbstractSerializeable.js";


function Permission(raw) {

    this.id = -1;
    this.key = '';
    this.label = '';

    this.active = false;

    AbstractSerializeable.call(this, raw);
}

Permission.prototype = Object.create(AbstractSerializeable.prototype);

export default Permission;
