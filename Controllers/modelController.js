const models = require("../models/index");
const MachineModels = models['MachineModels'];
const Machines = models['Machines'];
const validate = require("../helpers/validate");
const ApiController = require("./apiController");

class MachineModelsController extends ApiController {

    constructor() {
        super();
        this.entity_model = MachineModels;
        this.entity_id_name = 'machine_model_id';
        this.list_includes = [
            {
                model: Machines,
                as: 'machines'
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

module.exports = MachineModelsController;

