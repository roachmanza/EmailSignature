var tableSelect =
    ' SELECT ' +
    ' CT."ContactTypeId" as ContactTypeId,' +
    ' CT."Name" as Name,' +
    ' CT."Description" as Description,' +
    ' CT."EmailAddress" as EmailAddress,' +
    ' CT."InActiveDate" as InActiveDate,' +
    ' CT."InActive" as InActive' +
    ' FROM public."ContactTypes" AS CT';

var tableCount = 'SELECT "ContactTypeId" FROM public."ContactTypes" order by "ContactTypeId" desc LIMIT 1';

var tableInsert = 'INSERT INTO public."ContactTypes"' +
    '("ContactTypeId", "Name", "Description", "EmailAddress", "InActiveDate", "InActive") VALUES ';

var tableDelete = 'DELETE FROM public."ContactTypes" where "ContactTypeId" = ';

exports.create_a_ContactType = function (req, callback) {
    var dataGet = require('../data/dataGet');
    var dataPost = require('../data/dataPost');
    var name = req.body.name;
    var description = req.body.description;
    var email = req.body.email;
    var inactiveDate = new Date(1900, 01, 01).toJSON().slice(0, 10).replace(/-/g, '/');
    var inactive = 0;
    dataGet('SELECT "EmailAddress" FROM public."ContactTypes" where "EmailAddress" = \'' + email+ '\'',
        function (numberResults) {
            console.log(numberResults);
            if(numberResults.length > 0){
                //Some values were found for the email address
                callback(JSON.parse(JSON.stringify(numberResults)), true, 403);
                return;
            }else{
                //

            }

            if (numberResults === 'No records found') {
                dataGet(tableCount,
                    function (numberResults) {
                        var id = 1;
                        if (numberResults[0] != null) {
                            id = numberResults[0]["ContactTypeId"] + 1;
                        }

                        var createQueryString = tableInsert +
                            '(' + id + ',\'' + name + '\' ,\'' + description + '\' ,\'' + email + '\' ,\'' + inactiveDate + '\' ,\'' + inactive + '\')';
                        dataPost(createQueryString, function (jsonResults, haserror, code) {
                            callback(jsonResults, haserror, code);
                        });
                    });
            } else if(numberResults === 'Connection error, could not find the \'serverSettings.postgresDbConnection\' file.') {
                
                callback(JSON.parse(JSON.stringify(numberResults)), true, 403);
                return;
            }else{
                 callback(JSON.parse(JSON.stringify("The email address is already in use.")), true, 403);
                return;
            }
        });
};

exports.update_a_ContactType = function (req, callback) {
    var dataPut = require('../data/dataPut');
    var id = req.params.id;
    var name = req.body.name;
    var description = req.body.description;
    var email = req.body.email;
    var inactiveDate;
    var inactive;
    if (req.body.inactive === "1") {
        inactive = 1;
        inactiveDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    } else {
        inactive = 0;
        inactiveDate = new Date(1900, 01, 01).toJSON().slice(0, 10).replace(/-/g, '/');
    };
    dataPut(' UPDATE public."ContactTypes" ' +
        'SET ' +
        ' "Name"=\'' + name + '\', ' +
        ' "Description"=\'' + description + '\', ' +
        ' "EmailAddress"=\'' + email + '\', ' +
        ' "InActiveDate"=\'' + inactiveDate + '\', ' +
        ' "InActive"=\'' + inactive + '\' ' +
        'where "ContactTypeId" = ' + id,
        function (jsonResults, haserror, code) {
            callback(jsonResults, haserror, code);
        });
};

exports.delete_a_ContactType = function (req, callback) {
    var dataDelete = require('../data/dataDelete');
    var id = req.params.id;
    dataDelete(tableDelete + id, function (jsonResults, haserror, code) {
        callback(jsonResults, haserror, code);
    });
};

exports.read_all_ContactTypes = function (req, callback) {
    var dataGet = require('../data/dataGet');
    if (typeof req.query !== 'undefined' && req.query) {
        var sqlOrder = req.query.order; //console.log("There is a query string: ?order=" + sqlOrder);
        if (typeof sqlOrder !== 'undefined' && sqlOrder) { //There is a query string
            dataGet(tableSelect + ' ORDER BY CT."Name" ASC ', function (jsonResults, haserror, code) {
                callback(jsonResults, haserror, code);
            });
        } else { //No query string use the default sequince
            dataGet(tableSelect + ' ORDER BY CT."ContactTypeId" ASC ', function (jsonResults, haserror, code) {
                callback(jsonResults, haserror, code);
            });
        }
    } else { //No query string use the default sequince
        dataGet(tableSelect + ' ORDER BY CT."Name" ASC ', function (jsonResults, haserror, code) {
            callback(jsonResults, haserror, code);
        });
    }
};

exports.read_a_ContactType = function (req, callback) {
    var dataGet = require('../data/dataGet');
    var id = req.params.id;
    dataGet(tableSelect + ' WHERE CT."ContactTypeId" = ' + id, function (jsonResults, haserror, code) {
        callback(jsonResults, haserror, code);
    });
};

exports.read_a_ContactType_for_EmailAddress = function (req, callback) {
    var dataGet = require('../data/dataGet');
    var emailaddress = req.params.id;
    dataGet(tableSelect + ' WHERE CT."EmailAddress" = \'' + emailaddress + '\'', function (jsonResults, haserror, code) {
        callback(jsonResults, haserror, code);
    });
};