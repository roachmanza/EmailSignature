
exports.get_all_CsiContactTypes = function (req, res) {
    var dataGet = require('../dataAccess/dataGet');
    dataGet(        
        'SELECT '+
        ' CCT."CsiContactTypeId" as CsiContactTypeId,'+        
        ' CCT."CsiMainContactTypeId" as CsiMainContactTypeId,'+   
        ' CMT."Name" as CsiMainContactTypeIdString,'+
        ' CCT."Name" as Name,'+
        ' CCT."Description" as Description,'+
        ' CCT."InActiveDate" as InActiveDate,'+
        ' CCT."InActive" as InActive'+   
        ' FROM public."CsiContactTypes" AS CCT'+
        ' JOIN public."CsiMainContactTypes" as CMT ON CMT."CsiMainContactTypeId" = CCT."CsiMainContactTypeId" '+
        ' ORDER BY CMT."Name" ASC , CCT."Name" ASC ',
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({success: false,  httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.status(200).type('application/json').json({ success: true, httpStatusCode: 200, status: "OK", data: results });
            }
        });
};

exports.create_a_CsiContactType = function (req, res) {
    var dataGet = require('../dataAccess/dataGet');
    dataGet('SELECT "CsiContactTypeId" FROM public."CsiContactTypes" order by "CsiContactTypeId" desc LIMIT 1',
        function (numberResults) {
            var id = 1;
            if (numberResults[0] != null) {
                id = numberResults[0]["CsiContactTypeId"] + 1;
            }
            var csiMainContactTypeId = req.body.csiMainContactTypeId;
            var name = req.body.name;
            var description = req.body.description;
            var inactiveDate = new Date(1900, 01, 01).toJSON().slice(0, 10).replace(/-/g, '/');
            var inactive = 0;
            var dataPost = require('../dataAccess/dataPost');
            dataPost('INSERT INTO public."CsiContactTypes"("CsiContactTypeId","CsiMainContactTypeId", "Name", "Description", "InActiveDate", "InActive") ' +
                'VALUES' +
                '(' + id + ',\'' + csiMainContactTypeId + '\' ,\'' + name + '\' ,\'' + description + '\' ,\'' + inactiveDate + '\' ,\'' + inactive + '\')',
                function (results, err) {
                    if (err) {
                        res.status(400).type('application/json').json({success: false,  httpStatusCode: 400, error: { status: "Bad Request", message: results } });
                    } else {
                        res.status(201).type('application/json').json({ success: true, httpStatusCode: 201, status: "Created", data: results });
                    }
                });
        });
};

exports.read_a_CsiContactType = function (req, res) {
    var id = req.params.Id;
    var dataGet = require('../dataAccess/dataGet');
    dataGet(
        'SELECT '+
        ' CCT."CsiContactTypeId" as CsiContactTypeId,'+        
        ' CCT."CsiMainContactTypeId" as CsiMainContactTypeId,'+   
        ' CMT."Name" as CsiMainContactTypeIdString,'+
        ' CCT."Name" as Name,'+
        ' CCT."Description" as Description,'+
        ' CCT."InActiveDate" as InActiveDate,'+
        ' CCT."InActive" as InActive'+   
        ' FROM public."CsiContactTypes" AS CCT'+
        ' JOIN public."CsiMainContactTypes" as CMT ON CMT."CsiMainContactTypeId" = CCT."CsiMainContactTypeId" '+
        ' AND CCT."CsiContactTypeId" = ' + id,
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.status(200).type('application/json').json({success: true,  httpStatusCode: 200, status: "OK", data: results });
            }
        });
};

exports.update_a_CsiContactType = function (req, res) {
    var id = req.params.Id;
    var csiMainContactTypeId = req.body.csiMainContactTypeId;
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
    dataPut(' UPDATE public."CsiContactTypes" ' +
        'SET ' +
        ' "CsiMainContactTypeId"=\'' + csiMainContactTypeId + '\', ' +
        ' "Name"=\'' + name + '\', ' +
        ' "Description"=\'' + description + '\', ' +
        ' "InActiveDate"=\'' + inactiveDate + '\', ' +
        ' "InActive"=\'' + inactive + '\' ' +
        'where "CsiContactTypeId" = ' + id,
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.status(200).type('application/json').json({success: true,  httpStatusCode: 200, status: "OK", data: results });
            }
        });
};

exports.delete_a_CsiContactType = function (req, res) {
    var id = req.params.Id;
    var dataDelete = require('../dataAccess/dataDelete');
    dataDelete('DELETE FROM public."CsiContactTypes" where "CsiContactTypeId" = ' + id,
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.status(200).type('application/json').json({ success: true, httpStatusCode: 200, status: "No Content", data: results });
            }
        });
};
