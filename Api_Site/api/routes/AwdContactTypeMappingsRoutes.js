'use strict';
module.exports = function(webserver) {
    var controller = require('../controllers/AwdContactTypeMappingsController');
    
    webserver.route('/MailEnhancement/api/v1/AwdContactTypeMappings')
        .post(controller.create_a_AwdContactTypeMapping)
        .get(controller.get_all_AwdContactTypeMappings);
    webserver.route('/MailEnhancement/api/v1/AwdContactTypeMappings/:AwdContactTypeMappingId')
        .get(controller.read_a_AwdContactTypeMapping)
        .put(controller.update_a_AwdContactTypeMapping)
        .delete(controller.delete_a_AwdContactTypeMapping);
};