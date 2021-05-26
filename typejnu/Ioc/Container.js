var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
export default new /** @class */ (function () {
    function class_1() {
        this.container = new Map();
    }
    class_1.prototype.set = function (clazz) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var item = this.container.get(clazz);
        if (item !== undefined) {
            return item;
        }
        item = new (clazz.bind.apply(clazz, __spreadArray([void 0], args)))();
        this.container.set(clazz, item);
        return item;
    };
    class_1.prototype.get = function (clazz) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var item = this.container.get(clazz);
        if (item === undefined) {
            item = new (clazz.bind.apply(clazz, __spreadArray([void 0], args)))();
            this.container.set(clazz, item);
        }
        return item;
    };
    class_1.prototype.getBeanOfInterface = function (typeGuard) {
        var item = null;
        this.container.forEach(function (value, key) {
            if (typeGuard(value)) {
                item = value;
                return;
            }
        });
        return item;
    };
    return class_1;
}());
