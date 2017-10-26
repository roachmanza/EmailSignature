function CsiContactCategoryMappingsEditViewModel(hostThisContext) {
    var self = this;
    self.hostContext = hostThisContext;
    var parent;
    var currentDomainLogin;
    var environment;
    var currentId;

    self.ApiBaseUri = ko.observable();

    self.CsiContactCategoryMappingsHasError = ko.observable(false);
    self.CsiContactCategoryMappingsError = ko.observable();

    self.CsiContactCategoryMappingsLoading = ko.observable(false);
    self.CsiContactCategoryMappingsList = ko.observableArray([]);

    self.apiUrl = {
        getCsiContactCategoryMappingsById: "api/v1/CsiContactCategoryMappings",
        updateCsiContactCategoryMappings: "api/v1/CsiContactCategoryMappings",
        getAllContactTypes : "api/v1/ContactTypes",        
        getAllCsiContactCategories : "api/v1/CsiContactCategories"
    }
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model, itemId) {
        currentId = itemId;
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenCsiContactCategoryMappingsList = function () {
        window.location.replace("../CsiContactCategoryMappings/list");
    };

    self.OpenCsiContactCategoryMappings = function () {
        window.location.replace("../CsiContactCategoryMappings/view?id=" + currentId);
    };

    self.SaveCsiContactCategoryMappings = function () {
        self.CsiContactCategoryMappingsHasError(false);
        self.CsiContactCategoryMappingsError("");
        var inactive = "0";
        if (self.inactivechecked() === true) {
            inactive = "1"
        };
        if (!self.contacttypes()) {
            self.CsiContactCategoryMappingsHasError(true);
            self.CsiContactCategoryMappingsError("Please supply a contact type");
            return;
        };
        if (!self.csiContactCategories()) {
            self.CsiContactCategoryMappingsHasError(true);
            self.CsiContactCategoryMappingsError("Please supply a contact category");
            return;
        };
        if (!self.name()) {
            self.CsiContactCategoryMappingsHasError(true);
            self.CsiContactCategoryMappingsError("Please supply a name");
            return;
        };
        if (!self.description()) {
            self.CsiContactCategoryMappingsHasError(true);
            self.CsiContactCategoryMappingsError("Please supply a description");
            return;
        };
        var jsonObject = JSON.stringify({
            csiContactCategoryId : self.csiContactCategories().csicontactcategoryid + '',
            contactTypeId: self.contacttypes().contacttypeid + '',
            name: self.name(),
            description: self.description(),
            inActive: inactive
        });
        console.log(jsonObject)
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim(currentDomainLogin)])];
        url = self.ApiBaseUri() + self.apiUrl.updateCsiContactCategoryMappings + "/" + currentId;
        ajaxAsync.ajaxPut(self, self._SaveCsiContactCategoryMappings, url, null, jsonObject, null, headers);
    };
    self._SaveCsiContactCategoryMappings = function (result) {
        if (result.success) {
            self.OpenCsiContactCategoryMappings();
        } else {
            self.CsiContactCategoryMappingsHasError(true);
            self.CsiContactCategoryMappingsError(result.errorMessage);
        }
    };

    self.GetCsiContactCategoryMappingsById = function () {
        self.CsiContactCategoryMappingsLoading(true);
        self.CsiContactCategoryMappingsList.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim("metmom\\roolivier")])];
        url = self.ApiBaseUri() + self.apiUrl.getCsiContactCategoryMappingsById + "/" + currentId;
        console.log("Getting all people : for " + currentDomainLogin);
        ajaxAsync.ajaxGet(self, self._populateCsiContactCategoryMappingsItem, url, null, null, null, headers);
    };

    self.csicontactcategorymappingid = ko.observable("");
    self.csicontactcategoryid = ko.observable("");
    self.contacttypeid = ko.observable("");
    self.name = ko.observable("");
    self.description = ko.observable("");
    self.inactive = ko.observable("");
    self.inactivechecked = ko.observable("");
    self.inactivedate = ko.observable("");
    self._populateCsiContactCategoryMappingsItem = function (result) {
        if (result.success) {
            if (result.success) {
                var data = result.data.data;
                self.csicontactcategorymappingid(data[0].csicontactcategorymappingid);
                self.csicontactcategoryid(data[0].csicontactcategoryid);
                self.contacttypeid(data[0].contacttypeid);
                self.name(data[0].name);
                self.description(data[0].description);
                self.inactive(data[0].inactive);
                self.inactivechecked(self.getInActive(data[0].inactive));
                self.inactivedate(data[0].inactivedate);

                self.contacttypes(self.getContactTypesItem(data[0].contacttypeid));  
                self.csiContactCategories(self.getCsiContactCategories(data[0].csicontactcategoryid)); 
            }
        } else {
            if (result.errorMessage === "error") {
                self.CsiContactCategoryMappingsHasError(true);
                self.CsiContactCategoryMappingsError("");
            } else {
                self.CsiContactCategoryMappingsHasError(true);
                self.CsiContactCategoryMappingsError(result.errorMessage);
            }
        }
        self.CsiContactCategoryMappingsLoading(false);
    };
    self.getInActive = function (inactiveValue) {
        var isckecked = false;
        if(inactiveValue==="1"){
            isckecked  = true;
        }
        return isckecked;
    };

    //Get the ContactTypes dropdown
    self.availableContactTypes = ko.observableArray([{name : 'NONE AVAILABLE'}]);
    self.contacttypes = ko.observable("");
    self.GetContactTypes = function () {
        self.availableContactTypes.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim(currentDomainLogin)])];
        url = self.ApiBaseUri() + self.apiUrl.getAllContactTypes;
        ajaxAsync.ajaxGet(self, self._GetContactTypes, url, null, null, null, headers);
    };
    self._GetContactTypes = function (result) {
        if (result.success) {
            var data = result.data.data;
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                dataItem.testvalue = data[i].Name+" "+data[i].Name
                self.availableContactTypes.push(dataItem);
            }
        }
    };
    self.getContactTypesItem = function (id) {
        for (var i = 0; i < self.availableContactTypes().length; i++) {
            var curId = self.availableContactTypes()[i].contacttypeid
            if ( curId === id) {
                console.log(self.availableContactTypes()[i]);
                return self.availableContactTypes()[i];
            }
        }
    };
           
    //Get the CsiContactCategories dropdown
    self.availableCsiContactCategories = ko.observableArray([{name : 'NONE AVAILABLE'}]);
    self.csiContactCategories = ko.observable("");
    self.GetCsiContactCategories = function () {
        self.availableCsiContactCategories.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim(currentDomainLogin)])];
        url = self.ApiBaseUri() + self.apiUrl.getAllCsiContactCategories;
        ajaxAsync.ajaxGet(self, self._GetCsiContactCategories, url, null, null, null, headers);
    };
    self._GetCsiContactCategories = function (result) {
        if (result.success) {
            var data = result.data.data;
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                dataItem.testvalue = data[i].Name+" "+data[i].Name
                self.availableCsiContactCategories.push(dataItem);
            }
        }
    };
    self.getCsiContactCategories = function (id) {
        for (var i = 0; i < self.availableCsiContactCategories().length; i++) {
            var curId = self.availableCsiContactCategories()[i].csicontactcategoryid
            if ( curId === id) {
                console.log(self.availableCsiContactCategories()[i]);
                return self.availableCsiContactCategories()[i];
            }
        }
    };


}
