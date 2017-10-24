function FieldItemsEditViewModel(hostThisContext) {
    var self = this;
    self.hostContext = hostThisContext;
    var parent;
    var currentDomainLogin;
    var environment;
    var currentId;

    self.ApiBaseUri = ko.observable();

    self.FieldItemsHasError = ko.observable(false);
    self.FieldItemsError = ko.observable();

    self.FieldItemsLoading = ko.observable(false);
    self.FieldItemsList = ko.observableArray([]);

    self.apiUrl = {
        getFieldItemsById: "api/v1/FieldItems",
        updateFieldItems: "api/v1/FieldItems",
        getFieldTypes: "api/v1/FieldTypes",
        getAllLanguages: "api/v1/Languages"
    }
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model, itemId) {
        currentId = itemId;
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
        self.PopulateForm();
    };

    self.OpenFieldItemsList = function () {
        window.location.replace("../FieldItems/list");
    };

    self.OpenFieldItems = function () {
        window.location.replace("../FieldItems/view?id=" + currentId);
    };
    self.fieldTypeValue = ko.observable("None");
    self.FieldTypeChanged = function () {
        self.fieldTypeValue(self.fieldtypes().name);
    }

    self.SaveFieldItems = function () {

        self.FieldItemsHasError(false);
        self.FieldItemsError("");
        var inactive = "0";
        if (self.inactivechecked() === true) {
            inactive = "1"
        };
        if (!self.languages()) {
            self.FieldItemsHasError(true);
            self.FieldItemsError("Please supply a language");
            return;
        };
        if (!self.fieldtypes()) {
            self.FieldItemsHasError(true);
            self.FieldItemsError("Please supply a fieldtype");
            return;
        };
        if (!self.name()) {
            self.FieldItemsHasError(true);
            self.FieldItemsError("Please supply a name");
            return;
        };
        if (!self.description()) {
            self.FieldItemsHasError(true);
            self.FieldItemsError("Please supply a description");
            return;
        };

        if (self.fieldTypeValue() == 'Image') {
            var files = $("#fileuploadinput").get(0).files;
            if (files.length > 0) {
                var formData = new FormData();
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    formData.append('uploads[]', file, file.name);
                }
                $.ajax({
                    url: '/upload',
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        var base64encodedimage = data;
                        var jsonObject = JSON.stringify({
                            languageid: self.languages().languageid,
                            fieldtypeid: self.fieldtypes().fieldtypeid,
                            name: self.name(),
                            description: self.description(),
                            label: self.label(),
                            value: base64encodedimage,
                            printformat: self.printformat(),
                            inactive: inactive
                        });
                        var url = "";
                        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim(currentDomainLogin)])];
                        url = self.ApiBaseUri() + self.apiUrl.updateFieldItems + "/" + currentId;
                        ajaxAsync.ajaxPut(self, self._SaveFieldItems, url, null, jsonObject, null, headers);
                    }
                });
            } else {
                self.FieldItemsHasError(true);
                self.FieldItemsError("Please select a file");
                return;
            }
        } else {

            if (!self.label()) {
                self.FieldItemsHasError(true);
                self.FieldItemsError("Please supply a label");
                return;
            };
            if (!self.value()) {
                self.FieldItemsHasError(true);
                self.FieldItemsError("Please supply a value");
                return;
            };
            if (!self.printformat()) {
                self.FieldItemsHasError(true);
                self.FieldItemsError("Please supply a printformat");
                return;
            };
            var jsonObject = JSON.stringify({
                languageid: self.languages().languageid,
                fieldtypeid: self.fieldtypes().fieldtypeid,
                name: self.name(),
                description: self.description(),
                label: self.label(),
                value: base64encodedimage,
                printformat: self.printformat(),
                inactive: inactive
            });
            var url = "";
            var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim(currentDomainLogin)])];
            url = self.ApiBaseUri() + self.apiUrl.updateFieldItems + "/" + currentId;
            ajaxAsync.ajaxPut(self, self._SaveFieldItems, url, null, jsonObject, null, headers);
        }


    };
    self._SaveFieldItems = function (result) {
        if (result.success) {
            self.OpenFieldItems();
        } else {
            self.FieldItemsHasError(true);
            self.FieldItemsError(result.errorMessage);
        }
    };

    self.PopulateForm = function () {
        self.GetLanguages();
    };
    self.GetFieldItemsById = function () {
        self.FieldItemsLoading(true);
        self.FieldItemsList.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim("metmom\\roolivier")])];
        url = self.ApiBaseUri() + self.apiUrl.getFieldItemsById + "/" + currentId;
        console.log("Getting all people : for " + currentDomainLogin);
        ajaxAsync.ajaxGet(self, self._populateFieldItemsItem, url, null, null, null, headers);
    };

    self.fielditemid = ko.observable("");
    self.languageid = ko.observable("");
    self.languageidstring = ko.observable("");
    self.fieldtypeid = ko.observable("");
    self.fieldtypeidname = ko.observable("");
    self.name = ko.observable("");
    self.description = ko.observable("");
    self.label = ko.observable("");
    self.value = ko.observable("");
    self.printformat = ko.observable("");
    self.inactive = ko.observable("");
    self.inactivechecked = ko.observable("");
    self.inactivedate = ko.observable("");
    self._populateFieldItemsItem = function (result) {
        if (result.success) {
            if (result.success) {
                var data = result.data.data;
                self.fielditemid(data[0].fielditemid);
                self.languageid(data[0].languageid);
                self.languageidstring(data[0].languageidstring);
                self.fieldtypeid(data[0].fieldtypeid);
                self.fieldtypeidname(data[0].fieldtypeidname);
                self.name(data[0].name);
                self.description(data[0].description);
                self.label(data[0].label);
                self.value(data[0].value);
                self.printformat(data[0].printformat);
                self.inactive(data[0].inactive);
                self.inactivechecked(self.getInActive(data[0].inactive));
                self.inactivedate(data[0].inactivedate);

                self.fieldTypeValue(data[0].fieldtypeidname);

                self.languages(self.getLanguagesItem(data[0].languageid));
                self.fieldtypes(self.getFieldTypesItem(data[0].fieldtypeid));
            }
        } else {
            if (result.errorMessage === "error") {
                self.FieldItemsHasError(true);
                self.FieldItemsError("");
            } else {
                self.FieldItemsHasError(true);
                self.FieldItemsError(result.errorMessage);
            }
        }
        self.FieldItemsLoading(false);
    };
    self.getInActive = function (inactiveValue) {
        var isckecked = false;
        if (inactiveValue === "1") {
            isckecked = true;
        }
        return isckecked;
    };


    //Get the ContactTypes dropdown
    self.availableLanguages = ko.observableArray([{ name: 'NONE AVAILABLE' }]);
    self.languages = ko.observable("");
    self.GetLanguages = function () {
        self.availableLanguages.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim(currentDomainLogin)])];
        url = self.ApiBaseUri() + self.apiUrl.getAllLanguages;
        ajaxAsync.ajaxGet(self, self._GetLanguages, url, null, null, null, headers);
    };
    self._GetLanguages = function (result) {
        if (result.success) {
            var data = result.data.data;
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                self.availableLanguages.push(dataItem);
            }
            self.GetFieldTypes();
        }
    };
    self.getLanguagesItem = function (id) {
        for (var i = 0; i < self.availableLanguages().length; i++) {
            var curId = self.availableLanguages()[i].languageid
            if (curId === id) {
                return self.availableLanguages()[i];
            }
        }
    };

    //Get the CsiContactCategories dropdown
    self.availableFieldTypes = ko.observableArray([{ name: 'NONE AVAILABLE' }]);
    self.fieldtypes = ko.observable("");
    self.GetFieldTypes = function () {
        self.availableFieldTypes.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim(currentDomainLogin)])];
        url = self.ApiBaseUri() + self.apiUrl.getFieldTypes;
        ajaxAsync.ajaxGet(self, self._GetFieldTypes, url, null, null, null, headers);
    };
    self._GetFieldTypes = function (result) {
        if (result.success) {
            var data = result.data.data;
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                self.availableFieldTypes.push(dataItem);
            }
            self.GetFieldItemsById();
        }
    };
    self.getFieldTypesItem = function (id) {
        for (var i = 0; i < self.availableFieldTypes().length; i++) {
            var curId = self.availableFieldTypes()[i].fieldtypeid
            if (curId === id) {
                console.log(self.availableFieldTypes()[i]);
                return self.availableFieldTypes()[i];
            }
        }
    };


}
