
exports.get_all_AwdContactTypeMappings = function (req, res) {
    var dataGet = require('../dataAccess/dataGet');
    dataGet('SELECT '+
    ' ACTM."AwdContactTypeMappingId" as AwdContactTypeMappingId,'+
    ' ACTM."ContactTypeId" as ContactTypeId,'+
    ' ACTM."AwdRegion" as AwdRegion,'+
    ' ACTM."AwdContactRole" as AwdContactRole,'+
    ' ACTM."Name" as Name,'+
    ' ACTM."Description" as Description,'+
    ' ACTM."InActiveDate" as InActiveDate,'+
    ' ACTM."InActive" as InActive'+    
    ' FROM public."AwdContactTypeMappings" AS ACTM',
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.status(200).type('application/json').json({ success: true, httpStatusCode: 200, status: "OK", data: results });
            }
        });
};

exports.create_a_AwdContactTypeMapping = function (req, res) {
    var dataGet = require('../dataAccess/dataGet');
    dataGet('SELECT "AwdContactTypeMappingId" FROM public."AwdContactTypeMappings" order by "AwdContactTypeMappingId" desc LIMIT 1',
        function (numberResults) {
            var id = 1;
            if (numberResults[0] != null) {
                id = numberResults[0]["AwdContactTypeMappingId"] + 1;
            }
            var contactTypeId = req.body.contactTypeId;
            var awdRegion = req.body.awdRegion;
            var awdContactRole = req.body.awdContactRole;
            var name = req.body.name;
            var description = req.body.description;
            var inactiveDate = new Date(1900, 01, 01).toJSON().slice(0, 10).replace(/-/g, '/');
            var inactive = 0;
            var dataPost = require('../dataAccess/dataPost');
            dataPost('INSERT INTO public."AwdContactTypeMappings"("AwdContactTypeMappingId", "ContactTypeId", "AwdRegion", "AwdContactRole", "Name", "Description","InActiveDate", "InActive") ' +
                'VALUES' +
                '(' + id + ',\'' + contactTypeId + '\' ,\'' + awdRegion + '\' ,\'' + awdContactRole + '\' ,\'' + name + '\' ,\'' + description + '\' ,\'' + inactiveDate + '\' ,\'' + inactive + '\')',
                function (results, err) {
                    if (err) {
                        res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
                    } else {
                        res.status(201).type('application/json').json({ success: true, httpStatusCode: 201, status: "Created", data: results });
                    }
                });
        });
};

exports.read_a_AwdContactTypeMapping = function (req, res) {
    var id = req.params.Id;
    var dataGet = require('../dataAccess/dataGet');
    dataGet(
    'SELECT '+
    ' ACTM."AwdContactTypeMappingId" as AwdContactTypeMappingId,'+
    ' ACTM."ContactTypeId" as ContactTypeId,'+
    ' ACTM."AwdRegion" as AwdRegion,'+
    ' ACTM."AwdContactRole" as AwdContactRole,'+
    ' ACTM."Name" as Name,'+
    ' ACTM."Description" as Description,'+
    ' ACTM."InActiveDate" as InActiveDate,'+
    ' ACTM."InActive" as InActive'+   
    ' FROM public."AwdContactTypeMappings" AS ACTM'+
    ' where ACTM."AwdContactTypeMappingId" = ' + id,
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.status(200).type('application/json').json({ success: true, httpStatusCode: 200, status: "OK", data: results });
            }
        });
};

exports.update_a_AwdContactTypeMapping = function (req, res) {
    var id = req.params.Id;
    var contactTypeId = req.body.contactTypeId;
    var awdRegion = req.body.awdRegion;
    var awdContactRole = req.body.awdContactRole;
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
    dataPut(' UPDATE public."AwdContactTypeMappings" ' +
        'SET ' +
        ' "ContactTypeId"=\'' + contactTypeId + '\', ' +
        ' "AwdRegion"=\'' + awdRegion + '\', ' +
        ' "AwdContactRole"=\'' + awdContactRole + '\', ' +
        ' "Name"=\'' + name + '\', ' +
        ' "Description"=\'' + description + '\', ' +
        ' "InActiveDate"=\'' + inactiveDate + '\', ' +
        ' "InActive"=\'' + inactive + '\' ' +
        'where "AwdContactTypeMappingId" = ' + id,
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.status(200).type('application/json').json({ success: true, httpStatusCode: 200, status: "OK", data: results });
            }
        });
};

exports.delete_a_AwdContactTypeMapping = function (req, res) {
    var id = req.params.Id;
    var dataDelete = require('../dataAccess/dataDelete');
    dataDelete('DELETE FROM public."AwdContactTypeMappings" where "AwdContactTypeMappingId" = ' + id,
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.status(200).type('application/json').json({ success: true, httpStatusCode: 200, status: "OK", data: results });
            }
        });
};
