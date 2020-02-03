const models = require("../models/index");
const boxModel = models['Boxes'];
const lineModel = models['Lines'];
const validate = require("../helpers/validate");
const ApiController = require("./apiController");

class BoxController extends ApiController {

    constructor() {
        super();
        this.entity_model = boxModel;
        this.entity_id_name = 'box_id';
        this.list_includes = [
            {
                model: lineModel,
                as: 'Line'
            }
        ];
    }

    preSaveValidation(objectToSave) {
        return new Promise((resolve, reject) => {
            if (validate.isValidMac(objectToSave.mac_address)) {
                resolve(objectToSave);
            }
            if (typeof dataReceived.items === "undefined" || dataReceived.items.length === 0) {
                return res.status(500).send({
                    success: false,
                    data: dataReceived,
                    message: "no items inserted",
                });
            }
        });
    }

}

module.exports = BoxController;
