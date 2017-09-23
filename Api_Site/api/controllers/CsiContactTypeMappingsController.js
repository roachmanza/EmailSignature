
exports.get_all_CsiContactTypeMappings = function (req, res) {
    var dataGet = require('../dataAccess/dataGet');
    dataGet('SELECT '+
    ' CCTM."CsiContactTypeMappingId" as CsiContactTypeMappingId,'+
    ' CCTM."ContactTypeId" as ContactTypeId,'+
    ' CT."Name" as ContactTypeIdString, '+
    ' CCTM."CsiContactTypeId" as CsiContactTypeId, '+
    ' CCT."Name" as CsiContactTypeIdString, '+
    ' CCTM."Name" as Name, '+
    ' CCTM."Description" as Description, '+
    ' CCTM."InActiveDate" as InActiveDate, '+
    ' CCTM."InActive" as InActive '+    
    ' FROM public."CsiContactTypeMappings" AS CCTM '+
    ' JOIN public."ContactTypes" as CT ON CT."ContactTypeId" = CCTM."ContactTypeId" '+
    ' JOIN public."CsiContactTypes" as CCT ON CCT."CsiContactTypeId" = CCTM."CsiContactTypeId" '+
    ' ORDER BY CT."Name" ASC , CCT."Name" ASC ',
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.status(200).type('application/json').json({ success: true, httpStatusCode: 200, status: "OK", data: results });
            }
        });
};

exports.create_a_CsiContactTypeMappings = function (req, res) {
    var dataGet = require('../dataAccess/dataGet');
    dataGet('SELECT "CsiContactTypeMappingId" FROM public."CsiContactTypeMappings" order by "CsiContactTypeMappingId" desc LIMIT 1',
        function (numberResults) {
            var id = 1;
            if (numberResults[0] != null) {
                id = numberResults[0]["CsiContactTypeMappingId"] + 1;
            }
            var contactTypeId = req.body.contactTypeId;
            var csiContactTypeId = req.body.csiContactTypeId;
            var name = req.body.name;
            var description = req.body.description;
            var inactiveDate = new Date(1900, 01, 01).toJSON().slice(0, 10).replace(/-/g, '/');
            var inactive = 0;
            var dataPost = require('../dataAccess/dataPost');
            dataPost('INSERT INTO public."CsiContactTypeMappings"("CsiContactTypeMappingId", "ContactTypeId", "CsiContactTypeId", "Name", "Description","InActiveDate", "InActive") ' +
                'VALUES' +
                '(' + id + ',\'' + contactTypeId + '\' ,\''+ csiContactTypeId + '\' ,\'' + name + '\' ,\'' + description + '\' ,\'' + inactiveDate + '\' ,\'' + inactive + '\')',
                function (results, err) {
                    if (err) {
                        res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
                    } else {
                        res.status(201).type('application/json').json({ success: true, httpStatusCode: 201, status: "Created", data: results });
                    }
                });
        });
};

exports.read_a_CsiContactTypeMappings = function (req, res) {
    var id = req.params.Id;
    var dataGet = require('../dataAccess/dataGet');
    dataGet('SELECT '+
        ' CCTM."CsiContactTypeMappingId" as CsiContactTypeMappingId, '+
        ' CCTM."ContactTypeId" as ContactTypeId, '+
        ' CT."Name" as ContactTypeIdString, '+
        ' CCTM."CsiContactTypeId" as CsiContactTypeId, '+
        ' CCT."Name" as CsiContactTypeIdString, '+
        ' CCTM."Name" as Name, '+
        ' CCTM."Description" as Description, '+
        ' CCTM."InActiveDate" as InActiveDate, '+
        ' CCTM."InActive" as InActive '+    
        ' FROM public."CsiContactTypeMappings" AS CCTM'+
        ' JOIN public."ContactTypes" as CT ON CT."ContactTypeId" = CCTM."ContactTypeId" '+
        ' JOIN public."CsiContactTypes" as CCT ON CCT."CsiContactTypeId" = CCTM."CsiContactTypeId" '+
        ' AND CCTM."CsiContactTypeMappingId" = ' + id,
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.status(200).type('application/json').json({ success: true, httpStatusCode: 200, status: "OK", data: results });
            }
        });
};

exports.update_a_CsiContactTypeMappings = function (req, res) {
    var id = req.params.Id;
    var contactTypeId = req.body.contactTypeId;
    var csiContactTypeId = req.body.csiContactTypeId;
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
    dataPut(' UPDATE public."CsiContactTypeMappings" ' +
        'SET ' +
        ' "ContactTypeId"=\'' + contactTypeId + '\', ' +
        ' "CsiContactTypeId"=\'' + csiContactTypeId + '\', ' +
        ' "Name"=\'' + name + '\', ' +
        ' "Description"=\'' + description + '\', ' +
        ' "InActiveDate"=\'' + inactiveDate + '\', ' +
        ' "InActive"=\'' + inactive + '\' ' +
        'where "CsiContactTypeMappingId" = ' + id,
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.status(200).type('application/json').json({ success: true, httpStatusCode: 200, status: "OK", data: results });
            }
        });
};

exports.delete_a_CsiContactTypeMappings = function (req, res) {
    var id = req.params.Id;
    var dataDelete = require('../dataAccess/dataDelete');
    dataDelete('DELETE FROM public."CsiContactTypeMappings" where "CsiContactTypeMappingId" = ' + id,
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.status(200).type('application/json').json({ success: true, httpStatusCode: 200, status: "OK", data: results });
            }
        });
};
