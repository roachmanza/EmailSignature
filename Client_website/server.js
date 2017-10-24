var express = require('express');
var webserver = express();
var port = process.env.PORT || 4011;
var bodyParser = require('body-parser');
var path = require('path');

var fs = require("fs");
var formidable = require('formidable');
var mkdirp = require('mkdirp');
var mv = require('mv'); //use for EXDEV oldpath and newpath are not on the same mounted filesystem 

//PARSER
webserver.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
webserver.use(bodyParser.json({limit: '50mb'}));

//FILE UPLOADS
webserver.post('/upload', function (req, res) {
    var base64string;
    var form = new formidable.IncomingForm();
    form.multiples = true;
    form.uploadDir = path.join(__dirname, '/public/uploads/');
    form.on('file', function (field, file) {
        //rename the file and copy it to the relevant directory
        var newfilepath = path.join(form.uploadDir, file.name)
        
        mv(file.path, newfilepath, { mkdirp: true }, function (err) {
            if (err) {

            } else {
                base64string = new Buffer(fs.readFileSync(newfilepath)).toString("base64");
                var extension = newfilepath.substr(newfilepath.length - 3);
                res.end('data:image/'+extension+';base64,' + base64string);
            }
        });
    });
    form.on('error', function (err) {
        console.log('An error has occured: \n' + err);
    });
    form.on('end', function () {
        console.log("end");
    });
    form.parse(req);
});

//client css
webserver.get('/client/content/css/default', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/content/css/client.css'));
});
webserver.get('/client/content/css/bootstrap', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/content/css/bootstrap.css'));
});

webserver.get('/client/content/img/favicon', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/content/img/MailIcon24.png'));
});
webserver.get('/client/content/img/config', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/content/img/ConfigIcon64.png'));
});

//client js
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
webserver.get('/CsiContactCategories', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/CsiContactCategories/list.html'));
});
webserver.get('/CsiMainContactTypes', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/CsiMainContactTypes/list.html'));
});

webserver.get('/CsiContactCategoryMappings', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/CsiContactCategoryMappings/list.html'));
});
webserver.get('/CsiContactTypes', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/CsiContactTypes/list.html'));
});
webserver.get('/AwdContactTypeMappings', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/AwdContactTypeMappings/list.html'));
});
webserver.get('/CsiContactTypeMappings', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/CsiContactTypeMappings/list.html'));
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

//==============================//
//  CsiContactCategories PATHS  //
//==============================//
webserver.get('/CsiContactCategories/List', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/CsiContactCategories/list.html'));
});
webserver.get('/CsiContactCategories/create', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/CsiContactCategories/create.html'));
});
webserver.get('/CsiContactCategories/edit', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/CsiContactCategories/edit.html'));
});
webserver.get('/CsiContactCategories/view', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/CsiContactCategories/view.html'));
});
//========================================//
//  CsiContactCategories component PATHS  //
//========================================//
//list
webserver.get('/comp-csiContactCategories-list', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactCategories/comp-csiContactCategories-list.html'));
});
webserver.get('/comp-csiContactCategories-list/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactCategories/comp-csiContactCategories-list-js-v1.js'));
});
//create
webserver.get('/comp-csiContactCategories-create', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactCategories/comp-csiContactCategories-create.html'));
});
webserver.get('/comp-csiContactCategories-create/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactCategories/comp-csiContactCategories-create-js-v1.js'));
});
//edit
webserver.get('/comp-csiContactCategories-edit', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactCategories/comp-csiContactCategories-edit.html'));
});
webserver.get('/comp-csiContactCategories-edit/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactCategories/comp-csiContactCategories-edit-js-v1.js'));
});
//view
webserver.get('/comp-csiContactCategories-view', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactCategories/comp-csiContactCategories-view.html'));
});
webserver.get('/comp-csiContactCategories-view/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactCategories/comp-csiContactCategories-view-js-v1.js'));
});

