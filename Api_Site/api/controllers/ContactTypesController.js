
exports.get_all_ContactTypes = function (req, res) {
    var dataGet = require('../dataAccess/dataGet');
    dataGet(
        'SELECT '+
        ' CT."ContactTypeId" as ContactTypeId,'+
        ' CT."Name" as Name,'+
        ' CT."Description" as Description,'+
        ' CT."EmailAddress" as EmailAddress,'+
        ' CT."InActiveDate" as InActiveDate,'+
        ' CT."InActive" as InActive'+   
        ' FROM public."ContactTypes" AS CT',
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.status(200).type('application/json').json({ success: true, httpStatusCode: 200, status: "OK", data: results });
            }
        });
};

exports.create_a_ContactType = function (req, res) {
    var dataGet = require('../dataAccess/dataGet');
    dataGet('SELECT "ContactTypeId" FROM public."ContactTypes" order by "ContactTypeId" desc LIMIT 1',
        function (numberResults) {
            var id = 1;
            if (numberResults[0] != null) {
                id = numberResults[0]["ContactTypeId"] + 1;
            }
            var name = req.body.name;
            var description = req.body.description;
            var email = req.body.emailAddress;
            var inactiveDate = new Date(1900, 01, 01).toJSON().slice(0, 10).replace(/-/g, '/');
            var inactive = 0;
            var dataPost = require('../dataAccess/dataPost');
            dataPost('INSERT INTO public."ContactTypes"("ContactTypeId", "Name", "Description", "EmailAddress","InActiveDate", "InActive") ' +
                'VALUES' +
                '(' + id + ',\'' + name + '\' ,\'' + description + '\' ,\'' + email + '\' ,\'' + inactiveDate + '\' ,\'' + inactive + '\')',
                function (results, err) {
                    if (err) {
                        res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
                    } else {
                        res.status(201).type('application/json').json({ success: true, httpStatusCode: 201, status: "Created", data: results });
                    }
                });
        });
};

exports.read_a_ContactType = function (req, res) {
    var id = req.params.Id;
    var dataGet = require('../dataAccess/dataGet');
    dataGet(
        'SELECT '+
        ' CT."ContactTypeId" as ContactTypeId,'+
        ' CT."Name" as Name,'+
        ' CT."Description" as Description,'+
        ' CT."EmailAddress" as EmailAddress,'+
        ' CT."InActiveDate" as InActiveDate,'+
        ' CT."InActive" as InActive'+   
        ' FROM public."ContactTypes" AS CT'+
        ' WHERE CT."ContactTypeId" = ' + id,
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.status(200).type('application/json').json({ success: true, httpStatusCode: 200, status: "OK", data: results });
            }
        });
};

exports.read_a_ContactType_for_EmailAddress = function (req, res) {
    var email = req.params.EmailAddress;
    console.log(email);
    var dataGet = require('../dataAccess/dataGet');
    dataGet(
        ' SELECT '+
        ' CT."ContactTypeId" as ContactTypeId,'+
        ' CT."Name" as Name,'+
        ' CT."Description" as Description,'+
        ' CT."EmailAddress" as EmailAddress,'+
        ' CT."InActiveDate" as InActiveDate,'+
        ' CT."InActive" as InActive'+   
        ' FROM public."ContactTypes" AS CT'+
        ' WHERE CT."EmailAddress" = \'' + email + '\'',
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.status(200).type('application/json').json({ success: true, httpStatusCode: 200, status: "OK", data: results });
            }
        });
};

exports.update_a_ContactType = function (req, res) {
    var id = req.params.Id;
    var name = req.body.name;
    var description = req.body.description;
    var email = req.body.emailAddress;
    var inactiveDate;
    var inactive;
    if (req.body.inActive === "1") {
        inactive = 1;
        inactiveDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    } else {
        inactive = 0;
        inactiveDate = new Date(1900, 01, 01).toJSON().slice(0, 10).replace(/-/g, '/');
    }


    var dataPut = require('../dataAccess/dataPut');
    dataPut(' UPDATE public."ContactTypes" ' +
        'SET ' +
        ' "Name"=\'' + name + '\', ' +
        ' "Description"=\'' + description + '\', ' +
        ' "EmailAddress"=\'' + email + '\', ' +
        ' "InActiveDate"=\'' + inactiveDate + '\', ' +
        ' "InActive"=\'' + inactive + '\' ' +
        'where "ContactTypeId" = ' + id,
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.status(200).type('application/json').json({ success: true, httpStatusCode: 200, status: "OK", data: results });
            }
        });
};

exports.delete_a_ContactType = function (req, res) {
    var id = req.params.Id;
    var dataDelete = require('../dataAccess/dataDelete');
    dataDelete('DELETE FROM public."ContactTypes" where "ContactTypeId" = ' + id,
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.status(200).type('application/json').json({ success: true, httpStatusCode: 200, status: "No Content", data: results });
            }
        });
};
