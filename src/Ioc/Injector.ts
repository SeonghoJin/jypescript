import { Clazz } from "../interface/index.js";
import { Container } from "./index.js";
import "reflect-metadata"
export const inject = (target: Clazz) => {
    const property = Reflect.ownKeys(target.prototype).map((key: any) => {
        return Reflect.getMetadata('design:type', target.prototype, key);
    }).filter((value) => {
        return value !== undefined && value !== Object;
    });

    property.map((prop: any) => {
        inject(prop);
    })
    return Container.set(target);
}