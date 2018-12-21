function AbstractSerializeable(raw) {

    this.deserialize(raw);
}

AbstractSerializeable.prototype.deserialize = function(raw){

    let parsed = {};
    if (Object.prototype.toString.call(raw) === 'string') {
        try {
            parsed = JSON.parse(raw)
        } catch (e) {
            console.error(e);
            return;
        }
    } else {
        parsed = raw;
    }
    for (let key in parsed) {
        if (this.hasOwnProperty(key) && raw.hasOwnProperty(key)) {
            this[key] = parsed[key];
        }
    }
};

AbstractSerializeable.prototype.serialize = function() {

    return JSON.stringify(this);
};


export default AbstractSerializeable;
