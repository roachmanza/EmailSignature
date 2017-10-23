
exports.read_all_Languages = function (req, res) {
    var bll = require('../dataAccess/bll/LanguagesBll');
    bll.read_all_Languages(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpstatuscode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpstatuscode: code,data: jsonResult });
            }
        });
};

exports.create_a_Language = function (req, res) {
    var bll = require('../dataAccess/bll/LanguagesBll');
    bll.create_a_Language(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpstatuscode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpstatuscode: code,data: jsonResult });
            }
        });
};

exports.read_a_Language = function (req, res) {
    var bll = require('../dataAccess/bll/LanguagesBll');
    bll.read_a_Language(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpstatuscode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpstatuscode: code,data: jsonResult });
            }
        });
};

exports.update_a_Language = function (req, res) {
        var bll = require('../dataAccess/bll/LanguagesBll');
    bll.update_a_Language(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpstatuscode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpstatuscode: code,data: jsonResult });
            }
        });
};

exports.delete_a_Language = function (req, res) {
       var bll = require('../dataAccess/bll/LanguagesBll');
    bll.delete_a_Language(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpstatuscode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpstatuscode: code,data: jsonResult });
            }
        });
};

exports.read_a_Language_for_EmailAddress = function (req, res) {
    var bll = require('../dataAccess/bll/LanguagesBll');
 bll.read_a_Language_for_EmailAddress(req,
     function (jsonResult, haserror, code) {
         if (haserror) { 
             res.status(code).type('application/json').json({success: false, httpstatuscode: code,error: {message: jsonResult}});
         } else {
             res.status(code).type('application/json').json({success: true,httpstatuscode: code,data: jsonResult });
         }
     });
};






