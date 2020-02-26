const models = require("../models/index");
const MachineModels = models['MachineModels'];
const OperationModels = models['Operations'];
const CarteOperationModels = models['CarteOperations'];
const Machines = models['Machines'];
const validate = require("../helpers/validate");
const ApiController = require("./apiController");

class CarteoperaioonController extends ApiController {

    constructor() {
        super();
        this.entity_model = CarteOperationModels;
        this.entity_id_name = 'carte_operation_id';
        this.list_includes = [
            {
                model: OperationModels,
                as: 'Operations'
            }
        ];
    }

    preSaveValidation(data) {
        if (!validate.isValidMac(data.mac_address)) {
            return false;
        }

        return true;
    }


}

module.exports = CarteoperaioonController;

