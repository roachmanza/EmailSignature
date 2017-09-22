function LanguagesCreateViewModel(hostThisContext) {
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
        getAllContactTypeById: "api/v1/Languages",
        getAllLanguages: "api/v1/Languages",
        createContactType: "api/v1/Languages",
    }
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model) {
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenLanguagesList = function () {
        window.location.replace("../Languages/list");
    };

    self.contacttypeid = ko.observable("");
    self.name = ko.observable("");
    self.description = ko.observable("");
    self.code = ko.observable("");
    self.inactive = ko.observable("");
    self.inactivechecked = ko.observable("");
    self.inactivedate = ko.observable("");
    self.SaveLanguages = function () {
        self.LanguagesHasError(false);
        self.LanguagesError("");
        var inactive = "0";
        if (self.inactivechecked() === true) {
            inactive = "1"
        };
        if (!self.name()) {
            self.LanguagesHasError(true);
            self.LanguagesError("Please supply a name");
            return;
        };
        if (!self.description()) {
            self.LanguagesHasError(true);
            self.LanguagesError("Please supply a description");
            return;
        };
        if (!self.code()) {
            self.LanguagesHasError(true);
            self.LanguagesError("Please supply a code");
            return;
        };
        var jsonObject = JSON.stringify({
            name: self.name(),
            description: self.description(),
            code: self.code(),
            inActive: inactive
        });
        console.log(jsonObject)
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim(currentDomainLogin)])];
        url = self.ApiBaseUri() + self.apiUrl.createContactType ;
        ajaxAsync.ajaxPost(self, self._SaveLanguages, url, null, jsonObject, null, headers);
    };
    self._SaveLanguages = function (result) {
        if (result.success) {
            self.OpenLanguagesList();
        } else {
            self.LanguagesHasError(true);
            self.LanguagesError(result.errorMessage);
        }
    };



}
