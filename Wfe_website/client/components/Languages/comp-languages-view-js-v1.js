function LanguagesViewViewModel(hostThisContext) {
    var self = this;
    self.hostContext = hostThisContext;
    var parent;
    var currentDomainLogin;
    var environment;
    var currentId;

    self.ApiBaseUri = ko.observable();

    self.LanguagesHasError = ko.observable(false);
    self.LanguagesError = ko.observable();

    self.LanguagesLoading = ko.observable(false);
    self.LanguagesList = ko.observableArray([]);

	self.apiUrl = {
        getAllContactTypeById: "api/v1/Languages",
        getAllLanguages : "api/v1/Languages"
	}
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model,itemId) {
        currentId = itemId;
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenLanguagesList = function(){
        window.location.replace("../Languages/list");
    }
    
    self.EditLanguages = function(){
        window.location.replace("../Languages/edit?id="+ currentId);
    }
       

    self.GetContactTypeById = function () {
        self.LanguagesLoading(true);
        self.LanguagesList.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim("metmom\\roolivier")])];
        url = self.ApiBaseUri() + self.apiUrl.getAllContactTypeById+ "/" + currentId;
        console.log("Getting all people : for " + currentDomainLogin);
        ajaxAsync.ajaxGet(self, self._populateLanguagesItem, url, null, null, null, headers);
    };

    self.contacttypeid = ko.observable("");
    self.name = ko.observable("");
    self.description = ko.observable("");
    self.code = ko.observable("");
    self.inactive = ko.observable("");
    self.inactivechecked = ko.observable("");
    self.inactivedate = ko.observable("");
    self._populateLanguagesItem = function (result) {
        if (result.success) {
            if (result.success) {
                var data = result.data.data;
                self.contacttypeid(data[0].contacttypeid);
                self.name(data[0].name);
                self.description(data[0].description);
                self.code(data[0].code);
                self.inactive(data[0].inactive);
                self.inactivechecked(self.getInActive(data[0].inactive));
                self.inactivedate(data[0].inactivedate);
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
