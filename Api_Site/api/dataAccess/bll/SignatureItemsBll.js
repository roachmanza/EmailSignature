exports.TableSelectAllSignatureItems = 'SELECT ' +
        ' SI."SignatureItemId" as SignatureItemId, ' +
        ' SI."ContactTypeId" as ContactTypeId, ' +
        ' CT."Name" as ContactTypeIdString, ' +
        ' SI."FieldItemId" as FieldItemId, ' +
        ' FI."Name" as FieldItemIdString, ' +
        ' SI."Sequence" as Sequence, ' +
        ' SI."InActiveDate" as InActiveDate, ' +
        ' SI."InActive" as InActive ' +
        ' FROM public."SignatureItems" AS SI' +
        ' JOIN public."ContactTypes" as CT ON CT."ContactTypeId" = SI."ContactTypeId" ' +
        ' JOIN public."FieldItems" as FI ON FI."FieldItemId" = SI."FieldItemId" ';

exports.get_all_SignatureItems = function (req, callback) {
    var dataGet = require('../dataAccess/dataGet');
    var baseQuery = this.TableSelectAllSignatureItems + ' ORDER BY CT."Name" ASC , SI."Sequence" ASC, FI."Name" ASC';
    if (typeof req.query !== 'undefined' && req.query) {
        var sqlOrder = req.query.order; //console.log("There is a query string: ?order=" + sqlOrder);
        if (typeof sqlOrder !== 'undefined' && sqlOrder) { //There is a query string
            dataGet(baseQuery + ' ORDER BY CT."Name" ASC ,SI."Sequence" ASC ', function (jsonResults, haserror, code) {
                callback(jsonResults, haserror, code);
            });
        } else { //No query string use the default sequince
            dataGet(baseQuery + ' ORDER BYCT."Name" ASC , SI."Sequence" ASC ', function (jsonResults, haserror, code) {
                callback(jsonResults, haserror, code);
            });
        }
    } else { //No query string use the default sequince
        dataGet(baseQuery + ' ORDER BY CT."Name" ASC ,SI."Sequence" ASC ', function (jsonResults, haserror, code) {
            callback(jsonResults, haserror, code);
        });
    }
};

exports.create_a_SignatureItem = function (req, res) {
    var dataGet = require('../dataAccess/dataGet');
    var dataPost = require('../dataAccess/dataPost');
    var countQuery = 'SELECT "SignatureItemId" FROM public."SignatureItems" order by "SignatureItemId" desc LIMIT 1';
    dataGet(countQuery,
        function (numberResults) {
            var id = 1;
            if (numberResults[0] != null) {
                id = numberResults[0]["SignatureItemId"] + 1;
            }
            var contactTypeId = req.body.contactTypeId;
            var fieldItemId = req.body.fieldItemId;
            var sequence = req.body.sequence;
            var inactiveDate = new Date(1900, 01, 01).toJSON().slice(0, 10).replace(/-/g, '/');
            var inactive = 0;
            var createQuery = 'INSERT INTO public."SignatureItems"("SignatureItemId", "ContactTypeId", "FieldItemId", "Sequence", "InActiveDate", "InActive") VALUES ' +
                '(' + id + ',\'' + contactTypeId + '\' ,\'' + fieldItemId + '\' ,\'' + sequence + '\' ,\'' + inactiveDate + '\' ,\'' + inactive + '\')';
            dataPost(createQuery, function (jsonResults, haserror, code) {
                callback(jsonResults, haserror, code);
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
        ' CT."Name" as ContactTypeIdString, ' +
        ' SI."FieldItemId" as FieldItemId, ' +
        ' FI."Name" as FieldItemIdString, ' +
        ' SI."Sequence" as Sequence, ' +
        ' SI."InActiveDate" as InActiveDate, ' +
        ' SI."InActive" as InActive ' +
        ' FROM public."SignatureItems" AS SI' +
        ' JOIN public."ContactTypes" as CT ON CT."ContactTypeId" = SI."ContactTypeId" ' +
        ' JOIN public."FieldItems" as FI ON FI."FieldItemId" = SI."FieldItemId" ' +
        ' AND SI."SignatureItemId" = ' + id,
        function (jsonResults, haserror, code) {
            callback(jsonResults, haserror, code);
        });
};

exports.update_a_SignatureItem = function (req, res) {
    var id = req.params.SignatureItemId;
    var contactTypeId = req.body.contactTypeId;
    var fieldItemId = req.body.fieldItemId;
    var sequence = req.body.sequence;
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
        ' "FieldItemId"=\'' + fieldItemId + '\', ' +
        ' "Sequence"=\'' + sequence + '\', ' +
        ' "InActiveDate"=\'' + inactiveDate + '\', ' +
        ' "InActive"=\'' + inactive + '\' ' +
        'where "SignatureItemId" = ' + id,
        function (jsonResults, haserror, code) {
            callback(jsonResults, haserror, code);
        });
};

exports.delete_a_SignatureItem = function (req, res) {
    var id = req.params.SignatureItemId;
    var dataDelete = require('../dataAccess/dataDelete');
    dataDelete('DELETE FROM public."SignatureItems" where "SignatureItemId" = ' + id,
        function (jsonResults, haserror, code) {
            callback(jsonResults, haserror, code);
        });
};

exports.read_all_SignatureItems_for_emailAddr = function (req, res) {
    var id = req.params.EmailAddress;
    var dataGet = require('../dataAccess/dataGet');
    dataGet(
        'SELECT ' +
        ' SI."SignatureItemId" as SignatureItemId, ' +
        ' SI."ContactTypeId" as ContactTypeId, ' +
        ' CT."Name" as ContactTypeIdString, ' +
        ' SI."FieldItemId" as FieldItemId, ' +
        ' FI."Name" as FieldItemIdString, ' +
        ' SI."Sequence" as Sequence, ' +
        ' SI."InActiveDate" as InActiveDate, ' +
        ' SI."InActive" as InActive ' +
        ' FROM public."SignatureItems" AS SI' +
        ' JOIN public."ContactTypes" as CT ON CT."ContactTypeId" = SI."ContactTypeId" ' +
        ' JOIN public."FieldItems" as FI ON FI."FieldItemId" = SI."FieldItemId" ' +
        ' and CT."EmailAddress" = \'' + id + '\'',
        function (jsonResults, haserror, code) {
            callback(jsonResults, haserror, code);
        });
};

exports.read_all_SignatureItems_for_contactTypeId = function (req, res) {
    var id = req.params.Id;
    var dataGet = require('../dataAccess/dataGet');
    dataGet(
        'SELECT ' +
        ' SI."SignatureItemId" as SignatureItemId, ' +
        ' SI."ContactTypeId" as ContactTypeId, ' +
        ' CT."Name" as ContactTypeIdString, ' +
        ' SI."FieldItemId" as FieldItemId, ' +
        ' FI."Name" as FieldItemIdString, ' +
        ' SI."Sequence" as Sequence, ' +
        ' SI."InActiveDate" as InActiveDate, ' +
        ' SI."InActive" as InActive ' +
        ' FROM public."SignatureItems" AS SI' +
        ' JOIN public."ContactTypes" as CT ON CT."ContactTypeId" = SI."ContactTypeId" ' +
        ' JOIN public."FieldItems" as FI ON FI."FieldItemId" = SI."FieldItemId" ' +
        ' AND SI."ContactTypeId" = ' + id,
        function (jsonResults, haserror, code) {
            callback(jsonResults, haserror, code);
        });
};