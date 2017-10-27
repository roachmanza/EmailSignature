var _env = require('./config/env');
var _env_settings = require('./config/env_variables');
var _config = "";
var init_environment = function () {
    _env_settings.PopulateEnvironmentSettings(_env.name,
        function (result, haserror, errormessage) {
            _config = result;
            return result;
        });
}
init_environment();

var express = require('express');
var webserver = express();
var port = process.env.PORT || _config.http.http_port;
var bodyParser = require('body-parser');
var path = require('path');
var fs = require("fs");
var formidable = require('formidable');
var mkdirp = require('mkdirp');
var mv = require('mv'); //use for EXDEV oldpath and newpath are not on the same mounted filesystem 

//PARSER
webserver.use(bodyParser.urlencoded({ limit: _config.parser.urlencoded_max, extended: true }));
webserver.use(bodyParser.json({ limit: _config.parser.json_max }));

//CSS
webserver.get('/client/content/css/default', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/content/css/client.css'));
});
webserver.get('/client/content/css/bootstrap', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/content/css/bootstrap.css'));
});
webserver.get('/client/content/css/datatables', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/content/css/datatables.css'));
});

//IMAGES
webserver.get('/client/content/img/favicon', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/content/img/MailIcon32.png'));
});
webserver.get('/client/content/img/default', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/content/img/MailIcon32.png'));
});

//JS
webserver.get('/client/content/js/default', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/content/js/client.js'));
});
webserver.get('/client/content/js/bootstrap', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/content/js/bootstrap.min.js'));
});
webserver.get('/client/content/js/jquery', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/content/js/jquery.js'));
});
webserver.get('/client/content/js/knockout', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/content/js/knockout.js'));
});
webserver.get('/client/content/js/datatables', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/content/js/datatables.js'));
});


webserver.get('/client/content/js/webcomponentslite', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/content/js/webcomponents-lite.js'));
});
webserver.get('/client/content/js/polymer', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/content/js/polymer/polymer.html'));
});
webserver.get('/client/content/js/polymer-mini', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/content/js/polymer/polymer-mini.html'));
});
webserver.get('/client/content/js/polymer-micro', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/content/js/polymer/polymer-micro.html'));
});
webserver.get('/client/content/js/appframework', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/content/js/appFrameWork.js'));
});


// static folders to be able to point to css, js etc files in a directory
webserver.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/index.html'));
});
webserver.get('/home/', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/index.html'));
});
webserver.get('/ContactTypes', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/ContactTypes/list.html'));
});
webserver.get('/FieldTypes', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/FieldTypes/list.html'));
});
webserver.get('/Languages', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/Languages/list.html'));
});
webserver.get('/FieldItems', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/FieldItems/list.html'));
});
webserver.get('/SignatureItems', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/SignatureItems/list.html'));
});
webserver.get('/Signatures', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/SignatureItems/base.html'));
});

//FILE UPLOADS
webserver.post('/upload', function (req, res) {
    var base64string;
    var form = new formidable.IncomingForm();
    form.multiples = false;
    form.uploadDir = path.join(__dirname, '/public/uploads/');
    form.on('file', function (field, file) {
        //this happens directly after the file has been uploaded

        //rename the file and copy it to the relevant directory
        var newfilepath = path.join(form.uploadDir, file.name)

        //Check the file type
        var filetype = file.type;
        var isValid = false;
        var validFileTypes = "";
        _config.file.allowed_formats.forEach(function (element) {
            validFileTypes = validFileTypes + element + ", ";
        }, this);
        _config.file.allowed_type.forEach(function (element) {
            if (element == filetype) {
                isValid = true;
            }
        }, this);
        validFileTypes = validFileTypes.substring(0, validFileTypes.length - 2);
        if (!isValid) {
            //remove the file 
            fs.unlink(file.path, (err) => {
                if (err) {
                    var jsonResult = JSON.parse(JSON.stringify("Could not remove the file from the disk." + err));
                    var code = 403;
                    res.status(code).type('application/json').json({ success: false, httpstatuscode: code, error: { message: jsonResult } });
                    return;
                } else {
                    var jsonResult = JSON.parse(JSON.stringify("FILE UPLOAD FAILED - File types are " + validFileTypes + " and '" + file.name + "' is a '" + filetype + "' type file."));
                    var code = 403;
                    res.status(code).type('application/json').json({ success: false, httpstatuscode: code, error: { message: jsonResult } });
                    return;
                }
            });
        } else {
            //check the file size 307200  = 300Kb max file size
            var biteSize = file.size;
            var fielsize = file.size / 1024;
            if (biteSize > _config.file.size_max) {
                var jsonResult = JSON.parse(JSON.stringify("FILE UPLOAD FAILED - Max file size is " + _config.file.size_max_Kb + " Kb, and '" + file.name + "' is " + fielsize + " Kb "));
                var code = 403;
                //remove the file 
                fs.unlink(file.path, (err) => {
                    if (err) {
                        jsonResult = JSON.parse(JSON.stringify("Could not remove the file from the disk." + err));
                        code = 403;
                        res.status(code).type('application/json').json({ success: false, httpstatuscode: code, error: { message: jsonResult } });
                        return;
                    } else {
                        res.status(code).type('application/json').json({ success: false, httpstatuscode: code, error: { message: jsonResult } });
                    }
                });
            } else {
                mv(file.path, newfilepath, { mkdirp: true }, function (err) {
                    if (err) {
                        jsonResult = JSON.parse(JSON.stringify("Error moving the file." + err));
                        code = 403;
                        res.status(code).type('application/json').json({ success: false, httpstatuscode: code, error: { message: jsonResult } });
                    } else {
                        base64string = new Buffer(fs.readFileSync(newfilepath)).toString("base64");
                        var extension = newfilepath.substr(newfilepath.length - 3);
                        fs.unlink(newfilepath, (err) => {
                            if (err) {
                                jsonResult = JSON.parse(JSON.stringify("Error moving the file." + err));
                                code = 403;
                                res.status(code).type('application/json').json({ success: false, httpstatuscode: code, error: { message: jsonResult } });
                            } else {
                                res.end('data:image/' + extension + ';base64,' + base64string);
                            }
                        });
                    }
                });
            }
        }
    });
    form.on('error', function (err) {
        console.log('An error has occured: \n' + err);
    });
    form.on('end', function () {
        console.log("end");
    });
    form.parse(req);
});



