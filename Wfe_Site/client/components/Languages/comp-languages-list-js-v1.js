function LanguagesListViewModel(hostThisContext) {
    var self = this;
    self.hostContext = hostThisContext;
    var parent;
    var currentDomainLogin;
    var environment;
    
    self.ApiBaseUri = ko.observable();

    self.LanguagesHasError = ko.observable(false);
    self.LanguagesError = ko.observable();

    self.LanguagesLoading = ko.observable(false);
    self.LanguagesList = ko.observableArray([]);

	self.apiUrl = {
        getAllLanguages: "api/v1/Languages"
	}
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model) {
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenLanguages = function(){
        var id = this.languageid;
        console.log("Opening "+ id);
        window.location.replace("../Languages/view?id="+ id);
    }
    
    self.EditLanguages = function(){
         var id = this.languageid;
        console.log("Opening "+ id);
        window.location.replace("../Languages/edit?id="+ id);
    }
    
    self.CreateLanguages = function(){
        console.log("Create new ");
        window.location.replace("/Languages/create");
    }
    

    self.GetLanguages = function () {
        self.LanguagesLoading(true);
        self.LanguagesList.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim("metmom\\roolivier")])];
        url = self.ApiBaseUri() + self.apiUrl.getAllLanguages;
        console.log("Getting all people : for " + currentDomainLogin);
        ajaxAsync.ajaxGet(self, self._populateLanguages, url, null, null, null, headers);
    };

    self._populateLanguages = function (result) {
        if (result.success) {
            var data = result.data.data;
            
            for (var i = 0; i < data.length; i++) {
                data[i].inactivechecked=self.getInActive(data[i].inactive)
                self.LanguagesList.push(data[i]);
            }
        } else {
             if(result.errorMessage==="error"){
                self.LanguagesHasError(true);
                self.LanguagesError("");
            }else{
                self.LanguagesHasError(true);
                self.LanguagesError(result.errorMessage);
            }
            
            
        }
        self.LanguagesLoading(false);
    };

    self.getInActive = function (inactiveValue) {
        var isckecked = false;
        if(inactiveValue==="1"){
            isckecked  = true;
        }
        return isckecked;
    };

}
