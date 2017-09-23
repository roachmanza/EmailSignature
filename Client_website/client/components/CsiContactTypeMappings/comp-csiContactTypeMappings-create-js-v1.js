function CsiContactTypeMappingsCreateViewModel(hostThisContext) {
    var self = this;
    self.hostContext = hostThisContext;
    var parent;
    var currentDomainLogin;
    var environment;

    self.ApiBaseUri = ko.observable();

    self.CsiContactTypeMappingsHasError = ko.observable(false);
    self.CsiContactTypeMappingsError = ko.observable();

    self.CsiContactTypeMappingsLoading = ko.observable(false);
    self.CsiContactTypeMappingsList = ko.observableArray([]);

    self.apiUrl = {
        getAllAwdContactTypeMappingById: "api/v1/CsiContactTypeMappings",
        createCsiContactTypeMapping: "api/v1/CsiContactTypeMappings",
        getAllContactTypes : "api/v1/ContactTypes",
        getAllCSIContactTypes : "api/v1/CsiContactTypes"
    }
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model) {
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenCsiContactTypeMappingsList = function () {
        window.location.replace("../CsiContactTypeMappings/list");
    };

    self.awdcontacttypemappingid = ko.observable("");
    self.contacttypeid = ko.observable("");
    self.contacttypeidstring = ko.observable("");
    self.csicontacttypeid = ko.observable("");
    self.csicontacttypeidstring = ko.observable("");
    self.name = ko.observable("");
    self.description = ko.observable("");
    self.inactive = ko.observable("");
    self.inactivechecked = ko.observable("");
    self.inactivedate = ko.observable("");
    self.SaveCsiContactTypeMappings = function () {
        self.CsiContactTypeMappingsHasError(false);
        self.CsiContactTypeMappingsError("");
        var inactive = "0";
        if (self.inactivechecked() === true) {
            inactive = "1"
        }
        if (!self.contacttypes()) {
            self.CsiContactTypeMappingsHasError(true);
            self.CsiContactTypeMappingsError("Please select a contact type");
            return;
        };
        if (!self.csicontacttypes()) {
            self.CsiContactTypeMappingsHasError(true);
            self.CsiContactTypeMappingsError("Please select a CSI contact type");
            return;
        };
        if (!self.name()) {
            self.CsiContactTypeMappingsHasError(true);
            self.CsiContactTypeMappingsError("Please select a name");
            return;
        };
        if (!self.description()) {
            self.CsiContactTypeMappingsHasError(true);
            self.CsiContactTypeMappingsError("Please select a description");
            return;
        };
        var jsonObject = JSON.stringify({
            contactTypeId: self.contacttypes().contacttypeid + '',
            csiContactTypeId: self.csicontacttypes().csicontacttypeid + '',
            name: self.name(),
            description: self.description(),
            inActive: inactive
        });
        console.log(jsonObject)
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim(currentDomainLogin)])];
        url = self.ApiBaseUri() + self.apiUrl.createCsiContactTypeMapping ;
        ajaxAsync.ajaxPost(self, self._SaveCsiContactTypeMappings, url, null, jsonObject, null, headers);
    };
    self._SaveCsiContactTypeMappings = function (result) {
        if (result.success) {
            self.OpenCsiContactTypeMappingsList();
        } else {
            self.CsiContactTypeMappingsHasError(true);
            self.CsiContactTypeMappingsError(result.errorMessage);
        }
    };

    self.getInActive = function (inactiveValue) {
        var isckecked = false;
        if(inactiveValue==="1"){
            isckecked  = true;
        }
        return isckecked;
    };

    //Get the person types for the dropdown
    self.availableContactTypes = ko.observableArray([{Name:'NONE AVAILABLE'}]);
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



    
     //Get the person types for the dropdown
     self.availableCsiContactTypes = ko.observableArray([{Name:'NONE AVAILABLE'}]);
     self.csicontacttypes = ko.observable("");
     self.GetCsiContactTypes = function () {
         self.availableCsiContactTypes.removeAll();
         var url = "";
         var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim(currentDomainLogin)])];
         url = self.ApiBaseUri() + self.apiUrl.getAllCSIContactTypes;
         ajaxAsync.ajaxGet(self, self._GetCsiContactTypes, url, null, null, null, headers);
     };
     self._GetCsiContactTypes = function (result) {
         if (result.success) {
             var data = result.data.data;
             for (var i = 0; i < data.length; i++) {
                 var dataItem = data[i];
                 dataItem.testvalue = data[i].Name+" "+data[i].Name
                 self.availableCsiContactTypes.push(dataItem);
             }
         }
     };
     self.getCsiContactTypesItem = function (id) {
         for (var i = 0; i < self.availableCsiContactTypes().length; i++) {
             var curId = self.availableCsiContactTypes()[i].csicontacttypeid
             if ( curId === id) {
                 console.log(self.availableCsiContactTypes()[i]);
                 return self.availableCsiContactTypes()[i];
             }
         }
     };


}
