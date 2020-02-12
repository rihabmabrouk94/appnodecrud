const models = require("../models/index");
const workModel = models['Workes'];
const ApiController = require("./apiController");

class WorkController extends ApiController {

    constructor() {
        super();
        this.entity_model = workModel;
        this.entity_id_name = 'work_id';
        this.list_includes = [];
    }
}

module.exports = WorkController;
