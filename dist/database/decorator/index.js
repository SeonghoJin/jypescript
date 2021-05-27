"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connect = void 0;
var interface_1 = require("../../interface");
var Ioc_1 = require("../../Ioc");
var NeDB_js_1 = require("../NeDB.js");
var Connect = function (config, database) {
    return function (target, propertyKey) {
        if (database === undefined) {
            var newDatabase = Ioc_1.Container.getBeanOfInterface(interface_1.isIDatabase);
            if (newDatabase === null) {
                exports.Connect(config, NeDB_js_1.NeDB)(target, propertyKey);
            }
            else {
                Reflect.defineProperty(target, propertyKey, {
                    value: newDatabase
                });
            }
        }
        else {
            Ioc_1.Container.set(database, config);
            Reflect.defineProperty(target, propertyKey, {
                value: Ioc_1.Container.get(database)
            });
        }
    };
};
exports.Connect = Connect;