//=============================//
//  CsiMainContactTypes PATHS  //
//=============================//
webserver.get('/CsiMainContactTypes/List', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/CsiMainContactTypes/list.html'));
});
webserver.get('/CsiMainContactTypes/create', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/CsiMainContactTypes/create.html'));
});
webserver.get('/CsiMainContactTypes/edit', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/CsiMainContactTypes/edit.html'));
});
webserver.get('/CsiMainContactTypes/view', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/CsiMainContactTypes/view.html'));
});
//=======================================//
//  CsiMainContactTypes component PATHS  //
//=======================================//
//list
webserver.get('/comp-csiMainContactTypes-list', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiMainContactTypes/comp-csiMainContactTypes-list.html'));
});
webserver.get('/comp-csiMainContactTypes-list/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiMainContactTypes/comp-csiMainContactTypes-list-js-v1.js'));
});
//create
webserver.get('/comp-csiMainContactTypes-create', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiMainContactTypes/comp-csiMainContactTypes-create.html'));
});
webserver.get('/comp-csiMainContactTypes-create/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiMainContactTypes/comp-csiMainContactTypes-create-js-v1.js'));
});
//edit
webserver.get('/comp-csiMainContactTypes-edit', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiMainContactTypes/comp-csiMainContactTypes-edit.html'));
});
webserver.get('/comp-csiMainContactTypes-edit/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiMainContactTypes/comp-csiMainContactTypes-edit-js-v1.js'));
});
//view
webserver.get('/comp-csiMainContactTypes-view', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiMainContactTypes/comp-csiMainContactTypes-view.html'));
});
webserver.get('/comp-csiMainContactTypes-view/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiMainContactTypes/comp-csiMainContactTypes-view-js-v1.js'));
});

//====================================//
//  CsiContactCategoryMappings PATHS  //
//====================================//
webserver.get('/CsiContactCategoryMappings/List', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/CsiContactCategoryMappings/list.html'));
});
webserver.get('/CsiContactCategoryMappings/create', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/CsiContactCategoryMappings/create.html'));
});
webserver.get('/CsiContactCategoryMappings/edit', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/CsiContactCategoryMappings/edit.html'));
});
webserver.get('/CsiContactCategoryMappings/view', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/CsiContactCategoryMappings/view.html'));
});
//==============================================//
//  CsiContactCategoryMappings component PATHS  //
//==============================================//
//list
webserver.get('/comp-csiContactCategoryMappings-list', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactCategoryMappings/comp-csiContactCategoryMappings-list.html'));
});
webserver.get('/comp-csiContactCategoryMappings-list/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactCategoryMappings/comp-csiContactCategoryMappings-list-js-v1.js'));
});
//create
webserver.get('/comp-csiContactCategoryMappings-create', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactCategoryMappings/comp-csiContactCategoryMappings-create.html'));
});
webserver.get('/comp-csiContactCategoryMappings-create/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactCategoryMappings/comp-csiContactCategoryMappings-create-js-v1.js'));
});
//edit
webserver.get('/comp-csiContactCategoryMappings-edit', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactCategoryMappings/comp-csiContactCategoryMappings-edit.html'));
});
webserver.get('/comp-csiContactCategoryMappings-edit/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactCategoryMappings/comp-csiContactCategoryMappings-edit-js-v1.js'));
});
//view
webserver.get('/comp-csiContactCategoryMappings-view', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactCategoryMappings/comp-csiContactCategoryMappings-view.html'));
});
webserver.get('/comp-csiContactCategoryMappings-view/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactCategoryMappings/comp-csiContactCategoryMappings-view-js-v1.js'));
});

//=========================//
//  CsiContactTypes PATHS  //
//=========================//
webserver.get('/CsiContactTypes/List', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/CsiContactTypes/list.html'));
});
webserver.get('/CsiContactTypes/create', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/CsiContactTypes/create.html'));
});
webserver.get('/CsiContactTypes/edit', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/CsiContactTypes/edit.html'));
});
webserver.get('/CsiContactTypes/view', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/CsiContactTypes/view.html'));
});
//===================================//
//  CsiContactTypes component PATHS  //
//===================================//
//list
webserver.get('/comp-csiContactTypes-list', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactTypes/comp-csiContactTypes-list.html'));
});
webserver.get('/comp-csiContactTypes-list/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactTypes/comp-csiContactTypes-list-js-v1.js'));
});
//create
webserver.get('/comp-csiContactTypes-create', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactTypes/comp-csiContactTypes-create.html'));
});
webserver.get('/comp-csiContactTypes-create/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactTypes/comp-csiContactTypes-create-js-v1.js'));
});
//edit
webserver.get('/comp-csiContactTypes-edit', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactTypes/comp-csiContactTypes-edit.html'));
});
webserver.get('/comp-csiContactTypes-edit/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactTypes/comp-csiContactTypes-edit-js-v1.js'));
});
//view
webserver.get('/comp-csiContactTypes-view', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactTypes/comp-csiContactTypes-view.html'));
});
webserver.get('/comp-csiContactTypes-view/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactTypes/comp-csiContactTypes-view-js-v1.js'));
});

