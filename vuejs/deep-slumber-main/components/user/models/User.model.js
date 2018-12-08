import AbstractSerializeable from "../../../common/AbstractSerializeable";

let User = function(raw) {

    this.id = -1;
    this.username = '';
    this.is_admin = false;
    this.has_device = null;

    AbstractSerializeable.call(this, raw);

};

User.prototype = Object.create(AbstractSerializeable.prototype);

export default User;
