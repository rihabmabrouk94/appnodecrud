const models = require("../models/index");
const clientModel = models['Clients'];
const validate = require("../helpers/validate");
const ApiController = require("./apiController");

class ClientController extends ApiController {

    constructor() {
        super();
        this.entity_model = clientModel;
        this.entity_id_name = 'client_id';
        this.list_includes = [];
    }

}

module.exports = ClientController;
