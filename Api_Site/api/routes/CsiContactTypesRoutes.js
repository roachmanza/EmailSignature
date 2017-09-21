'use strict';
module.exports = function(webserver) {
    var controller = require('../controllers/CsiContactTypesController');
    webserver.route('/MailEnhancement/api/v1/CsiContactTypes')
        .post(controller.create_a_CsiContactType)
        .get(controller.get_all_CsiContactTypes);
    webserver.route('/MailEnhancement/api/v1/CsiContactTypes/:Id')
        .get(controller.read_a_CsiContactType)
        .put(controller.update_a_CsiContactType)
        .delete(controller.delete_a_CsiContactType);
};