var tableSelect =
    ' SELECT ' +
    ' FT."FieldTypeId" as FieldTypeId,' +
    ' FT."Name" as Name,' +
    ' FT."Description" as Description,' +
    ' FT."InActiveDate" as InActiveDate,' +
    ' FT."InActive" as InActive' +
    ' FROM public."FieldTypes" AS FT';

var tableCount = 'SELECT "FieldTypeId" FROM public."FieldTypes" order by "FieldTypeId" desc LIMIT 1';

var tableInsert = 'INSERT INTO public."FieldTypes"' +
    '("FieldTypeId", "Name", "Description", "InActiveDate", "InActive") VALUES ';

var tableDelete = 'DELETE FROM public."FieldTypes" where "FieldTypeId" = ';



exports.create_a_FieldType = function (req, callback) {
    var dataGet = require('../data/dataGet');
    var dataPost = require('../data/dataPost');
    dataGet(tableCount,
        function (numberResults) {
            var id = 1;
            if (numberResults[0] != null) {
                id = numberResults[0]["FieldTypeId"] + 1;
            }
            var name = req.body.name;
            var description = req.body.description;
            var inactiveDate = new Date(1900, 01, 01).toJSON().slice(0, 10).replace(/-/g, '/');
            var inactive = 0;
            var createQueryString = tableInsert +
                '(' + id + ',\'' + name + '\' ,\'' + description + '\' ,\'' + inactiveDate + '\' ,\'' + inactive + '\')';
            dataPost(createQueryString, function (jsonResults, haserror, code) {
                callback(jsonResults, haserror, code);
            });
        });
};

exports.update_a_FieldType = function (req, callback) {
    var dataPut = require('../data/dataPut');
    var id = req.params.id;
    var name = req.body.name;
    var description = req.body.description;
    var inactiveDate;
    var inactive;
    if (req.body.inactive === "1") {
        inactive = 1;
        inactiveDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    } else {
        inactive = 0;
        inactiveDate = new Date(1900, 01, 01).toJSON().slice(0, 10).replace(/-/g, '/');
    };
    dataPut(' UPDATE public."FieldTypes" ' +
        'SET ' +
        ' "Name"=\'' + name + '\', ' +
        ' "Description"=\'' + description + '\', ' +
        ' "InActiveDate"=\'' + inactiveDate + '\', ' +
        ' "InActive"=\'' + inactive + '\' ' +
        'where "FieldTypeId" = ' + id,
        function (jsonResults, haserror, code) {
            callback(jsonResults, haserror, code);
        });
};

exports.delete_a_FieldType = function (req, callback) {
    var dataDelete = require('../data/dataDelete');
    var id = req.params.id;
    dataDelete(tableDelete + id, function (jsonResults, haserror, code) {
        callback(jsonResults, haserror, code);
    });
};

exports.read_all_FieldTypes = function (req, callback) {
    var dataGet = require('../data/dataGet');
    if (typeof req.query !== 'undefined' && req.query) {
        var sqlOrder = req.query.order; //console.log("There is a query string: ?order=" + sqlOrder);
        if (typeof sqlOrder !== 'undefined' && sqlOrder) { //There is a query string
            dataGet(tableSelect + ' ORDER BY FT."Name" ASC ', function (jsonResults, haserror, code) {
                callback(jsonResults, haserror, code);
            });
        } else { //No query string use the default sequince
            dataGet(tableSelect + ' ORDER BY FT."FieldTypeId" ASC ', function (jsonResults, haserror, code) {
                callback(jsonResults, haserror, code);
            });
        }
    } else { //No query string use the default sequince
        dataGet(tableSelect + ' ORDER BY FT."Name" ASC ', function (jsonResults, haserror, code) {
            callback(jsonResults, haserror, code);
        });
    }
};

exports.read_a_FieldType = function (req, callback) {
    var dataGet = require('../data/dataGet');
    var id = req.params.id;
    dataGet(tableSelect + ' WHERE FT."FieldTypeId" = ' + id, function (jsonResults, haserror, code) {
        callback(jsonResults, haserror, code);
    });
};