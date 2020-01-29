const models = require("../models/index");
const boxModel = models['Boxes'];

class ApiController {

    constructor(req, res) {
        this.entity_model = null;
        this.entity_id_name = null;
        this.list_includes = [];
        this.list_where = {};
    }

    checkConfiguration(req, res) {
        if (!this.entity_model || !this.entity_id_name) {
            return res.status(500).send({
                status: false,
                message: 'System.EntityConfigurationNotDetected',
            });
        } else {
            return true;
        }
    }

    get(req, res) {
        if (typeof this.checkConfiguration(req, res) !== "boolean") {
            return;
        }

        let entity_id = req.params.id;
        const where = {};
        where[this.entity_id_name] = entity_id;

        this.entity_model.findOne({
            where: where
        }).then(function (resultEntity) {
            if (!resultEntity) {
                return res.status(404).send({
                    success: false,
                    message: 'Global.EntityNotFounded',
                });
            }
            return res.status(200).send({
                success: true,
                data: resultEntity
            });
        }).catch((error) => res.status(500).send(error));

    }

    preSaveValidation(objectToSave) {
        return new Promise((resolve, reject) => {
            resolve(objectToSave);
        });
    }

    create(req, res) {
//verify if you put data
        if (!req.body) {
            return res.status(400).send({
                message: "Global.PleaseEnterEntityData"
            });
        }
        let _this = this;
// objectToSave take the value of the request sanded
        const objectToSave = req.body;
        // send to preSave and wait the promise
        this.preSaveValidation(objectToSave)
        // if the process return the object after the modification
            .then( objectToSaveValidated => {
                //if objectToSave is valid  update objectToSaveUpdated
            _this.processDataPreSave(objectToSaveValidated, req, res).then(objectToSaveUpdated => {
                this.entity_model.create(objectToSaveValidated)
                // send the result created
                    .then(entityCreated => res.status(201).send({
                        status: 201,
                        data: entityCreated,
                        message: "EntityCreatedWithSuccess"
                    }))
                    .catch(error => res.status(400).send(error));
                // probleme with the processDataPreSave
            }).catch((error) => res.status(500).send(error));

        }).catch(err => {
            return res.status(400).send(err);
        });

    }

    processDataPreSave(objectToSave, req, res) {
        return new Promise((resolve, reject) => {
            resolve(objectToSave);
        })
    }

    update(req, res) {
        let entity_id = req.params.id;
        const where = {};
        let _this = this;
        where[this.entity_id_name] = entity_id;
        //find the model with the id sanded in params
        this.entity_model.findOne({
            where: where
        }).then(function (resultEntity) {
            //if the model or the id not exist return false
            if (!resultEntity) {
                return res.status(404).send({
                    success: false,
                    message: 'Global.EntityNotFounded',
                });
            }

            // objectToSave take the value of the request sanded
            const objectToSave = req.body;

            // send to preSave and wait the promise
            _this.processDataPreSave(objectToSave, req, res)
                // si le process retourn l objet après la modification
                .then(objectToSaveUpdated => {
                    //if objectToSave is valid  update objectToSaveUpdated
                    resultEntity.update(objectToSaveUpdated)
                        .then(entitySaved => {
                            // envoyer le resultat vers le after update
                            _this.afterUpdate(entitySaved, req, res);
                        }).catch((error) => res.status(500).send(error));

                // le process de presave lance une erreur
                }).catch((error) => res.status(500).send(error));
        })
        // probleme avec le find one
        .catch((error) => res.status(500).send(error));

    }

    afterUpdate(data, req, res) {
        res.status(201).send({
            status: 201,
            data: data,
            message: "Global.EntityUpdatedWithSuccess"
        });
    }

    delete(req, res) {
        if (typeof this.checkConfiguration(req, res) !== "boolean") {
            return;
        }

        let entity_id = req.params.id;
        const where = {};
        where[this.entity_id_name] = entity_id;

        this.entity_model.findOne({
            where: where
        }).then(function (resultQuery) {
            if (!resultQuery) {
                return res.status(404).send({
                    message: 'Global.EntityNotFounded',
                });
            } else {
                return resultQuery.destroy()
                    .then(() => res.status(204).send({
                        status: true,
                        message: 'Global.EntityDeletedWithSuccess',
                    }))
                    .catch((error) => res.status(400).send(error));
            }
        })
            .catch((error) => res.status(400).send(error));

    }

    list(req, res) {
        if (typeof this.checkConfiguration(req, res) !== "boolean") {
            return;
        }

        this.entity_model.findAll({
            include: this.list_includes,
            where: this.list_where,
        })
            .then(resultQuery => {
                res.send({
                    data: resultQuery,
                    success: true,
                    messages: [{
                        code: "01",
                        message: "Boxes.GetAllWithSuccess"
                    }]
                });
            }).catch(error => res.status(400).send(error))
    }
}

module.exports = ApiController;
