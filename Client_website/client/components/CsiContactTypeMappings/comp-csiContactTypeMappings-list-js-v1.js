function CsiContactTypeMappingsListViewModel(hostThisContext) {
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
        getAllCsiContactTypeMappings: "api/v1/CsiContactTypeMappings"
	}
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model) {
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenCsiContactTypeMappings = function(){
        var id = this.csicontacttypemappingid;
        console.log("Opening "+ id);
        window.location.replace("../CsiContactTypeMappings/view?id="+ id);
    }
    
    self.EditCsiContactTypeMappings = function(){
         var id = this.csicontacttypemappingid;
        console.log("Opening "+ id);
        window.location.replace("../CsiContactTypeMappings/edit?id="+ id);
    }
    
    self.CreateCsiContactTypeMappings = function(){
        console.log("Create new ");
        window.location.replace("/CsiContactTypeMappings/create");
    }
    

    self.GetCsiContactTypeMappings = function () {
        self.CsiContactTypeMappingsLoading(true);
        self.CsiContactTypeMappingsList.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim("metmom\\roolivier")])];
        url = self.ApiBaseUri() + self.apiUrl.getAllCsiContactTypeMappings;
        console.log("Getting all people : for " + currentDomainLogin);
        ajaxAsync.ajaxGet(self, self._populateCsiContactTypeMappings, url, null, null, null, headers);
    };

    self._populateCsiContactTypeMappings = function (result) {
        if (result.success) {
            var data = result.data.data;
            
            for (var i = 0; i < data.length; i++) {
                data[i].inactivechecked=self.getInActive(data[i].inactive)
                self.CsiContactTypeMappingsList.push(data[i]);
            }
        } else {
             if(result.errorMessage==="error"){
                self.CsiContactTypeMappingsHasError(true);
                self.CsiContactTypeMappingsError("");
            }else{
                self.CsiContactTypeMappingsHasError(true);
                self.CsiContactTypeMappingsError(result.errorMessage);
            }
            
            
        }
        self.CsiContactTypeMappingsLoading(false);
    };

    self.getInActive = function (inactiveValue) {
        var isckecked = false;
        if(inactiveValue==="1"){
            isckecked  = true;
        }
        return isckecked;
    };

}
