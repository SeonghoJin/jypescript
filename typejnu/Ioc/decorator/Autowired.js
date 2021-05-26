import "reflect-metadata";
import Container from "../Container.js";
import { Injector } from "../Injector.js";
export var AutoWired = function (selectType) {
    return function (target, propertyKey) {
        var type = selectType !== undefined ? selectType : Reflect.getMetadata('design:type', target, propertyKey);
        if (type === Object)
            return;
        Injector(type);
        var instance = Container.get(type);
        Reflect.defineProperty(target, propertyKey, {
            value: instance
        });
    };
};
