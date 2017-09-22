'use strict';
module.exports = function(webserver) {
    var controller = require('../controllers/CsiMainContactTypesController');
    webserver.route('/MailEnhancement/api/v1/CsiMainContactTypes')
        .post(controller.create_a_CsiMainContactType)
        .get(controller.get_all_CsiMainContactTypes);
    webserver.route('/MailEnhancement/api/v1/CsiMainContactTypes/:Id')
        .get(controller.read_a_CsiMainContactType)
        .put(controller.update_a_CsiMainContactType)
        .delete(controller.delete_a_CsiMainContactType);
};