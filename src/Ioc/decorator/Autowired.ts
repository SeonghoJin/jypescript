import "reflect-metadata"
import { Clazz, TypeGuard } from "../../interface/index.js";
import { Container, Injector } from "../index.js";
export const AutoWired = <T>(selectType?: Clazz | TypeGuard<T>) => {

    return (target: any, propertyKey: string) => {
        let type = selectType !== undefined ? selectType : Reflect.getMetadata('design:type', target, propertyKey);
        if (type === Object) return;
        Injector(type)
        const instance = Container.get(type);
        Reflect.defineProperty(target, propertyKey, {
            value: instance
        });
    }
}