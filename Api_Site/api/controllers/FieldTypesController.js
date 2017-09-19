
exports.get_all_FieldTypes = function (req, res) {
    var dataGet = require('../dataAccess/dataGet');
    dataGet('SELECT * FROM public."FieldTypes"', function (results) {
        res.send(results);
    });
};

exports.create_a_FieldType = function (req, res) {
    var dataGet = require('../dataAccess/dataGet');
    dataGet('SELECT "FieldTypeId" FROM public."FieldTypes" order by "FieldTypeId" desc LIMIT 1',
        function (numberResults) {
            var id = 1;
            if (numberResults[0] != null) {
                id = numberResults[0]["FieldTypeId"] + 1;
            }
            var name = req.body.name;
            var description = req.body.description;
            var inactiveDate = new Date(1900, 01,01).toJSON().slice(0, 10).replace(/-/g, '/');
            var inactive = 0;
            var dataPost = require('../dataAccess/dataPost');
            dataPost('INSERT INTO public."FieldTypes"("FieldTypeId", "Name", "Description", "InActiveDate", "InActive") ' +
                'VALUES' +
                '(' + id + ',\'' + name + '\' ,\'' + description + '\' ,\'' + inactiveDate + '\' ,\'' + inactive + '\')',
                function (results) {
                    res.send(results);
                });
        });
};

exports.read_a_FieldType = function (req, res) {
    var id = req.params.FieldTypeId;
    var dataGet = require('../dataAccess/dataGet');
    dataGet('SELECT * FROM public."FieldTypes" where "FieldTypeId" = ' + id,
        function (results) {
            res.send(results);
        });
};

exports.update_a_FieldType = function (req, res) {
    var id = req.params.FieldTypeId;
    var name = req.body.name;
    var description = req.body.description;
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
    dataPut(' UPDATE public."FieldTypes" ' +
        'SET ' +
        ' "Name"=\'' + name + '\', ' +
        ' "Description"=\'' + description + '\', ' +
        ' "InActiveDate"=\'' + inactiveDate + '\', ' +
        ' "InActive"=\'' + inactive + '\' ' +
        'where "FieldTypeId" = ' + id,
        function (results) {
            res.send(results);
        });
};

exports.delete_a_FieldType = function (req, res) {
    var id = req.params.FieldTypeId;
    var dataDelete = require('../dataAccess/dataDelete');
    dataDelete('DELETE FROM public."FieldTypes" where "FieldTypeId" = ' + id,
        function (results) {
            res.send(results);
        });
};
