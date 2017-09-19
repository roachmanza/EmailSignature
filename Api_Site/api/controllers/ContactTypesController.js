
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
            var name = req.body.name;
            var description = req.body.description;
            var email = req.body.contactTypeEmailAddress;
            var inactiveDate = new Date(1900, 01,01).toJSON().slice(0, 10).replace(/-/g, '/');
            var inactive = 0;
            var dataPost = require('../dataAccess/dataPost');
            dataPost('INSERT INTO public."ContactTypes"("ContactTypeId", "Name", "Description", "ContactTypeEmailAddress","InActiveDate", "InActive") ' +
                'VALUES' +
                '(' + id + ',\'' + name + '\' ,\'' + description + '\' ,\'' + email + '\' ,\'' + inactiveDate + '\' ,\'' + inactive + '\')',
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
    var name = req.body.name;
    var description = req.body.description;
    var email = req.body.contactTypeEmailAddress;
    var inactiveDate;
    var inactive;
    if(req.body.inActive==="1"){
        inactive = 1;
        inactiveDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    }else{
        inactive = 0;
        inactiveDate = new Date(1900, 01,01).toJSON().slice(0, 10).replace(/-/g, '/');
    }
   
    
    var dataPut = require('../dataAccess/dataPut');
    dataPut(' UPDATE public."ContactTypes" ' +
        'SET ' +
        ' "Name"=\'' + name + '\', ' +
        ' "Description"=\'' + description + '\', ' +
        ' "ContactTypeEmailAddress"=\'' + email + '\', ' +
        ' "InActiveDate"=\'' + inactiveDate + '\', ' +
        ' "InActive"=\'' + inactive + '\' ' +
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
