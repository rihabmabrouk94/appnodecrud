const models = require("../models/index");
const lineModel = models['Lines'];
module.exports = {

    createline(req, res) {
        lineModel.create({
            label: req.body.label
        })
            .then(line => res.status(201).send({
                status: 201,
                data: line,
                message: req.body.label + " created "
            }))
            .catch(error => res.status(400).send(error))

    },

    listoflines(req, res) {
        lineModel.findAll()
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
    getlineById(req, res) {
        let line_id = req.params.id;

        lineModel.findOne({
            where: {
                line_id: line_id
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

    updateline: function (req, res) {
        let line_id = req.params.id;
        lineModel.findOne({
            where: {
                line_id: line_id
            }
        })
            .then(findersQuery => {
                if (!findersQuery) {
                    return res.status(404).send({
                        message: 'line Not Found',
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
    deleteline(req, res) {
        let id = req.params.id;

        lineModel.findOne({
            where: {
                line_id: id
            }
        }).then(function (resultQuery) {
            if (!resultQuery) {
                return res.status(404).send({
                    message: 'line Not Found',
                });
            }

            resultQuery.destroy()
                .then(() => res.status(204).send({
                    status: 'destroy',
                    message: ' line has been deleted ',
                }))
                .catch((error) => res.status(400).send(error));
        })
            .catch((error) => res.status(400).send(error));

    },



};
