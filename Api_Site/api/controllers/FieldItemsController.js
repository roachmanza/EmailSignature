
exports.read_all_FieldItems = function (req, res) {
    var bll = require('../dataAccess/bll/FieldItemsBll');
    bll.read_all_FieldItems(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpStatusCode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpStatusCode: code,data: jsonResult });
            }
        });
};

exports.create_a_FieldItem = function (req, res) {
    var bll = require('../dataAccess/bll/FieldItemsBll');
    bll.create_a_FieldItem(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpStatusCode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpStatusCode: code,data: jsonResult });
            }
        });
};

exports.read_a_FieldItem = function (req, res) {
    var bll = require('../dataAccess/bll/FieldItemsBll');
    bll.read_a_FieldItem(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpStatusCode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpStatusCode: code,data: jsonResult });
            }
        });
};

exports.update_a_FieldItem = function (req, res) {
        var bll = require('../dataAccess/bll/FieldItemsBll');
    bll.update_a_FieldItem(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpStatusCode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpStatusCode: code,data: jsonResult });
            }
        });
};

exports.delete_a_FieldItem = function (req, res) {
       var bll = require('../dataAccess/bll/FieldItemsBll');
    bll.delete_a_FieldItem(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpStatusCode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpStatusCode: code,data: jsonResult });
            }
        });
};






// exports.get_all_FieldItems = function (req, res) {
//     var dataGet = require('../dataAccess/dataGet');
//     dataGet(        
//         'SELECT '+
//         ' FI."FieldItemId" as FieldItemId,'+        
//         ' FI."LanguageId" as LanguageId,'+   
//         ' L."Name" as LanguageIdString,'+
//         ' FI."FieldTypeId" as FieldTypeId,'+
//         ' FT."Name" as FieldTypeIdString,'+
//         ' FI."Name" as Name,'+
//         ' FI."Description" as Description,'+
//         ' FI."Label" as Label,'+
//         ' FI."Value" as Value,'+
//         ' FI."PrintFormat" as PrintFormat,'+
//         ' FI."InActiveDate" as InActiveDate,'+
//         ' FI."InActive" as InActive'+   
//         ' FROM public."FieldItems" AS FI'+
//         ' JOIN public."Languages" as L ON L."LanguageId" = FI."LanguageId" '+
//         ' JOIN public."FieldTypes" as FT ON FT."FieldTypeId" = FI."FieldTypeId" '+
//         ' ORDER BY FI."Name" ASC , L."Name" ASC ',
//         function (results, err) {
//             if (err) {
//                 res.status(400).type('application/json').json({success: false,  httpStatusCode: 400, error: { status: "Bad Request", message: results } });
//             } else {
//                 res.status(200).type('application/json').json({ success: true, httpStatusCode: 200, status: "OK", data: results });
//             }
//         });
// };

// exports.create_a_FieldItems = function (req, res) {
//     var dataGet = require('../dataAccess/dataGet');
//     dataGet('SELECT "FieldItemId" FROM public."FieldItems" order by "FieldItemId" desc LIMIT 1',
//         function (numberResults) {
//             var id = 1;
//             if (numberResults[0] != null) {
//                 id = numberResults[0]["FieldItemId"] + 1;
//             }
//             var languageId = req.body.languageId;
//             var fieldTypeId = req.body.fieldTypeId;
//             var name = req.body.name;
//             var description = req.body.description;
//             var label = req.body.label;
//             var value = req.body.value;
//             var printFormat = req.body.printFormat;            
//             var inactiveDate = new Date(1900, 01, 01).toJSON().slice(0, 10).replace(/-/g, '/');
//             var inactive = 0;
//             var dataPost = require('../dataAccess/dataPost');
//             dataPost('INSERT INTO public."FieldItems"("FieldItemId","LanguageId","FieldTypeId","Name","Description","Label","Value", "PrintFormat",  "InActiveDate", "InActive") ' +
//                 'VALUES' +
//                 '(' + id + ',\'' + languageId + '\' ,\''+ fieldTypeId + '\' ,\''+ name + '\' ,\''+ description + '\' ,\''+ label + '\' ,\''+ value + '\' ,\''+ printFormat + '\' ,\''+ inactiveDate + '\' ,\'' + inactive + '\')',
//                 function (results, err) {
//                     if (err) {
//                         res.status(400).type('application/json').json({success: false,  httpStatusCode: 400, error: { status: "Bad Request", message: results } });
//                     } else {
//                         res.status(201).type('application/json').json({ success: true, httpStatusCode: 201, status: "Created", data: results });
//                     }
//                 });
//         });
// };