//==============//
//  Menu PATHS  //
//==============//
webserver.get('/menu', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/Menu/comp-menu.html'));
});
//========================//
//  Menu component PATHS  //
//========================//
webserver.get('/comp-menu', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/Menu/comp-menu.html'));
});
webserver.get('/comp-menu/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/Menu/comp-menu-js-v1.js'));
});


//======================//
//  ContactTypes PATHS  //
//======================//
webserver.get('/ContactTypes/List', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/ContactTypes/list.html'));
});
webserver.get('/ContactTypes/create', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/ContactTypes/create.html'));
});
webserver.get('/ContactTypes/edit', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/ContactTypes/edit.html'));
});
webserver.get('/ContactTypes/view', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/ContactTypes/view.html'));
});
//================================//
//  ContactTypes component PATHS  //
//================================//
//list
webserver.get('/comp-contactTypes-list', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/ContactTypes/comp-contactTypes-list.html'));
});
webserver.get('/comp-contactTypes-list/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/ContactTypes/comp-contactTypes-list-js-v1.js'));
});
//create
webserver.get('/comp-contactTypes-create', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/ContactTypes/comp-contactTypes-create.html'));
});
webserver.get('/comp-contactTypes-create/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/ContactTypes/comp-contactTypes-create-js-v1.js'));
});
//edit
webserver.get('/comp-contactTypes-edit', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/ContactTypes/comp-contactTypes-edit.html'));
});
webserver.get('/comp-contactTypes-edit/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/ContactTypes/comp-contactTypes-edit-js-v1.js'));
});
//view
webserver.get('/comp-contactTypes-view', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/ContactTypes/comp-contactTypes-view.html'));
});
webserver.get('/comp-contactTypes-view/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/ContactTypes/comp-contactTypes-view-js-v1.js'));
});

//====================//
//  FieldTypes PATHS  //
//====================//
webserver.get('/FieldTypes/list', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/FieldTypes/list.html'));
});
webserver.get('/FieldTypes/create', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/FieldTypes/create.html'));
});
webserver.get('/FieldTypes/edit', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/FieldTypes/edit.html'));
});
webserver.get('/FieldTypes/view', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/FieldTypes/view.html'));
});
//==============================//
//  FieldTypes component PATHS  //
//==============================//
//list
webserver.get('/comp-fieldTypes-list', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/FieldTypes/comp-fieldTypes-list.html'));
});
webserver.get('/comp-fieldTypes-list/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/FieldTypes/comp-fieldTypes-list-js-v1.js'));
});
//create
webserver.get('/comp-fieldTypes-create', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/FieldTypes/comp-fieldTypes-create.html'));
});
webserver.get('/comp-fieldTypes-create/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/FieldTypes/comp-fieldTypes-create-js-v1.js'));
});
//edit
webserver.get('/comp-fieldTypes-edit', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/FieldTypes/comp-fieldTypes-edit.html'));
});
webserver.get('/comp-fieldTypes-edit/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/FieldTypes/comp-fieldTypes-edit-js-v1.js'));
});
//view
webserver.get('/comp-fieldTypes-view', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/FieldTypes/comp-fieldTypes-view.html'));
});
webserver.get('/comp-fieldTypes-view/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/FieldTypes/comp-fieldTypes-view-js-v1.js'));
});

