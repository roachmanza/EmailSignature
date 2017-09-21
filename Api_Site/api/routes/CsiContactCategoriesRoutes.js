'use strict';
module.exports = function(webserver) {
    var controller = require('../controllers/CsiContactCategoriesController');
    webserver.route('/MailEnhancement/api/v1/CsiContactCategories')
        .post(controller.create_a_CsiContactCategory)
        .get(controller.get_all_CsiContactCategories);
    webserver.route('/MailEnhancement/api/v1/CsiContactCategories/:Id')
        .get(controller.read_a_CsiContactCategory)
        .put(controller.update_a_CsiContactCategory)
        .delete(controller.delete_a_CsiContactCategory);
};