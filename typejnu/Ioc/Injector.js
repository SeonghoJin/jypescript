import Container from "./Container.js";
export var Injector = function (target) {
    var property = Reflect.ownKeys(target.prototype).map(function (key) {
        return Reflect.getMetadata('design:type', target.prototype, key);
    }).filter(function (value) {
        return value !== undefined && value !== Object;
    });
    property.map(function (prop) {
        Injector(prop);
    });
    Container.set(target);
};
