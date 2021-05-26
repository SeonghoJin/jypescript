import nedb from 'nedb';
var NeDB = /** @class */ (function () {
    function NeDB(config) {
        this.db = new nedb({
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
export { NeDB };
