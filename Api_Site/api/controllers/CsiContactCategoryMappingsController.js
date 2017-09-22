
exports.get_all_CsiContactCategoryMappings = function (req, res) {
    var dataGet = require('../dataAccess/dataGet');
    dataGet(
        'SELECT '+
        ' CCCM."CsiContactCategoryMappingId" as CsiContactCategoryMappingId,'+
        ' CCCM."CsiContactCategoryId" as CsiContactCategoryId,'+
        ' CCC."Name" as CsiContactCategoryIdString,'+
        ' CCCM."ContactTypeId" as ContactTypeId,'+
        ' CT."Name" as ContactTypeIdString,'+
        ' CCCM."Name" as Name,'+
        ' CCCM."Description" as Description,'+
        ' CCCM."InActiveDate" as InActiveDate,'+
        ' CCCM."InActive" as InActive'+   
        ' FROM public."CsiContactCategoryMappings" AS CCCM '+
        ' JOIN public."ContactTypes" as CT ON CT."ContactTypeId" = CCCM."ContactTypeId" '+
        ' JOIN public."CsiContactCategories" as CCC ON CCC."CsiContactCategoryId" = CCCM."CsiContactCategoryId" '+
        ' ORDER BY CT."Name" ASC , CCC."Name" ASC ',
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.status(200).type('application/json').json({success: true,  httpStatusCode: 200, status: "OK", data: results });
            }
        });
};

exports.create_a_CsiContactCategoryMappings = function (req, res) {
    var dataGet = require('../dataAccess/dataGet');
    dataGet('SELECT "CsiContactCategoryMappingId" FROM public."CsiContactCategoryMappings" order by "CsiContactCategoryMappingId" desc LIMIT 1',
        function (numberResults) {
            var id = 1;
            if (numberResults[0] != null) {
                id = numberResults[0]["CsiContactCategoryMappingId"] + 1;
            }
            var name = req.body.name;
            var description = req.body.description;
            var csiContactCategoryId = req.body.csiContactCategoryId;
            var contactTypeId = req.body.contactTypeId;
            var inactiveDate = new Date(1900, 01, 01).toJSON().slice(0, 10).replace(/-/g, '/');
            var inactive = 0;
            var dataPost = require('../dataAccess/dataPost');
            dataPost('INSERT INTO public."CsiContactCategoryMappings"("CsiContactCategoryMappingId","CsiContactCategoryId","ContactTypeId", "Name", "Description","InActiveDate", "InActive") ' +
                'VALUES' +
                '(' + id + ',\'' + csiContactCategoryId + '\' ,\'' + contactTypeId + '\' ,\'' + name + '\' ,\'' + description + '\' ,\'' + inactiveDate + '\' ,\'' + inactive + '\')',
                function (results, err) {
                    if (err) {
                        res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
                    } else {
                        res.status(201).type('application/json').json({ success: true, httpStatusCode: 201, status: "Created", data: results });
                    }
                });
        });
};

exports.read_a_CsiContactCategoryMappings = function (req, res) {
    var id = req.params.Id;
    var dataGet = require('../dataAccess/dataGet');
    dataGet(
        'SELECT '+
        ' CCCM."CsiContactCategoryMappingId" as CsiContactCategoryMappingId,'+
        ' CCCM."CsiContactCategoryId" as CsiContactCategoryId,'+
        ' CCC."Name" as CsiContactCategoryIdString,'+
        ' CCCM."ContactTypeId" as ContactTypeId,'+
        ' CT."Name" as ContactTypeIdString,'+
        ' CCCM."Name" as Name,'+
        ' CCCM."Description" as Description,'+
        ' CCCM."InActiveDate" as InActiveDate,'+
        ' CCCM."InActive" as InActive'+   
        ' FROM public."CsiContactCategoryMappings" AS CCCM '+
        ' JOIN public."ContactTypes" as CT ON CT."ContactTypeId" = CCCM."ContactTypeId" '+
        ' JOIN public."CsiContactCategories" as CCC ON CCC."CsiContactCategoryId" = CCCM."CsiContactCategoryId" '+
        ' AND CCCM."CsiContactCategoryMappingId" = ' + id ,
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.status(200).type('application/json').json({success: true,  httpStatusCode: 200, status: "OK", data: results });
            }
        });
};

exports.update_a_CsiContactCategoryMappings = function (req, res) {
    var id = req.params.Id;
    var csiContactCategoryId = req.body.csiContactCategoryId;
    var contactTypeId = req.body.contactTypeId;
    var name = req.body.name;
    var description = req.body.description;
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
    dataPut(' UPDATE public."CsiContactCategoryMappings" ' +
        'SET ' +
        ' "CsiContactCategoryId"=\'' + csiContactCategoryId + '\', ' + 
        ' "ContactTypeId"=\'' + contactTypeId + '\', ' +        
        ' "Name"=\'' + name + '\', ' +
        ' "Description"=\'' + description + '\', ' +
        ' "InActiveDate"=\'' + inactiveDate + '\', ' +
        ' "InActive"=\'' + inactive + '\' ' +
        'where "CsiContactCategoryMappingId" = ' + id,
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({success: false,  httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.status(200).type('application/json').json({ success: true, httpStatusCode: 200, status: "OK", data: results });
            }
        });
};

exports.delete_a_CsiContactCategoryMappings = function (req, res) {
    var id = req.params.Id;
    var dataDelete = require('../dataAccess/dataDelete');
    dataDelete('DELETE FROM public."CsiContactCategoryMappings" where "CsiContactCategoryMappingId" = ' + id,
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({success: false,  httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.status(200).type('application/json').json({success: true,  httpStatusCode: 200, status: "No Content", data: results });
            }
        });
};
