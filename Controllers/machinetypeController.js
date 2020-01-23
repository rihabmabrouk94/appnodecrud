const models = require("../models/index");
const MachineTypes = models['MachineTypes'];
const Machines = models['Machines'];
module.exports = {

    create(req, res) {
        MachineTypes.create({
            label: req.body.label
        })
            .then(line => res.status(201).send({
                status: 201,
                data: line,
                message: req.body.label + " created "
            }))
            .catch(error => res.status(400).send(error))

    },

    list(req, res) {
        MachineTypes.findAll({
            include: [
                {
                    model: Machines,
                    as: 'machines'
                }
            ]
        })
            .then(resultQuery => {
                res.send({
                    data: resultQuery,
                    success: true,
                    messages: [{
                        code: "01",
                        message: "lines.GetAllWithSuccess"
                    }]
                });
            }).catch(error => res.status(400).send(error))
    },

    getById(req, res) {
        let machine_type_id = req.params.id;

        MachineTypes.findOne({
            where: {
                machine_type_id: machine_type_id
            }
        }).then(function (resultQuery) {
            if (!resultQuery) {
                return res.status(404).send({
                    message: 'line Not Found',
                });
            }
            return res.status(200).send(resultQuery);
        }).catch((error) => res.status(500).send(error));

    },

    update: function (req, res) {
        let machine_type_id = req.params.id;
        MachineTypes.findOne({
            where: {
                machine_type_id: Number(machine_type_id)
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
                        auth_mac: req.body.auth_mac,
                        line_id: req.body.line_id

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

        MachineTypes.findOne({
            where: {
                machine_model_id: id
            }
        }).then(function (resultQuery) {
            if (!resultQuery) {
                return res.status(404).send({
                    message: 'User Not Found',
                });
            }

            resultQuery.destroy()
                .then(() => res.status(204).send({
                    status: 'destroy',
                    message: ' box has been deleted ',
                }))
                .catch((error) => res.status(400).send(error));
        })
            .catch((error) => res.status(400).send(error));

    },


};
