const models = require("../models/index");
const machineModel = models['Machines'];
const MachineTypes = models['MachineTypes'];
const MachineModels = models['MachineModels'];

module.exports = {

    create(req, res) {
        machineModel.create({
            label: req.body.label,
            box_id: req.body.box_id,
            machine_model_id: req.body.machine_model_id,
            machine_type_id: req.body.machine_type_id
        })
            .then(machine => res.status(201).send({
                status: 201,
                data: machine,
                message: req.body.label + " created "
            }))
            .catch(error => res.status(400).send(error))

    },

    list(req, res) {
        machineModel.findAll({
            include: [
                {
                    model: MachineModels,
                    as: 'machine_model'
                },
                {
                    model: MachineTypes,
                    as: 'machine_type'
                }
            ],

        })
            .then(resultQuery => {
                res.send({
                    data: resultQuery,
                    success: true,
                    messages: [{
                        code: "01",
                        message: "machine.GetAllWithSuccess"
                    }]
                });
            }).catch(error => res.status(400).send(error))
    },

    getById(req, res) {
        let id_machine = req.params.id;

        machineModel.findOne({
            where: {
                id_machine: Number(id_machine)
            }
        }).then(function (resultQuery) {
            if (!resultQuery) {
                return res.status(404).send({
                    message: 'machine Not Found',
                });
            }
            return res.status(200).send(resultQuery);
        }).catch((error) => res.status(500).send(error));

    },

    update: function (req, res) {
        let id_machine = req.params.id;

        machineModel.findOne({
            where: {
                id_machine: Number(id_machine)
            }
        })
            .then(findersQuery => {
                if (!findersQuery) {
                    return res.status(404).send({
                        message: 'user Not Found',
                        status: false,
                    });
                } else {
                    findersQuery.update({
                        label: req.body.label,
                        box_id: req.body.box_id,
                        machine_model_id: req.body.machine_model_id,
                        machine_type_id: req.body.machine_type_id

                    })
                        .then((box) => {
                            res.status(200).send({status: 'Updated  ', data: box})
                        })
                        .catch((error) => res.status(400).send(error));
                }
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        let id = req.params.id;

        machineModel.findOne({
            where: {
                machine_id: Number(id)
            }
        }).then(function (resultQuery) {
            if (!resultQuery) {
                return res.status(404).send({
                    message: 'machine Not Found',
                });
            }

            resultQuery.destroy()
                .then(() => res.status(204).send({
                    status: 'destroy',
                    message: ' machine has been deleted ',
                }))
                .catch((error) => res.status(400).send(error));
        })
            .catch((error) => res.status(400).send(error));

    },


};
