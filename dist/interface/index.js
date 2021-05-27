"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIDatabase = void 0;
var isIDatabase = function (database) {
    return database.find !== undefined
        && database.insert !== undefined;
};
exports.isIDatabase = isIDatabase;
