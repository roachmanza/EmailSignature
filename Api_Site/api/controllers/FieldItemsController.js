
exports.read_all_FieldItems = function (req, res) {
    var bll = require('../dataAccess/bll/FieldItemsBll');
    bll.read_all_FieldItems(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpstatuscode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpstatuscode: code,data: jsonResult });
            }
        });
};

exports.create_a_FieldItem = function (req, res) {
    var bll = require('../dataAccess/bll/FieldItemsBll');
    bll.create_a_FieldItem(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpstatuscode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpstatuscode: code,data: jsonResult });
            }
        });
};

exports.read_a_FieldItem = function (req, res) {
    var bll = require('../dataAccess/bll/FieldItemsBll');
    bll.read_a_FieldItem(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpstatuscode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpstatuscode: code,data: jsonResult });
            }
        });
};

exports.update_a_FieldItem = function (req, res) {
        var bll = require('../dataAccess/bll/FieldItemsBll');
    bll.update_a_FieldItem(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpstatuscode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpstatuscode: code,data: jsonResult });
            }
        });
};

exports.delete_a_FieldItem = function (req, res) {
       var bll = require('../dataAccess/bll/FieldItemsBll');
    bll.delete_a_FieldItem(req,
        function (jsonResult, haserror, code) {
            if (haserror) { 
                res.status(code).type('application/json').json({success: false, httpstatuscode: code,error: {message: jsonResult}});
            } else {
                res.status(code).type('application/json').json({success: true,httpstatuscode: code,data: jsonResult });
            }
        });
};




