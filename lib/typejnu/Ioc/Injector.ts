import { Clazz } from "../interface/Clazz";
import Container from "./Container.js";

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