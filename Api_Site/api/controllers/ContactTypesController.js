
exports.get_all_ContactTypes = function (req, res) {
    var dataGet = require('../dataAccess/dataGet');
    dataGet('SELECT * FROM public."ContactTypes"', function (results) {
        res.send(results);
    });
};

exports.create_a_ContactType = function (req, res) {
    var dataGet = require('../dataAccess/dataGet');
    dataGet('SELECT "ContactTypeId" FROM public."ContactTypes" order by "ContactTypeId" desc LIMIT 1',
        function (numberResults) {
            var id = 1;
            if (numberResults[0] != null) {
                id = numberResults[0]["ContactTypeId"] + 1;
            }
            var ascriptionId = req.body.ascriptionId;
            var fromAscriptionStatusId = req.body.fromAscriptionStatusId;
            var toAscriptionStatusId = req.body.toAscriptionStatusId;
            var details = req.body.details;
            var createDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
            var dataPost = require('../dataAccess/dataPost');
            dataPost('INSERT INTO public."ContactTypes"("ContactTypeId", "AscriptionId", "FromAscriptionStatusId", "ToAscriptionStatusId","Details", "CreateDate") ' +
                'VALUES' +
                '(' + id + ',\'' + ascriptionId + '\' ,\'' + fromAscriptionStatusId + '\' ,\'' + toAscriptionStatusId + '\' ,\'' + details + '\' ,\'' + createDate + '\')',
                function (results) {
                    res.send(results);
                });
        });
};

exports.read_a_ContactType = function (req, res) {
    var id = req.params.ContactTypeId;
    var dataGet = require('../dataAccess/dataGet');
    dataGet('SELECT * FROM public."ContactTypes" where "ContactTypeId" = ' + id,
        function (results) {
            res.send(results);
        });
};

exports.update_a_ContactType = function (req, res) {
    var id = req.params.ContactTypeId;
    var ascriptionId = req.body.ascriptionId;
    var fromAscriptionStatusId = req.body.fromAscriptionStatusId;
    var toAscriptionStatusId = req.body.toAscriptionStatusId;
    var details = req.body.details;
    var dataPut = require('../dataAccess/dataPut');
    dataPut(' UPDATE public."ContactTypes" ' +
        'SET ' +
        ' "AscriptionId"=\'' + ascriptionId + '\', ' +
        ' "FromAscriptionStatusId"=\'' + fromAscriptionStatusId + '\', ' +
        ' "ToAscriptionStatusId"=\'' + toAscriptionStatusId + '\', ' +
        ' "Details"=\'' + details + '\' ' +
        'where "ContactTypeId" = ' + id,
        function (results) {
            res.send(results);
        });
};

exports.delete_a_ContactType = function (req, res) {
    var id = req.params.ContactTypeId;
    var dataDelete = require('../dataAccess/dataDelete');
    dataDelete('DELETE FROM public."ContactTypes" where "ContactTypeId" = ' + id,
        function (results) {
            res.send(results);
        });
};
