'use strict';
module.exports = function(webserver) {
    var controller = require('../controllers/FieldItemsController');
    webserver.route('/MailEnhancement/api/v1/FieldItems')
        .post(controller.create_a_FieldItems)
        .get(controller.get_all_FieldItems);
    webserver.route('/MailEnhancement/api/v1/FieldItems/:Id')
        .get(controller.read_a_FieldItems)
        .put(controller.update_a_FieldItems)
        .delete(controller.delete_a_FieldItems);
};