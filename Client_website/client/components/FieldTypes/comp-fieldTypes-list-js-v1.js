function FieldTypesListViewModel(hostThisContext) {
    var self = this;
    self.hostContext = hostThisContext;
    var parent;
    var currentDomainLogin;
    var environment;
    
    self.ApiBaseUri = ko.observable();

    self.FieldTypesHasError = ko.observable(false);
    self.FieldTypesError = ko.observable();

    self.FieldTypesLoading = ko.observable(false);
    self.FieldTypesList = ko.observableArray([]);

	self.apiUrl = {
        getAllFieldTypes: "api/v1/FieldTypes"
	}
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model) {
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenFieldTypes = function(){
        var id = this.fieldtypeid;
        console.log("Opening "+ id);
        window.location.replace("../FieldTypes/view?id="+ id);
    }
    
    self.EditFieldTypes = function(){
         var id = this.fieldtypeid;
        console.log("Opening "+ id);
        window.location.replace("../FieldTypes/edit?id="+ id);
    }
    
    self.CreateFieldTypes = function(){
        console.log("Create new ");
        window.location.replace("/FieldTypes/create");
    }
    

    self.GetFieldTypes = function () {
        self.FieldTypesLoading(true);
        self.FieldTypesList.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim("metmom\\roolivier")])];
        url = self.ApiBaseUri() + self.apiUrl.getAllFieldTypes;
        console.log("Getting all people : for " + currentDomainLogin);
        ajaxAsync.ajaxGet(self, self._populateFieldTypes, url, null, null, null, headers);
    };

    self._populateFieldTypes = function (result) {
        if (result.success) {
            var data = result.data.data;
            
            for (var i = 0; i < data.length; i++) {
                data[i].inactivechecked=self.getInActive(data[i].inactive)
                self.FieldTypesList.push(data[i]);
            }
        } else {
             if(result.errorMessage==="error"){
                self.FieldTypesHasError(true);
                self.FieldTypesError("");
            }else{
                self.FieldTypesHasError(true);
                self.FieldTypesError(result.errorMessage);
            }
            
            
        }
        self.FieldTypesLoading(false);
    };

    self.getInActive = function (inactiveValue) {
        var isckecked = false;
        if(inactiveValue==="1"){
            isckecked  = true;
        }
        return isckecked;
    };

}
