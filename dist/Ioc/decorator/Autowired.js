"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoWired = void 0;
require("reflect-metadata");
var index_js_1 = require("../index.js");
var AutoWired = function (selectType) {
    return function (target, propertyKey) {
        var type = selectType !== undefined ? selectType : Reflect.getMetadata('design:type', target, propertyKey);
        if (type === Object)
            return;
        index_js_1.Injector(type);
        var instance = index_js_1.Container.get(type);
        Reflect.defineProperty(target, propertyKey, {
            value: instance
        });
    };
};
exports.AutoWired = AutoWired;