//===================//
//  Languages PATHS  //
//===================//
webserver.get('/Languages/list', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/Languages/list.html'));
});
webserver.get('/Languages/create', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/Languages/create.html'));
});
webserver.get('/Languages/edit', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/Languages/edit.html'));
});
webserver.get('/Languages/view', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/Languages/view.html'));
});
//=============================//
//  Languages component PATHS  //
//=============================//
//list
webserver.get('/comp-languages-list', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/Languages/comp-languages-list.html'));
});
webserver.get('/comp-languages-list/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/Languages/comp-languages-list-js-v1.js'));
});
//create
webserver.get('/comp-languages-create', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/Languages/comp-languages-create.html'));
});
webserver.get('/comp-languages-create/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/Languages/comp-languages-create-js-v1.js'));
});
//edit
webserver.get('/comp-languages-edit', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/Languages/comp-languages-edit.html'));
});
webserver.get('/comp-languages-edit/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/Languages/comp-languages-edit-js-v1.js'));
});
//view
webserver.get('/comp-languages-view', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/Languages/comp-languages-view.html'));
});
webserver.get('/comp-languages-view/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/Languages/comp-languages-view-js-v1.js'));
});

//====================//
//  FieldItems PATHS  //
//====================//
webserver.get('/FieldItems/List', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/FieldItems/list.html'));
});
webserver.get('/FieldItems/create', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/FieldItems/create.html'));
});
webserver.get('/FieldItems/edit', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/FieldItems/edit.html'));
});
webserver.get('/FieldItems/view', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/FieldItems/view.html'));
});
//==============================//
//  FieldItems component PATHS  //
//==============================//
//list
webserver.get('/comp-fieldItems-list', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/FieldItems/comp-fieldItems-list.html'));
});
webserver.get('/comp-fieldItems-list/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/FieldItems/comp-fieldItems-list-js-v1.js'));
});
//create
webserver.get('/comp-fieldItems-create', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/FieldItems/comp-fieldItems-create.html'));
});
webserver.get('/comp-fieldItems-create/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/FieldItems/comp-fieldItems-create-js-v1.js'));
});
//edit
webserver.get('/comp-fieldItems-edit', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/FieldItems/comp-fieldItems-edit.html'));
});
webserver.get('/comp-fieldItems-edit/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/FieldItems/comp-fieldItems-edit-js-v1.js'));
});
//view
webserver.get('/comp-fieldItems-view', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/FieldItems/comp-fieldItems-view.html'));
});
webserver.get('/comp-fieldItems-view/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/FieldItems/comp-fieldItems-view-js-v1.js'));
});

//=========================//
//  SignatureItems  PATHS  //
//=========================//
//list
webserver.get('/SignatureItems/list', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/SignatureItems/list.html'));
});
webserver.get('/SignatureItems/create', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/SignatureItems/create.html'));
});
webserver.get('/SignatureItems/edit', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/SignatureItems/edit.html'));
});
webserver.get('/SignatureItems/view', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/SignatureItems/view.html'));
});
webserver.get('/SignatureItems/base', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/SignatureItems/base.html'));
});
//==================================//
//  SignatureItems component PATHS  //
//==================================//
//list
webserver.get('/comp-signatureItems-list', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/SignatureItems/comp-signatureItems-list.html'));
});
webserver.get('/comp-signatureItems-list/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/SignatureItems/comp-signatureItems-list-js-v1.js'));
});
//create
webserver.get('/comp-signatureItems-create', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/SignatureItems/comp-signatureItems-create.html'));
});
webserver.get('/comp-signatureItems-create/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/SignatureItems/comp-signatureItems-create-js-v1.js'));
});
//edit
webserver.get('/comp-signatureItems-edit', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/SignatureItems/comp-signatureItems-edit.html'));
});
webserver.get('/comp-signatureItems-edit/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/SignatureItems/comp-signatureItems-edit-js-v1.js'));
});
//view
webserver.get('/comp-signatureItems-view', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/SignatureItems/comp-signatureItems-view.html'));
});
webserver.get('/comp-signatureItems-view/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/SignatureItems/comp-signatureItems-view-js-v1.js'));
});
//base
webserver.get('/comp-signatureItems-base', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/SignatureItems/comp-signatureItems-base.html'));
});
webserver.get('/comp-signatureItems-base/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/SignatureItems/comp-signatureItems-base-js-v1.js'));
});



//Listen on port number
webserver.listen(port);
console.log('Email signature WFE site started on: ' + port + ' for environment : ' + _env.name);