"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeDB = void 0;
var nedb_1 = __importDefault(require("nedb"));
var NeDB = /** @class */ (function () {
    function NeDB(config) {
        this.db = new nedb_1.default({
            filename: 'nedb/' + config.DB_NAME,
            autoload: true
        });
    }
    NeDB.prototype.insert = function (data) {
        var _this = this;
        return new Promise(function (res, rej) {
            _this.db.insert(data, function (err, doc) {
                res();
            });
        });
    };
    NeDB.prototype.find = function (query) {
        var _this = this;
        return new Promise(function (res, rej) {
            _this.db.find(query, function (err, doc) {
                res(doc);
            });
        });
    };
    return NeDB;
}());
exports.NeDB = NeDB;
