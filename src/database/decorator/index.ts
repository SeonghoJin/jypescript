import { Clazz, IDBconfig, isIDatabase } from "../../interface";
import { Container } from "../../Ioc";
import { NeDB } from "../NeDB.js";

export const Connect = (config: IDBconfig, database?: Clazz) => {
    return (target: any, propertyKey: any) => {
        if (database === undefined) {
            const newDatabase = Container.getBeanOfInterface(isIDatabase);
            if (newDatabase === null) {
                Connect(config, NeDB)(target, propertyKey);
            } else {
                Reflect.defineProperty(target, propertyKey, {
                    value: newDatabase
                })
            }
        }
        else {
            Container.set(database, config);
            Reflect.defineProperty(target, propertyKey, {
                value: Container.get(database)
            })
        }
    }
}
