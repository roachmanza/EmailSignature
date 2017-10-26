function CsiContactTypesCreateViewModel(hostThisContext) {
    var self = this;
    self.hostContext = hostThisContext;
    var parent;
    var currentDomainLogin;
    var environment;

    self.ApiBaseUri = ko.observable();

    self.CsiContactTypesHasError = ko.observable(false);
    self.CsiContactTypesError = ko.observable();

    self.CsiContactTypesLoading = ko.observable(false);
    self.CsiContactTypesList = ko.observableArray([]);

    self.apiUrl = {
        getAllContactTypeById: "api/v1/CsiContactTypes",
        getAllCsiMainContactTypes: "api/v1/CsiMainContactTypes",
        createContactType: "api/v1/CsiContactTypes",
    }
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model) {
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenCsiContactTypesList = function () {
        window.location.replace("../CsiContactTypes/list");
    };

    self.contacttypeid = ko.observable("");
    self.name = ko.observable("");
    self.description = ko.observable("");
    self.inactive = ko.observable("");
    self.inactivechecked = ko.observable("");
    self.inactivedate = ko.observable("");
    self.SaveCsiContactTypes = function () {
        self.CsiContactTypesHasError(false);
        self.CsiContactTypesError("");
        var inactive = "0";
        if (self.inactivechecked() === true) {
            inactive = "1"
        };
        if (!self.csiMainContactTypes()) {
            self.CsiContactTypesHasError(true);
            self.CsiContactTypesError("Please supply a main type");
            return;
        };
        if (!self.name()) {
            self.CsiContactTypesHasError(true);
            self.CsiContactTypesError("Please supply a name");
            return;
        };
        if (!self.description()) {
            self.CsiContactTypesHasError(true);
            self.CsiContactTypesError("Please supply a description");
            return;
        };
        var jsonObject = JSON.stringify({
            csiMainContactTypeId : self.csiMainContactTypes().csimaincontacttypeid + '',
            name: self.name(),
            description: self.description(),
            inActive: inactive
        });
        console.log(jsonObject)
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim(currentDomainLogin)])];
        url = self.ApiBaseUri() + self.apiUrl.createContactType ;
        ajaxAsync.ajaxPost(self, self._SaveCsiContactTypes, url, null, jsonObject, null, headers);
    };
    self._SaveCsiContactTypes = function (result) {
        if (result.success) {
            self.OpenCsiContactTypesList();
        } else {
            self.CsiContactTypesHasError(true);
            self.CsiContactTypesError(result.errorMessage);
        }
    };


    self.getInActive = function (inactiveValue) {
        var isckecked = false;
        if(inactiveValue==="1"){
            isckecked  = true;
        }
        return isckecked;
    };

    //Get the csiMainContactTypes dropdown
    self.availableCsiMainContactTypes = ko.observableArray([{name : 'NONE AVAILABLE'}]);
    self.csiMainContactTypes = ko.observable("");
    self.GetCsiMainContactTypes = function () {
        self.availableCsiMainContactTypes.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim(currentDomainLogin)])];
        url = self.ApiBaseUri() + self.apiUrl.getAllCsiMainContactTypes;
        ajaxAsync.ajaxGet(self, self._GetCsiMainContactTypes, url, null, null, null, headers);
    };
    self._GetCsiMainContactTypes = function (result) {
        if (result.success) {
            var data = result.data.data;
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                dataItem.testvalue = data[i].Name+" "+data[i].Name
                self.availableCsiMainContactTypes.push(dataItem);
            }
        }
    };
    self.getCsiMainContactTypes = function (id) {
        for (var i = 0; i < self.availableCsiMainContactTypes().length; i++) {
            var curId = self.availableCsiMainContactTypes()[i].csimaincontacttypeid
            if ( curId === id) {
                console.log(self.availableCsiMainContactTypes()[i]);
                return self.availableCsiMainContactTypes()[i];
            }
        }
    };


}
