
exports.read_all_Languages = function (req, res) {
    var bll = require('../dataAccess/bll/LanguagesBll');
    bll.read_all_Languages(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpStatusCode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpStatusCode: code,data: jsonResult });
            }
        });
};

exports.create_a_Language = function (req, res) {
    var bll = require('../dataAccess/bll/LanguagesBll');
    bll.create_a_Language(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpStatusCode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpStatusCode: code,data: jsonResult });
            }
        });
};

exports.read_a_Language = function (req, res) {
    var bll = require('../dataAccess/bll/LanguagesBll');
    bll.read_a_Language(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpStatusCode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpStatusCode: code,data: jsonResult });
            }
        });
};

exports.update_a_Language = function (req, res) {
        var bll = require('../dataAccess/bll/LanguagesBll');
    bll.update_a_Language(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpStatusCode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpStatusCode: code,data: jsonResult });
            }
        });
};

exports.delete_a_Language = function (req, res) {
       var bll = require('../dataAccess/bll/LanguagesBll');
    bll.delete_a_Language(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpStatusCode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpStatusCode: code,data: jsonResult });
            }
        });
};

exports.read_a_Language_for_EmailAddress = function (req, res) {
    var bll = require('../dataAccess/bll/LanguagesBll');
 bll.read_a_Language_for_EmailAddress(req,
     function (jsonResult, haserror, code) {
         if (haserror) { 
             res.status(code).type('application/json').json({success: false, httpStatusCode: code,error: {message: jsonResult}});
         } else {
             res.status(code).type('application/json').json({success: true,httpStatusCode: code,data: jsonResult });
         }
     });
};









// exports.get_all_Languages = function (req, res) {
//     var dataGet = require('../dataAccess/dataGet');
//     dataGet(
//         'SELECT '+
//         ' L."LanguageId" as LanguageId,'+
//         ' L."Name" as Name,'+
//         ' L."Description" as Description,'+
//         ' L."Code" as Code,'+
//         ' L."InActiveDate" as InActiveDate,'+
//         ' L."InActive" as InActive'+   
//         ' FROM public."Languages" AS L',
//         function (results, err) {
//             if (err) {
//                 res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
//             } else {
//                 res.status(200).type('application/json').json({ success: true, httpStatusCode: 200, status: "OK", data: results });
//             }
//         });
// };

// exports.create_a_Language = function (req, res) {
//     var dataGet = require('../dataAccess/dataGet');
//     dataGet('SELECT "LanguageId" FROM public."Languages" order by "LanguageId" desc LIMIT 1',
//         function (numberResults) {
//             var id = 1;
//             if (numberResults[0] != null) {
//                 id = numberResults[0]["LanguageId"] + 1;
//             }
//             var name = req.body.name;
//             var description = req.body.description;
//             var code = req.body.code;
//             var inactiveDate = new Date(1900, 01, 01).toJSON().slice(0, 10).replace(/-/g, '/');
//             var inactive = 0;
//             var dataPost = require('../dataAccess/dataPost');
//             dataPost('INSERT INTO public."Languages"("LanguageId", "Name", "Description", "Code","InActiveDate", "InActive") ' +
//                 'VALUES' +
//                 '(' + id + ',\'' + name + '\' ,\'' + description + '\' ,\'' + code + '\' ,\'' + inactiveDate + '\' ,\'' + inactive + '\')',
//                 function (results, err) {
//                     if (err) {
//                         res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
//                     } else {
//                         res.status(201).type('application/json').json({ success: true, httpStatusCode: 201, status: "Created", data: results });
//                     }
//                 });
//         });
// };

// exports.read_a_Language = function (req, res) {
//     var id = req.params.Id;
//     var dataGet = require('../dataAccess/dataGet');
//     dataGet(
//         'SELECT '+
//         ' L."LanguageId" as LanguageId,'+
//         ' L."Name" as Name,'+
//         ' L."Description" as Description,'+
//         ' L."Code" as Code,'+
//         ' L."InActiveDate" as InActiveDate,'+
//         ' L."InActive" as InActive'+   
//         ' FROM public."Languages" AS L'+
//         ' WHERE L."LanguageId" = ' + id,
//         function (results, err) {
//             if (err) {
//                 res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
//             } else {
//                 res.status(200).type('application/json').json({ success: true, httpStatusCode: 200, status: "OK", data: results });
//             }
//         });
// };

// exports.update_a_Language = function (req, res) {
//     var id = req.params.Id;
//     var name = req.body.name;
//     var description = req.body.description;
//     var code = req.body.code;
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
//     dataPut(' UPDATE public."Languages" ' +
//         'SET ' +
//         ' "Name"=\'' + name + '\', ' +
//         ' "Description"=\'' + description + '\', ' +
//         ' "Code"=\'' + code + '\', ' +
//         ' "InActiveDate"=\'' + inactiveDate + '\', ' +
//         ' "InActive"=\'' + inactive + '\' ' +
//         'where "LanguageId" = ' + id,
//         function (results, err) {
//             if (err) {
//                 res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
//             } else {
//                 res.status(200).type('application/json').json({ success: true, httpStatusCode: 200, status: "OK", data: results });
//             }
//         });
// };

// exports.delete_a_Language = function (req, res) {
//     var id = req.params.Id;
//     var dataDelete = require('../dataAccess/dataDelete');
//     dataDelete('DELETE FROM public."Languages" where "LanguageId" = ' + id,
//         function (results, err) {
//             if (err) {
//                 res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
//             } else {
//                 res.status(200).type('application/json').json({ success: true, httpStatusCode: 200, status: "No Content", data: results });
//             }
//         });
// };
