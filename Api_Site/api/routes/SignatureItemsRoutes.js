'use strict';
module.exports = function (webserver) {
    var controller = require('../controllers/SignatureItemsController');
    webserver.route('/MailEnhancement/api/v1/SignatureItems')
        .post(controller.create_a_SignatureItem)
        .get(controller.read_all_SignatureItems);
    webserver.route('/MailEnhancement/api/v1/SignatureItems/:id')
        .get(controller.read_a_SignatureItem)
        .put(controller.update_a_SignatureItem)
        .delete(controller.delete_a_SignatureItem);
    webserver.route('/MailEnhancement/api/v1/SignatureItems/EmailAddress/:id')
        .get(controller.read_all_SignatureItems_for_emailAddr);
    webserver.route('/MailEnhancement/api/v1/SignatureItems/EmailAddress/:id/LanguageCode/:langcode')
        .get(controller.read_all_SignatureItems_for_emailAddr_with_language);
    webserver.route('/MailEnhancement/api/v1/SignatureItems/ContactTypes/:id')
        .get(controller.read_all_SignatureItems_for_contactTypeId);
    webserver.route('/MailEnhancement/api/v1/SignatureItemsContactTypeList')
        .get(controller.read_a_SignatureItem_ContactTypeList);

};