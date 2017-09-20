
exports.get_all_SignatureItems = function (req, res) {
    var dataGet = require('../dataAccess/dataGet');
    dataGet(
        'SELECT ' +
        ' SI."SignatureItemId" as SignatureItemId, ' +
        ' SI."ContactTypeId" as ContactTypeId, ' +
        ' SI."FieldTypeId" as FieldTypeId, ' +
        ' SI."LanguageId" as LanguageId, ' +
        ' SI."CsiContactCategoryId" as CsiContactCategoryId, ' +
        ' SI."CsiContactTypeId" as CsiContactTypeId, ' +
        ' SI."CsiMainContactTypeId" as CsiMainContactTypeId, ' +
        ' SI."Sequence" as Sequence, ' +
        ' SI."Label" as Label, ' +
        ' SI."Value" as Value, ' +
        ' SI."PrintFormat" as PrintFormat, ' +
        ' SI."InActiveDate" as InActiveDate, ' +
        ' SI."InActive" as InActive ' +
        ' FROM public."SignatureItems" AS SI',
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.type('application/json').json({ success: true, httpStatusCode: 200, status: "OK", data: results });
            }
        });
};

exports.create_a_SignatureItem = function (req, res) {
    var dataGet = require('../dataAccess/dataGet');
    dataGet('SELECT "SignatureItemId" FROM public."SignatureItems" order by "SignatureItemId" desc LIMIT 1',
        function (numberResults) {
            var id = 1;
            if (numberResults[0] != null) {
                id = numberResults[0]["SignatureItemId"] + 1;
            }
            var contactTypeId = req.body.contactTypeId;
            var fieldTypeId = req.body.fieldTypeId;
            var languageId = req.body.languageId;
            var csiContactCategoryId = req.body.csiContactCategoryId;
            var csiContactTypeId = req.body.csiContactTypeId;
            var csiMainContactTypeId = req.body.csiMainContactTypeId;
            var sequence = req.body.sequence;
            var label = req.body.label;
            var value = req.body.value;
            var printFormat = req.body.printFormat;
            var inactiveDate = new Date(1900, 01, 01).toJSON().slice(0, 10).replace(/-/g, '/');
            var inactive = 0;
            var dataPost = require('../dataAccess/dataPost');
            dataPost('INSERT INTO public."SignatureItems"("SignatureItemId", "ContactTypeId", "FieldTypeId", "LanguageId", "CsiContactCategoryId", "CsiContactTypeId", "CsiMainContactTypeId", "Sequence", "Label", "Value", "PrintFormat", "InActiveDate", "InActive") VALUES ' +
                '(' + id + ',\'' +
                contactTypeId + '\' ,\'' + fieldTypeId + '\' ,\'' + languageId + '\' ,\'' + csiContactCategoryId + '\' ,\'' + csiContactTypeId + '\' ,\'' + csiMainContactTypeId + '\' ,\'' + sequence + '\' ,\'' + label + '\' ,\'' + value + '\' ,\'' + printFormat + '\' ,\'' +
                inactiveDate + '\' ,\'' + inactive + '\')',
                function (results, err) {
                    if (err) {
                        res.status(400).type('application/json').json({success: false,  httpStatusCode: 400, error: { status: "Bad Request", message: results } });
                    } else {
                        res.type('application/json').json({ success: true, httpStatusCode: 201, status: "Created", data: results });
                    }
                });
        });
};

exports.read_a_SignatureItem = function (req, res) {
    var id = req.params.SignatureItemId;
    var dataGet = require('../dataAccess/dataGet');
    dataGet(
        'SELECT ' +
        ' SI."SignatureItemId" as SignatureItemId, ' +
        ' SI."ContactTypeId" as ContactTypeId, ' +
        ' SI."FieldTypeId" as FieldTypeId, ' +
        ' SI."LanguageId" as LanguageId, ' +
        ' SI."CsiContactCategoryId" as CsiContactCategoryId, ' +
        ' SI."CsiContactTypeId" as CsiContactTypeId, ' +
        ' SI."CsiMainContactTypeId" as CsiMainContactTypeId, ' +
        ' SI."Sequence" as Sequence, ' +
        ' SI."Label" as Label, ' +
        ' SI."Value" as Value, ' +
        ' SI."PrintFormat" as PrintFormat, ' +
        ' SI."InActiveDate" as InActiveDate, ' +
        ' SI."InActive" as InActive ' +
        ' FROM public."SignatureItems" AS SI' +
        ' WHERE SI."SignatureItemId" = ' + id,
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.type('application/json').json({success: true,  httpStatusCode: 200, status: "OK", data: results });
            }
        });
};

