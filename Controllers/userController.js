const models = require("../models/index");
const userModel = models['Users'];
const rolesModel = models['Roles'];
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const validateInst = require("../helpers/validate");

module.exports = {

    register(req, res) {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({'message': 'Some values are missing'});
        }
        if (!validateInst.isValidEmail(req.body.email)) {
            return res.status(400).send({'message': 'Please enter a valid email address'});
        }
        if (!validateInst.isValidRf(req.body.rf_id)) {
            return res.status(400).send({'message': 'Please enter a valid reference started with B '});
        }

        userModel.findOne({
            where: {
                [Op.or]: [
                    {
                        user_name: req.body.user_name
                    },
                    {
                        email: req.body.email
                    },
                ]
            }
        }).then(findedUser => {
            if (findedUser) {
                return res.status(400).send({'message': 'Username or email already exists'});
            } else {
                const hashPassword = validateInst.hashPassword(req.body.password);
                userModel.create({
                    user_name: req.body.user_name.toLowerCase(),
                    last_name: req.body.last_name,
                    first_name: req.body.first_name,
                    email: req.body.email.toLowerCase(),
                    password: hashPassword,
                    rf_id: req.body.rf_id
                })
                    .then(user => res.status(201).send({
                        status: 201,
                        data: user,
                        message: req.body.user_name + " created "
                    }))
                    .catch(error => res.status(400).send(error))
            }
        });
    },

    login(req, res) {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({
                message: 'Some values are missing'
            });
        }
        if (!validateInst.isValidEmail(req.body.email)) {
            return res.status(400).send({
                message: 'Please enter a valid email address'
            });
        }

        userModel.findOne({
            where: {
                [Op.or]: [
                    /*{
                        user_name: req.body.user_name
                    },*/
                    {
                        email: req.body.email
                    },
                ]
            }
        }).then(findedUser => {
            if (!findedUser) {
                return res.status(400).send({message: 'User not founded'});
            } else if (!validateInst.comparePassword(req.body.password, findedUser.password)) {
                return res.status(400).send({
                    message: 'Invalid password',
                    password_shouldby: validateInst.hashPassword(req.body.password)
                });
            } else {
                const token = validateInst.generateToken(findedUser.id);
                findedUser = findedUser.toJSON();
                delete findedUser.password;
                return res.status(200).send({
                    token: token,
                    data: findedUser
                });
            }
        });
    },

    list(req, res) {
        userModel.findAll({
            include: {
                model: rolesModel,
                as: "Roles",
            }
        })
            .then(resultQuery => {
                res.send({
                    data: resultQuery,
                    success: true,
                    messages: [{
                        code: "01",
                        message: "Users.GetAllWithSuccess"
                    }]
                });
            }).catch(error => res.status(400).send(error))
    },

    getById(req, res) {
        let iduser = req.params.id;

        userModel.findOne({
            where: {
                id: iduser
            }
        }).then(function (resultQuery) {
            if (!resultQuery) {
                return res.status(404).send({
                    message: 'user Not Found',
                });
            }
            return res.status(200).send(resultQuery => {
                const token = validateInst.generateToken(resultQuery.id);
                res.header("x-auth-token", token).send({
                    id: resultQuery._id,
                    name: resultQuery.name,
                    email: resultQuery.email
                });
            });
        }).catch((error) => res.status(500).send(error));

    },

    update: function (req, res) {
        let iduser = Number(req.params.id);

        //pour verifier si user id est le meme envoyer (authentification )
        if (req.user_id !== iduser && req.user_id !== 15) {
            return res.status(404).send({
                message: 'You cant edit another user',
                status: false
            });
        }

        this.updateUser(req, res, iduser);
    },

    updateMe: function (req, res) {
        this.updateUser(req, res, req.user_id);
    },

    updateUser(req, res, iduser) {
        userModel.findOne({
            where: {
                id: iduser
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
                        user_name: req.body.user_name,
                        last_name: req.body.last_name,
                        first_name: req.body.first_name,
                        rf_id: req.body.rf_id,
                        email: req.body.email,
                    })
                        .then((user) => {
                            if (typeof req.body.roles !== 'undefined') {
                                rolesModel.count({
                                    where: {
                                        role_id: req.body.roles
                                    }
                                }).then(count_rolesFinded => {
                                    if (req.body.roles.length !== count_rolesFinded) {
                                        return res.status(404).send({
                                            message: 'Invalid roles sended',
                                            status: false
                                        });
                                    } else {
                                        user.setRoles(req.body.roles).then(function (associatedRoles) {
                                            user.getUserWithRoles().then((userData) => {
                                                res.status(200).send({
                                                    success: true,
                                                    data: userData
                                                });
                                            }).catch((error) => res.status(400).send(error));
                                        });
                                    }
                                });
                            } else {
                                res.status(200).send({
                                    success: true,
                                    data: user.getMeWithoutPassword()
                                });
                            }
                        })
                        .catch((error) => res.status(400).send(error));
                }
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        let id = req.params.id;

        userModel.findOne({
            where: {
                id: id
            }
        }).then(function (resultQuery) {
            if (!resultQuery) {
                return res.status(404).send({
                    message: 'User Not Found',
                });
            } else {
                resultQuery.destroy()
                    .then((deleted) => res.status(204).send({
                        status: 'destroy',
                        message: ' user have been deleted ',
                        data: deleted
                    }))
                    .catch((error) => res.status(400).send(error));
            }


        })
            .catch((error) => res.status(400).send(error));

    },

};
