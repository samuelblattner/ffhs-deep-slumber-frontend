import AbstractSerializeable from "../../../common/AbstractSerializeable";

let User = function(raw) {

    this.id = -1;
    this.username = '';

    AbstractSerializeable.call(this, raw);

};

User.prototype = Object.create(AbstractSerializeable.prototype);

export default User;