exports.update_a_SignatureItem = function (req, res) {
    var id = req.params.SignatureItemId;
    var contactTypeId = req.body.contactTypeId;
    var fieldTypeId = req.body.fieldTypeId;
    var languageId = req.body.languageId;
    var csiContactCategoryId = req.body.csiContactCategoryId;
    var csiContactTypeId = req.body.csiContactTypeId;
    var csiMainContactTypeId = req.body.csiMainContactTypeId;
    var sequence = req.body.sequence;
    var label = req.body.label;
    var value = req.body.value;
    var printFormat = req.body.printFormat;
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
    dataPut(' UPDATE public."SignatureItems" ' +
        'SET ' +
        ' "ContactTypeId"=\'' + contactTypeId + '\', ' +
        ' "FieldTypeId"=\'' + fieldTypeId + '\', ' +
        ' "LanguageId"=\'' + languageId + '\', ' +
        ' "CsiContactCategoryId"=\'' + csiContactCategoryId + '\', ' +
        ' "CsiContactTypeId"=\'' + csiContactTypeId + '\', ' +
        ' "CsiMainContactTypeId"=\'' + csiMainContactTypeId + '\', ' +
        ' "Sequence"=\'' + sequence + '\', ' +
        ' "Label"=\'' + label + '\', ' +
        ' "Value"=\'' + value + '\', ' +
        ' "PrintFormat"=\'' + printFormat + '\', ' +
        ' "InActiveDate"=\'' + inactiveDate + '\', ' +
        ' "InActive"=\'' + inactive + '\' ' +
        'where "SignatureItemId" = ' + id,
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({success: false,  httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.type('application/json').json({ success: true, httpStatusCode: 200, status: "OK", data: results });
            }
        });
};

exports.delete_a_SignatureItem = function (req, res) {
    var id = req.params.SignatureItemId;
    var dataDelete = require('../dataAccess/dataDelete');
    dataDelete('DELETE FROM public."SignatureItems" where "SignatureItemId" = ' + id,
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.type('application/json').json({ success: true, httpStatusCode: 204, status: "No Content", data: results });
            }
        });
};

exports.read_all_SignatureItems_for_emailAddr = function (req, res) {
    var id = req.params.EmailAddress;
    var dataGet = require('../dataAccess/dataGet');
    dataGet('SELECT ' +
        ' SI."SignatureItemId" as SignatureItemId, ' +
        ' SI."ContactTypeId" as ContactTypeId, ' +
        ' SI."FieldTypeId" as FieldTypeId, ' +
        ' SI."LanguageId" as LanguageId, ' +
        ' SI."CsiContactCategoryId" as CsiContactCategoryId, ' +
        ' SI."CsiContactTypeId" as CsiContactTypeId, ' +
        ' SI."CsiMainContactTypeId" as CsiMainContactTypeId, ' +
        ' SI."Sequence" as Sequence, ' +
        ' SI."Label" as Label, ' +
        ' SI."Value" as Value, ' +
        ' SI."PrintFormat" as PrintFormat, ' +
        ' SI."InActiveDate" as InActiveDate, ' +
        ' SI."InActive" as InActive ' +
        ' FROM public."SignatureItems" AS SI' +
        ' JOIN public."ContactTypes" as CT ON CT."ContactTypeId" = SI."ContactTypeId" ' +
        ' and CT."ContactTypeEmailAddress" = \'' + id + '\'',
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.type('application/json').json({ success: true, httpStatusCode: 200, status: "OK", data: results });
            }
        });
};

exports.read_all_SignatureItems_for_contactTypeId = function (req, res) {
    var id = req.params.ContactTypeId;
    var dataGet = require('../dataAccess/dataGet');
    dataGet('SELECT ' +
        ' SI."SignatureItemId" as SignatureItemId, ' +
        ' SI."ContactTypeId" as ContactTypeId, ' +
        ' SI."FieldTypeId" as FieldTypeId, ' +
        ' SI."LanguageId" as LanguageId, ' +
        ' SI."CsiContactCategoryId" as CsiContactCategoryId, ' +
        ' SI."CsiContactTypeId" as CsiContactTypeId, ' +
        ' SI."CsiMainContactTypeId" as CsiMainContactTypeId, ' +
        ' SI."Sequence" as Sequence, ' +
        ' SI."Label" as Label, ' +
        ' SI."Value" as Value, ' +
        ' SI."PrintFormat" as PrintFormat, ' +
        ' SI."InActiveDate" as InActiveDate, ' +
        ' SI."InActive" as InActive ' +
        ' FROM public."SignatureItems" AS SI' +
        ' where SI."ContactTypeId" = ' + id,
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.type('application/json').json({success: true,  httpStatusCode: 200, status: "OK", data: results });
            }
        });
};


