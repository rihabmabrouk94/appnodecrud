const models = require("../models/index");
const machineModel = models['Machines'];
const MachineTypes = models['MachineTypes'];
const MachineModels = models['MachineModels'];

const ApiController = require("./apiController");

class MachineController extends ApiController {

    constructor() {
        super();
        this.entity_model = machineModel;
        this.entity_id_name = 'id_machine';
        this.list_includes = [
            {
                model: MachineModels,
                as: 'machine_model'
            },
            {
                model: MachineTypes,
                as: 'machine_type'
            }
        ]
    }

    processDataPreSave(objectToSave) {
        return new Promise((resolve, reject) => {
            resolve(objectToSave);
        })
    }

}

module.exports = MachineController;
