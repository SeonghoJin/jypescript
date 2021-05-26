import Container from "../../Ioc/Container.js";
import { isIDatabase } from "../interface/IDataBase.js";
import { NeDB } from "../NeDB.js";
export var Connect = function (config, database) {
    return function (target, propertyKey) {
        if (database === undefined) {
            var newDatabase = Container.getBeanOfInterface(isIDatabase);
            if (newDatabase === null) {
                Connect(config, NeDB)(target, propertyKey);
            }
            else {
                Reflect.defineProperty(target, propertyKey, {
                    value: newDatabase
                });
            }
        }
        else {
            Container.set(database, config);
            Reflect.defineProperty(target, propertyKey, {
                value: Container.get(database)
            });
        }
    };
};
