"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQL = void 0;
var mysql2_1 = __importDefault(require("mysql2"));
var MySQL = /** @class */ (function () {
    function MySQL(config) {
        this.connection = mysql2_1.default.createConnection({
            host: config.DB_HOST,
            user: config.DB_USER,
            password: config.DB_PASSWORD,
            database: config.DB_NAME
        });
    }
    MySQL.prototype.find = function (query) {
        this.connection.query("desc table");
        throw new Error("Method not implemented.");
    };
    MySQL.prototype.insert = function (data) {
        this.connection.query("desc table");
        throw new Error("Method not implemented.");
    };
    return MySQL;
}());
exports.MySQL = MySQL;
