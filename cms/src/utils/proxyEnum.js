const validator = {
    get: function(obj, prop) {
        if (obj[prop]) {
            return obj[prop];
        }

        throw new TypeError(`Property ${prop} is missing in object`);
    }
};

const proxyEnum = (object) => new Proxy(object, validator);

export default proxyEnum;