//================================//
//  AwdContactTypeMappings PATHS  //
//================================//
webserver.get('/AwdContactTypeMappings/List', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/AwdContactTypeMappings/list.html'));
});
webserver.get('/AwdContactTypeMappings/create', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/AwdContactTypeMappings/create.html'));
});
webserver.get('/AwdContactTypeMappings/edit', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/AwdContactTypeMappings/edit.html'));
});
webserver.get('/AwdContactTypeMappings/view', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/AwdContactTypeMappings/view.html'));
});
//==========================================//
//  AwdContactTypeMappings component PATHS  //
//==========================================//
//list
webserver.get('/comp-awdContactTypeMappings-list', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/AwdContactTypeMappings/comp-awdContactTypeMappings-list.html'));
});
webserver.get('/comp-awdContactTypeMappings-list/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/AwdContactTypeMappings/comp-awdContactTypeMappings-list-js-v1.js'));
});
//create
webserver.get('/comp-awdContactTypeMappings-create', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/AwdContactTypeMappings/comp-awdContactTypeMappings-create.html'));
});
webserver.get('/comp-awdContactTypeMappings-create/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/AwdContactTypeMappings/comp-awdContactTypeMappings-create-js-v1.js'));
});
//edit
webserver.get('/comp-awdContactTypeMappings-edit', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/AwdContactTypeMappings/comp-awdContactTypeMappings-edit.html'));
});
webserver.get('/comp-awdContactTypeMappings-edit/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/AwdContactTypeMappings/comp-awdContactTypeMappings-edit-js-v1.js'));
});
//view
webserver.get('/comp-awdContactTypeMappings-view', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/AwdContactTypeMappings/comp-awdContactTypeMappings-view.html'));
});
webserver.get('/comp-awdContactTypeMappings-view/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/AwdContactTypeMappings/comp-awdContactTypeMappings-view-js-v1.js'));
});

//================================//
//  CsiContactTypeMappings PATHS  //
//================================//
webserver.get('/CsiContactTypeMappings/List', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/CsiContactTypeMappings/list.html'));
});
webserver.get('/CsiContactTypeMappings/create', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/CsiContactTypeMappings/create.html'));
});
webserver.get('/CsiContactTypeMappings/edit', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/CsiContactTypeMappings/edit.html'));
});
webserver.get('/CsiContactTypeMappings/view', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/pages/CsiContactTypeMappings/view.html'));
});
//==========================================//
//  CsiContactTypeMappings component PATHS  //
//==========================================//
//list
webserver.get('/comp-csiContactTypeMappings-list', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactTypeMappings/comp-csiContactTypeMappings-list.html'));
});
webserver.get('/comp-csiContactTypeMappings-list/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactTypeMappings/comp-csiContactTypeMappings-list-js-v1.js'));
});
//create
webserver.get('/comp-csiContactTypeMappings-create', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactTypeMappings/comp-csiContactTypeMappings-create.html'));
});
webserver.get('/comp-csiContactTypeMappings-create/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactTypeMappings/comp-csiContactTypeMappings-create-js-v1.js'));
});
//edit
webserver.get('/comp-csiContactTypeMappings-edit', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactTypeMappings/comp-csiContactTypeMappings-edit.html'));
});
webserver.get('/comp-csiContactTypeMappings-edit/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactTypeMappings/comp-csiContactTypeMappings-edit-js-v1.js'));
});
//view
webserver.get('/comp-csiContactTypeMappings-view', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactTypeMappings/comp-csiContactTypeMappings-view.html'));
});
webserver.get('/comp-csiContactTypeMappings-view/js', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/components/CsiContactTypeMappings/comp-csiContactTypeMappings-view-js-v1.js'));
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

















//SignatureItems PATHS - signatureItems
//============================
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
//SignatureItems component PATHS
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
console.log('Mail enhancement site server started on: ' + port);