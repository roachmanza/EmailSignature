'use strict';
module.exports = function(webserver) {
    var controller = require('../controllers/FieldTypesController');
    webserver.route('/MailEnhancement/api/v1/FieldTypes')
        .post(controller.create_a_FieldType)
        .get(controller.read_all_FieldTypes);
    webserver.route('/MailEnhancement/api/v1/FieldTypes/:id')
        .get(controller.read_a_FieldType)
        .put(controller.update_a_FieldType)
        .delete(controller.delete_a_FieldType);
};