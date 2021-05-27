"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injector = void 0;
var index_js_1 = require("./index.js");
var Injector = function (target) {
    var property = Reflect.ownKeys(target.prototype).map(function (key) {
        return Reflect.getMetadata('design:type', target.prototype, key);
    }).filter(function (value) {
        return value !== undefined && value !== Object;
    });
    property.map(function (prop) {
        exports.Injector(prop);
    });
    index_js_1.Container.set(target);
};
exports.Injector = Injector;
