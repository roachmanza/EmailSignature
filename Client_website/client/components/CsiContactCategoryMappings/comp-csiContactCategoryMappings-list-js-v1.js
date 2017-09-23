function CsiContactCategoryMappingsListViewModel(hostThisContext) {
    var self = this;
    self.hostContext = hostThisContext;
    var parent;
    var currentDomainLogin;
    var environment;
    
    self.ApiBaseUri = ko.observable();

    self.CsiContactCategoryMappingsHasError = ko.observable(false);
    self.CsiContactCategoryMappingsError = ko.observable();

    self.CsiContactCategoryMappingsLoading = ko.observable(false);
    self.CsiContactCategoryMappingsList = ko.observableArray([]);

	self.apiUrl = {
        getAllCsiContactCategoryMappings: "api/v1/CsiContactCategoryMappings"
	}
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model) {
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenCsiContactCategoryMappings = function(){
        var id = this.csicontactcategorymappingid;
        console.log("Opening "+ id);
        window.location.replace("../CsiContactCategoryMappings/view?id="+ id);
    }
    
    self.EditCsiContactCategoryMappings = function(){
         var id = this.csicontactcategorymappingid;
        console.log("Opening "+ id);
        window.location.replace("../CsiContactCategoryMappings/edit?id="+ id);
    }
    
    self.CreateCsiContactCategoryMappings = function(){
        console.log("Create new ");
        window.location.replace("/CsiContactCategoryMappings/create");
    }
    

    self.GetCsiContactCategoryMappings = function () {
        self.CsiContactCategoryMappingsLoading(true);
        self.CsiContactCategoryMappingsList.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim("metmom\\roolivier")])];
        url = self.ApiBaseUri() + self.apiUrl.getAllCsiContactCategoryMappings;
        console.log("Getting all people : for " + currentDomainLogin);
        ajaxAsync.ajaxGet(self, self._populateCsiContactCategoryMappings, url, null, null, null, headers);
    };

    self._populateCsiContactCategoryMappings = function (result) {
        if (result.success) {
            var data = result.data.data;
            
            for (var i = 0; i < data.length; i++) {
                data[i].inactivechecked=self.getInActive(data[i].inactive)
                self.CsiContactCategoryMappingsList.push(data[i]);
            }
        } else {
             if(result.errorMessage==="error"){
                self.CsiContactCategoryMappingsHasError(true);
                self.CsiContactCategoryMappingsError("");
            }else{
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

}
