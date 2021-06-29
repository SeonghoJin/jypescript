import "reflect-metadata"
import { Clazz, TypeGuard } from "../../interface";
import { Container, inject } from "../";

interface IAutoWiredArgs<T> {
    class?: Clazz | undefined;
    typeGuard?: TypeGuard<T> | undefined;
}

export const AutoWired = <T>(autoWiredArgs?: IAutoWiredArgs<T> | undefined) => {

    return (target: any, propertyKey: string) => {
        if (autoWiredArgs == null) {
            const type = Reflect.getMetadata('design:type', target, propertyKey);
            if (type === Object) throw Error("is this interface? insert TypeGuard");
            Reflect.defineProperty(target, propertyKey, {
                value: inject(type)
            });
        }
        else if (autoWiredArgs.class != null) {
            const type = autoWiredArgs.class;
            Reflect.defineProperty(target, propertyKey, {
                value: inject(type)
            });
        }
        else if (autoWiredArgs.typeGuard != null) {
            let bean = Container.getBeanByTypeGuard(autoWiredArgs.typeGuard);
            if (bean == null) {
                Container.insertInjectable((item: any) => {
                    if (autoWiredArgs.typeGuard != null) {
                        if (autoWiredArgs.typeGuard(item)) {
                            Reflect.defineProperty(target, propertyKey, {
                                value: item
                            });
                            return true;
                        }
                    }
                })
            }
            else {
                Reflect.defineProperty(target, propertyKey, {
                    value: bean
                });
            }
        }
    }
}