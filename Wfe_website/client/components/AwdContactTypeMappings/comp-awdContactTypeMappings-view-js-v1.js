function AwdContactTypeMappingsViewViewModel(hostThisContext) {
    var self = this;
    self.hostContext = hostThisContext;
    var parent;
    var currentDomainLogin;
    var environment;
    var currentId;

    self.ApiBaseUri = ko.observable();

    self.AwdContactTypeMappingsHasError = ko.observable(false);
    self.AwdContactTypeMappingsError = ko.observable();

    self.AwdContactTypeMappingsLoading = ko.observable(false);
    self.AwdContactTypeMappingsList = ko.observableArray([]);

	self.apiUrl = {
        getAllAwdContactTypeMappingById: "api/v1/AwdContactTypeMappings",
        getAllContactTypes : "api/v1/ContactTypes"
	}
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model,itemId) {
        currentId = itemId;
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenAwdContactTypeMappingsList = function(){
        window.location.replace("../AwdContactTypeMappings/list");
    }
    
    self.EditAwdContactTypeMappings = function(){
        window.location.replace("../AwdContactTypeMappings/edit?id="+ currentId);
    }
       

    self.GetAwdContactTypeMappingById = function () {
        self.AwdContactTypeMappingsLoading(true);
        self.AwdContactTypeMappingsList.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim("metmom\\roolivier")])];
        url = self.ApiBaseUri() + self.apiUrl.getAllAwdContactTypeMappingById+ "/" + currentId;
        console.log("Getting all people : for " + currentDomainLogin);
        ajaxAsync.ajaxGet(self, self._populateAwdContactTypeMappingsItem, url, null, null, null, headers);
    };

    self.awdcontacttypemappingid = ko.observable("");
    self.contacttypeid = ko.observable("");
    self.contacttypeidstring = ko.observable("");
    self.contacttypes = ko.observable("");
    self.name = ko.observable("");
    self.description = ko.observable("");
    self.awdcontactrole = ko.observable("");
    self.awdregion = ko.observable("");
    self.inactive = ko.observable("");
    self.inactivechecked = ko.observable("");
    self.inactivedate = ko.observable("");
    self._populateAwdContactTypeMappingsItem = function (result) {
        if (result.success) {
            if (result.success) {
                var data = result.data.data;
                self.awdcontacttypemappingid(data[0].awdcontacttypemappingid);
                self.contacttypeid(data[0].contacttypeid);
                self.contacttypeidstring(data[0].contacttypeidstring);
                self.contacttypes(self.getContactTypesItem(data[0].contacttypeid));
                self.name(data[0].name);
                self.description(data[0].description);
                self.awdcontactrole(data[0].awdcontactrole);
                self.awdregion(data[0].awdregion);
                self.inactive(data[0].inactive);
                self.inactivechecked(self.getInActive(data[0].inactive));
                self.inactivedate(data[0].inactivedate);
            }
        } else {
             if(result.errorMessage==="error"){
                self.AwdContactTypeMappingsHasError(true);
                self.AwdContactTypeMappingsError("");
            }else{
                self.AwdContactTypeMappingsHasError(true);
                self.AwdContactTypeMappingsError(result.errorMessage);
            }
        }
        self.AwdContactTypeMappingsLoading(false);
    };
    self.getInActive = function (inactiveValue) {
        var isckecked = false;
        if(inactiveValue==="1"){
            isckecked  = true;
        }
        return isckecked;
    };

    //Get the person types for the dropdown
    self.availableContactTypes = ko.observableArray(['NONE AVAILABLE']);
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
    }
}
