const models = require("../models/index");
const operationModel = models['Operations'];
const bundleModel = models['Bundles'];
const validate = require("../helpers/validate");
const ApiController = require("./apiController");

class OperationController extends ApiController {

    constructor() {
        super();
        this.entity_model = operationModel;
        this.entity_id_name = 'operation_id';
        this.list_includes = [
            {
                model: bundleModel,
                as: 'Bundles'
            }

        ];
    }


}

module.exports = OperationController;
