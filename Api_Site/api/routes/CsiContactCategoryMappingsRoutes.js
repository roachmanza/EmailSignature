'use strict';
module.exports = function(webserver) {
    var controller = require('../controllers/CsiContactCategoryMappingsController');
    webserver.route('/MailEnhancement/api/v1/CsiContactCategoryMappings')
        .post(controller.create_a_CsiContactCategoryMappings)
        .get(controller.get_all_CsiContactCategoryMappings);
    webserver.route('/MailEnhancement/api/v1/CsiContactCategoryMappings/:Id')
        .get(controller.read_a_CsiContactCategoryMappings)
        .put(controller.update_a_CsiContactCategoryMappings)
        .delete(controller.delete_a_CsiContactCategoryMappings);
};