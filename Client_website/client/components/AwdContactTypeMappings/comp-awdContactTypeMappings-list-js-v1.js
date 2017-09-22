function AwdContactTypeMappingsListViewModel(hostThisContext) {
    var self = this;
    self.hostContext = hostThisContext;
    var parent;
    var currentDomainLogin;
    var environment;
    
    self.ApiBaseUri = ko.observable();

    self.AwdContactTypeMappingsHasError = ko.observable(false);
    self.AwdContactTypeMappingsError = ko.observable();

    self.AwdContactTypeMappingsLoading = ko.observable(false);
    self.AwdContactTypeMappingsList = ko.observableArray([]);

	self.apiUrl = {
        getAllAwdContactTypeMappings: "api/v1/AwdContactTypeMappings"
	}
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model) {
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenAwdContactTypeMappings = function(){
        var id = this.awdcontacttypemappingid;
        console.log("Opening "+ id);
        window.location.replace("../AwdContactTypeMappings/view?id="+ id);
    }
    
    self.EditAwdContactTypeMappings = function(){
         var id = this.awdcontacttypemappingid;
        console.log("Opening "+ id);
        window.location.replace("../AwdContactTypeMappings/edit?id="+ id);
    }
    
    self.CreateAwdContactTypeMappings = function(){
        console.log("Create new ");
        window.location.replace("/AwdContactTypeMappings/create");
    }
    

    self.GetAwdContactTypeMappings = function () {
        self.AwdContactTypeMappingsLoading(true);
        self.AwdContactTypeMappingsList.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim("metmom\\roolivier")])];
        url = self.ApiBaseUri() + self.apiUrl.getAllAwdContactTypeMappings;
        console.log("Getting all people : for " + currentDomainLogin);
        ajaxAsync.ajaxGet(self, self._populateAwdContactTypeMappings, url, null, null, null, headers);
    };

    self._populateAwdContactTypeMappings = function (result) {
        if (result.success) {
            var data = result.data.data;
            
            for (var i = 0; i < data.length; i++) {
                data[i].inactivechecked=self.getInActive(data[i].inactive)
                self.AwdContactTypeMappingsList.push(data[i]);
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

}
