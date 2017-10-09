var tableSelect =
    ' SELECT ' +
    ' L."LanguageId" as LanguageId,' +
    ' L."Name" as Name,' +
    ' L."Description" as Description,' +
    ' L."Code" as Code,' +
    ' L."InActiveDate" as InActiveDate,' +
    ' L."InActive" as InActive' +
    ' FROM public."Languages" AS L';

var tableCount = 'SELECT "LanguageId" FROM public."Languages" order by "LanguageId" desc LIMIT 1';

var tableInsert = 'INSERT INTO public."Languages"' +
    '("LanguageId", "Name", "Description", "Code", "InActiveDate", "InActive") VALUES ';

var tableDelete = 'DELETE FROM public."Languages" where "LanguageId" = ';



exports.create_a_Language = function (req, callback) {
    var dataGet = require('../data/dataGet');
    var dataPost = require('../data/dataPost');
    dataGet(tableCount,
        function (numberResults) {
            var id = 1;
            if (numberResults[0] != null) {
                id = numberResults[0]["LanguageId"] + 1;
            }
            var name = req.body.name;
            var description = req.body.description;
            var code = req.body.code;
            var inactiveDate = new Date(1900, 01, 01).toJSON().slice(0, 10).replace(/-/g, '/');
            var inactive = 0;
            var createQueryString = tableInsert +
                '(' + id + ',\'' + name + '\' ,\'' + description + '\' ,\'' + code + '\' ,\'' + inactiveDate + '\' ,\'' + inactive + '\')';
            dataPost(createQueryString, function (jsonResults, haserror, code) {
                callback(jsonResults, haserror, code);
            });
        });
};

exports.update_a_Language = function (req, callback) {
    var dataPut = require('../data/dataPut');
    var id = req.params.id;
    var name = req.body.name;
    var description = req.body.description;
    var code = req.body.code;
    var inactiveDate;
    var inactive;
    if (req.body.inactive === "1") {
        inactive = 1;
        inactiveDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    } else {
        inactive = 0;
        inactiveDate = new Date(1900, 01, 01).toJSON().slice(0, 10).replace(/-/g, '/');
    };
    dataPut(' UPDATE public."Languages" ' +
        'SET ' +
        ' "Name"=\'' + name + '\', ' +
        ' "Description"=\'' + description + '\', ' +
        ' "Code"=\'' + code + '\', ' +
        ' "InActiveDate"=\'' + inactiveDate + '\', ' +
        ' "InActive"=\'' + inactive + '\' ' +
        'where "LanguageId" = ' + id,
        function (jsonResults, haserror, code) {
            callback(jsonResults, haserror, code);
        });
};

exports.delete_a_Language = function (req, callback) {
    var dataDelete = require('../data/dataDelete');
    var id = req.params.id;
    dataDelete(tableDelete + id, function (jsonResults, haserror, code) {
        callback(jsonResults, haserror, code);
    });
};

exports.read_all_Languages = function (req, callback) {
    var dataGet = require('../data/dataGet');
    if (typeof req.query !== 'undefined' && req.query) {
        var sqlOrder = req.query.order; //console.log("There is a query string: ?order=" + sqlOrder);
        if (typeof sqlOrder !== 'undefined' && sqlOrder) { //There is a query string
            dataGet(tableSelect + ' ORDER BY L."Name" ASC ', function (jsonResults, haserror, code) {
                callback(jsonResults, haserror, code);
            });
        } else { //No query string use the default sequince
            dataGet(tableSelect + ' ORDER BY L."LanguageId" ASC ', function (jsonResults, haserror, code) {
                callback(jsonResults, haserror, code);
            });
        }
    } else { //No query string use the default sequince
        dataGet(tableSelect + ' ORDER BY L."Name" ASC ', function (jsonResults, haserror, code) {
            callback(jsonResults, haserror, code);
        });
    }
};

exports.read_a_Language = function (req, callback) {
    var dataGet = require('../data/dataGet');
    var id = req.params.id;
    dataGet(tableSelect + ' WHERE L."LanguageId" = ' + id, function (jsonResults, haserror, code) {
        callback(jsonResults, haserror, code);
    });
};
