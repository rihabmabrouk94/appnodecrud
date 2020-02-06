const models = require("../models/index");
const orderModel = models['Orders'];
const articleModel = models['Articles'];
const clientModel = models['Clients'];
const validate = require("../helpers/validate");
const ApiController = require("./apiController");

class OrderController extends ApiController {

    constructor() {
        super();
        this.entity_model = orderModel;
        this.entity_id_name = 'order_id';
        this.list_includes = [
            {
                model: articleModel,
                foreignKey: 'article_id',
            },
            {
                model: clientModel,
                as: 'Clients',
            }


        ];
    }

}
module.exports = OrderController;
