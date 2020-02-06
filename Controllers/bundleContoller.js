const models = require("../models/index");
const bundleModel = models['Bundles'];
const orderModel = models['Orders'];
const validate = require("../helpers/validate");
const ApiController = require("./apiController");

class BundleController extends ApiController {

    constructor() {
        super();
        this.entity_model = bundleModel;
        this.entity_id_name = 'bundle_id';
        this.list_includes = [
            {
                model: orderModel,
                as: 'Orders'
            }
        ];
    }


}

module.exports = BundleController;
