import { Clazz } from "../interface/index.js";
import { Container } from "./index.js";

export const Injector = (target: Clazz) => {

    const property = Reflect.ownKeys(target.prototype).map((key: any) => {
        return Reflect.getMetadata('design:type', target.prototype, key);
    }).filter((value) => {
        return value !== undefined && value !== Object;
    });

    property.map((prop: any) => {
        Injector(prop);
    })
    Container.set(target);
}