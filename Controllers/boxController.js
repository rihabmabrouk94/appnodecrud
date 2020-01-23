const models = require("../models/index");
const boxModel = models['Boxes'];
const lineModel = models['Lines'];
const validate = require("../helpers/validate");
module.exports = {

    create(req, res) {
        if (!validate.isValidMac(req.body.mac_address)) {
            return res.status(400).send({'message': 'Please enter a valid  address Mac'});
        }
        boxModel.create({
            label: req.body.label,
            mac_address: req.body.mac_address,
            line_id: req.body.line_id
        })
            .then(box => res.status(201).send({
                status: 201,
                data: box,
                message: req.body.label + " created "
            }))
            .catch(error => res.status(400).send(error))

    },

    list(req, res) {
        boxModel.findAll({
            include: [
                {
                    model: lineModel,
                    as: 'Line'
                }

            ]
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
    },

    get(req, res) {
        let box_id = req.params.id;

        boxModel.findOne({
            where: {
                box_id: box_id
            }
        }).then(function (resultQuery) {
            if (!resultQuery) {
                return res.status(404).send({
                    message: 'box Not Found',
                });
            }
            return res.status(200).send(resultQuery);
        }).catch((error) => res.status(500).send(error));

    },

    update: function (req, res) {
        let box_id = req.params.id;
        boxModel.findOne({
            where: {
                box_id: box_id
            }
        })
            .then(findersQuery => {
                if (!findersQuery) {
                    return res.status(404).send({
                        message: 'user Not Found',
                        status: false,
                    });
                } else {
                    if (!validate.isValidMac(req.body.mac_address)) {
                        return res.status(400).send({'message': 'Please enter a valid  address Mac'});
                    }
                    findersQuery.update({
                        label: req.body.label,
                        mac_address: req.body.mac_address,
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

        boxModel.findOne({
            where: {
                box_id: id
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