// exports.read_a_FieldItems = function (req, res) {
//     var id = req.params.Id;
//     var dataGet = require('../dataAccess/dataGet');
//     dataGet(
//         'SELECT '+
//         ' FI."FieldItemId" as FieldItemId,'+        
//         ' FI."LanguageId" as LanguageId,'+   
//         ' L."Name" as LanguageIdString,'+
//          ' FT."Name" as FieldTypeIdString,'+
//         ' FI."Name" as FieldTypeIdString,'+
//         ' FI."Name" as Name,'+
//         ' FI."Description" as Description,'+
//         ' FI."Label" as Label,'+
//         ' FI."Value" as Value,'+
//         ' FI."PrintFormat" as PrintFormat,'+
//         ' FI."InActiveDate" as InActiveDate,'+
//         ' FI."InActive" as InActive'+   
//         ' FROM public."FieldItems" AS FI'+
//         ' JOIN public."Languages" as L ON L."LanguageId" = FI."LanguageId" '+
//         ' JOIN public."FieldTypes" as FT ON FT."FieldTypeId" = FI."FieldTypeId" '+
//         ' AND FI."FieldItemId" = ' + id,
//         function (results, err) {
//             if (err) {
//                 res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
//             } else {
//                 res.status(200).type('application/json').json({success: true,  httpStatusCode: 200, status: "OK", data: results });
//             }
//         });
// };

// exports.update_a_FieldItems = function (req, res) {
//     var id = req.params.Id;
//     var languageId = req.body.languageId;
//     var fieldTypeId = req.body.fieldTypeId;
//     var name = req.body.name;
//     var description = req.body.description;
//     var label = req.body.label;
//     var value = req.body.value;
//     var printFormat = req.body.printFormat;
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
//     dataPut(' UPDATE public."FieldItems" ' +
//         'SET ' +
//         ' "LanguageId"=\'' + languageId + '\', ' +
//         ' "FieldTypeId"=\'' + fieldTypeId + '\', ' +
//         ' "Name"=\'' + name + '\', ' +
//         ' "Description"=\'' + description + '\', ' +
//         ' "Label"=\'' + label + '\', ' +
//         ' "Value"=\'' + value + '\', ' +
//         ' "PrintFormat"=\'' + printFormat + '\', ' +
//         ' "InActiveDate"=\'' + inactiveDate + '\', ' +
//         ' "InActive"=\'' + inactive + '\' ' +
//         ' where "FieldItemId" = ' + id,
//         function (results, err) {
//             if (err) {
//                 res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
//             } else {
//                 res.status(200).type('application/json').json({success: true,  httpStatusCode: 200, status: "OK", data: results });
//             }
//         });
// };

// exports.delete_a_FieldItems = function (req, res) {
//     var id = req.params.Id;
//     var dataDelete = require('../dataAccess/dataDelete');
//     dataDelete('DELETE FROM public."FieldItems" where "FieldItemId" = ' + id,
//         function (results, err) {
//             if (err) {
//                 res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
//             } else {
//                 res.status(200).type('application/json').json({ success: true, httpStatusCode: 200, status: "No Content", data: results });
//             }
//         });
// };
