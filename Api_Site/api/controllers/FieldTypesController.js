exports.read_all_FieldTypes = function (req, res) {
    var bll = require('../dataAccess/bll/FieldTypesBll');
    bll.read_all_FieldTypes(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpStatusCode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpStatusCode: code,data: jsonResult });
            }
        });
};

exports.create_a_FieldType = function (req, res) {
    var bll = require('../dataAccess/bll/FieldTypesBll');
    bll.create_a_FieldType(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpStatusCode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpStatusCode: code,data: jsonResult });
            }
        });
};

exports.read_a_FieldType = function (req, res) {
    var bll = require('../dataAccess/bll/FieldTypesBll');
    bll.read_a_FieldType(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpStatusCode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpStatusCode: code,data: jsonResult });
            }
        });
};

exports.update_a_FieldType = function (req, res) {
        var bll = require('../dataAccess/bll/FieldTypesBll');
    bll.update_a_FieldType(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpStatusCode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpStatusCode: code,data: jsonResult });
            }
        });
};

exports.delete_a_FieldType = function (req, res) {
       var bll = require('../dataAccess/bll/FieldTypesBll');
    bll.delete_a_FieldType(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpStatusCode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpStatusCode: code,data: jsonResult });
            }
        });
};





// exports.get_all_FieldTypes = function (req, res) {
//     var dataGet = require('../dataAccess/dataGet');
//     dataGet(        
//         'SELECT '+
//         ' FT."FieldTypeId" as FieldTypeId,'+
//         ' FT."Name" as Name,'+
//         ' FT."Description" as Description,'+
//         ' FT."InActiveDate" as InActiveDate,'+
//         ' FT."InActive" as InActive'+   
//         ' FROM public."FieldTypes" AS FT', 
//         function (results, err) {
//             if (err) {
//                 res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
//             } else {
//                 res.status(200).type('application/json').json({ success: true, httpStatusCode: 200, status: "OK", data: results });
//             }
//         });
// };

// exports.create_a_FieldType = function (req, res) {
//     var dataGet = require('../dataAccess/dataGet');
//     dataGet('SELECT "FieldTypeId" FROM public."FieldTypes" order by "FieldTypeId" desc LIMIT 1',
//         function (numberResults) {
//             var id = 1;
//             if (numberResults[0] != null) {
//                 id = numberResults[0]["FieldTypeId"] + 1;
//             }
//             var name = req.body.name;
//             var description = req.body.description;
//             var inactiveDate = new Date(1900, 01, 01).toJSON().slice(0, 10).replace(/-/g, '/');
//             var inactive = 0;
//             var dataPost = require('../dataAccess/dataPost');
//             dataPost('INSERT INTO public."FieldTypes"("FieldTypeId", "Name", "Description", "InActiveDate", "InActive") ' +
//                 'VALUES' +
//                 '(' + id + ',\'' + name + '\' ,\'' + description + '\' ,\'' + inactiveDate + '\' ,\'' + inactive + '\')',
//                 function (results, err) {
//                     if (err) {
//                         res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
//                     } else {
//                         res.status(201).type('application/json').json({ success: true, httpStatusCode: 201, status: "Created", data: results });
//                     }
//                 });
//         });
// };

// exports.read_a_FieldType = function (req, res) {
//     var id = req.params.Id;
//     var dataGet = require('../dataAccess/dataGet');
//     dataGet(
//         'SELECT '+
//         ' FT."FieldTypeId" as FieldTypeId,'+
//         ' FT."Name" as Name,'+
//         ' FT."Description" as Description,'+
//         ' FT."InActiveDate" as InActiveDate,'+
//         ' FT."InActive" as InActive'+   
//         ' FROM public."FieldTypes" AS FT'+
//         ' WHERE FT."FieldTypeId" = ' + id,
//         function (results, err) {
//             if (err) {
//                 res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
//             } else {
//                 res.status(200).type('application/json').json({ success: true, httpStatusCode: 200, status: "OK", data: results });
//             }
//         });
// };

// exports.update_a_FieldType = function (req, res) {
//     var id = req.params.Id;
//     var name = req.body.name;
//     var description = req.body.description;
//     var inactiveDate;
//     var inactive;
//     if (req.body.inActive === "1") {
//         inactive = 1;
//         inactiveDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
//     } else {
//         inactive = 0;
//         inactiveDate = new Date(1900, 01, 01).toJSON().slice(0, 10).replace(/-/g, '/');
//     }


//     var dataPut = require('../dataAccess/dataPut');
//     dataPut(' UPDATE public."FieldTypes" ' +
//         'SET ' +
//         ' "Name"=\'' + name + '\', ' +
//         ' "Description"=\'' + description + '\', ' +
//         ' "InActiveDate"=\'' + inactiveDate + '\', ' +
//         ' "InActive"=\'' + inactive + '\' ' +
//         'where "FieldTypeId" = ' + id,
//         function (results, err) {
//             if (err) {
//                 res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
//             } else {
//                 res.status(200).type('application/json').json({ success: true, httpStatusCode: 200, status: "OK", data: results });
//             }
//         });
// };

// exports.delete_a_FieldType = function (req, res) {
//     var id = req.params.Id;
//     var dataDelete = require('../dataAccess/dataDelete');
//     dataDelete('DELETE FROM public."FieldTypes" where "FieldTypeId" = ' + id,
//         function (results, err) {
//             if (err) {
//                 res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
//             } else {
//                 res.status(200).type('application/json').json({ success: true, httpStatusCode: 200, status: "No Content", data: results });
//             }
//         });
// };
