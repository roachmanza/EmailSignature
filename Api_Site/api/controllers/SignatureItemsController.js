exports.read_all_SignatureItems = function (req, res) {
    var bll = require('../dataAccess/bll/SignatureItemsBll');
    bll.read_all_SignatureItems(req,
        function (jsonResult, haserror, code) {
            if (haserror) {
                res.status(code).type('application/json').json({ success: false, httpstatuscode: code, error: { message: jsonResult } });
            } else {
                res.status(code).type('application/json').json({ success: true, httpstatuscode: code, data: jsonResult });
            }
        });
};

exports.create_a_SignatureItem = function (req, res) {
    var bll = require('../dataAccess/bll/SignatureItemsBll');
    bll.create_a_SignatureItem(req,
        function (jsonResult, haserror, code) {
            if (haserror) {
                res.status(code).type('application/json').json({ success: false, httpstatuscode: code, error: { message: jsonResult } });
            } else {
                res.status(code).type('application/json').json({ success: true, httpstatuscode: code, data: jsonResult });
            }
        });
};

exports.read_a_SignatureItem = function (req, res) {
    var bll = require('../dataAccess/bll/SignatureItemsBll');
    bll.read_a_SignatureItem(req,
        function (jsonResult, haserror, code) {
            if (haserror) {
                res.status(code).type('application/json').json({ success: false, httpstatuscode: code, error: { message: jsonResult } });
            } else {
                res.status(code).type('application/json').json({ success: true, httpstatuscode: code, data: jsonResult });
            }
        });
};

exports.update_a_SignatureItem = function (req, res) {
    var bll = require('../dataAccess/bll/SignatureItemsBll');
    bll.update_a_SignatureItem(req,
        function (jsonResult, haserror, code) {
            if (haserror) {
                res.status(code).type('application/json').json({ success: false, httpstatuscode: code, error: { message: jsonResult } });
            } else {
                res.status(code).type('application/json').json({ success: true, httpstatuscode: code, data: jsonResult });
            }
        });
};

exports.delete_a_SignatureItem = function (req, res) {
    var bll = require('../dataAccess/bll/SignatureItemsBll');
    bll.delete_a_SignatureItem(req,
        function (jsonResult, haserror, code) {
            if (haserror) {
                res.status(code).type('application/json').json({ success: false, httpstatuscode: code, error: { message: jsonResult } });
            } else {
                res.status(code).type('application/json').json({ success: true, httpstatuscode: code, data: jsonResult });
            }
        });
};

exports.read_all_SignatureItems_for_emailAddr = function (req, res) {
    var bll = require('../dataAccess/bll/SignatureItemsBll');
    bll.read_all_SignatureItems_for_emailAddr(req,
        function (jsonResult, haserror, code) {
            if (haserror) {
                res.status(code).type('application/json').json({ success: false, httpstatuscode: code, error: { message: jsonResult } });
            } else {
                res.status(code).type('application/json').json({ success: true, httpstatuscode: code, data: jsonResult });
            }
        });
};


exports.read_all_SignatureItems_for_emailAddr_with_language = function (req, res) {
    var bll = require('../dataAccess/bll/SignatureItemsBll');
    bll.read_all_SignatureItems_for_emailAddr_with_language(req,
        function (jsonResult, haserror, code) {
            if (haserror) {
                res.status(code).type('application/json').json({ success: false, httpstatuscode: code, error: { message: jsonResult } });
            } else {
                res.status(code).type('application/json').json({ success: true, httpstatuscode: code, data: jsonResult });
            }
        });
};


exports.read_all_SignatureItems_for_contactTypeId = function (req, res) {
    var bll = require('../dataAccess/bll/SignatureItemsBll');
    bll.read_all_SignatureItems_for_contactTypeId(req,
        function (jsonResult, haserror, code) {
            if (haserror) {
                res.status(code).type('application/json').json({ success: false, httpstatuscode: code, error: { message: jsonResult } });
            } else {
                res.status(code).type('application/json').json({ success: true, httpstatuscode: code, data: jsonResult });
            }
        });
};

exports.read_a_SignatureItem_ContactTypeList = function (req, res) {
    var bll = require('../dataAccess/bll/SignatureItemsBll');
    bll.read_a_SignatureItem_ContactTypeList(req,
        function (jsonResult, haserror, code) {
            if (haserror) {
                res.status(code).type('application/json').json({ success: false, httpstatuscode: code, error: { message: jsonResult } });
            } else {
                res.status(code).type('application/json').json({ success: true, httpstatuscode: code, data: jsonResult });
            }
        });
};

