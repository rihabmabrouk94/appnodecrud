const Op =require("sequelize")
const models = require("../models/index");
const operationModel = models['Operations'];
const bundleModel = models['Bundles'];
const MachineTypesModel = models['MachineTypes'];
const MachineModel = models['Machines'];
const OrderModel = models['Orders'];
const BoxModel = models['Boxes'];
const UsersessionModel = models['Usersessions'];
const carteOperationModel = models['CarteOperations'];
const carteOperationSessionModel = models['CarteOperationSessions'];
const validate = require("../helpers/validate");
const ApiController = require("./apiController");

class OperationController extends ApiController {
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
                include: [
                    {
                        model: MachineModel,
                        as: 'Machines',
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

    create(req, res) {
        return super.create(req, res);
    }

    list_operation(req, res) {
        let usersession_id = req.params.id;
        UsersessionModel.findOne({
            include: [
                {
                    model: BoxModel,
                    as: 'box',
                    include: [
                        {
                            model: MachineModel,
                            as: 'Machines',
                            include: [
                                {
                                    model: MachineTypesModel,
                                    as: 'MachineTypes'
                                }
                            ]
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
                        machine_type_id: usersessionfound.box.Machines.machine_type_id
                    },
                    include: [
                        {
                            model: carteOperationModel,
                            as: 'CarteOperations',
                        }
                    ]
                }).then(resultquery => {
                    if (!resultquery) {
                        return res.status(404).send({
                            success: false,
                            message: 'Operation Not Founded',
                        });
                    }
                    return res.status(200).send({

                        success: true,
                        data: resultquery,
                        message: 'success'
                    });
                }).catch((error) => res.status(500).send(error));

            } else {
                return res.status(404).send({
                    message: 'user session Not Found',
                })
            }
        })
            .catch((error) => res.status(500).send(error))
    }

    startOperation(req, res) {
        let _this = this;
        const operation_id = req.params.operation_id;
        const usersession_id = req.params.usersession_id;

        if ((operation_id == null) || (operation_id === '')) {
            res.send({
                success: false,
                data: null,
                messages: 'there is no operation'
            });
            return;
        }
        if ((usersession_id == null) || (usersession_id === '')) {
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
                    include: [
                        {
                            model: operationModel,
                            as: 'Operations',
                            include: [
                                {
                                    model: bundleModel,
                                    as: 'Bundles',
                                }
                            ]
                        },
                    ]
                }).then(operationFounded => {
                    if (operationFounded) {
                        const data_to_save = {
                            carte_operation_id: operationFounded.carte_operation_id,
                            usersession_id: usersession_id,
                            quantity: 1,
                            time: null,
                            finished: 'N',
                            in_progress: 'Y',
                            end_time: null,
                            start_time: new Date().toDateString()
                        };
                        carteOperationSessionModel.create(data_to_save).then(carte_session_started => {
                            return res.status(200).send({
                                status: true,
                                data: carte_session_started,
                                messages: ['Carte session started with success']
                            })
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

    finish_operation(req, res) {
        let carte_operation_session_id = req.body.carte_operation_session_id;
        let quantity = parseInt(String(req.body.quantity));
        let time = parseInt(String(req.body.time));

        if ((carte_operation_session_id == null) || (carte_operation_session_id === '')) {
            res.status(500).send({
                success: false,
                data: null,
                messages: [
                    'carte_operation_id not provided'
                ]
            });
            return;
        }
        if ((quantity == null) || (quantity === '')) {
            res.status(500).send({
                success: false,
                data: null,
                messages: [
                    'quantity not provided'
                ]
            });
            return;
        }
        if ((time == null) || (time === '')) {
            res.status(500).send({
                success: false,
                data: null,
                messages: [
                    'quantity not provided'
                ]
            });
            return;
        }

        carteOperationSessionModel.findOne({
            where: {
                carte_operation_session_id: carte_operation_session_id
            },
            include: [
                {
                    model: carteOperationModel,
                    as: 'CarteOperations',
                    include: [
                        {
                            model: operationModel,
                            as: 'Operations',
                            include: [
                                {
                                    model: bundleModel,
                                    as: 'Bundles',
                                }
                            ]
                        }
                    ]
                }
            ]
        }).then(cosFounded => {

            if (cosFounded) {
                if (cosFounded.end_time !== null || !(cosFounded.quantity === 0 || cosFounded.quantity === null)) {
                    return res.status(500).send({
                        status: false,
                        messages: [
                            'Cps already closed'
                        ]
                    });
                }

                if (cosFounded.CarteOperations.finished === 'Y') {
                    return res.status(500).send({
                        status: false,
                        messages: [
                            'Cpo already closed'
                        ]
                    });
                }

                let quantity_need = cosFounded.CarteOperations.quantity_total;
                let quantity_done = (cosFounded.CarteOperations.quantity) ? parseInt(cosFounded.CarteOperations.quantity) : 0;

                if ((quantity_done + quantity) > quantity_need) {
                    return res.status(500).send({
                        status: false,
                        messages: [
                            'Invalid quantity to produce'
                        ]
                    });
                }

                let quantity_total_done = quantity_done + quantity;
                const is_finished = (quantity_total_done === quantity_need);
                carteOperationModel.update({
                    quantity: quantity_total_done,
                    time: time,
                    finished: is_finished ? 'Y' : 'N',
                    in_progress: is_finished ? 'N' : 'Y',
                    dateend: (is_finished) ? new Date().toDateString() : null
                }, {
                    where: {
                        carte_operation_id: cosFounded.CarteOperations.carte_operation_id,
                    }
                }).then(coUpdated => {
                    carteOperationSessionModel.update({
                        quantity: quantity,
                        end_time: new Date().toDateString()
                    }, {
                        where: {
                            carte_operation_session_id: cosFounded.carte_operation_session_id,
                        }
                    }).then(cpsUpdated => {
                        return res.send({
                            success: true,
                            messages: [
                                'Operation session updated'
                            ],
                            data: cpsUpdated
                        });
                    });
                })
                    .catch(err => res.send(err));
            } else {
                return res.status(500).send({
                    success: false,
                    messages: [
                        'Cps not exists'
                    ]
                });
            }
        }).catch((error) => res.status(500).send(error))
    }

    startOperationSession(req, res) {
        let _this = this;
        const carte_operation_id = req.body.carte_operation_id;
        const usersession_id = req.body.usersession_id;
        if ((carte_operation_id == null) || (carte_operation_id === '')) {
            res.send({
                success: false,
                data: null,
                messages: 'there is no carte '
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
        }).then(userFounded => {
            if (userFounded) {
                carteOperationModel.findOne({
                    where: {
                        carte_operation_id: carte_operation_id
                    }
                }).then(carteFounded => {
                    if (carteFounded) {
                        if (carteFounded.finished === 'Y' || carteFounded.quantity === carteFounded.quantity_total) {
                            return res.status(500).send({
                                success: false,
                                messages: 'This cpo already finished'
                            });
                        }

                        _this.closeOponedCps(usersession_id).then(cps_closed_state => {
                            carteOperationSessionModel.create({
                                carte_operation_id: carte_operation_id,
                                usersession_id: usersession_id,
                                start_time: new Date().toDateString(),
                                finished: 'N',
                                quantity: 0,
                            }).then(carteSession => {
                                carteOperationSessionModel.findOne({
                                    where: {
                                        carte_operation_id: carteSession.carte_operation_id,
                                        carte_operation_session_id: carteSession.carte_operation_session_id,
                                    }, include: [
                                        {
                                            model: carteOperationModel,
                                            as: 'CarteOperations',
                                            include: [
                                                {
                                                    model: operationModel,
                                                    as: 'Operations',
                                                    include: [
                                                        {
                                                            model: bundleModel,
                                                            as: 'Bundles',
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }).then(carteSessiondata => {
                                    return res.status(200).send({
                                        state: 'started',
                                        status: true,
                                        data: carteSessiondata
                                    });
                                })
                                // carteSession.getCarteOperations().then(cpo => {
                                //     const cps = carteSession.toJSON();
                                //     carteSession.cpo = cpo.toJSON();
                                //     return res.status(200).send({
                                //         state: 'started',
                                //         status: true,
                                //         data: cps
                                //     });
                                // })
                            });
                        })
                    } else {
                        res.send({
                            success: false,
                            messages: 'cart not founded'
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

    closeOponedCps(usersession_id) {
        return new Promise((resolve, reject) => {
            carteOperationSessionModel.update({
                    end_time: new Date().toDateString(),
                    quantity: 0,
                },
                {
                    where: {
                        usersession_id: usersession_id,
                        end_time: null
                    }
                }
            ).then(count => {
                resolve({
                    success: true,
                    cps_closed: count,
                });
            })
                .catch(error => reject(error));
        })
    }

}

module.exports = OperationController;
