'use strict';
module.exports = function (webserver) {
    var controller = require('../controllers/ContactTypesController');
    webserver.route('/MailEnhancement/api/v1/ContactTypes')
        .post(controller.create_a_ContactType)
        .get(controller.read_all_ContactTypes);
    webserver.route('/MailEnhancement/api/v1/ContactTypes/:id')
        .get(controller.read_a_ContactType)
        .put(controller.update_a_ContactType)
        .delete(controller.delete_a_ContactType);
    webserver.route('/MailEnhancement/api/v1/ContactTypes/EmailAddress/:id')
        .get(controller.read_a_ContactType_for_EmailAddress);
};