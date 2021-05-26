export var isIDatabase = function (database) {
    return database.find !== undefined
        && database.insert !== undefined;
};
