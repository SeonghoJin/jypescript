import "reflect-metadata"
import { Clazz, TypeGuard } from "../../interface";
import { Container, inject } from "../";

interface IAutoWiredArgs<T> {
    class?: Clazz;
    typeGuard?: TypeGuard<T>;
}

export const AutoWired = <T>(autoWiredArgs?: IAutoWiredArgs<T> | undefined) => {

    return (target: any, propertyKey: string) => {
        if (autoWiredArgs === undefined) {
            const type = Reflect.getMetadata('design:type', target, propertyKey);
            if (type === Object) throw Error("is this interface? insert TypeGuard");
            Reflect.defineProperty(target, propertyKey, {
                value: inject(type)
            });
        }
        else if (autoWiredArgs.class !== undefined) {
            const type = autoWiredArgs.class;
            Reflect.defineProperty(target, propertyKey, {
                value: inject(type)
            });
        }
        else if (autoWiredArgs.typeGuard !== undefined) {
            throw new Error("is this TypeGuard");
        }
    }
}