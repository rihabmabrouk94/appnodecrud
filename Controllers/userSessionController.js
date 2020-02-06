const models = require("../models/index");
const boxModel = models['Boxes'];
const lineModel = models['Lines'];
const userModel = models['Users'];
const usersessionModel = models['Usersessions'];
const Sequelize = require("sequelize");
const Op = require("sequelize")['Op'];
const validate = require("../helpers/validate");
const ApiController = require("./apiController");

class usersessionController extends ApiController {

    constructor() {
        super();
        this.entity_model = usersessionModel;
        this.entity_id_name = 'id';
        this.list_includes = [
            {
                model: userModel,
                as: 'user_id'
            },
            {
                model: boxModel,
                as: 'box_id'
            }
        ];
    }

    authentificate(req, res) {
        let rf_id = req.body.rf_id;
        let box_mac_add = req.body.box_mac_add;
        let _this = this;

        if (!rf_id || rf_id === '' || !box_mac_add || box_mac_add === '') {
            return res.status(404).send({
                message: 'Error.RfidUserOrBoxMacAddressNotFounded',
                status: false
            });
        }

        if (!validate.isValidMac(box_mac_add)) {
            return res.status(404).send({
                message: 'Invalid mac address',
                status: false
            });
        }

        userModel.findOne({
            where: {
                rf_id: rf_id
            }
        }).then(findedUser => {
            if (!findedUser) {
                return res.status(400).send({'message': 'access denied'});
            } else {
                // check box exists
                boxModel.findOne({
                    where: {
                        mac_address: box_mac_add
                    }
                }).then(findedBox => {
                    if (!findedBox) {
                        return res.status(400).send({'message': 'invalid box'});
                    }
                    _this.closeOldSessions(findedUser.id, findedBox.box_id);

                    usersessionModel.create({
                        user_id: findedUser.id,
                        box_id: findedBox.box_id,
                        time_start: new Date(),
                        time_finish: null,
                    }).then(userSession => {
                        usersessionModel.findOne({
                            where: {
                                usersession_id: userSession.usersession_id
                            },
                            include: [
                                {
                                    model: userModel,
                                },
                                {
                                    model: boxModel,
                                    include: [
                                        {
                                            model: lineModel,
                                            as: 'Line'
                                        }
                                    ]
                                }
                            ]
                        }).then(userSessionFullData => {
                            let objectToReturn = userSessionFullData.toJSON();
                            objectToReturn.User = userSessionFullData.User.getMeWithoutPassword();
                            res.status(201).send({
                                status: 201,
                                data: objectToReturn,
                                message: " Session created "
                            });
                        });
                    })
                    .catch(error => res.status(400).send(error));

                }).catch(error => res.status(400).send(error));
            }
        });
    }

    closeOldSessions(user_id, box_id) {
        if (user_id) {
            usersessionModel.update({ time_finish: new Date()}, {
                where: {
                    time_finish: {
                        [Op.eq]: null
                    },
                    user_id: user_id
                }
            });
        }
        if (box_id) {
            usersessionModel.update({ time_finish: new Date()}, {
                where: {
                    time_finish: {
                        [Op.eq]: null
                    },
                    box_id: box_id
                }
            });
        }
    }

    logoutSession(req, res) {
        if (!req.body.user_id && !req.body.box_id && !req.body.usersession_id) {
            return res.status(400).send({'message': 'invalid params'});
        }

        const whereConfig = {
            time_finish: {
                [Op.eq]: null
            }
        };

        if (req.body.user_id) {
            whereConfig.user_id = req.body.user_id;
        }
        if (req.body.usersession_id) {
            whereConfig.usersession_id = Number(req.body.usersession_id);
        }
        if (req.body.box_id) {
            whereConfig.box_id = Number(req.body.box_id);
        }

        usersessionModel.findOne({
            where: whereConfig
        }).then(findedsession => {
            if (!findedsession) {
                res.status(400).send({'message': 'session already logued out'});
            } else {
                usersessionModel.update({time_finish: new Date()}, {
                    where: {
                        time_finish: {
                            [Op.eq]: null
                        },
                        user_id: findedsession.user_id
                    }
                }).then(res.status(200).send({'message': 'user logued out'}))
            }

        })
            .catch(error => res.status(400).send(error))


    }
}

module.exports = usersessionController;
