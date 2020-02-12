const models = require("../models/index");
const operationModel = models['Operations'];
const bundleModel = models['Bundles'];
const MachineTypesModel = models['MachineTypes'];
const MachineModel = models['Machines'];
const OrderModel = models['Orders'];
const BoxModel = models['Boxes'];
const UsersessionModel = models['Usersessions'];
const carteOperationModel = models['CarteOperations'];
const validate = require("../helpers/validate");
const ApiController = require("./apiController");

class OperationController extends ApiController {
    create(req, res) {
        return super.create(req, res);
    }
    constructor() {
        super();
        this.entity_model = operationModel;
        this.entity_id_name = 'operation_id';
        this.list_includes = [
            {
                model: bundleModel,
                as: 'Bundles'
            },
            {
                model: MachineTypesModel,
                as: 'MachineTypes',
                include : [
                    {
                        model: MachineModel,
                        as: 'machines',
                        include: [
                            {
                                model: BoxModel,
                                as: 'box'
                            }
                        ]
                    }
                ]
            }

        ];
    }

    list_operation(req, res) {
        let usersession_id = req.params.id;
        UsersessionModel.findOne({
            include: [
                {
                    model: BoxModel,
                    include: [
                        {
                            model: MachineModel,
                            as: 'Machines'
                        }
                    ]
                }
            ],
            where: {
                usersession_id: usersession_id
            }
        }).then(usersessionfound => {
            if (usersessionfound) {
                operationModel.findAll({
                    where: {
                        machine_type_id: usersessionfound.Box.Machines.machine_type_id
                    },
                    include: [
                        {
                            model: bundleModel,
                            as: 'Bundles',
                            include: [
                                {
                                    model: OrderModel,
                                    as: 'order',
                                }
                            ]
                        }
                    ]
                }).then(function (resultquery) {
                    if (!resultquery) {
                        return res.status(404).send({
                            success: false,
                            message: 'Operation Not Founded',
                        });
                    }
                    return res.status(200).send({
                        success: true,
                        data: resultquery
                    });
                }).catch((error) => res.status(500).send(error));

            } else {
                return res.status(404).send({
                    message: 'usersession Not Found',
                })
            }
        })
            .catch((error) => res.status(500).send(error))
    }

    startOperation(req, res) {
        let _this = this
        const operation_id = req.params.operation_id;
        const usersession_id = req.params.usersession_id;

        if ((operation_id == null) || (operation_id == '')) {
            res.send({
                success: false,
                data: null,
                messages: 'there is no operation'
            });
            return;
        }
        if ((usersession_id == null) || (usersession_id == '')) {
            res.send({
                success: false,
                data: null,
                messages: 'there is no usersession'
            });
            return;
        }

        UsersessionModel.findOne({
            where: {
                usersession_id: usersession_id
            }
        }).then(usersessionFounded => {
            if (usersessionFounded) {
                carteOperationModel.findOne({
                    where: {
                        operation_id: operation_id
                    },
                }).then(operationFounded => {
                    if (operationFounded === null) {
                        console.log('here1')
                        const data_to_save = {
                            operation_id: operation_id,
                            datestart: new Date(),
                            in_progress: 'Y',
                            finished: 'N',
                            quantity: 0,
                        };
                        console.log('need to create', data_to_save)
                        carteOperationModel.create(data_to_save).then(carte_started => {
                            console.log('carte_started', carte_started)
                            return res.status(200).send({status: 'started  ', data: carte_started})
                        });
                    } else {
                        res.send({
                            success: false,
                            data: operationFounded,
                            messages: 'users allredy in progress'
                        });
                    }


                })
                    .catch((error) => res.status(500).send(error))
            } else {
                res.send({
                    success: false,
                    data: null,
                    messages: 'users not founded'
                });
            }
        })
            .catch((error) => res.status(500).send(error))
    }

}

module.exports = OperationController;
