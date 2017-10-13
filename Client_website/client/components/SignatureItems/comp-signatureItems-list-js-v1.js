function SignatureItemsListViewModel(hostThisContext) {
    var self = this;
    self.hostContext = hostThisContext;
    var parent;
    var currentDomainLogin;
    var environment;
    
    self.ApiBaseUri = ko.observable();

    self.SignatureItemsHasError = ko.observable(false);
    self.SignatureItemsError = ko.observable();

    self.SignatureItemsLoading = ko.observable(false);
    self.SignatureItemsList = ko.observableArray([]);

	self.apiUrl = {
        getAllSignatureItems: "api/v1/SignatureItems"
	}
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model) {
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenSignatureItems = function(){
        var id = this.signatureitemid;
        console.log("Opening "+ id);
        window.location.replace("../SignatureItems/view?id="+ id);
    }
    
    self.EditSignatureItems = function(){
         var id = this.signatureitemid;
        console.log("Opening "+ id);
        window.location.replace("../SignatureItems/edit?id="+ id);
    }
    
    self.CreateSignatureItems = function(){
        console.log("Create new ");
        window.location.replace("/SignatureItems/create");
    }
    

    self.GetSignatureItems = function () {
        self.SignatureItemsLoading(true);
        self.SignatureItemsList.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim("metmom\\roolivier")])];
        url = self.ApiBaseUri() + self.apiUrl.getAllSignatureItems;
        console.log("Getting all people : for " + currentDomainLogin);
        ajaxAsync.ajaxGet(self, self._populateSignatureItems, url, null, null, null, headers);
    };

    self._populateSignatureItems = function (result) {
        if (result.success) {
            var data = result.data.data;
            
            for (var i = 0; i < data.length; i++) {
                data[i].inactivechecked=self.getInActive(data[i].inactive)
                self.SignatureItemsList.push(data[i]);
            }
        } else {
             if(result.errorMessage==="error"){
                self.SignatureItemsHasError(true);
                self.SignatureItemsError("");
            }else{
                self.SignatureItemsHasError(true);
                self.SignatureItemsError(result.errorMessage);
            }
            
            
        }
        self.SignatureItemsLoading(false);
        $('#SignatureItemsTable').DataTable();

    };

    self.getInActive = function (inactiveValue) {
        var isckecked = false;
        if(inactiveValue==="1"){
            isckecked  = true;
        }
        return isckecked;
    };

}
