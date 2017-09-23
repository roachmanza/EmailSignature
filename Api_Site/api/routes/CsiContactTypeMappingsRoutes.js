'use strict';
module.exports = function(webserver) {
    var controller = require('../controllers/CsiContactTypeMappingsController');
    
    webserver.route('/MailEnhancement/api/v1/CsiContactTypeMappings')
        .post(controller.create_a_CsiContactTypeMappings)
        .get(controller.get_all_CsiContactTypeMappings);
    webserver.route('/MailEnhancement/api/v1/CsiContactTypeMappings/:Id')
        .get(controller.read_a_CsiContactTypeMappings)
        .put(controller.update_a_CsiContactTypeMappings)
        .delete(controller.delete_a_CsiContactTypeMappings);
};