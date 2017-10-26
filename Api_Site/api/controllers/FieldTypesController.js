exports.read_all_FieldTypes = function (req, res) {
    var bll = require('../dataAccess/bll/FieldTypesBll');
    bll.read_all_FieldTypes(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpstatuscode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpstatuscode: code,data: jsonResult });
            }
        });
};

exports.create_a_FieldType = function (req, res) {
    var bll = require('../dataAccess/bll/FieldTypesBll');
    bll.create_a_FieldType(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpstatuscode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpstatuscode: code,data: jsonResult });
            }
        });
};

exports.read_a_FieldType = function (req, res) {
    var bll = require('../dataAccess/bll/FieldTypesBll');
    bll.read_a_FieldType(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpstatuscode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpstatuscode: code,data: jsonResult });
            }
        });
};

exports.update_a_FieldType = function (req, res) {
        var bll = require('../dataAccess/bll/FieldTypesBll');
    bll.update_a_FieldType(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpstatuscode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpstatuscode: code,data: jsonResult });
            }
        });
};

exports.delete_a_FieldType = function (req, res) {
       var bll = require('../dataAccess/bll/FieldTypesBll');
    bll.delete_a_FieldType(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpstatuscode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpstatuscode: code,data: jsonResult });
            }
        });
};



