const models = require("../models/index");
const ApiControler = require("./apiController");
const lineModel = models['Lines'];
const BoxModel = models['Boxes'];
const MachineModel = models['Machines'];

class LineController extends ApiControler {

    constructor() {
        super();
        this.entity_model = lineModel;
        this.entity_id_name = 'line_id';
    }

    create(req, res) {
        lineModel.create({
            label: req.body.label
        })
            .then(line => res.status(201).send({
                status: 201,
                data: line,
                message: req.body.label + " created "
            }))
            .catch(error => res.status(400).send(error))

    }

    update(req, res) {
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
    }

    getBoxByLine(req, res) {
        const line_id = req.params.id;
        lineModel.findOne({
            where: {
                line_id: line_id
            }, include: [
                {
                    model: BoxModel,
                    as : 'Boxes',

                }
            ]
        }).then(lineFounded => {
            if (!lineFounded) {
                return res.status(404).send({
                    message: 'line Not Found',
                    status: false,
                });
            } else {
                BoxModel.findAll({
                    where: {
                        line_id: lineFounded.line_id
                    },
                    include: [
                        {
                            model: MachineModel,
                            as: 'Machines'
                        }
                    ]
                }).then(boxes => {
                    res.status(200).send({status: 'founded  ', data: boxes})
                })
                    .catch((error) => res.status(400).send(error));
            }
        })
            .catch((error) => res.status(400).send(error));


    }

}

module.exports = LineController;
