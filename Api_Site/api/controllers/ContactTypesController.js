exports.read_all_ContactTypes = function (req, res) {
    var bll = require('../dataAccess/bll/ContactTypesBll');
    bll.read_all_ContactTypes(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpstatuscode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpstatuscode: code,data: jsonResult });
            }
        });
};

exports.create_a_ContactType = function (req, res) {
    var bll = require('../dataAccess/bll/ContactTypesBll');
    bll.create_a_ContactType(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpstatuscode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpstatuscode: code,data: jsonResult });
            }
        });
};

exports.read_a_ContactType = function (req, res) {
    var bll = require('../dataAccess/bll/ContactTypesBll');
    bll.read_a_ContactType(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpstatuscode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpstatuscode: code,data: jsonResult });
            }
        });
};

exports.update_a_ContactType = function (req, res) {
        var bll = require('../dataAccess/bll/ContactTypesBll');
    bll.update_a_ContactType(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpstatuscode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpstatuscode: code,data: jsonResult });
            }
        });
};

exports.delete_a_ContactType = function (req, res) {
       var bll = require('../dataAccess/bll/ContactTypesBll');
    bll.delete_a_ContactType(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpstatuscode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpstatuscode: code,data: jsonResult });
            }
        });
};

exports.read_a_ContactType_for_EmailAddress = function (req, res) {
    var bll = require('../dataAccess/bll/ContactTypesBll');
 bll.read_a_ContactType_for_EmailAddress(req,
     function (jsonResult, haserror, code) {
         if (haserror) { 
             res.status(code).type('application/json').json({success: false, httpstatuscode: code,error: {message: jsonResult}});
         } else {
             res.status(code).type('application/json').json({success: true,httpstatuscode: code,data: jsonResult });
         }
     });
};



