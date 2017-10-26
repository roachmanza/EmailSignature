'use strict';
module.exports = function (webserver) {
    var controller = require('../controllers/FieldItemsController');
    webserver.route('/MailEnhancement/api/v1/FieldItems')
        .post(controller.create_a_FieldItem)
        .get(controller.read_all_FieldItems);
    webserver.route('/MailEnhancement/api/v1/FieldItems/:id')
        .get(controller.read_a_FieldItem)
        .put(controller.update_a_FieldItem)
        .delete(controller.delete_a_FieldItem);
};