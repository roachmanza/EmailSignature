var tableSelect =
    ' SELECT ' +
    ' FI."FieldItemId" as FieldItemId,' +
    ' FI."LanguageId" as LanguageId,' +
    ' L."Name" as LanguageIdName,' +
    ' FI."FieldTypeId" as FieldTypeId,' +
    ' FT."Name" as FieldTypeIdName,' +
    ' FI."Name" as Name,' +
    ' FI."Description" as Description,' +
    ' FI."Label" as Label,' +
    ' FI."Value" as Value,' +
    ' FI."PrintFormat" as PrintFormat,' +
    ' FI."InActiveDate" as InActiveDate,' +
    ' FI."InActive" as InActive' +
    ' FROM public."FieldItems" AS FI ' +
    ' JOIN public."Languages" as L ON L."LanguageId" = FI."LanguageId" ' +
    ' JOIN public."FieldTypes" as FT ON FT."FieldTypeId" = FI."FieldTypeId" ';

var tableCount = 'SELECT "FieldItemId" FROM public."FieldItems" order by "FieldItemId" desc LIMIT 1';

var tableInsert = 'INSERT INTO public."FieldItems"' +
    '("FieldItemId", "LanguageId", "FieldTypeId","Name","Description","Label", "Value", "PrintFormat", "InActiveDate", "InActive") VALUES ';

var tableDelete = 'DELETE FROM public."FieldItems" where "FieldItemId" = ';



exports.create_a_FieldItem = function (req, callback) {
    var dataGet = require('../data/dataGet');
    var dataPost = require('../data/dataPost');
    dataGet(tableCount,
        function (numberResults) {
            var id = 1;
            if (numberResults[0] != null) {
                id = numberResults[0]["FieldItemId"] + 1;
            }
            var languageid = req.body.languageid;
            var fieldtypeid = req.body.fieldtypeid;
            var name = req.body.name;
            var description = req.body.description;
            var label = req.body.label;
            var value = req.body.value;
            var printformat = req.body.printformat;
            var inactiveDate = new Date(1900, 01, 01).toJSON().slice(0, 10).replace(/-/g, '/');
            var inactive = 0;
            var createQueryString = tableInsert +
                '(' + id + ',\'' + languageid + '\' ,\'' + fieldtypeid + '\' ,\''+ name + '\' ,\''+ description + '\' ,\''+ label + '\' ,\''+ value + '\' ,\''+ printformat + '\' ,\'' + inactiveDate + '\' ,\'' + inactive + '\')';
            dataPost(createQueryString, function (jsonResults, haserror, code) {
                callback(jsonResults, haserror, code);
            });
        });
};

exports.update_a_FieldItem = function (req, callback) {
    var dataPut = require('../data/dataPut');
    var id = req.params.id;
    var languageid = req.body.languageid;
    var fieldtypeid = req.body.fieldtypeid;
    var name = req.body.name;
    var description = req.body.description;
    var label = req.body.label;
    var value = req.body.value;
    var printformat = req.body.printformat;
    var inactiveDate;
    var inactive;
    if (req.body.inactive === "1") {
        inactive = 1;
        inactiveDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    } else {
        inactive = 0;
        inactiveDate = new Date(1900, 01, 01).toJSON().slice(0, 10).replace(/-/g, '/');
    };
    dataPut(' UPDATE public."FieldItems" ' +
        'SET ' +
        ' "LanguageId"=\'' + languageid + '\', ' +
        ' "FieldTypeId"=\'' + fieldtypeid + '\', ' +
        ' "Name"=\'' + name + '\', ' +
        ' "Description"=\'' + description + '\', ' +
        ' "Label"=\'' + label + '\', ' +
        ' "Value"=\'' + value + '\', ' +
        ' "PrintFormat"=\'' + printformat + '\', ' +
        ' "InActiveDate"=\'' + inactiveDate + '\', ' +
        ' "InActive"=\'' + inactive + '\' ' +
        'where "FieldItemId" = ' + id,
        function (jsonResults, haserror, code) {
            callback(jsonResults, haserror, code);
        });
};

exports.delete_a_FieldItem = function (req, callback) {
    var dataDelete = require('../data/dataDelete');
    var id = req.params.id;
    dataDelete(tableDelete + id, function (jsonResults, haserror, code) {
        callback(jsonResults, haserror, code);
    });
};

exports.read_all_FieldItems = function (req, callback) {
    var dataGet = require('../data/dataGet');
    if (typeof req.query !== 'undefined' && req.query) {
        var sqlOrder = req.query.order; //console.log("There is a query string: ?order=" + sqlOrder);
        if (typeof sqlOrder !== 'undefined' && sqlOrder) { //There is a query string
            dataGet(tableSelect + ' ORDER BY FI."Name" ASC ', function (jsonResults, haserror, code) {
                callback(jsonResults, haserror, code);
            });
        } else { //No query string use the default sequince
            dataGet(tableSelect + ' ORDER BY FI."FieldItemId" ASC ', function (jsonResults, haserror, code) {
                callback(jsonResults, haserror, code);
            });
        }
    } else { //No query string use the default sequince
        dataGet(tableSelect + ' ORDER BY FI."Name" ASC ', function (jsonResults, haserror, code) {
            callback(jsonResults, haserror, code);
        });
    }
};

exports.read_a_FieldItem = function (req, callback) {
    var dataGet = require('../data/dataGet');
    var id = req.params.id;
    dataGet(tableSelect + ' AND FI."FieldItemId" = ' + id, function (jsonResults, haserror, code) {
        callback(jsonResults, haserror, code);
    });
};

