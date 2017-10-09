'use strict';
module.exports = function (webserver) {
    var controller = require('../controllers/SignatureItemsController');
    webserver.route('/MailEnhancement/api/v1/SignatureItems')
        .post(controller.create_a_SignatureItem)
        .get(controller.read_all_SignatureItems);
    webserver.route('/MailEnhancement/api/v1/SignatureItems/:SignatureItemId')
        .get(controller.read_a_SignatureItem)
        .put(controller.update_a_SignatureItem)
        .delete(controller.delete_a_SignatureItem);
    webserver.route('/MailEnhancement/api/v1/SignatureItems/EmailAddress/:EmailAddress')
        .get(controller.read_all_SignatureItems_for_emailAddr);
    webserver.route('/MailEnhancement/api/v1/SignatureItems/ContactTypes/:Id')
        .get(controller.read_all_SignatureItems_for_contactTypeId);

};