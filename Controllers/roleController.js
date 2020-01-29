const models = require("../models/index");
const roleModel = models['Roles'];
const userModel = models['Users'];
const validate = require("../helpers/validate");
const ApiController = require("./apiController");

class RoleController extends ApiController {

    constructor() {
        super();
        this.entity_model = roleModel;
        this.entity_id_name = 'role_id';
        this.list_includes = [
            {
                model: userModel,
                as: 'Users'
            }
        ];
    }
}

module.exports = RoleController;
